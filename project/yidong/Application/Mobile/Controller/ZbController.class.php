<?php
/**
 * 移动版招标页
 * 招标单页面
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class ZbController extends MobileBaseController{
    public function index()
    {
        //获取城市信息
        //$citys = getCityArray();
        //$this->assign('citys', json_encode($citys));
        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);
        session("m_wanshan_tmp",'wanshan');
        session("m_redirect",'http://m.'.C('QZ_YUMING').'/shejidone/');
        //如果有城市
        $cityInfo = $this->cityInfo;
        if ($cityInfo) {
            $this->assign('cid',$cityInfo['id']); //城市id
        }
        //SEO标题关键字描述
        $basic["head"]["title"] = "装修招标_免费装修设计与报价-齐装网";
        $basic["head"]["keywords"] = "装修设计,室内装修设计,装修报价,装修报价单";
        $basic["head"]["description"] = "齐装网是国内领先的专业的家装、公装项目招标平台,业主可以在齐装网免费发布装修招标,提供装修招标、免费装修设计与报价,免费为业主提供4份室内装修设计方案与报价,并免费获得多套装修设计与报价方案,让您装修省钱省力更省心！";
        $this->assign('basic',$basic);
        $cityid = $_SESSION['m_mapUseInfo']['id'];
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('info',$info);
        $this->assign('cityid',$cityid);
        $this->display('mzb');//加载招标页面报价方案模版
    }

    /**
     * [sheji 设计页面]
     * @return [type] [description]
     */
    public function sheji()
    {
        session("m_redirect",'http://m.'.C('QZ_YUMING').'/shejidone/');

        //传入source，没有传入则默认为302(即本页)
        $laiyuan = $_GET['fi'];
        if(empty($laiyuan)){
            $source['top'] = 302;
            $source['bottom'] = 301;
        }else{
            $source['top'] = $laiyuan;
            $source['bottom'] = $laiyuan;
        }
        $this->assign('source',$source);

        //SEO标题关键字描述
        $basic["head"]["title"] = "户型设计_装修招标_免费装修设计与报价-齐装网";
        $basic["head"]["keywords"] = "装修设计,户型设计,室内装修设计,装修报价,装修报价单";
        $basic["head"]["description"] = "齐装网是国内领先的专业的家装、公装项目招标平台,业主可以在齐装网免费发布装修招标,提供装修招标、免费装修设计与报价,免费为业主提供4份室内装修设计方案与报价,并免费获得多套装修设计与报价方案,让您装修省钱省力更省心！";

        //获取src
        $src = $_GET['src'];

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("src", $src);
        $this->assign('cityInfo',session('m_cityInfo'));
        $this->assign('info',$info);
        $this->assign('basic',$basic);
        //加载招标页面设计方案模版
        $this->display();
    }
    public function sheji_1()
    {
        session("m_redirect",'http://m.'.C('QZ_YUMING').'/shejidone/');

        //传入source，没有传入则默认为302(即本页)
        $laiyuan = $_GET['fi'];
        if(empty($laiyuan)){
            $source['top'] = 302;
            $source['bottom'] = 301;
        }else{
            $source['top'] = $laiyuan;
            $source['bottom'] = $laiyuan;
        }
        $this->assign('source',$source);

        //SEO标题关键字描述
        $basic["head"]["title"] = "户型设计_装修招标_免费装修设计与报价-齐装网";
        $basic["head"]["keywords"] = "装修设计,户型设计,室内装修设计,装修报价,装修报价单";
        $basic["head"]["description"] = "齐装网是国内领先的专业的家装、公装项目招标平台,业主可以在齐装网免费发布装修招标,提供装修招标、免费装修设计与报价,免费为业主提供4份室内装修设计方案与报价,并免费获得多套装修设计与报价方案,让您装修省钱省力更省心！";

        //获取src
        $src = $_GET['src'];

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("src", $src);
        $this->assign('cityInfo',session('m_cityInfo'));
        $this->assign('info',$info);
        $this->assign('basic',$basic);
        //加载招标页面设计方案模版
        $this->display();
    }

     public function sheji_paste()
    {
        session("m_redirect",'http://m.'.C('QZ_YUMING').'/shejidone/');

        //传入source，没有传入则默认为302(即本页)
        $laiyuan = $_GET['fi'];
        if(empty($laiyuan)){
            $source['top'] = 302;
            $source['bottom'] = 301;
        }else{
            $source['top'] = $laiyuan;
            $source['bottom'] = $laiyuan;
        }
        $this->assign('source',$source);

        //SEO标题关键字描述
        $basic["head"]["title"] = "户型设计_装修招标_免费装修设计与报价-齐装网";
        $basic["head"]["keywords"] = "装修设计,户型设计,室内装修设计,装修报价,装修报价单";
        $basic["head"]["description"] = "齐装网是国内领先的专业的家装、公装项目招标平台,业主可以在齐装网免费发布装修招标,提供装修招标、免费装修设计与报价,免费为业主提供4份室内装修设计方案与报价,并免费获得多套装修设计与报价方案,让您装修省钱省力更省心！";

        //获取src
        $src = $_GET['src'];

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("src", $src);
        $this->assign('cityInfo',session('m_cityInfo'));
        $this->assign('info',$info);
        $this->assign('basic',$basic);
        //加载招标页面设计方案模版
        $this->display();
    }

    /*
    *   根据时间生成随机数
    *
    *
    */
    public function getroundnum(){
        $time = date("His");
        $t = intval($time);
        $res = 533-($t*0.0022);
        if($res < 100){
            $arr[0] = '0';
            $arr[1] = '0';
            $arr[2] = substr($res, 0, 1);
            $arr[3] = substr($res, 1, 1);
        }else{
            $arr[0] = '0';
            $arr[1] = substr($res, 0, 1);
            $arr[2] = substr($res, 1, 1);
            $arr[3] = substr($res, 2, 1);
        }
        //var_dump($arr);
        $this->ajaxReturn(array('data'=>$arr,'info'=>'操作成功','status'=>1));
    }

    /**
     * [shejiDone 设计完成页面]
     * @return [type] [description]
     */
    public function shejiDone(){
        $src = $_GET['src'];
        $orderSourceResult = D("OrderSource")->getOne($src);

        //根据sourceid获取微信管理信息
        $result = D("YySrcWeixin")->getOneBySourceid($orderSourceResult['id']);

        if(!$result){
            $result = D("YySrcWeixin")->getDefaultData();
        }
        if(!empty($result['desc'])){
            $desc = explode(",", $result['desc']);
            $this->assign("title", $result['title']);
            $this->assign("img", $result['img']);
            $this->assign("desc", $desc);
        }

        //SEO标题关键字描述
        $basic["head"]["title"] = "免费领取装修设计方案_轻松获得精确预算_躲避装修猫腻";
        $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
        $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";
        $this->assign('basic',$basic);
        $this->display();
    }

    /**
     * 设计弹窗完成页面
     * @return [type] [description]
     */
    public function shejidone2()
    {
        $tmp = $this->fetch("Common/sheji-2");
        $this->ajaxReturn(array("data"=>$tmp));
    }

    //智能报价
    public function baojia(){
        session("m_redirect",'http://m.'.C('QZ_YUMING').'/details/');
        session("m_wanshan_tmp",'wanshan');
        //传入source，没有传入则默认为311(即本页)
        $source = $_GET['fi'];
        if(empty($source)){
            $source = 311;
        }
        $this->assign('source',$source);

        //seo 标题/描述/关键字
        $basic["head"]["title"] = "装修报价";
        $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
        $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('cityInfo',session('m_cityInfo'));

        $city = session('m_cityInfo');
        if(empty($city['name'])){
            $city['name'] = '';
        }
        //获取src
        $src = $_GET['src'];

        $info['city'] = $city['name'];
        $this->assign("src", $src);
        $this->assign('info',$info);
        $this->assign("basic",$basic);
        $this->display();
    }

     //a.18.10.2复制报价
    public function baojia_zst(){
        session("m_redirect",'http://m.'.C('QZ_YUMING').'/details/');
        session("m_wanshan_tmp",'wanshan');
        //传入source，没有传入则默认为311(即本页)
        $source = $_GET['fi'];
        if(empty($source)){
            $source = 311;
        }
        $this->assign('source',$source);

        //seo 标题/描述/关键字
        $basic["head"]["title"] = "装修报价";
        $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
        $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('cityInfo',session('m_cityInfo'));

        $city = session('m_cityInfo');
        if(empty($city['name'])){
            $city['name'] = '';
        }
        //获取src
        $src = $_GET['src'];

        $info['city'] = $city['name'];
        $this->assign("src", $src);
        $this->assign('info',$info);
        $this->assign("basic",$basic);
        $this->display();
    }

      //m.2.9.18报价合作商统计数据
    public function baojia_dm(){
        session("m_redirect",'http://m.'.C('QZ_YUMING').'/details/');
        session("m_wanshan_tmp",'wanshan');
        //传入source，没有传入则默认为311(即本页)
        $source = $_GET['fi'];
        if(empty($source)){
            $source = 311;
        }
        $this->assign('source',$source);

        //seo 标题/描述/关键字
        $basic["head"]["title"] = "装修报价";
        $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
        $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('cityInfo',session('m_cityInfo'));

        $city = session('m_cityInfo');
        if(empty($city['name'])){
            $city['name'] = '';
        }
        //获取src
        $src = $_GET['src'];

        $info['city'] = $city['name'];
        $this->assign("src", $src);
        $this->assign('info',$info);
        $this->assign("basic",$basic);
        $this->display();
    }

     //智能报价_1
    public function baojia_1(){
        session("m_redirect",'http://m.'.C('QZ_YUMING').'/details/');
        session("m_wanshan_tmp",'wanshan');
        //传入source，没有传入则默认为311(即本页)
        $source = $_GET['fi'];
        if(empty($source)){
            $source = 311;
        }
        $this->assign('source',$source);

        //seo 标题/描述/关键字
        $basic["head"]["title"] = "装修报价";
        $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
        $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('cityInfo',session('m_cityInfo'));

        $city = session('m_cityInfo');
        if(empty($city['name'])){
            $city['name'] = '';
        }
        //获取src
        $src = $_GET['src'];

        $info['city'] = $city['name'];
        $this->assign("src", $src);
        $this->assign('info',$info);
        $this->assign("basic",$basic);
        $this->display();
    }

    // 渠道报价
     public function baojia_qd(){
         session("m_redirect",'http://m.'.C('QZ_YUMING').'/details/');
         session("m_wanshan_tmp",'wanshan');
         //传入source，没有传入则默认为311(即本页)
         $source = $_GET['fi'];
         if(empty($source)){
             $source = 311;
         }
         $this->assign('source',$source);

         //seo 标题/描述/关键字
         $basic["head"]["title"] = "装修报价";
         $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
         $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

         //获取该城市第一个区，用于显示默认城市
         $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
         $this->assign('cityInfo',session('m_cityInfo'));

         $city = session('m_cityInfo');
         if(empty($city['name'])){
             $city['name'] = '';
         }
         //获取src
         $src = $_GET['src'];

         $info['city'] = $city['name'];
         $this->assign("src", $src);
         $this->assign('info',$info);
         $this->assign("basic",$basic);
         $this->display();
    }

      //智能报价_2
    public function baojia_2(){
        session("m_redirect",'http://m.'.C('QZ_YUMING').'/details/');
        session("m_wanshan_tmp",'wanshan');
        //传入source，没有传入则默认为311(即本页)
        $source = $_GET['fi'];
        if(empty($source)){
            $source = 311;
        }
        $this->assign('source',$source);

        //seo 标题/描述/关键字
        $basic["head"]["title"] = "装修报价";
        $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
        $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('cityInfo',session('m_cityInfo'));

        $city = session('m_cityInfo');
        if(empty($city['name'])){
            $city['name'] = '';
        }
        //获取src
        $src = $_GET['src'];

        $info['city'] = $city['name'];
        $this->assign("src", $src);
        $this->assign('info',$info);
        $this->assign("basic",$basic);
        $this->display();
    }

    //0元报价落地页
    public function baojia_dx(){
        session("m_redirect",'http://m.'.C('QZ_YUMING').'/details/');
        session("m_wanshan_tmp",'wanshan');
        //传入source，没有传入则默认为311(即本页)
        $source = $_GET['fi'];
        if(empty($source)){
            $source = 311;
        }
        $this->assign('source',$source);

        //seo 标题/描述/关键字
        $basic["head"]["title"] = "装修报价";
        $basic["head"]["keywords"] = "装修没有那么贵,一份报价就够了";
        $basic["head"]["description"] = "装修没有那么贵，一份报价就够了省钱、省力、更省心";

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('cityInfo',session('m_cityInfo'));

        $city = session('m_cityInfo');
        if(empty($city['name'])){
            $city['name'] = '';
        }
        //获取src
        $src = $_GET['src'];

        $info['city'] = $city['name'];
        $this->assign("src", $src);
        $this->assign('info',$info);
        $this->assign("basic",$basic);
        $this->display('Zb/zero_baojialdy');
    }
    //0元报价落地页复制
    public function baojia_dx_1(){
        session("m_redirect",'http://m.'.C('QZ_YUMING').'/details/');
        session("m_wanshan_tmp",'wanshan');
        //传入source，没有传入则默认为311(即本页)
        $source = $_GET['fi'];
        if(empty($source)){
            $source = 311;
        }
        $this->assign('source',$source);

        //seo 标题/描述/关键字
        $basic["head"]["title"] = "装修报价";
        $basic["head"]["keywords"] = "装修没有那么贵,一份报价就够了";
        $basic["head"]["description"] = "装修没有那么贵，一份报价就够了省钱、省力、更省心";

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('cityInfo',session('m_cityInfo'));

        $city = session('m_cityInfo');
        if(empty($city['name'])){
            $city['name'] = '';
        }
        //获取src
        $src = $_GET['src'];

        $info['city'] = $city['name'];
        $this->assign("src", $src);
        $this->assign('info',$info);
        $this->assign("basic",$basic);
        $this->display('Zb/zero_baojialdy_1');
    }

    public function fb_order(){
        R("Common/Zbfb/fb_order");
        die();
    }

    /**
     * 装修报价详细页面
     * @return [type] [description]
     */
    public function details () {
        $src = $_GET['src'];
        $orderSourceResult = D("OrderSource")->getOne($src);

        //根据sourceid获取微信管理信息
        $result = D("YySrcWeixin")->getOneBySourceid($orderSourceResult['id']);

        if(!$result || empty($result['name'])){
            $result = D("YySrcWeixin")->getDefaultData();
        }
        if(!empty($result['name'])){
            $this->assign("name", $result['name']);
        }

        if (isset($_COOKIE["w_qizuang_n"])) {
            $orderid = cookie("w_qizuang_n");
            $order = D("Orders")->getOrderInfoById($orderid);

            if(count($order) > 0){
                $result = $this->calculatePrice($order["mianji"],$order["huxing"]);

                $basic["head"]["title"] = $order["cname"]."_".$order["fengge"]."_".$order["hxname"]."装修报价明细-齐装网";

                $this->assign("basic",$basic);
                $this->assign("order",$order);
                $this->assign("info",$result);
                $this->assign("tags",$location["tags"]);
                $this->display();
                die();
             }
        }

      header("LOCATION:http://m.qizuang.com/baojia/");
    }


    /**
     * 复制装修报价详细页面无链接跳转
     * @return [type] [description]
     */
    public function details_a18102 () {
        $src = $_GET['src'];
        $orderSourceResult = D("OrderSource")->getOne($src);

        //根据sourceid获取微信管理信息
        $result = D("YySrcWeixin")->getOneBySourceid($orderSourceResult['id']);

        if(!$result || empty($result['name'])){
            $result = D("YySrcWeixin")->getDefaultData();
        }
        if(!empty($result['name'])){
            $this->assign("name", $result['name']);
        }

        if (isset($_COOKIE["w_qizuang_n"])) {
            $orderid = cookie("w_qizuang_n");
            $order = D("Orders")->getOrderInfoById($orderid);

            if(count($order) > 0){
                $result = $this->calculatePrice($order["mianji"],$order["huxing"]);

                $basic["head"]["title"] = $order["cname"]."_".$order["fengge"]."_".$order["hxname"]."装修报价明细-齐装网";

                $this->assign("basic",$basic);
                $this->assign("order",$order);
                $this->assign("info",$result);
                $this->assign("tags",$location["tags"]);
                $this->display();
                die();
             }
        }

      header("LOCATION:http://m.qizuang.com/baojia-zst/");
    }

    /**
     * ajax获取装修报价详细
     * @return [type] [description]
     */
    public function getDetailsByAjax(){
        if(isset($_COOKIE["w_qizuang_n"])){
            $orderid = $_COOKIE["w_qizuang_n"];
            $order = D("Orders")->getOrderInfoById($orderid);
            if(count($order) > 0){
                $result = $this->calculatePrice($order["mianji"],$order["cs"]);
                $this->ajaxReturn(array("data"=>$result,"info"=>"获取成功！","status"=>1));
            }
        }
        $this->ajaxReturn(array("data"=>'',"info"=>"获取失败，请刷新重试~","status"=>0));
    }


    /**
     * 老版 ajax获取装修报价详细
     * @return [type] [description]
     */
    public function getdetailsinfo () {
        if (isset($_COOKIE["w_qizuang_n"])) {
            $orderid = cookie("w_qizuang_n");
            $order = D("Orders")->getOrderInfoById($orderid);

            if(count($order) > 0){
                switch ($order["huxing"]) {
                    case '38':
                        $order["shi"] = "1";
                        $order["ting"] = "1";
                        $order["wei"] = "1";
                        break;
                    case '39':
                        $order["shi"] = "2";
                        $order["ting"] = "1";
                        $order["wei"] = "1";
                        break;
                    case '40':
                        $order["shi"] = "2";
                        $order["ting"] = "2";
                        $order["wei"] = "1";
                        break;
                    case '41':
                        $order["shi"] = "2";
                        $order["ting"] = "2";
                        $order["wei"] = "2";
                        break;
                    case '42':
                        $order["shi"] = "3";
                        $order["ting"] = "2";
                        $order["wei"] = "1";
                        break;
                    case '43':
                        $order["shi"] = "3";
                        $order["ting"] = "2";
                        $order["wei"] = "2";
                        break;
                    case '46':
                        $order["shi"] = "3";
                        $order["ting"] = "1";
                        $order["wei"] = "1";
                        break;
                    case '47':
                        $order["shi"] = "3";
                        $order["ting"] = "2";
                        $order["wei"] = "1";
                        break;
                    case '48':
                        $order["shi"] = "4";
                        $order["ting"] = "2";
                        $order["wei"] = "2";
                        break;
                    case '49':
                        $order["shi"] = "5";
                        $order["ting"] = "2";
                        $order["wei"] = "2";
                        break;
                    case '50':
                        $order["shi"] = "6";
                        $order["ting"] = "2";
                        $order["wei"] = "3";
                        break;
                }

                //如果户型为空,根据面积添加默认的户型
                if (empty($order["huxing"])) {
                    if ($order["huxing"] < 50) {
                        $order["shi"] = "1";
                        $order["ting"] = "1";
                        $order["wei"] = "1";
                    } else if ($order["huxing"] >= 50 && $order["huxing"] < 80) {
                        $order["shi"] = "2";
                        $order["ting"] = "1";
                        $order["wei"] = "1";
                    } else if ($order["huxing"] >= 80 && $order["huxing"] < 110) {
                        $order["shi"] = "2";
                        $order["ting"] = "2";
                        $order["wei"] = "1";
                    } else if ($order["huxing"] >= 120 && $order["huxing"] < 150) {
                        $order["shi"] = "3";
                        $order["ting"] = "2";
                        $order["wei"] = "1";
                    } else if ($order["huxing"] >= 150 ) {
                        $order["shi"] = "4";
                        $order["ting"] = "2";
                        $order["wei"] = "1";
                    } else {
                        $order["shi"] = "2";
                        $order["ting"] = "1";
                        $order["wei"] = "1";
                    }
                }

                //没有装修档次默认精装
                if (empty($order["zxdc"])) {
                   $order["zxdc"] = 2;
                }

                $location = $this->getZxInfo($order);
                $result = $this->getPricesTmp($order["mianji"],$order["zxdc"],$location["data"],$id,$order["cs"]);

                $money['total'] = $result['halfTotal'];
                $money['kt'] = $result['nowdetails'][1]['total']+$result['nowdetails'][2]['total'];
                $money['zw'] = $result['nowdetails'][3]['total']+$result['nowdetails'][9]['total']+$result['nowdetails'][11]['total'];
                $money['wsj'] = $result['nowdetails'][4]['total'];
                $money['qt'] = $result['nowdetails'][57]['total']+$result['nowdetails'][65]['total'];

            }
        }
        if(!empty($result)){
            $this->ajaxReturn(array("data"=>$money,"info"=>"","status"=>1));
        }else{
            $this->ajaxReturn(array("data"=>$money,"info"=>"网络错误，请重试！","status"=>0));
        }
    }

    public function wanshan()
    {
        if (isset($_COOKIE["w_qizuang_n"])) {
            $orderid = cookie("w_qizuang_n");
            $order = D("Orders")->getOrderInfoById($orderid);
            //获取房屋户型
            $hx = D("Huxing")->gethx(false);
            $hx = array_slice($hx, 0,11);
            $info["hx"] = $hx;
            $yusuan = D("Jiage")->getJiage(false);
            $info["yusuan"] = $yusuan;
            $this->assign("info",$info);

            $m_redirect = session("m_redirect");
            session("m_redirect",null);
            if(empty($m_redirect)){
                $m_redirect = 'http://m.'.C('QZ_YUMING').'/shejidone/';
            }

            $this->assign("redirect",$m_redirect);
            $this->assign("order",$order);

            $tmp = session("?m_wanshan_tmp")?session("m_wanshan_tmp"):"wanshan_normal";
            if($_SERVER["HTTP_REFERER"] == 'http://m.qizuang.com/baojia/'){
                $tmp = 'wanshan';
            }
            session("m_wanshan_tmp",null);


            //seo 标题/描述/关键字
            $basic["head"]["title"] = "装修报价";
            $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
            $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

            $this->assign("basic",$basic);
            $this->display($tmp);
        } else {
            $referer = $_SERVER["HTTP_REFERER"];
            header("location:".$referer);
        }
    }

     /**
     * 获取房屋的装修信息
     * @return [type] [description]
     */
    public function getZxInfo($order){
        //计算出房屋具体的装修位置
        $data = array();
        $sort_tag = array();
        //计算出所有的房间
        for ($i = 1; $i <= $order["shi"]; $i++) {
            if($i == 1){
                array_push($data, "zw");
                $sort_tag[] = array(
                        "long" => "主卧",
                        "short" => "主",
                        "jc" => "zw",
                        "order" => "3"
                                    );
            }elseif($i == 2){
                array_push($data, "cw");
                $sort_tag[] = array(
                        "long" => "次卧",
                        "short" => "次",
                        "jc" => "cw",
                        "order" => "4"
                                    );
            }elseif($i == 3){
                array_push($data, "sf");
                $sort_tag[] = array(
                        "long" => "书房",
                        "short" => "书",
                        "jc" => "sf",
                        "order" => "6"
                                    );
            }elseif($i == 4){
                array_push($data, "kw");
                $sort_tag[] = array(
                        "long" => "客卧",
                        "short" => "客",
                        "jc" => "kw",
                        "order" => "5"
                );
            }elseif($i == 5){
                array_push($data, "etws");
                $sort_tag[] = array(
                        "long" => "儿童房",
                        "short" => "儿",
                        "jc" => "etws",
                        "order" => "7"
                                    );
            }elseif($i == 6){
                array_push($data, "zwf");
                $sort_tag[] = array(
                        "long" => "杂物房",
                        "short" => "杂",
                        "jc" => "zwf",
                        "order" => "8"
                                    );
            }
        }
        //计算出所有的厅
        for ($i = 1; $i <= $order["ting"] ; $i++) {
            if($i == 1){
                array_push($data, "kt");
                $sort_tag[] = array(
                        "long" => "客厅",
                        "short" => "厅",
                        "jc" => "kt",
                        "order" => "1"
                                    );

            }elseif($i == 2){
                array_push($data, "ct");
                $sort_tag[] = array(
                        "long" => "餐厅",
                        "short" => "餐",
                        "jc" => "ct",
                        "order" => "2"
                                    );

            }
        }

        //计算卫生间
        for ($i = 1; $i <= $order["wei"] ; $i++) {
            if($i == 1){
                array_push($data, "wsj");
                $sort_tag[] = array(
                        "long" => "卫生间",
                        "short" => "卫",
                        "jc" => "wsj",
                        "order" => "9"
                                    );

            }elseif($i == 2){
                array_push($data, "zwwsj");
                $sort_tag[] = array(
                        "long" => "主卧卫生间",
                        "short" => "主卫",
                        "jc" => "zwwsj",
                        "order" => "10"
                                    );

            }else{
                array_push($data, "kwwsj");
                $sort_tag[] = array(
                        "long" => "客卧卫生间",
                        "short" => "客卫",
                        "jc" => "kwwsj",
                        "order" => "11"
                                    );

            }
        }
        //计算厨房
        if($order["chu"]>0){
            array_push($data, "cf");
            $sort_tag[] = array(
                        "long" => "厨房",
                        "short" => "厨",
                        "jc" => "cf",
                        "order" => "12"
                                    );

        }
        //计算阳台
        for ($i = 1; $i <= $order["yangtai"] ; $i++) {
            switch ($i) {
                case '2':
                    array_push($data, "cyt");
                    $sort_tag[] = array(
                        "long" => "次阳台",
                        "short" => "次阳",
                        "jc" => "cyt",
                        "order" => "14"
                                    );

                    break;
                default:
                     array_push($data, "yt");
                     $sort_tag[] = array(
                        "long" => "阳台",
                        "short" => "台",
                        "jc" => "yt",
                        "order" => "13"
                                    );

                    break;
            }

        }

        $sort_tag[] = array(
                        "long" => "水电及安装",
                        "short" => "水电",
                        "jc" => "sd",
                        "order" => "98"
                                    );

        $sort_tag[] = array(
                        "long" => "综合其他",
                        "short" => "其他",
                        "jc" => "qt",
                        "order" => "99"
                                    );


        $edition = array();
        foreach ($sort_tag as $key => $value) {
            // 准备要排序的数组
            $edition[] = $value["order"];
        }
        array_multisort($edition, SORT_ASC,SORT_STRING,$sort_tag);
        return array("data"=>$data,"tags" => $sort_tag);
    }

    private function getPricesTmp($mianji,$zxdc,$location,$orderid,$cs){
        //键值反转
        $location = array_flip($location);
        //根据位置查询位置信息
        //获取装修的全部位置
        $locations = D("Construction")->getLocation();
        foreach ($locations as $key => $value) {
            if(array_key_exists($value["jc"], $location)){
                $data[] = $value;
            }
        }

        //将位置结果排序
        $edition = array();
        foreach ($data as $key => $value) {
            // 准备要排序的数组
            $edition[] = $value["orders"];
        }
        array_multisort($edition, SORT_ASC,$data);

        //获取当前城市的价格组信息
        $groupInfo = D("Construction")->getConstructionPriceGroupByCs($cs);
        if(count($groupInfo) == 0){
            return array("errcode"=>"","errInfo"=>"获取城市信息价格异常,请稍后再试！");
        }
        //获取价格组的详细信息
        $price = D("Construction")->getConstructionPriceByGroup($groupInfo["group"]);

        //全部的施工详细位置
        $result =  D("Construction")->getDetails();
        //根据装修档次获取装修的详细位置,暂时死代码代替
        switch($zxdc){
            case"1":
                $item = array(
                    1,9,11,15,27,34,40,43,53,56
                              );
                break;
            case"2":
                $item = array(
                    5,14,18,31,37,41,47,49,55
                              );
                break;
            case"3":
                $item = array(
                    6,13,21,31,37,41,45,51,55
                              );
                break;
        }
        //获取制定的装修项目
        foreach ($result as $key => $value) {
            if(in_array($value["id"],$item)  || in_array($value["parentid"],$item)){
                $details[] = $value;
            }
        }

        //获取当前详细的装修位置的具体信息
        $nowdetails = array();
        foreach ($data as $key => $value) {
            $nowdetails[$value["id"]]["total"] = 0;
            $nowdetails[$value["id"]] = $value;
            foreach ($details as $k => $val) {
                $exp  = array_flip(array_filter(explode(',',$val["location"])));
                if(array_key_exists($value["id"], $exp)){
                    $nowdetails[$value["id"]]["child"][] = $val;
                }
            }
        }

        //水电安装及其他项目清单信息
        foreach ($result as $key => $value) {
            if(empty($value["location"]) && $value["range"] == 0 && $value["parentid"] == 0){
                $nowdetails[$value["id"]]= $value;
                $nowdetails[$value["id"]]["total"] = 0;
                if($value["id"] == 57){
                    $nowdetails[$value["id"]]["jc"] = "sd";
                }else if($value["id"] == 65){
                     $nowdetails[$value["id"]]["jc"] = "qt";
                }
            }else if(empty($value["location"]) && $value["range"] == 0 && $value["parentid"] != 0){
                $nowdetails[$value["parentid"]]["child"][] = $value;
            }
        }

        //计算项目的详细价格
        $allDetailsTotal = 0;
        foreach ($nowdetails as $key => $value) {
           foreach ($value["child"] as $k => $val) {
                if($val["parentid"] != 0){
                    if(empty($val["location"]) && $val["range"] == 0 && $val["parentid"] != 0){
                        $noewprice = $price["other"][$val["id"]];
                    }else{
                        $noewprice = $price[$value["id"]][$val["id"]];
                    }

                    //计算价格
                    $result = $this->getDetailsPrice(round($noewprice["price"],2),$noewprice["width"],$noewprice["length"],$val["fangshi"],$mianji);

                    $nowdetails[$key]["child"][$k]["total"] = round($result["total"],2);
                    $nowdetails[$key]["child"][$k]["count"] = $result["count"];
                    $nowdetails[$key]["child"][$k]["price"] = round($noewprice["price"],2);

                    $nowdetails[$key]["total"] += $result["total"];
                    $allDetailsTotal += $result["total"];
                }
           }
        }

        //合并项目价格
        foreach ($nowdetails as $key => $value) {
            foreach ($value["child"] as $k => $val) {
                if($val["parentid"] == 0){
                    $nowdetails[$key]["item"][$val["range"]]["child"][$val["id"]] = $val;
                }else{
                    $nowdetails[$key]["item"][$val["range"]]["child"][$val["parentid"]]["child"][] = $val;
                }
                unset($nowdetails[$key]["child"][$k]);
            }
        }

        //计算全包价格
        $allMaterialsTotal = 0;
        //获取所有建材表
        $materialsList = D("Construction")->getMaterials();
        $item = array_flip($item);
        //合并建材表
        foreach ($data as $key => $value) {
            foreach ($materialsList as $k => $val) {
                $locations = array_filter(explode(',',$val["location"]));
                if(in_array($value["id"],$locations)){
                    if($val["group"] != 0){
                        $detailsid = array_filter(explode(',',$val["detailsid"]));
                        if(count($detailsid) > 0){
                            foreach ($detailsid as $v) {
                                if(isset($item[$v])){
                                    $nowmaterials[] = $val;
                                }
                            }
                        }else{
                            $nowmaterials[] = $val;
                        }
                    }
                }
            }
        }
        //计算价格
        foreach ($nowmaterials as $key => $val) {
            $result = $this->getMaterialsPrice($val["width"],$val["length"],$val["fangshi"],$val["price"]);
            $allMaterialsTotal += $result["total"];
        }
        $allMaterialsTotal += $allDetailsTotal;
        return array("halfTotal"=>$allDetailsTotal,"nowdetails"=>$nowdetails,"allTotal"=>$allMaterialsTotal);
    }

    //获取详细的价格明细
    private function getDetailsPrice($price,$width,$length,$fangshi=0,$mianji=0){
        // 计算方式  1.长*宽  2. （长+宽）*2  3.(长+宽)*2*2.8  4房屋面积*1
        // 5.1厨房+1卫生间 6. 等于5 7. 等于 4  8. 等于3  9 等于 6
        // 10. 等于 1+1  默认 0  表示 1
        $result = array();

        switch ($fangshi) {
            case 0:
                $count = 1;
                $total = sprintf('%.2f',1*$price);
                break;
            case 1:
                $count = sprintf('%.2f', ($width*$length));
                $total = sprintf('%.2f', ($width*$length)*$price);
                break;
            case 2:
                $count = sprintf('%.2f', ($width+$length)*2);
                $total = sprintf('%.2f', ($width+$length)*2*$price);
                break;
            case 3:
                $count = sprintf('%.2f', ($width+$length)*2*2.8);
                $total = sprintf('%.2f',($width+$length)*2*2.8*$price);
                break;
            case 4:
                $count = $mianji;
                $total = sprintf('%.2f',$mianji*$price);
                break;
            case 5:
                $count = "按实际计算";
                $total = 0;
                break;
            case 6:
                $count = 5;
                $total = sprintf('%.2f',5*$price);
                break;
            case 7:
                $count = 4;
                $total = sprintf('%.2f',4*$price);
                break;
            case 8:
                $count = 3;
                $total = sprintf('%.2f',3*$price);
                break;
            case 9:
                $count = 6;
                $total = sprintf('%.2f',6*$price);
                break;
            case 10:
                $count = "1+1";
                $total = sprintf('%.2f',2*$price);
                break;
        }

        $result["count"] = $count;
        $result["total"] = $total;
        return $result;
    }

    private function getMaterialsPrice($width,$length,$fangshi,$price){
        // 计算方式  1.长*宽  2. （长+宽）*2  3.(长+宽)*2*2.8  4房屋面积*1
        // 5.1厨房+1卫生间 6. 等于5 7. 等于 4  8. 等于3  9 等于 6  默认 0  表示 1
        //获取计算方式
        $result = array();
        $total = 0;
        $count = 0;
        switch ($fangshi) {
            case 0:
                $count = 1;
                $total = sprintf('%.2f', 1*$price);
                break;
            case 1:
                $count = sprintf('%.2f', ($width*$length));
                $total = sprintf('%.2f', ($width*$length)*$price);
                break;
            case 2:
                $count = sprintf('%.2f', ($width+$length)*2);
                $total = sprintf('%.2f', ($width+$length)*2*$price);
                break;
            case 3:
                $count = sprintf('%.2f', ($width+$length)*2*2.8);
                $total =  sprintf('%.2f', ($width+$length)*2*2.8*$price);
                break;
            case 4:
                $count = $mianji;
                $total =  sprintf('%.2f', $mianji*$price);
                break;
            case 5:
                $count = "按实际计算";
                $total = 0;
                break;
            case 6:
                $count = 5;
                $total = sprintf('%.2f', 5*$price);
                break;
            case 7:
                $count = 4;
                $total = sprintf('%.2f', 4*$price);
                break;
            case 8:
                $count = 3;
                $total = sprintf('%.2f', 3*$price);
                break;
            case 9:
                $count = 6;
                $total = sprintf('%.2f', 6*$price);
                break;
        }
        $result["count"] = $count;
        $result["total"] = $total;
        return $result;
    }

        /**
     * 计算价格
     * @param  [type] $mianji [面积]
     * @param  [type] $cs [城市]
     * @return [type]         [description]
     */
    private function calculatePrice($mianji,$cs)
    {
        //占比：客厅25% 卧室 18% 厨房 8% 卫生间16% 水电25% 其他 8%
        //计算公式 （城市最低半包单价*120%）*房子的面积

        //获取改订单城市的最低半包价格
        $result = D("Orders")->getCityPrice($cs);
        $price = $result["half_price_min"];
        if (empty($price)) {
            $price = 300;
        }

        $total = $price*1.2*$mianji;
        $info["child"]['kt'] = $total*0.25 ;
        $info["child"]['zw'] = $total*0.18;
        $info["child"]['wsj'] = $total*0.16;
        $info["child"]['cf'] = $total*0.08;
        $info["child"]['sd'] = $total*0.25;
        $info["child"]['other'] = $total*0.08;
        $info['total'] = $total;

        return $info;
    }

    //红包发单
    public function hongbao(){
        $referUrl = 'http://' . C('MOBILE_DONAMES');
        if (!empty($_SERVER['HTTP_REFERER'])) {
            $referUrl = $_SERVER['HTTP_REFERER'];
        }
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('info',$info);
        $this->assign('referUrl', $referUrl);
        $this->display();
    }

    //新增智能报价
    public function newbaojia(){
        //传入source，没有传入则默认为311(即本页)
        $source = $_GET['fi'];
        if(empty($source)){
            $source = 311;
        }
        $this->assign('source',$source);

        //seo 标题/描述/关键字
        $basic["head"]["title"] = "装修报价";
        $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
        $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('cityInfo',session('m_cityInfo'));
        $city = session('m_cityInfo');
        if(empty($city['name'])){
            $city['name'] = '';
        }
        //获取src
        $src = $_GET['src'];

        $info['city'] = $city['name'];
        $this->assign("src", $src);
        $this->assign('info',$info);
        $this->assign("basic",$basic);
        $this->display();
    }

    //新增精准智能报价
    public function jznewbaojia(){
        $orderid = cookie("w_qizuang_n");
        $this->assign("orderid",$orderid);
        $this->display();
    }

    //新增智能报价成功
    public function newbaojiasuccess(){
        if (isset($_COOKIE["w_qizuang_n"])) {
            $orderid = cookie("w_qizuang_n");
            $order = D("Orders")->getOrderInfoById($orderid);

            if(count($order) > 0){
                $result = $this->calculatePrice($order["mianji"],$order["huxing"]);

                $basic["head"]["title"] = $order["cname"]."_".$order["fengge"]."_".$order["hxname"]."装修报价明细-齐装网";

                $this->assign("basic",$basic);
                $this->assign("order",$order);
                $this->assign("info",$result);
                $this->display();
                die();
             }
        }
        header("LOCATION:http://m.qizuang.com/newbaojia/");
    }

    //20181119
      //新增智能报价
        public function baojia1(){
            //传入source，没有传入则默认为311(即本页)
            $source = $_GET['fi'];
            if(empty($source)){
                $source = 311;
            }
            $this->assign('source',$source);

            //seo 标题/描述/关键字
            $basic["head"]["title"] = "装修报价";
            $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
            $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

            //获取该城市第一个区，用于显示默认城市
            $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
            $this->assign('cityInfo',session('m_cityInfo'));
            $city = session('m_cityInfo');
            if(empty($city['name'])){
                $city['name'] = '';
            }
            //获取src
            $src = $_GET['src'];

            $info['city'] = $city['name'];
            $this->assign("src", $src);
            $this->assign('info',$info);
            $this->assign("basic",$basic);
            $this->display();
        }
        //新增精准智能报价
            public function jzbaojia1(){
                $orderid = cookie("w_qizuang_n");
                $this->assign("orderid",$orderid);
                $this->display();
            }
            //新增精准智能报价   20181224
            public function baojia1details(){
                $orderid = cookie("w_qizuang_n");
                $this->assign("orderid",$orderid);
                $this->display("baojia1-details");
            }

            //新增智能报价成功
            public function baojiasuccess1(){
                if (isset($_COOKIE["w_qizuang_n"])) {
                    $orderid = cookie("w_qizuang_n");
                    $order = D("Orders")->getOrderInfoById($orderid);

                    if(count($order) > 0){
                        $result = $this->calculatePrice($order["mianji"],$order["huxing"]);

                        $basic["head"]["title"] = $order["cname"]."_".$order["fengge"]."_".$order["hxname"]."装修报价明细-齐装网";

                        $this->assign("basic",$basic);
                        $this->assign("order",$order);
                        $this->assign("info",$result);
                        $this->display();
                        die();
                     }
                }
                header("LOCATION:http://m.qizuang.com/newbaojia/");
            }
            //新增报价成功  20181224
            public function baojia1success(){
                if (isset($_COOKIE["w_qizuang_n"])) {
                    $orderid = cookie("w_qizuang_n");
                    $order = D("Orders")->getOrderInfoById($orderid);

                    if(count($order) > 0){
                        $result = $this->calculatePrice($order["mianji"],$order["huxing"]);

                        $basic["head"]["title"] = $order["cname"]."_".$order["fengge"]."_".$order["hxname"]."装修报价明细-齐装网";

                        $this->assign("basic",$basic);
                        $this->assign("order",$order);
                        $this->assign("info",$result);
                        $this->display();
                        die();
                     }
                }
                header("LOCATION:http://m.qizuang.com/baojia1-jzrk/");
            }

            // 20181123 新增设计发单页（删除链接）
                public function shejijzrk(){
                    //传入source，没有传入则默认为311(即本页)
                    $source = $_GET['fi'];
                    if(empty($source)){
                        $source = 311;
                    }
                    $this->assign('source',$source);

                    //seo 标题/描述/关键字
                    $basic["head"]["title"] = "户型设计";
                    $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
                    $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

                    //获取该城市第一个区，用于显示默认城市
                    $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
                    $this->assign('cityInfo',session('m_cityInfo'));
                    $city = session('m_cityInfo');
                    if(empty($city['name'])){
                        $city['name'] = '';
                    }
                    //获取src
                    $src = $_GET['src'];

                    $info['city'] = $city['name'];
                    $this->assign("src", $src);
                    $this->assign('info',$info);
                    $this->assign("basic",$basic);
                    $this->display("sheji-jzrk");
                }
              //新增设计报价成功页
                public function details_jzrk(){
                    $orderid = cookie("w_qizuang_n");
                    $this->assign("orderid",$orderid);
                    $this->display();
                }

                // 20181128 新增设计发单页(删除小区输入框)
                public function shejidyqd(){
                    //传入source，没有传入则默认为311(即本页)
                    $source = $_GET['fi'];
                    if(empty($source)){
                        $source = 311;
                    }
                    $this->assign('source',$source);

                    //seo 标题/描述/关键字
                    $basic["head"]["title"] = "户型设计";
                    $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
                    $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

                    //获取该城市第一个区，用于显示默认城市
                    $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
                    $this->assign('cityInfo',session('m_cityInfo'));
                    $city = session('m_cityInfo');
                    if(empty($city['name'])){
                        $city['name'] = '';
                    }
                    //获取src
                    $src = $_GET['src'];

                    $info['city'] = $city['name'];
                    $this->assign("src", $src);
                    $this->assign('info',$info);
                    $this->assign("basic",$basic);
                    $this->display("sheji-dyqd");
                }
                // 20181130 新增报价页
                public function baojiajzrk(){
                    //传入source，没有传入则默认为311(即本页)
                    $source = $_GET['fi'];
                    if(empty($source)){
                        $source = 311;
                    }
                    $this->assign('source',$source);

                    //seo 标题/描述/关键字
                    $basic["head"]["title"] = "装修报价";
                    $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
                    $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

                    //获取该城市第一个区，用于显示默认城市
                    $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
                    $this->assign('cityInfo',session('m_cityInfo'));
                    $city = session('m_cityInfo');
                    if(empty($city['name'])){
                        $city['name'] = '';
                    }
                    //获取src
                    $src = $_GET['src'];

                    $info['city'] = $city['name'];
                    $this->assign("src", $src);
                    $this->assign('info',$info);
                    $this->assign("basic",$basic);
                    $this->display("baojia-jzrk");
                }
                // 20181217 新增设计发单页(删除面积输入框)
                public function shejidyqd_2(){
                    //传入source，没有传入则默认为311(即本页)
                    $source = $_GET['fi'];
                    if(empty($source)){
                        $source = 311;
                    }
                    $this->assign('source',$source);

                    //seo 标题/描述/关键字
                    $basic["head"]["title"] = "户型设计";
                    $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
                    $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

                    //获取该城市第一个区，用于显示默认城市
                    $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
                    $this->assign('cityInfo',session('m_cityInfo'));
                    $city = session('m_cityInfo');
                    if(empty($city['name'])){
                        $city['name'] = '';
                    }
                    //获取src
                    $src = $_GET['src'];

                    $info['city'] = $city['name'];
                    $this->assign("src", $src);
                    $this->assign('info',$info);
                    $this->assign("basic",$basic);
                    $this->display("sheji-dyqd-2");
                }


               public function baojia1jzrk(){
                          //传入source，没有传入则默认为311(即本页)
                          $source = $_GET['fi'];
                          if(empty($source)){
                              $source = 311;
                          }
                          $this->assign('source',$source);

                          //seo 标题/描述/关键字
                          $basic["head"]["title"] = "装修报价";
                          $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
                          $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

                          //获取该城市第一个区，用于显示默认城市
                          $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
                          $this->assign('cityInfo',session('m_cityInfo'));
                          $city = session('m_cityInfo');
                          if(empty($city['name'])){
                              $city['name'] = '';
                          }
                          //获取src
                          $src = $_GET['src'];

                          $info['city'] = $city['name'];
                          $this->assign("src", $src);
                          $this->assign('info',$info);
                          $this->assign("basic",$basic);
                          $this->display("baojia1-jzrk");
                      }


    //底部按钮报价成功页
    public function baojia_result()
    {
        if (isset($_COOKIE["w_qizuang_n"])) {
            $orderid = cookie("w_qizuang_n");
            $order = D("Orders")->getOrderInfoById($orderid);

            if (count($order) > 0) {
                $result = $this->calculatePrice($order["mianji"], $order["huxing"]);

                $basic["head"]["title"] = $order["cname"] . "_" . $order["fengge"] . "_" . $order["hxname"] . "装修报价明细-齐装网";

                $this->assign("basic", $basic);
                $this->assign("order", $order);
                $this->assign("info", $result);
                $this->display("baojia-result");
                die();
            }
        }
        header("LOCATION:http://m.qizuang.com/baojia/");
    }
                //底部按钮设计成功页
                public function sheji_result(){
                    $orderid = cookie("w_qizuang_n");
                    $this->assign("orderid",$orderid);
                    $this->display("sheji-result");
                }
                //底部按钮选择装修公司成功页
                public function xgs_result(){
                    $orderid = cookie("w_qizuang_n");
                    $this->assign("orderid",$orderid);
                    $this->display("xgs-result");
                }
                //底部按钮选择装修公司成功页
                public function ruzhu_result(){
                    $orderid = cookie("w_qizuang_n");
                    $this->assign("orderid",$orderid);
                    $this->display("ruzhu-result");
                }

}
