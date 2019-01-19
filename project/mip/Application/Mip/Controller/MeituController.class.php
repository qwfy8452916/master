<?php
namespace Mip\Controller;
use Mip\Common\Controller\MipBaseController;

class MeituController extends MipBaseController
{
    public function _initialize(){
        parent::_initialize();
        if (IS_GET) {
            $uri = $_SERVER['REQUEST_URI'];
            preg_match('/html$/', $uri, $m);
            if (count($m) == 0) {
                preg_match('/\/$/', $uri, $m);
                $parse = parse_url($uri);
                if (count($m) == 0 && empty($parse["query"])) {
                    header("HTTP/1.1 301 Moved Permanently");
                    if (isSsl()) {
                        $http = "https://";
                    } else {
                        $http = "http://";
                    }
                    header("Location: " . $http . $_SERVER["HTTP_HOST"] . $uri . "/");
                    die();
                }
            }
        }
    }

    public function index()
    {
        $info = S("Cache:M:Meitu:Home");
        if(!$info){
            //获取局部信息
            $info["location"] = $this->getLocation(20,true);
            //获取风格
            $info["fengge"] = $this->getFengge(20,true);
            //获取户型
            $info["huxing"] = $this->getHuxing(20,true);
            //获取颜色信息
            $info["color"] = $this->getColor(20,true);
            //获取潮流设计
            $info["clsj"] = $this->getMeituListByPart("cl",3);
            //获取轮播信息
            $info["lunbo"] = D("Meitu")->getLunbo();
            S("Cache:M:Meitu:Home",$info,900);
        }

        $Db = D("Meitu");
        $info['locationImg'] = $Db->getMeituListByType('location','20');
        $info['fenggeImg'] = $Db->getMeituListByType('fengge','20');
        $info['huxingImg'] = $Db->getMeituListByType('huxing','20');
        $info['colorImg'] = $Db->getMeituListByType('color','20');

        //seo 标题/描述/关键字
        $basic["head"]["title"] = "装修效果图_".date("Y")."室内家装装饰设计效果图大全-齐装网装修效果图";
        $basic["head"]["keywords"] = "装修效果图,装饰效果图,家装效果图,室内装修效果图大全,室内装修效果图,家装效果图大全";
        $basic["head"]["description"] = "齐装网汇聚".date("Y")."国内外受欢迎的家庭装修效果图片，为您提供全新室内装修装饰效果图大全以及丰富的家居设计美图，不一样的装修图片为您带来不一样的房屋装修灵感。找装修美图就上齐装网！";
        $basic["body"]['title'] = "效果图";

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $info['canonical'] = $_SERVER['REQUEST_URI'];

        $lunboCount = count($info['lunbo']);

        //轮播图跳转mip或移动端
        foreach($info['lunbo'] as $key => $value){
            $value['link'] = str_replace("meitu.qizuang.com", "mip.qizuang.com/meitu", $value['link'].'/');
            $info['lunbo'][$key] = $value;
            //修改特定url
            if($key == 2){
                $info['lunbo'][$key]['link'] = 'http://m.qizuang.com/baojia/';
            }
            if($key == 3){
                $info['lunbo'][$key]['link'] = 'http://m.qizuang.com/zhaobiao/';
            }
        }

        //报价发单页面添加src标识
        foreach($info['lunbo'] as $key => $value){
            if(strpos($value['link'], "m.qizuang.com")){
                $value['link'] = rtrim($value['link'], '/');
                $info['lunbo'][$key]['link'] = $value['link'] . "?src=mip";
            }
        }

        $this->assign("lunboCount", $lunboCount);
        $this->assign("head", $basic['head']);
        $this->assign('source',320);//设置发单入口标识
        $this->assign("info",$info);
        $this->assign("basic",$basic);
        $this->display();
    }



    public function meitulist()
    {
        /*S-动态参数分页跳转到静态参数分页*/
        if (isset($_GET['a1'])) {
            $arr = array(
                'l' => 'a1',
                'f' => 'a2',
                'h' => 'a3',
                'c' => 'a4'
            );
            //拼接静态URL
            $url = 'http://mip.'.C('QZ_YUMING').'/meitu/list-';
            foreach ($arr as $key => $value) {
                $url = $url . $key . intval($_GET[$value]);
            }
            if (isset($_GET['q'])) {
                $url = $url . 'q' . intval($_GET['q']);
            } else if (intval($_GET['p']) > 1) {
                $url = $url . 'p' . intval($_GET['p']);
            }
            $url = $url . '?';
            foreach ($_GET as $key => $value) {
                if (!in_array($key, array('a1', 'a2', 'a3', 'a4', 'p', 'q'))) {
                    $url = $url . $key . '=' . $_GET[$key] . '&';
                }
            }
            $url = rtrim($url, '&');
            $url = rtrim($url, '?');
            header( "HTTP/1.1 301 Moved Permanently" );
            header( "Location:".$url);
            die();
        }
        /*E-动态参数分页跳转到静态参数分页*/


        //list路由分页
        $matchArr = [];
        $match = '/^\/meitu\/list-l(\d+)f(\d+)h(\d+)c(\d+)p(\d+)$/';
        preg_match($match, rtrim($_SERVER['REQUEST_URI'],'/'), $matchArr);
        //获取美图列表分页数据
        $pageIndex = empty($matchArr[5]) == true ? 1 : $matchArr[5];
        $pageCount = 8;
        $keyword = I('get.keyword');
        unset($_GET["keyword"]);
        $meitu = $this->getMeiTuList($pageIndex,$pageCount,$keyword);

        $info["meitu"] = $meitu["list"];
        $info["page"] = $meitu["page"];

        //判断是否为 ajax 请求
        if(IS_AJAX){
            $this->assign('info', $info);
            $content = $this->fetch('list-content');
            echo $content;
            die();
        }

        //没有获取到相应参数跳转404

        $items = $meitu["count"];
        $totalpage = ceil($items/$pageCount);
        foreach ($meitu["params"] as $key => $value) {
            if($value > 0){
                $count ++;
                $params[]= $key;
            }
        }
        $params_count = count($params);
        //如果是1个参数
        if(count($params) == 1){
            $type = $params[0];
        }

        //获取推荐局部信息
        $location = D("Meitu")->getLocation();
        $info["wz"] = $this->getStaticNavUrl($location, 'l', $meitu['url']);
        //获取风格
        $fengge = D("Meitu")->getFengge();
        $info["fg"] = $this->getStaticNavUrl($fengge, 'f', $meitu['url']);
        //获取户型
        $huxing = D("Meitu")->getHuxing();
        $info["hx"] = $this->getStaticNavUrl($huxing, 'h', $meitu['url']);
        //获取颜色信息
        $color = D("Meitu")->getColor();
        $info["ys"] = $this->getStaticNavUrl($color, 'c', $meitu['url']);
        foreach ($info["ys"] as $key => $value) {
            $color_class = str_replace('#','',$value['color']);;
            if ($value['color'] == '#FFF') {
                $info["ys"][$key]['style'] = 'color_fff';
            } else if (empty($value['color'])){
                $info["ys"][$key]['style'] = 'color_ful';
            } else {
                $info["ys"][$key]['style'] = 'color_'.$color_class;
            }
        }

        //动态生成绑定参数
        foreach ($meitu["params"] as $key => $value) {
            switch ($key) {
                case 'location':
                    $sub = $this->getParams($key,$value,$count,$meitu["url"],$info["wz"]);
                    break;
                case 'fengge':
                    $sub = $this->getParams($key,$value,$count,$meitu["url"],$info["fg"]);
                    break;
                case 'huxing':
                    $sub = $this->getParams($key,$value,$count,$meitu["url"],$info["hx"]);
                    break;
                case 'color':
                    $sub = $this->getParams($key,$value,$count,$meitu["url"],$info["ys"]);
                    break;
            }
            $info["params"][] = $sub;
            $info["navParams"][$key] = $value;
        }

        //seo 标题/描述/关键字
        $content ="";
        $i = 0;
        $only = '';
        foreach ($info["params"] as $key => $value) {
            if(!empty($value["name"])){
                $i++;
                $only =  $value["name"];
                $content .= $value["name"];
            }
        }

        $s_type = array_filter($info['navParams']);
        if($i == 1 && count($s_type) == 1){
            foreach ($s_type as $key => $value) {
                $s_type = $key['0'];
            }
            $tdk = D('Meitu')->getMeituListDescription($only,$s_type);
            if(!empty($tdk['title'])){
                $basic["head"]["title"] = $tdk['title'];
            }else{
                $basic["head"]["title"] = $only . '装修效果图_'. $only .'设计_'. $only .'图片 - 齐装网装修效果图';
            }
            if(!empty($tdk['keywords'])){
                $basic["head"]["keywords"] = $tdk['keywords'];
            }else{
                $basic["head"]["keywords"] = $only . '装修效果图，'. $only .'设计效果图，'. $only .'图片';
            }
            if(!empty($tdk['description'])){
                $basic["head"]["description"] = $tdk['description'];
            }else{
                $basic["head"]["description"] = "齐装网汇聚".date("Y").$content."家庭室内装修装饰风格效果图大全，为您提供".date("Y").$content."效果图大全以及最丰富的家居设计美图。找".$content."美图就上齐装网！";
            }
        }else{
            $basic["head"]["keywords"] = $content."装修效果图,".$content."装修效果图大全,".$content."家庭装修效果图,".$content."室内装修效果图,".$content."装饰效果图,";
            $basic["head"]["description"] = "齐装网汇聚".date("Y").$content."家庭室内装修装饰风格效果图大全，为您提供2015全新".$content."效果图大全以及最丰富的家居设计美图。找".$content."美图就上齐装网！";
            $basic["head"]["title"] = date("Y").$content."家庭室内装修装饰风格美图大全-齐装网装修效果图";
        }

        if(!empty($keyword)){
            $this->assign("keyword",$keyword);
            $basic["head"]["title"] = date("Y").' '.$keyword." 相关装修美图大全-齐装网装修效果图";
        }

        $basic["body"]["title"] = '家装美图';

        $info["params"] = array_filter($info["params"]);
        $info['pageid'] = empty($info['navParams']['p']) ? $pageIndex : $info['navParams']['p'];

        //不限按钮链接
        $selectLocation = isset($info['navParams']['location'])?$info['navParams']['location']:0;
        $selectFengge = isset($info['navParams']['fengge'])?$info['navParams']['fengge']:0;
        $selectHuxing = isset($info['navParams']['huxing'])?$info['navParams']['huxing']:0;
        $selectColor = isset($info['navParams']['color'])?$info['navParams']['color']:0;
        $info['select']['location'] = '/meitu/list-l0f'.$selectFengge.'h'.$selectHuxing.'c'.$selectColor.'/';
        $info['select']['fengge'] = '/meitu/list-l'.$selectLocation.'f0h'.$selectHuxing.'c'.$selectColor.'/';
        $info['select']['huxing'] = '/meitu/list-l'.$selectLocation.'f'.$selectFengge.'h0c'.$selectColor.'/';
        $info['select']['color'] = '/meitu/list-l'.$selectLocation.'f'.$selectFengge.'h'.$selectHuxing.'c0/';
        //处理当前选中项
        if(!empty($meitu["params"]['location'])){
            foreach ($info["wz"] as $key => $value) {
                if($meitu["params"]['location'] == $value['id']){
                    $info['nav']['wz'] = $value['name'];
                }
            }
        }
        //风格
        if(!empty($meitu["params"]['fengge'])){
            foreach ($info["fg"] as $key => $value) {
                if($meitu["params"]['fengge'] == $value['id']){
                    $info['nav']['fg'] = $value['name'];
                }
            }
        }
        //户型
        if(!empty($meitu["params"]['huxing'])){
            foreach ($info["hx"] as $key => $value) {
                if($meitu["params"]['huxing'] == $value['id']){
                    $info['nav']['hx'] = $value['name'];
                }
            }
        }
        //颜色
        if(!empty($meitu["params"]['color'])){
            foreach ($info["ys"] as $key => $value) {
                if($meitu["params"]['color'] == $value['id']){
                    $info['nav']['ys'] = $value['name'];
                }
            }
        }
        //canonical标签
        $url = is_ssl()?'https://':'http://'.$_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
        $parse_url = parse_url($url);
        $canonical = $parse_url['path'];

        $this->assign("canonical", $canonical);
        $this->assign("head", $basic['head']);
        $this->assign('source',320);//设置发单入口标识
        $this->assign('totalpage',$totalpage);
        $this->assign("info",$info);
        $this->assign("basic",$basic);
        $this->assign("keyword", $keyword);
        $this->assign("redPacket",array('source' => 315));
        $this->display();
    }

    /**
     * 美图详情页面
     */
    public function meitudetails(){
        $p = I("get.p");
        $info = S("Cache:M:Meitu:Show:".$p);
        if(!$info){
            //查询美图案例信息
            $meitu = $this->getMeituInfo($p);
            if(empty($meitu["now"])){
                $this->_error();
            }
            $info = $meitu;
            S("Cache:M:Meitu:Show:".$p,$info,3600);
        }

        //seo 标题/描述/关键字
        $basic["head"]["title"] = $info["now"]["title"]."-齐装网装修效果图";
        $basic["head"]["keywords"] = $info["now"]["keyword"];
        $basic["head"]["description"] = $info["now"]["description"];
        $basic["body"]["title"] = '装修美图';

        //分配上一图集，下一图集的url
        $url = [];
        $url['prev'] = "http://" . C("MIP_DONAMES") . "/meitu/p" . $info['prv']['id'] . ".html";
        $url['next'] = "http://" . C("MIP_DONAMES") . "/meitu/p" . $info['next']['id'] . ".html";

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];
        //熊掌号
        $baidu['optime'] = date("Y-m-d",$info['now']['time'])."T".date("H:i:s",$info['now']['time']);
        $this->assign('baidu',$baidu);

        $this->assign("canonical", $canonical);
        $this->assign("count", $info['now']['count']);//分配当前共有几张图片
        $this->assign('url', $url);
        $this->assign('head', $basic['head']);
        $this->assign("info",$info);
        $this->assign('basic',$basic);
        $this->display('meitudetails');
    }


    private function getLocation($limit,$isTop,$type,$params_count,$url){
        $result = D("Meitu")->getLocation($limit,$isTop);
        foreach ($result as $key => $value) {
            if(empty($type) && $params_count == 0){
                $link ="/meitu/list-l".$value["id"]."f0h0c0";
                $result[$key]["nofollow"] = 'follow';
            }elseif(!empty($type) && $params_count == 1){
                if($type == "location"){
                    //替换当前的参数
                    $reg = '/l\d+/i';
                    $link =preg_replace($reg, "l".$value["id"],$url["short_url"]);
                    $result[$key]["nofollow"] = 'follow';
                }else{
                    //替换当前的参数
                    $reg = '/a1=\d+/i';
                    preg_match($reg,  $url["url"],$m);
                    $link = preg_replace($reg, "a1=".$value["id"],$url["url"]);
                }
            }else{
                //替换当前的参数
                $reg = '/a1=\d+/i';
                $link = preg_replace($reg, "a1=".$value["id"],$url["url"]);
            }
            $result[$key]["link"] = $link;
        }
        return $result;
    }


    private function getFengge($limit,$isTop,$type,$params_count,$url){
        $result = D("Meitu")->getFengge($limit,$isTop);
        foreach ($result as $key => $value) {
            if(empty($type) && $params_count == 0){
                $link ="/meitu/list-l0f".$value["id"]."h0c0";
                $result[$key]["nofollow"] = 'follow';
            }elseif(!empty($type) && $params_count == 1){
                if($type == "fengge"){
                    //替换当前的参数
                    $reg = '/f\d+/i';
                    $link =preg_replace($reg, "f".$value["id"],$url["short_url"]);
                    $result[$key]["nofollow"] = 'follow';
                }else{
                    //替换当前的参数
                    $reg = '/a2=\d+/i';
                    preg_match($reg,  $url["url"],$m);
                    $link = preg_replace($reg, "a2=".$value["id"],$url["url"]);
                }
            }else{
                //替换当前的参数
                $reg = '/a2=\d+/i';
                $link = preg_replace($reg, "a2=".$value["id"],$url["url"]);
            }
            $result[$key]["link"] = $link;
        }
        return $result;
    }



    private function getHuxing($limit,$isTop,$type,$params_count,$url){
        $result = D("Meitu")->getHuxing($limit,$isTop);
        foreach ($result as $key => $value) {
            if(empty($type) && $params_count == 0){
                $link ="/meitu/list-l0f0h".$value["id"]."c0";
                $result[$key]["nofollow"] = 'follow';
            }elseif(!empty($type) && $params_count == 1){
                if($type == "huxing"){
                    //替换当前的参数
                    $reg = '/h\d+/i';
                    $link =preg_replace($reg, "h".$value["id"],$url["short_url"]);
                    $result[$key]["nofollow"] = 'follow';
                }else{
                    //替换当前的参数
                    $reg = '/a3=\d+/i';
                    preg_match($reg,  $url["url"],$m);
                    $link = preg_replace($reg, "a3=".$value["id"],$url["url"]);
                }
            }else{
                //替换当前的参数
                $reg = '/a3=\d+/i';
                $link = preg_replace($reg, "a3=".$value["id"],$url["url"]);
            }
            $result[$key]["link"] = $link;
        }
        return $result;
    }


    private function getColor($limit,$isTop,$type,$params_count,$url){
        $result = D("Meitu")->getColor($limit,$isTop);
        foreach ($result as $key => $value) {
            if(empty($type) && $params_count == 0){
                $link ="/meitu/list-l0f0h0c".$value["id"];
                $result[$key]["nofollow"] = 'follow';
            }elseif(!empty($type) && $params_count == 1){
                if($type == "color"){
                    //替换当前的参数
                    $reg = '/c\d+/i';
                    $link =preg_replace($reg, "c".$value["id"],$url["short_url"]);
                    $result[$key]["nofollow"] = 'follow';
                }else{
                    //替换当前的参数
                    $reg = '/a4=\d+/i';
                    preg_match($reg,  $url["url"],$m);
                    $link = preg_replace($reg, "a4=".$value["id"],$url["url"]);
                }
            }else{
                //替换当前的参数
                $reg = '/a4=\d+/i';
                $link = preg_replace($reg, "a4=".$value["id"],$url["url"]);
            }
            $result[$key]["link"] = $link;
        }
        return $result;
    }

    /**
     * 获取家装美图带分页列表
     * @param $pageIndex
     * @param $pageCount
     * @param $keyword
     * @return array
     */
    private function getMeiTuList($pageIndex,$pageCount,$keyword){
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        import('Library.Org.Page.Page');
        //自定义配置项
        $config  = array("prev","next");
        $page = new \Page($pageIndex,$pageCount,0,$config);
        //解析参数
        $params= $page->analyticalAddress();

        //过滤无效分类参数
        $url = str_replace('/meitu/list-','',parse_url($_SERVER["REQUEST_URI"])['path']);
        preg_match_all('/[a-z]+/', $url, $matches);
        $str = array('l','f','h','c','p','a');
        if ($url != '/meitu/list/'){
            foreach ($matches['0'] as $key => $value) {
                if(!in_array($value,$str)){
                    $this->_error();
                }
            }
            //过滤无效分类值
            if(!empty($params['params']['location'])){
                $location = D("Meitu")->getLocation();
                foreach ($location as $key => $value) {
                    $locationIds[$value['id']] = $value['name'];
                }
            }
            if(!empty($params['params']['fengge'])){
                $fengge = D("Meitu")->getFengge();
                foreach ($fengge as $key => $value) {
                    $fenggeIds[$value['id']] = $value['name'];
                }
            }
            if(!empty($params['params']['huxing'])){
                $huxing = D("Meitu")->getHuxing();
                foreach ($huxing as $key => $value) {
                    $huxingIds[$value['id']] = $value['name'];
                }
            }
            if(!empty($params['params']['color'])){
                $color = D("Meitu")->getColor();
                foreach ($color as $key => $value) {
                    $colorIds[$value['id']] = $value['name'];
                }
            }
        }

        //MIP分页
        $count = D("Meitu")->getMeiTuListCount($params["params"]["location"],$params["params"]["fengge"],$params["params"]["huxing"],$params["params"]["color"],$keyword,0);
        if($count > 0){
            //重新实例化page对象，调用mip分页方法
            $page = new \Page($pageIndex, $pageCount, (int)$count, $config, 'html');
            $pageMipTmp = $page->showMeituNew();
            $list = D("Meitu")->getMeiTuList(($page->pageIndex-1)*$pageCount,$pageCount,$params["params"]["location"],$params["params"]["fengge"],$params["params"]["huxing"],$params["params"]["color"],$keyword,0);
            foreach ($list as $key => $value) {
                //取每个分类的第一个元素
                $exp =array_filter(explode(",", $value["wz"]));
                $list[$key]["wz"] = $exp[0];

                $exp =array_filter(explode(",", $value["fg"]));
                $list[$key]["fg"] = $exp[0];

                $exp =array_filter(explode(",", $value["hx"]));
                $list[$key]["hx"] = $exp[0];

                $exp =array_filter(explode(",", $value["ys"]));
                $list[$key]["ys"] = $exp[0];
            }
            return array("list"=>$list,"page"=>$pageMipTmp,"params"=>$params["params"],"url"=>$params["url"],'count'=>$count);
        }
        return array("list"=>[],"page"=>'',"params"=>[],"url"=>[],'count'=>0);
    }


    private function getMeituListByPart($type,$limit){
        $imgs = D("Meitu")->getMeituListByPart($type,$limit);
        foreach ($imgs as $key => $value) {
            //取每个分类的第一个元素
            $exp =array_filter(explode(",", $value["wz"]));
            $imgs[$key]["wz"] = $exp[0];

            $exp =array_filter(explode(",", $value["fg"]));
            $imgs[$key]["fg"] = $exp[0];

            $exp =array_filter(explode(",", $value["hx"]));
            $imgs[$key]["hx"] = $exp[0];

            $exp =array_filter(explode(",", $value["ys"]));
            $imgs[$key]["ys"] = $exp[0];
        }
        return $imgs;
    }



    /**
     * 获取筛选项导航链接
     * @param  array  $datas 参数数组
     * @param  string $type  短参数
     * @param  array  $urls  url地址
     */
    public function getStaticNavUrl($datas = array(), $type = '', $urls = array())
    {
        if ('meitu/list' == trim($urls['short_url'], '/')) {
            $urls['short_url'] = '/meitu/list-l0f0h0c0';
        }
        //参数替换
        $pattern = '/'.$type.'\d+/i';
        foreach ($datas as $key => $value) {
            $datas[$key]["link"] = preg_replace($pattern, $type.$value["id"],$urls['short_url']);
            $datas[$key]["nofollow"] = 'follow';
        }
        return $datas;
    }



    /**
     * 获取导航链接
     * @param  array  $datas 参数数组
     * @param  string $type  短参数
     * @param  array  $urls  url地址
     */
    public function getGZStaticNavUrl($datas = array(), $type = '', $urls = array())
    {
        if ('meitu/gongzhuang' == trim($urls['short_url'], '/')) {
            $urls['short_url'] = '/meitu/gongzhuang-l0f0m0';
        }
        //参数替换
        $pattern = '/'.$type.'\d+/i';
        foreach ($datas as $key => $value) {
            $datas[$key]["link"] = preg_replace($pattern, $type.$value["id"],$urls['short_url']);
            $datas[$key]["nofollow"] = 'follow';
        }
        return $datas;
    }


    private function getParams($type,$value,$count,$url,$data){
        foreach ($data as $k => $val) {
            if($value == $val["id"]){
                $sub = array(
                    "name" =>$val["name"]
                );
                if($count == 1){
                    $sub["link"] = "/meitu/list";
                }else{
                    switch ($type) {
                        case 'location':
                            //替换当前的参数
                            $reg = '/a1=\d+/i';
                            preg_match($reg,  $url["url"],$m);
                            $link = preg_replace($reg, "a1=0",$url["url"]);
                            break;
                        case 'fengge':
                            //替换当前的参数
                            $reg = '/a2=\d+/i';
                            preg_match($reg,  $url["url"],$m);
                            $link = preg_replace($reg, "a2=0",$url["url"]);
                            break;
                        case 'huxing':
                            //替换当前的参数
                            $reg = '/a3=\d+/i';
                            preg_match($reg,  $url["url"],$m);
                            $link = preg_replace($reg, "a3=0",$url["url"]);
                            break;
                        case 'color':
                            //替换当前的参数
                            $reg = '/a4=\d+/i';
                            preg_match($reg,  $url["url"],$m);
                            $link = preg_replace($reg, "a4=0",$url["url"]);
                            break;
                    }
                    $sub["link"] = $link;
                }
                break;
            }
        }
        return $sub;
    }



    private function getMeituInfo($id){
        $meitu = D("Meitu")->getMeituInfo($id);
        foreach ($meitu as $key => $value) {
            if(!array_key_exists($value["action"], $meitu)){
                $meitu[$value["action"]] = $value;
            }
            $meitu[$value["action"]]["child"][] = $value;
            $meitu[$value["action"]]["count"] ++;
            unset($meitu[$key]);
        }
        return $meitu;
    }


}