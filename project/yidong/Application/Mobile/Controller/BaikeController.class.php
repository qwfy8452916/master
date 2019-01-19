<?php
/**
 * 移动版 - 百科首页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class BaikeController extends MobileBaseController{
    public function _initialize(){
        parent::_initialize();
        $uri = $_SERVER['REQUEST_URI'];
        preg_match('/html$/',$uri,$m);
        if (count($m) == 0) {
            preg_match('/\/$/',$uri,$m);
            $parse = parse_url($uri);
            if (count($m) == 0 && empty($parse["query"])) {
                header( "HTTP/1.1 301 Moved Permanently");
                header("Location: http://". C("MOBILE_DONAMES").$uri."/");
            }
        }
    }

    public function index(){
        $tmp = 'index';
        //获取默认的分类数据
        $pageIndex = 1;
        $pageCount = 10;
        if(!empty($_GET["p"])){
            $pageIndex = remove_xss($_GET["p"]);
        }
        $keyword = I('get.keyword');
        $condition = [];
        if(!empty($keyword)){
            //搜索页面
            $condition['keyword'] = $keyword;
            $tmp = 'search';
            $url_no_page = '?keyword='.$keyword;
            $this->assign("url_no_page",$url_no_page);
        }
        $result = $this->getFirstBKList($condition,$pageIndex,$pageCount);

        if (IS_AJAX) {
            $this->assign('info', $result['list']);
            $content = $this->fetch('list-content');
            echo $content;
            die();
        }
        //查询所有百科分类
        $category = S("Cache:baike:bigCategory");
        if(empty($category)){
            $category = $this->getAllCategory();
            S("Cache:baike:bigCategory",$category,3600*24);
        }
        if(empty($result['list'])){
            $tmp = 'searchno';
            //获取分类下的其它百科
            $hotlist = D('Common/Baike')->getHotList('3');
            $result['list'] = $hotlist;
        }
        //TDK
        $basic['head']['title'] = '家居百科-装修知识-齐装网';
        $basic['head']['keywords'] = '家居百科,家居装修知识';
        $basic['head']['description'] = '齐装网装修百科是一部内容开放、自由的装修百科全书，旨在创造一个涵盖所有装修领域知识、服务所有互联网用户的中文知识性装修百科全书。';
        $basic['body']['title'] = '装修百科';
        $this->assign('basic',$basic);
        $this->assign("category",$category);
        $this->assign("info",$result['list']);
        $this->assign("pageid",$pageIndex);
        $this->assign("totalpage",$result['num']);
        $this->assign("redPacket",array('source' => 316));

        $this->display($tmp);

    }

    //分类
    public function category(){
        $DB = D('Common/Baike');
        $tmp = 'index_category';
        //根据URL取分类ID
        $url = I('get.id');

        //如果分类URL不为空
        if(!empty($url)){
            $cateInfo = $DB->getCategoryByUrl($url);
            if(empty($cateInfo)){
                $this->_error();
            }
            //如果是一级分类
            if($cateInfo['pid'] == '0'){
                //取下面分类
                $subCateList = $DB->getCategoryByCid($cateInfo['cid']);
                $condition['cateId'] = $subCateList[0]['cid'];
                $this->assign('chose_bigCate',$cateInfo['url'].$cateInfo['cid']);
                $this->assign('pid',$cateInfo['pid']);
                $this->assign('chose_subCate',$subCateList[0]['url'].$subCateList[0]['cid']);
                //设置tdk
                $basic['head']['title'] = empty($cateInfo['title'])?"{$cateInfo['name']}-{$cateInfo['name']}知识大全-齐装网":$cateInfo['title'].'-齐装网';
                $basic['head']['keywords'] = empty($cateInfo['keywords'])?"{$cateInfo['name']}{$cateInfo['name']}知识，{$cateInfo['name']}知识大全":$cateInfo['keywords'];
                $basic['head']['description'] = empty($cateInfo['description'])?"齐装网{$cateInfo['name']}栏目为用户提供专业的{$cateInfo['name']}知识，专业打造整个装修行业内高端的{$cateInfo['name']}知识全书。":$cateInfo['description'];
            }else{
                $condition['cateId'] = $cateInfo['cid'];
                //查上级分类
                $fCate = $DB->getFCateByPid($cateInfo['pid']);
                $this->assign('chose_bigCate',$fCate['url'].$fCate['cid']);
                $this->assign('pid',$cateInfo['pid']);
                $this->assign('chose_subCate',$cateInfo['url'].$cateInfo['cid']);
                //设置tdk
                $basic['head']['title'] = empty($cateInfo['title'])?"{$cateInfo['name']}-{$cateInfo['name']}知识大全-齐装网":$cateInfo['title'].'-齐装网';
                $basic['head']['keywords'] = empty($cateInfo['keywords'])?"{$cateInfo['name']}，{$cateInfo['name']}知识，{$cateInfo['name']}知识大全":$cateInfo['keywords'];
                $basic['head']['description'] = empty($cateInfo['description'])?"齐装网{$cateInfo['name']}栏目为用户提供专业的{$cateInfo['name']}知识，专业打造整个装修行业内高端的{$fCate['name']}知识全书。":$cateInfo['description'];
            }
        }

        //获取默认的分类数据
        $pageIndex = 1;
        $pageCount = 8;
        if(!empty($_GET["p"])){
            $pageIndex = remove_xss($_GET["p"]);
        }
        $keyword = I('get.keyword');
        if(!empty($keyword)){
            //搜索页面
            $condition['keyword'] = $keyword;
            $tmp = 'search';
            $url_no_page = '?keyword='.$keyword;
            $this->assign("url_no_page",$url_no_page);
        }
        $result = $this->getFirstBKList($condition,$pageIndex,$pageCount);
        if (IS_AJAX) {
            $this->assign('info', $result['list']);
            $content = $this->fetch('list-content');
            echo $content;
            die();
        }
        //var_dump($result['list']);
        //查询所有百科分类
        $category = S("Cache:baike:bigCategory");
        $subCate = S("Cache:baike:subCategory");
        if(empty($category) || empty($subCate)){
            $category = $this->getAllCategory();
            foreach ($category as $k => $v) {
                $subCate[$k] = $v['sub_cate'];
            }
            S("Cache:baike:bigCategory",$category,3600*24);
            S("Cache:baike:subCategory",$subCate,3600*24);
        }

        $basic['body']['title'] = $cateInfo['name'];
        if(empty($result['list'])){
            $tmp = 'searchno';
            //获取分类下的其它百科
            $hotlist = $DB->getHotList('3');
            $result['list'] = $hotlist;
        }

        $this->assign('basic',$basic);
        $this->assign("category",$category);
        $this->assign('subCate',$subCate);
        $this->assign("info",$result['list']);
        //var_dump($result['list']);
        $this->assign("pageid",$pageIndex);
        $this->assign("totalpage",$result['num']);
        $this->assign("redPacket",array('source' => 316));

        $this->display($tmp);
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
        //取第一段关键词
        if (empty($info['description'])) {
            $desc = str_replace('<br />', '<br>', strip_tags($info['content'], '<br>'));
            $desc = array_filter(explode('<br', $desc));
            foreach ($desc as $key => $value) {
                $value = trim($value);
                if (!empty($value)) {
                    $info['descInfo'] = $value;
                    $info['description'] = $value;
                    break;
                }
            }
        }


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
        //去除七牛的水印
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
        //最新百科 取本百科一级分类，不包括本百科 数量多了可以二级分类
        $map['cateId'] = $info['cid'];
        $map['id'] = array('NOTIN',$info['id']);
        $info['other'] = $DB->getList($map,'post_time','20');

        //TDK
        $basic['head']['title'] = $info['title'];
        $basic['head']['keywords'] = $info['keywords'];
        $basic['head']['description'] = htmlToText($info['description'],140);
        $basic['body']['title'] = '装修百科';

        //新的TDK，如果有目录，拼接新的title keywords ,description不变
        $content = '$#@' . $info['content'];
        $reg ='/<strong[^>]*>([\w\W]*?)<\/strong\s*>/';
        preg_match_all($reg, $content, $matches);

        if(empty($matches[1])){
            $reg ='/<b[^>]*>(.*?)<\/b\s*>/';
            preg_match_all($reg, $content, $matches);
        }
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
                    $main['content'][] = ltrim($value);
                }
                $i++;
            }
        }
        //如果目录和内容不匹配，直接采用原来样式
        if (count($main['catalog']) != count($main['content'])) {
            unset($main['catalog']);
            unset($main['content']);
        }
        $title_str = '';

        if(!empty($main['catalog'])){
            for ($i=0; $i < 4; $i++) {
                if(!empty($main['catalog'][$i])){
                    $str = htmlToText(strip_tags($main['catalog'][$i]),0);
                    $title_str .= $str.'_';
                }
            }
            $title_str = substr($title_str,0,-1);
            $title_str = trim(strip_tags(htmlspecialchars_decode($title_str)));
            $title_str = str_replace('/\s+/',"",$title_str);

            $basic['head']['title']  = $title_str.'-齐装网';
            $basic['head']['keywords']  = $title_str;
        }

        if(empty($info['keywords'])){
            $basic['head']['keywords']  = $basic['head']['title'];
        }
        //add-myx-end

        //百度官方号需求
        $baidu['url'] = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        $baidu['str'] = mb_substr(strip_tags($info['description']), 0, 100, 'utf-8');
        $baidu['optime'] = date("Y-m-d",$info['post_time'])."T".date("H:i:s",$info['post_time']);

        //获取图片
        $baidu['images'] = $this->getImgByContent($info['content']);
        $this->assign("baidu",$baidu);

        $basic['head']['title']  = preg_replace('# #','',$basic['head']['title'] );
        $basic['head']['keywords'] =  str_replace('_','，',$basic['head']['keywords'] );
        $basic['head']['keywords'] = str_replace('、','，',$basic['head']['keywords']);

        //seo需求 将有目录结构的文章中，目录所属的图片元素的title alt属性替换成目录名
		//富文本有设置title alt 属性功能，建议将此工作对接给编辑部门
		$info['content'] = $this->_seoContent($info['title'],$info['content']);
        $this->assign('info',$info);
        $this->assign("countKey", count($otherBaike));
        $this->assign('basic',$basic);
        $this->display("show_m289");
    }


	/**
	 * 将有目录结构的文章中，目录所属的图片元素的title alt属性替换成目录名
	 * author: mcj
	 * @param $title
	 * @param $content
	 * @return mixed
	 */
    private function _seoContent($title,$content){
		$reg ='/<strong[^>]*>([\w\W]*?)<\/strong\s*>/';
		preg_match_all($reg, $content, $matches);
		$sub_titles = $matches[1];
		//有目录，按目录分批处理，没有目录则全部处理
		if(empty($sub_titles)){
			$items = [$content];
		}else{
			$items = array_filter(preg_split($reg, $content));
		}
		foreach ($items as  $key=>$value){
			$current_title = $title;
			if(isset($sub_titles[$key-1])){
				$current_title = $sub_titles[$key-1];
			}
			$pattern = '/<img([\w\W]*?)\/>/';
			preg_match_all($pattern, $value, $img_matches);
			$img_doms = $img_matches[0];
			if(empty($img_doms)){
				continue;
			}
			foreach ($img_doms as $vv){
				$search_array[] =  $vv;
				//去取原本img的title
				$img_item = preg_replace('/title=".*?"/','',$vv);
				//去取原本img的alt
				$img_item = preg_replace('/alt=".*?"/','',$img_item);
				$replace_str = ' title="'.$current_title.'" alt="'.$current_title.'"';
				$replace_array[] = substr_replace($img_item,$replace_str,4,0);
			}
		}
		if(isset($search_array) && isset($replace_array)){
			//SEO目录名字由strong替换成h2
			$content1 = str_replace('strong','h2',$content);
			return str_replace($search_array,$replace_array,$content1);
		}
		return $content;
	}

    //取列表
    private function getList($condition,$pageIndex = 1,$pageCount = 10)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $pageIndex = intval($pageIndex)<=0?1:intval($pageIndex);
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

    //静态首页
    public function indexdev()
    {
        $this->display();
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
        return $category;
    }

    //获取默认百科列表
    private function getFirstBKList($condition,$pageIndex = 1,$pageCount = 10)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $pageIndex = intval($pageIndex)<=0?1:intval($pageIndex);
        import('Library.Org.Page.Page');
        $result = D("Common/Baike")->getFirstBKList($condition,($pageIndex-1) * $pageCount,$pageCount);
        foreach ($result['result'] as $k => $v) {
            //$content = strip_tags($v['content']);
            //$pattern = '/\s/';//去除空白
            //$content = preg_replace($pattern, '', $content);
            $content = htmlToText($v['content']);
            $result['result'][$k]['content'] = $content;
        }
        $count = $result['count'];
        $list = $result['result'];
        $config  = array("prev","first","last","next");
        $page = new \Page($pageIndex,$pageCount,$count,$config);
        $pageTmp =  $page->show();
        return array("list"=>$list,"page"=>$pageTmp,"num"=>$count);
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