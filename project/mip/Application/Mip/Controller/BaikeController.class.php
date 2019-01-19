<?php
namespace Mip\Controller;
use Mip\Common\Controller\MipBaseController;

class BaikeController extends MipBaseController
{
    public function index()
    {
        $DB = D('Common/Baike');
        //根据URL取分类ID
        $url = I('get.id');
        //设置默认选中
        if (!$url) {
            $url = 'zhishi';
        }
        //如果分类URL不为空
        if(!empty($url)){
            $cateInfo = $DB->getCategoryByUrl($url);
            if(empty($cateInfo)){
                $this->_error();
            }
            $condition['cateId'] = $cateInfo['cid'];
            //如果是一级分类
            if($cateInfo['pid'] == '0'){
                //取下面分类
                $subCateList = $DB->getCategoryByCid($cateInfo['cid']);
                //tdk使用
                $header_tdk = [
                    'one_level' => $cateInfo['name'],
                    'two_level' => $subCateList[0]['name']
                ];
                //选中效果
                $choose = ['choose_one' => $cateInfo['url'], 'choose_two' => $subCateList[0]['url'], 'choose' => $cateInfo['url']];
                //TDK
                $basic['head']['title'] = $header_tdk['one_level'] . '-' . $header_tdk['one_level'] . '知识大全-齐装网';
                $basic['head']['keywords'] = $header_tdk['one_level'] . '，' . $header_tdk['one_level'] . '知识，' . $header_tdk['one_level'].'知识大全';
                $basic['head']['description'] = '齐装网' . $header_tdk['one_level'] . '频道为用户提供专业的设计百科知识，专业打造整个装修行业内高端的' . $header_tdk['one_level'] . '知识全书。';
            }else{
                //查上级分类
                $fCate = $DB->getFCateByPid($cateInfo['pid']);
                $header_tdk = [
                    'one_level' => $fCate['name'],
                    'two_level' => $cateInfo['name']
                ];
                //选中效果
                $choose = ['choose_one' => $fCate['url'], 'choose_two' => $cateInfo['url'], 'choose' => $fCate['url']];
                //TDK
                $basic['head']['title'] = $header_tdk['two_level'] . '-' . $header_tdk['one_level'] . '知识大全-齐装网';
                $basic['head']['keywords'] = $header_tdk['two_level'] . '，' . $header_tdk['two_level'] . '知识大全，' . $header_tdk['one_level'];
                $basic['head']['description'] = '齐装网' . $header_tdk['two_level'] . '栏目为用户提供专业的' . $header_tdk['two_level'] . '知识，专业打造整个装修行业内高端的'.$header_tdk['one_level'].'知识全书。';
            }
        }
        //为了与pc端保持一致
        $parse_url = parse_url($_SERVER['REQUEST_URI']);
        if($parse_url['path'] == '/baike') {
            //TDK
            $basic['head']['title'] = '家居百科-装修知识-齐装网';
            $basic['head']['keywords'] = '家居百科,家居装修知识';
            $basic['head']['description'] = '齐装网装修百科是一部内容开放、自由的装修百科全书，旨在创造一个涵盖所有装修领域知识、服务所有互联网用户的中文知识性装修百科全书。';
        }
        //获取默认的分类数据
        $pageIndex = 1;
        $pageCount = 8;
        if(!empty($_GET["p"])){
            $pageIndex = remove_xss($_GET["p"]);
        }
        $keyword = remove_xss(trim(I('get.keyword')));
        if(!empty($keyword)){
            //搜索页面
            $condition['keyword'] = $keyword;
        }
        $result = $this->getFirstBKList($condition,$pageIndex,$pageCount);
        //查询所有百科分类
        $category = S("Cache:baike:bigCategory");
        $subCate = S("Cache:baike:subCategory");
        if(empty($category) && empty($subCate)){
            $category = $this->getAllCategory();
            foreach ($category as $k => $v) {
                $subCate[$v['url']] = $v['sub_cate'];
            }
            S("Cache:baike:bigCategory",$category,3600*24);
            S("Cache:baike:subCategory",$subCate,3600*24);
        }

        //一级选中位置
        foreach ($category as $k=>$s){
            if($s['url'] == $choose['choose_one']){
                $choose['choose_one'] = $k;
                break;
            }
        }
        //二级选中位置
        foreach ($subCate[$choose['choose']] as $k=>$s){
            if($s['url'] == $choose['choose_two']){
                $choose['choose_two'] = $k;
                break;
            }
        }


        $basic['body']['title'] = $cateInfo['name'];
        if(empty($result['list'])){
            $tmp = 'searchno';
            //获取分类下的其它百科
            $hotlist = $DB->getHotList('3');
            $result['list'] = $hotlist;
            array_unshift($result['list'],['id'=>'0','content'=>'内容没有找到哦！']);
        }
        $this->assign('head',$basic['head']);
        $this->assign('choose',$choose);
        $this->assign("category",$category);
        $this->assign('subCate',$subCate);
        $this->assign("info",$result['list']);
        $this->assign("page",$result['page']);
        $this->assign("totalpage",$result['num']);

        $this->display();
    }

    public function content()
    {
        $DB = D("Common/Baike");
        $id = I('get.id');
        //百科
        $info = S("Cache:Mip:baike:".$id);

        if (!$info) {
            $info = $DB->getBaike($id);
            if(count($info) == 0){
                $this->_error();
            }

            $info['two_category'] = $DB->getCategory(['cid'=>$info['sub_category']]);
            $info['one_category'] = $DB->getFCateByPid($two_category[0]['pid']);

            if($info['cid'] == '35'){
                $info['content'] = '<p><strong>公司介绍 </strong></p>'.$info['content'];
            }








            //增加查看数
            $DB->updateViews($id);
            $category = $this->getCategory();

            foreach ($category as $k => $v) {
                if($v['cid'] == $info['cid']){
                    $info['bigCate'] = $v['name'];
                    $info['bigCateUrl'] = $v['url'];
                    foreach ($v['sub_cate'] as $key => $value) {
                        if($value['cid'] == $info['sub_category']){
                            $info['categoryName'] = $value['name'];
                            $info['categoryUrl'] = $value['url'];
                        }
                    }
                }
            }

            //最新百科 取本百科一级分类，不包括本百科 数量多了可以二级分类
            $map['cateId'] = $info['cid'];
            $map['id'] = array('NOTIN',$info['id']);
            $info['other'] = $DB->getList($map,'post_time','20');

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

            //处理文章中所有的style标签
            $pattern ='/style\=["|\'].*?["|\']/is';
            $info['content'] =   preg_replace_callback($pattern, function(){
                    return "";
                }, $info['content']);


            //替换IMG为mip-img
            $pattern ='/<img(.*?)[\/]?>/is';
            preg_match_all($pattern,$info['content'],$matches);

            if (count($matches) > 0) {
                foreach ($matches[0] as $key => $value) {
                    $info['content'] = str_replace($value,"<mip-img".$matches[1][$key]."></mip-img>",$info['content']);
                }
            }

            //添加所有的a便签data-type='mip'属性
            $pattern ='/<a(.*?)>/is';
            preg_match_all($pattern,$info['content'],$matches);

            if (count($matches) > 0) {
                foreach ($matches[0] as $key => $value) {
                    $info['content'] = str_replace($value,"<a ".$matches[1][$key]." data-type='mip'",$info['content']);
                }
            }


            S("Cache:Mip:baike:".$id,$info,900);
        }

        $menu_url = [
            'one' => $info['one_category']['url'],
            'two' => $info['two_category'][0]['url'],
        ];
        unset($info['one_category']);
        unset($info['two_category']);

        /*E-没有获取到的情况下取公用部分*/

        /*！建议后期重构的时候不要采用正则匹配，采用PHP解析富文本DOM的方式！*/

        $content = '$#@' . $info['content'];
        $reg ='/<strong[^>]*>([\w\W]*?)<\/strong\s*>/';
        preg_match_all($reg, $content, $matches);
        $main['catalog'] = $matches[1];
        $temp = array_filter(preg_split($reg, $content));

        //如果目录数量和分割的数量一致，则说明内容的最后面有strong标签，此种情况直接采用原来形式
        if (count($main['catalog']) == count($temp)) {
            unset($main['catalog']);
        } else {
            $i = 1;
            foreach ($temp as $key => $value) {
                $value = trim($value);
                if ($i == 1) {
                    $value = trim(ltrim($value, '$#@'));
                    //说明在截取的第一个目录之上还有内容，此内容不属于任何目录，暂归为简介
                    if (!empty($value)) {
                        $main['brief'] = $value;
                    }
                } else {
                    $value = trim($value);
                    if (0 === strpos($value, '</p>')) {
                        $value = mb_substr($value, 4);
                    }
                    $last = mb_strlen($value) - 3;
                    if ($last === strpos($value, '<p>')) {
                        $value = mb_substr($value, 0, $last);
                    }
                    if (0 === strpos($value, '<br />')) {
                        $value = mb_substr($value, 6);
                    }
                    $main['content'][] = $value;
                }
                $i++;
            }
        }

        //如果目录和内容不匹配，直接采用原来样式
        if (count($main['catalog']) != count($main['content'])) {
            unset($main['catalog']);
            unset($main['content']);
        }
        //新的TDK，如果有目录，拼接新的title keywords ,description不变
        if(!empty($main['catalog'])){
            for ($i=0; $i < 4; $i++) {
                if(!empty($main['catalog'][$i])){
                    $str = htmlToText($main['catalog'][$i],0);
                    $title_str .= $str.'_';
                }
            }
            $title_str = substr($title_str,0,-1);
            $title_str = trim(strip_tags(htmlspecialchars_decode($title_str)));
            $title_str = str_replace('/\s+/',"",$title_str);
            $basic['head']['title'] = $title_str.'-齐装网';
            $basic['head']['keywords'] = $title_str;
            $basic['head']['description'] = htmlToText($info['description'],140);
        }
        if(empty($info['keywords'])){
            $info['keywords'] = $info['title'];
        }
        $basic['body']['title'] = '装修百科';
        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];

        //百度官方号需求
        $baidu['url'] = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        $baidu['optime'] = date("Y-m-d",$info['post_time'])."T".date("H:i:s",$info['post_time']);
        //获取图片
        $baidu['images'] = $this->getImgByContent($info['content']);




        //获取推荐文章
        $map['cateId'] = $info['sub_category'];
        $map['id'] = array('NOTIN',$info['id']);
        $otherBaike = $DB->getList($map,'post_time desc','3');
        foreach ($otherBaike as $k => $v) {
            if(!empty($v['description'])){
                $otherBaike[$k]['des'] = htmlToText($v['description'],60);
            }else{
                $otherBaike[$k]['des'] = htmlToText($v['content'],60);
            }
        }
        $this->assign("otherBaike", $otherBaike);

        $this->assign("countKey", count($otherBaike));


        $this->assign("baidu",$baidu);

        $this->assign("canonical", $canonical);
        $this->assign('menu_url',$menu_url);
        $this->assign('info',$info);
        $this->assign('head',$basic['head']);
        $this->display();
    }

    //获取默认百科列表
    private function getFirstBKList($condition,$pageIndex = 1,$pageCount = 10)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);
        $result = D("Common/Baike")->getFirstBKList($condition,($pageIndex-1) * $pageCount,$pageCount);
        foreach ($result['result'] as $k => $v) {
            $content = htmlToText($v['content']);
            $result['result'][$k]['content'] = $content;
        }
        $count = $result['count'];
        $list = $result['result'];
        import('Library.Org.Page.MobilePage');
        //自定义配置项
        $config  = array("prev","next");
        $page = new \MobilePage($pageIndex,$pageCount,(int)$count,$config,"html");
        $pageTmp =  $page->show3();
        return array("list"=>$list,"page"=>$pageTmp,"num"=>$count);
    }

    //获取百科分类
    private function getAllCategory(){
        $tempCategory = D("Baike")->getCategorys();
        $category = array();
        if($tempCategory){
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
        //将索引 按顺序排序
        $returnData = [];
        foreach ($category as $d){
            $returnData[] = $d;
        }
        return $returnData;
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
        return $category;
    }

    /**
     * 获取内容中的图片
     * @param $content
     * @return array
     */
    private function getImgByContent($content)
    {
        //处理文章中的图片
        $pattern = '/<img.*?\/>/is';
        preg_match_all($pattern, $content, $matches);
        $img = [];
        if(count($matches[0]) > 0){
            foreach ($matches[0] as $k => $val) {
                $pattern ='/src=[\"|\'](.*?)[\"|\']/is';
                preg_match_all($pattern,$val, $m);
                foreach ($m[1] as $j => $v) {
                    if(!strpos($v,C('QINIU_DOMAIN'))){
                        $path ="http://".C('STATIC_HOST1').$v;
                        $img[] = $path;
                    }else{
                        $img[] = $v;
                    }
                }
            }
        }
        return $img;
    }
}