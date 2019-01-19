<?php
/**
 * 移动版 - 美图
 */
namespace Mip\Controller;
use Mip\Common\Controller\MipBaseController;
class PubmeituController extends MipBaseController{

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
    //美图列表
    public function pubMeituList()
    {

        //url处理
        if(substr($_SERVER['REQUEST_URI'], -3) == 'p=1'){
            $url = 'http://mip.'.C('QZ_YUMING'). explode('?', $_SERVER['REQUEST_URI'])[0];
            header( "HTTP/1.1 301 Moved Permanently" );
            header( "Location:".$url);
        }
        if(substr($_SERVER['REQUEST_URI'], -1, 1) == '-'){
            $url = 'http://mip.'.C('QZ_YUMING'). $_SERVER['REQUEST_URI'];
            $url = rtrim($url, '-');
            header( "HTTP/1.1 301 Moved Permanently" );
            header( "Location:".$url);
        }

        /*S-动态参数分页跳转到静态参数分页*/
        if (isset($_GET['a1'])) {
            $arr = array(
                'l' => 'a1',
                'f' => 'a2',
                'm' => 'a3'
            );
            //拼接静态URL
            $url = 'http://mip.'.C('QZ_YUMING').'/meitu/gongzhuang-';
            foreach ($arr as $key => $value) {
                $url = $url . $key . intval($_GET[$value]);
            }
            if (intval($_GET['p']) > 1) {
                $url = $url . 'p' . intval($_GET['p']);
            }
            $url = $url . '?';
            foreach ($_GET as $key => $value) {
                if (!in_array($key, array('a1', 'a2', 'a3', 'p', 'q'))) {
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

        //gongzhuang路由分页
        $matchArr = [];
        $v_pos = strpos($_SERVER['REQUEST_URI'], v);
        $new_url = $_SERVER['REQUEST_URI'];

        if($v_pos){
            $new_url = substr($_SERVER['REQUEST_URI'], 0, $v_pos-1);
        }

        $matchArr = [];
        $match = '/^\/meitu\/gongzhuang-l(\d+)f(\d+)m(\d+)p(\d+)$/';
        preg_match($match, rtrim($new_url,'/'), $matchArr);

        $pageIndex = empty($matchArr[4]) == true ? 1 : $matchArr[4];
        $pageCount = 40;
        $keyword = I('get.keyword');
        unset($_GET["keyword"]);
        $meitu = $this->getMeiTuList($pageIndex, $pageCount, $keyword);
        $info["meitu"] = $meitu["list"];
        $info["count"] = $meitu["count"];
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
        $result = D("Pubmeitu")->getPubMeituAttr('1',$limit,$isTop);
        $info["wz"] = $this->getStaticNavUrl($result, 'l', $meitu["url"]);
        //获取风格
        $result = D("Pubmeitu")->getPubMeituAttr('2',$limit,$isTop);
        $info["fg"] = $this->getStaticNavUrl($result, 'f', $meitu["url"]);
        //获取户型
        $result = D("Pubmeitu")->getPubMeituAttr('3',$limit,$isTop);
        $info["mj"] = $this->getStaticNavUrl($result, 'm', $meitu["url"]);

        //动态生成绑定参数
        foreach ($meitu["params"] as $key => $value) {
            switch ($key) {
                case 'location':
                    $sub = $this->getParams($key,$value,$count,$meitu["url"],$info["wz"]);
                    break;
                case 'fengge':
                    $sub = $this->getParams($key,$value,$count,$meitu["url"],$info["fg"]);
                    break;
                case 'mianji':
                    $sub = $this->getParams($key,$value,$count,$meitu["url"],$info["mj"]);
                    break;
            }
            $info["params"][$key] = $sub;
            $info["navParams"][$key] = $value;
        }
        
        //seo 标题/描述/关键字
        $mianji = isset($info['params']['mianji']['name'])?$info['params']['mianji']['name']:'';
        $fengge = isset($info['params']['fengge']['name'])?$info['params']['fengge']['name']:'';
        $location = isset($info['params']['location']['name'])?$info['params']['location']['name']:'';
        $all_condition_name = $mianji . $fengge .$location;

        $basic["head"]["title"] = $all_condition_name . '公装装修效果图_' . $all_condition_name . '工装装修效果图_'.$all_condition_name.'公装图片-齐装网装修效果图';
        $basic["head"]["keywords"] = $all_condition_name . '公装装修效果图,' . $all_condition_name . '工装装修图片,' . $all_condition_name . '公装图片';
        $basic["head"]["description"] = '齐装网' . $all_condition_name . '公装装修效果图专区，提供国内外全新流行的' . $all_condition_name . '公装设计效果图，更多' . $all_condition_name . '公装图片尽在齐装网装修效果图频道';

        $info["params"] = array_filter($info["params"]);

        //不限按钮链接
        $info['select']['location'] = '/meitu/gongzhuang-l0f'.$info['navParams']['fengge'].'m'.$info['navParams']['mianji'].'/';
        $info['select']['fengge'] = '/meitu/gongzhuang-l'.$info['navParams']['location'].'f0m'.$info['navParams']['mianji'].'/';
        $info['select']['mianji'] = '/meitu/gongzhuang-l'.$info['navParams']['location'].'f'.$info['navParams']['fengge'].'m0/';

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
        if(!empty($meitu["params"]['mianji'])){
            foreach ($info["mj"] as $key => $value) {
                if($meitu["params"]['mianji'] == $value['id']){
                    $info['nav']['mj'] = $value['name'];
                }
            }
        }

        /*由于此处没有分页，该属性可以简单如下这样处理，生成canonical标签属性值*/
        //canonical标签
        $url = is_ssl()?'https://':'http://'.$_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
        $parse_url = parse_url($url);
        $canonical = $parse_url['path'];

        $this->assign("canonical", $canonical);

        //数据分成两个数组，方便瀑布流显示数据
        foreach($info['meitu'] as $key => $value){
            if($key % 2 == 1){
                $info['meitu']['two'][] = $value;
            }else{
                $info['meitu']['one'][] = $value;
            }
        }

        $this->assign("head", $basic['head']);
        $this->assign('page', $meitu['page']);
        $this->assign("info",$info);
        $this->assign("basic",$basic);
        $this->display("gongzhuang");
    }

    /**
     * 获取导航链接
     * @param  array  $datas 参数数组
     * @param  string $type  短参数
     * @param  array  $urls  url地址
     */
    public function getStaticNavUrl($datas = array(), $type = '', $urls = array())
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


    //美图详情页
    public function show(){
        $id = I("get.id");
        $info = S("Cache:M:PubMeitu:Show:".$id);
        if(!$info){
            //查询美图案例信息
            $meitu = $this->getMeituInfo($id);
            if(empty($meitu["now"])){
                $this->_error();
            }
            $info = $meitu;
            S("Cache:M:PubMeitu:Show:".$id,$info,3600);
        }

        //seo 标题/描述/关键字
        $basic["head"]["title"] = $info["now"]["title"]."-齐装网装修效果图";
        $basic["head"]["keywords"] = $info["now"]["keyword"];
        $basic["head"]["description"] = $info["now"]["description"];
        $basic["body"]["title"] = '装修美图';

        //分配上一图集，下一图集的url
        $url = [];
        $url['prev'] = "http://" . C("MIP_DONAMES") . "/meitu/g" . $info['prv']['id'] . ".html";
        $url['next'] = "http://" . C("MIP_DONAMES") . "/meitu/g" . $info['next']['id'] . ".html";

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];


        $this->assign("canonical", $canonical);
        $this->assign('count', $info['now']['count']);//分配当前图片共有几张
        $this->assign('url', $url);
        $this->assign("head", $basic['head']);
        $this->assign("info",$info);
        $this->assign('basic',$basic);
        $this->display('show');
    }

    private function getMeituInfo($id){
        $meitu = D("Pubmeitu")->getPubMeituInfo($id);
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



    private function getParams($type,$value,$count,$url,$data){
        foreach ($data as $k => $val) {
            if($value == $val["id"]){
                $sub = array(
                        "name" =>$val["name"]
                             );
                if($count == 1){
                    $sub["link"] = "/meitu/gongzhuang/";
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
                         case 'mianji':
                           //替换当前的参数
                            $reg = '/a3=\d+/i';
                            preg_match($reg,  $url["url"],$m);
                            $link = preg_replace($reg, "a3=0",$url["url"]);
                            break;

                    }
                    $sub["link"] = $link;
                }
                break;
            }
        }
        return $sub;
    }

    private function getLocation($limit,$isTop,$type,$params_count,$url){

        $result = D("Pubmeitu")->getPubMeituAttr('1',$limit,$isTop);
        foreach ($result as $key => $value) {
            if(empty($type) && $params_count == 0){
                 $link ="/meitu/gongzhuang-l".$value["id"]."f0m0";
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
        $result = D("Pubmeitu")->getPubMeituAttr('2',$limit,$isTop);
        foreach ($result as $key => $value) {
            if(empty($type) && $params_count == 0){
                $link ="/meitu/gongzhuang-l0f".$value["id"]."m0";
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

    private function getMianji($limit,$isTop,$type,$params_count,$url){
        $result = D("Pubmeitu")->getPubMeituAttr('3',$limit,$isTop);
        foreach ($result as $key => $value) {
            if(empty($type) && $params_count == 0){
                 $link ="/meitu/gongzhuang-l0f0m".$value["id"];
                 $result[$key]["nofollow"] = 'follow';
            }elseif(!empty($type) && $params_count == 1){
                if($type == "huxing"){
                    //替换当前的参数
                    $reg = '/m\d+/i';
                    $link =preg_replace($reg, "m".$value["id"],$url["short_url"]);
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

    private function getMeiTuList($pageIndex,$pageCount,$keyword){
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        import('Library.Org.Page.PPage');
        //自定义配置项
        $config  = array("prev","next");
        $page = new \PPage($pageIndex,$pageCount,0,$config);

        //解析参数
        $params= $page->analyticalAddress();

        if(!isset($params['params']['location'])){
            if(substr($params['url']['short_url'], -1, 1) == '-'){
                $params['url']['short_url'] = rtrim($params['url']['short_url'], '-');
            }
            $url = explode('-', $params['url']['short_url'])[1];

            $arr = [];
            preg_match_all('/^\w{1}(\d)+\w{1}(\d)+\w{1}(\d)+$/', $url, $arr);

            $a1 = $arr[1][0];
            $a2 = $arr[2][0];
            $a3 = $arr[3][0];

            $params['params']['location'] = $a1;
            $params['params']['fengge'] = $a2;
            $params['params']['mianji'] = $a3;

            $params['url']['url'] = "/meitu/gongzhuang?a1=" . $a1 . "&a2=" . $a2 . "a3=" . $a3;
        }
        $count = D("Common/Logic/PubmeituLogic")->getPubMeiTuCount($params['params']["location"], $params['params']["fengge"], $params['params']["mianji"]);
        if($count > 0) {
            $list = D("Common/Logic/PubmeituLogic")->getPubMeiTuList(($page->pageIndex - 1) * $pageCount, $pageCount, $params['params']["location"], $params['params']["fengge"], $params['params']["mianji"], 'id desc', 1);
            //重新实例化page对象，调用mip分页方法
            import('Library.Org.Page.Page');
            $page = new \Page($pageIndex, $pageCount, (int)$count, $config, 'html');
            $pageMipTmp = $page->showMeituNew();

            foreach ($list as $key => $value) {
                //取每个分类的第一个元素
                $exp = array_filter(explode(",", $value["location"]));
                $list[$key]["location"] = $exp[0];

                $exp = array_filter(explode(",", $value["fengge"]));
                $list[$key]["fengge"] = $exp[0];

                $exp = array_filter(explode(",", $value["mianji"]));
                $list[$key]["mianji"] = $exp[0];
            }
            return array("list" => $list, "params" => $params["params"], "url" => $params["url"], "page" => $pageMipTmp);
        }
        return array("list"=>[],"page"=>'',"params"=>[],"url"=>[],'count'=>0);
    }
}