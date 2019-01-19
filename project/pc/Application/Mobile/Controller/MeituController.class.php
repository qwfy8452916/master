<?php
/**
 * 移动版 - 美图
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class MeituController extends MobileBaseController{

    public function index(){
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
            S("Cache:M:Meitu:Home",$info,900);
        }

        $Db = D("Meitu");

        $info['locationImg'] = $Db->getMeituListByType('location','20');
        $info['fenggeImg'] = $Db->getMeituListByType('fengge','20');
        $info['huxingImg'] = $Db->getMeituListByType('huxing','20');
        $info['colorImg'] = $Db->getMeituListByType('color','20');

        //dump(M()->getLastSql());
        //dump($info['locationImg']);

        //seo 标题/描述/关键字
        $info["title"] = "装修效果图_".date("Y")."室内家装装饰设计效果图大全-齐装网装修效果图";
        $info["keywords"] = "装修效果图,装饰效果图,家装效果图,室内装修效果图大全,室内装修效果图,家装效果图大全";
        $info["description"] = "齐装网汇聚".date("Y")."国内外受欢迎的家庭装修效果图片，为您提供室内装修装饰效果图大全以及丰富的家居设计美图，不一样的装修图片为您带来不一样的房屋装修灵感。找装修美图就上齐装网！";
        $info['canonical'] = $_SERVER['REQUEST_URI'];
        $this->assign("info",$info);
        $this->display();
    }

    //美图列表
    public function meitulist(){
        //获取美图列表
        $pageIndex = 1;
        $pageCount = 10;

        $meitu = $this->getMeiTuList($pageIndex,$pageCount,$keyword);
        $info["meitu"] = $meitu["list"];
        $info["page"] = $meitu["page"];
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
        $info["wz"] = $this->getLocation("","",$type,$params_count, $meitu["url"]);
        //获取风格
        $info["fg"] = $this->getFengge("","",$type,$params_count, $meitu["url"]);
        //获取户型
        $info["hx"] = $this->getHuxing("","",$type,$params_count, $meitu["url"]);
        // //获取颜色信息
        $info["ys"] = $this->getColor("","",$type,$params_count, $meitu["url"]);
        //dump($info['wz']);

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

        //判断是否为 ajax 请求
        if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"])=="xmlhttprequest"){
            foreach ($info['meitu'] as $k => $v) {
                $str .= ' <li><h1>'.$v['title'].'</h1><a href="/meitu/p'.$v['id'].'.html"><img src="http://'.C('QINIU_DOMAIN').'/'.$v['img_path'].'-w300.jpg" alt=""/></a>
            <div class="meitu-list-info"><span><i class="icon-magic"></i>'.$v['wz'].'</span><span><i class="icon-home"></i>'.$v['hx'].'</span>
                <span><i class="icon-leaf"></i>'.$v['ys'].'</span></div><a href="/meitu/p'.$v['id'].'.html" class="meitu-click-into">点击查看..</a></li>';

            }
            echo $str;
            die();
        }

        //seo 标题/描述/关键字
        $content ="";
        foreach ($info["params"] as $key => $value) {
           $content .=$value["name"];
        }
        //dump($info['fg']);


        if(!empty($keyword)){
            $this->assign("keyword",$keyword);
            $info["title"] = date("Y").' '.$keyword." 相关装修美图大全-齐装网装修效果图";
        }else{
            $info["title"] = date("Y").$content."家庭室内装修装饰风格美图大全-齐装网装修效果图";
        }
        $info["keywords"] = $content."装修效果图,".$content."装修效果图大全,".$content."家庭装修效果图,".$content."室内装修效果图,".$content."装饰效果图,";
        $info["description"] = "齐装网汇聚".date("Y").$content."家庭室内装修装饰风格效果图大全，为您提供".date("Y").$content."效果图大全以及丰富的家居设计美图。找".$content."美图就上齐装网！";
        $info["params"] = array_filter($info["params"]);
        $info['pageid'] = empty($info['navParams']['p']) ? $pageIndex : $info['navParams']['p'];

        $url = $_SERVER['REQUEST_URI'];
        //dump($info['navParams']);

        $info['select']['location'] = str_replace('a1='.$info['navParams']['location'],'a1=0',$url);
        $info['select']['fengge'] = str_replace('a2='.$info['navParams']['fengge'],'a2=0',$url);
        $info['select']['huxing'] = str_replace('a3='.$info['navParams']['huxing'],'a3=0',$url);
        $info['select']['color'] = str_replace('a4='.$info['navParams']['color'],'a4=0',$url);

        $info['canonical'] = $_SERVER['REQUEST_URI'];
        $this->assign("info",$info);
        $this->display("list");
    }

    //美图详情页
    public function show(){
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
        $info["title"] = $info["case"]["now"]["title"]."-齐装网装修效果图";
        $info["keywords"] = $info["case"]["now"]["keyword"];
        $info["description"] = $info["case"]["now"]["description"];
        $this->assign("info",$info['now']);
        $this->display();
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

    private function getLocation($limit,$isTop,$type,$params_count,$url){
        $result = D("Meitu")->getLocation($limit,$isTop);
        foreach ($result as $key => $value) {
            if(empty($type) && $params_count == 0){
                 $link ="/meitu/list-l".$value["id"]."f0h0c0";
            }elseif(!empty($type) && $params_count == 1){
                if($type == "location"){
                    //替换当前的参数
                    $reg = '/l\d+/i';
                    $link =preg_replace($reg, "l".$value["id"],$url["short_url"]);
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
            }elseif(!empty($type) && $params_count == 1){
                if($type == "fengge"){
                    //替换当前的参数
                    $reg = '/f\d+/i';
                    $link =preg_replace($reg, "f".$value["id"],$url["short_url"]);
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
            }elseif(!empty($type) && $params_count == 1){
                if($type == "huxing"){
                    //替换当前的参数
                    $reg = '/h\d+/i';
                    $link =preg_replace($reg, "h".$value["id"],$url["short_url"]);
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
            }elseif(!empty($type) && $params_count == 1){
                if($type == "color"){
                    //替换当前的参数
                    $reg = '/c\d+/i';
                    $link =preg_replace($reg, "c".$value["id"],$url["short_url"]);
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

    private function getMeiTuList($pageIndex,$pageCount,$keyword)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        import('Library.Org.Page.Page');
        //自定义配置项
        $config  = array("prev","next");
        $page = new \Page($pageIndex,$pageCount,$count,$config);
        //解析参数
        $params= $page->analyticalAddress();
        //dump($params);
        $count = D("Meitu")->getMeiTuListCount($params["params"]["location"],$params["params"]["fengge"],$params["params"]["huxing"],$params["params"]["color"],$keyword);
        if($count > 0){
            $result =  $page->show_short($params["url"],$count);
            $pageTmp = $result;
            $list = D("Meitu")->getMeiTuList(($page->pageIndex-1)*$pageCount,$pageCount,$params["params"]["location"],$params["params"]["fengge"],$params["params"]["huxing"],$params["params"]["color"],$keyword);
            //dump(M()->getLastSql());
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
        }
        return array("list"=>$list,"page"=>$pageTmp,"params"=>$params["params"],"url"=>$params["url"]);
    }

}