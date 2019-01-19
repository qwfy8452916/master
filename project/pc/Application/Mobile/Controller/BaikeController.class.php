<?php
/**
 * 移动版 - 百科首页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class BaikeController extends MobileBaseController{

    public function index(){
        $DB = D("Common/Baike");
        $info['newBaike'] = $DB->getTopList('5');

        foreach ($info['newBaike'] as $key => $value) {
            $info['newBaike'][$key]['content'] = htmlToText($value['content']);
        }
        //dump($info['newBaike']);

        //热门推荐
        $info['topCategory'] = $DB->getMobileTopCategory('4');
        //dump($info['topCategory']);

        $info['title'] = '装修百科';

        $this->assign("topCategory",$info['topCategory']);
        $this->assign("category",$this->getCategory(1));
        $this->assign("hotBaike",$info['newBaike']);
        $this->assign("info",$info);

        $this->display();

    }

    //分类
    public function category(){
        $DB = D('Common/Baike');
        //根据URL取分类ID
        $url = I('get.id');

        //dump($url);

         //所有分类
        $category = $this->getCategory();
        $template = 'category';

        //如果关键字不为空
        $keyword = I('get.keyword');

        if(!empty($keyword)){
            $condition['keyword'] = $keyword;
            $cateInfo['name'] = $keyword;
            $cateInfo['url'] = 'search?keyword='.$keyword;
            $cateInfo['position'] = '“'.$keyword.'”的搜索结果';
        }

        //如果分类URL不为空
        if(!empty($url) && empty($keyword)){
            $cateInfo = $DB->getCategoryByUrl($url);
            if(empty($cateInfo)){
                $this->_error();
            }
            //如果是一级分类
            if($cateInfo['pid'] == '0'){
                //取下面分类
                $subCate = $DB->getCategoryByCid($cateInfo['cid']);
                foreach ($subCate as $key => $value) {
                    $cid = $value['cid'];
                    $subCate[$key]['subList'] = M('baike')->field('id,item,title')->where(array('sub_category' => $cid , 'visible' => '0'))->order('post_time DESC')->select();
                }
                $this->assign('bigCate',$subCate);
                $template = 'bigcate';
                $cateInfo['thisUrl'] = $url;
            }else{
                foreach ($category as $key => $value) {
                    if($value['cid'] == $cateInfo['pid']){
                        $cateInfo['thisUrl'] = $value['url'];
                        $cateInfo['bigCateName'] = $value['name'];
                    }
                }
            }
            $condition['cateId'] = $cateInfo['cid'];
            $cateInfo['position'] = $cateInfo['name'];
        }


        //不是大分类
        if(empty($subCate)){
            //取问题列表
            $pageIndex = 1;
            $pageCount = 15;
            if(!empty($_GET["p"])){
                $pageIndex = remove_xss($_GET["p"]);
                $pageContent ="第".$pageIndex."页";
            }
            $result = $this->getList($condition,$pageIndex,$pageCount);
            //dump($result);
            $this->assign("list",$result["list"]);
            $this->assign("page",$result["page"]);
        }

        $cateInfo['canonical'] = $_SERVER['REQUEST_URI'];
        $this->assign('category',$category);
        $this->assign('cateInfo',$cateInfo);
        $this->display($template);
    }

    //百科详情页
    public function show(){
        $DB = D("Common/Baike");
        $id = I('get.id');
        //百科
        $info = $DB->getBaike($id);

        if(empty($info)){
            $this->_error();
        }

        //处理文章中的图片
        $pattern ='/<img.*?\/>/is';
        preg_match_all($pattern,$info["content"], $matches);
        if(count($matches[0]) > 0){
            foreach ($matches[0] as $k => $val) {
                $pattern ='/src=[\"|\'](.*?)[\"|\']/is';
                preg_match_all($pattern,$val, $m);
                foreach ($m[1] as $j => $v) {
                    //去水印
                    if(strpos($v, '-s3.')) {
                        $path = str_replace('-s3.', '-s5.', $v);
                        $info["content"] = str_replace($v, $path, $info["content"]);
                    }
                }
            }
        }

        //取第一段关键词
        $desc = str_replace('<br />','<br>',strip_tags($info['content'],'<br>'));
        $desc = array_filter(explode('<br',$desc));
        foreach ($desc as $key => $value) {
            $value = trim($value);
            if(!empty($value)){
                $info['descInfo'] = $value;
                break;
            }
        }

        if($info['cid'] == '35'){
            $info['content'] = '<p><strong>公司介绍 </strong></p>'.$info['content'];
        }


         //增加查看数
        $DB->updateViews($id);


        $this->assign("info",$info);
        $this->display();
    }


    //取列表
    private function getList($condition,$pageIndex = 1,$pageCount = 10)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        import('Library.Org.Page.Page');
        $result = D("Common/Baike")->getListByCategory($condition,($pageIndex-1) * $pageCount,$pageCount);
        $count = $result['count'];
        $list = $result['result'];
        $config  = array("prev","first","last","next");
        $page = new \Page($pageIndex,$pageCount,$count,$config);
        $pageTmp =  $page->show();
        return array("list"=>$list,"page"=>$pageTmp,"num"=>$count);
    }

    //获取分类
    private function getCategory($cid = '',$update = false){
        if($update != true){
           $category = S('Cache:Baike:Category');
        }
        //如果数据为空 - 基本上不会出现
        if(empty($category)){
            $tempCategory = D("Common/Baike")->getCategory();
            $category = array();
            if($tempCategory){
                //为了避免这个Bug，进行两次遍历，先取根数组，后期改进
                foreach ($tempCategory as $k => $v ){
                    if($v['pid'] == '0') {
                        $category[$v['cid']] = $v;
                        unset($k);
                    }
                }
                foreach ($tempCategory as $k => $v ){
                    if($v['pid'] != '0') {
                        $category[$v['pid']]['sub_cate'][] = $v;
                    }
                }
            }
            ksort($category);
            $cateIcon = array(
                '装修百科' => 'wrench','建材百科' => 'book','房产百科' => 'building','设计百科' => 'leaf','家具百科' => 'home',
                '家电百科' => 'lightbulb','品牌百科' => 'trophy','装修公司百科' => 'user'
            );
            foreach ($category as $k => $v) {
                $v['icon'] = $cateIcon[$v['name']];
                $newCategory[] = $v;
            }
            $newCategory = multi_array_sort($newCategory,'order_id');
            S('Cache:Baike:Category',$newCategory,900);
            return $newCategory;
        }
        //根据 Cid 返回
        if(!empty($cid)){
            foreach ($tempCategory as $k => $v ){
                if($v['cid'] == $cid) {
                    return $v;
                    exit;
                }
            }
        }
        return $category;
    }



}