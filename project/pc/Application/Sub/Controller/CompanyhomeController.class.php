<?php

//装修公司前台

namespace Sub\Controller;
use Sub\Common\Controller\SubBaseController;

class CompanyhomeController extends SubBaseController{

    public function _initialize(){
        parent::_initialize();
        $uri = $_SERVER['REQUEST_URI'];
        preg_match('/html$/',$uri,$m);
        if (count($m) == 0) {
            preg_match('/\/$/',$uri,$m);
            $parse = parse_url($uri);
            if (count($m) == 0 && empty($parse["query"])) {
                header( "HTTP/1.1 301 Moved Permanently");
                header("Location: http://".$this->bm.".".C("QZ_YUMING").$uri."/");
            }
        }
        //添加顶部搜索栏信息
        $this->assign('serch_uri','companysearch');
        $this->assign('serch_type','装修公司');
        $this->assign('holdercontent','全国超过十万家装修公司为您免费设计');
        $this->assign("tabIndex",3);
        $this->assign("cityinfo",$this->cityInfo);
    }

    public function index(){
        I("get.id") == "" && $this->_error();

        $bm = $this->bm;
        //跳转到手机端
        if (ismobile()) {
            header( "HTTP/1.1 301 Moved Permanently");
            header("Location: http://". C('MOBILE_DONAMES').'/'.$bm. $_SERVER['REQUEST_URI']);
            exit();
        }
        $cityInfo = $this->cityInfo;
        $id = I("get.id");

        $userInfo = S('Cache:SubUserInfoUpdate:'.$id);
        if(!$userInfo){
            //用户信息
            $user = $this->getUserInfo($id, $cityInfo["id"]);
            if(count($user) == 0){
                //重新检测装修公司
                $u = $this->getUserInfo($id);
                if(count($u) > 0){
                    $cs = $u["cs"];
                    //根据城市编号查询城市信息
                    $area = D("Quyu")->getCityById($cs);
                    $url = "http://".$area["bm"].".".C("QZ_YUMING")."/company_home/".I("get.id").'/';
                    header( "HTTP/1.1 301 Moved Permanently" );
                    header( "Location:".$url);
                    die();
                }
                $this->_error();
                die();
            }

            $userInfo["user"] = $user;

            //最新订单
            $orders = $this->getOrders($id,5,$user["on"]);
            $userInfo["orders"] = $orders;

            //获取设计师
            $designer = $this->getDesignerList($id,5);
            $userInfo["designer"] = $designer;

            //获取家装案例
            $cases = D("Cases")->getCasesListByComId(0,6,$id,$_SESSION["cityId"],array(1),'',1);
            $userInfo["jzcase"] = $cases;
            //获取公装案例
            $cases = D("Cases")->getCasesListByComId(0,6,$id,$_SESSION["cityId"],array(2),'',1);
            $userInfo["gzcase"] = $cases;
            //获取在建工地案例
            $cases = D("Cases")->getCasesListByComId(0,6,$id,$_SESSION["cityId"],array(3),'',1);
            $userInfo["zjcase"] = $cases;

            //业主评论
            $comments = $this->getComments($id,$_SESSION["cityId"],1,3,true);
            $userInfo["comments"] = $comments["comments"];

            //问答
            $userInfo["wenda"] = D("Common/Ask")->getNewAnwserByCompany($id,3);

            $userInfo['user']['cal'] = $this->getCalNumber($userInfo['user']['cal']);
            S('Cache:SubUserInfoUpdate:'.$id,$userInfo,900);
        }

        if($userInfo['user']['video'] == ''){
            $userInfo['user']['video'] = OP('videoQizuang480');
            $userInfo['user']['video_type'] = 'jw';
            $userInfo['user']['isautoplay'] = 'false';
            $userInfo['user']['video_image'] = '/assets/common/plugin/jwplayer/videoface640.jpg';
        }else{
            $filetype = trim(substr(strrchr($userInfo['user']['video'], '.'), 1));
            if($filetype == 'mp4'){
                $userInfo['user']['video_type'] = 'jw';
                $userInfo['user']['isautoplay'] = 'true';
            }
        }

        //获取3D效果列表
        $threedlist = D('Cases')->getThreedListByComId(0,6,$id,$_SESSION["cityId"],array(4),'',1);
        //seo 标题/描述/关键字
        $citys = json_decode($userInfo["citys"],true);
        $keys["title"] = $userInfo["user"]["qc"];
        $keys["keywords"] = $userInfo["user"]["qc"].",".$userInfo["user"]["qc"]."怎么样";
        $keys["description"] = $userInfo["user"]["qc"].$cityInfo["name"]."为您提供"
                            .$cityInfo["name"]."装修设计方案与报价、".$cityInfo["name"]."装修优惠、免费装修咨询预约以及装修案例效果图。";
        $this->assign("keys",$keys);

        //添加装修公司点击量
        D("Common/User")->editUvAndPv(I("get.id"),"pv");
        $this->assign("userInfo",$userInfo);
        $this->assign("tabIndexOld",1);
        $this->assign('threedlist',$threedlist);
        $this->display();
    }

    //装修公司案例列表页面
    public function cases(){
        $bm = $this->bm;
        if(I("get.id") == ""){
            $this->_error();
        }
        $id = I("get.id");
        //跳转到手机端
        if (ismobile()) {
            header( "HTTP/1.1 301 Moved Permanently");
            header("Location: http://". C('MOBILE_DONAMES').'/'.$bm. $_SERVER['REQUEST_URI']);
            exit();
        }

        $userInfo = S('Cache:SubCompanyCase:'.$bm.':'.I("get.id"));
        if(!$userInfo){
            //用户信息
            $user = $this->getUserInfo($id, $cityInfo["id"]);

            if(count($user) == 0){
                $this->_error();
                die();
            }
            $userInfo["user"] = $user;
            //家装类型列表
            $types = $this->getCasesClass($id,$_SESSION["cityId"],1);
            $userInfo["jzTypes"] = $types;

            //公装类型列表
            $types = $this->getCasesClass($id,$_SESSION["cityId"],2);
            unset($types[6]);
            unset($types[7]);
            $userInfo["gzTypes"] = $types;

            //在建工地类型列表
            $types = $this->getCasesClass($id,$_SESSION["cityId"],3);
            $userInfo["zjTypes"] = $types;

            S('Cache:SubCompanyCase:'.$bm.':'.I("get.id"),$userInfo,900);
        }

        $content = $userInfo["user"]["qc"];
        //装修案例列表
        $pageIndex = 1;
        $pageCount = 9;
         if(I('get.p') !== ""){
            $pageIndex = I('get.p');
        }

        if(I('get.cl') !== ""){
            $classid = I('get.cl');
            switch ($classid) {
                case '1':
                    $content .="家装";
                    break;
                case '2':
                     $content .="公装";
                    break;
                case '3':
                     $content .="在建工地";
                    break;
                case '4':
                     $content .="3D效果图";
                    break;
            }
        }

        if(I('get.t') !== ""){
            $type = I('get.t');
            switch ($classid) {
                case '1':
                    foreach ($userInfo["jzTypes"] as $key => $value) {
                       if($value["huxing"] ==  $type){
                            $content .=$value["name"];
                            break;
                       }
                    }
                    break;
                case '2':
                    foreach ($userInfo["gzTypes"] as $key => $value) {
                       if($value["huxing"] ==  $type){
                            $content .=$value["name"];
                            break;
                       }
                    }
                    break;
                case '3':
                    foreach ($userInfo["zjTypes"] as $key => $value) {
                       if($value["huxing"] ==  $type){
                            $content .=$value["name"];
                            break;
                       }
                    }
                    break;
            }
        }else{
            $type = '';
        }

        //输出当前Base Url
        $userInfo['url'] = '/company_case/'.I("get.id").'?cl='.$classid.'&t='.$type;
         //添加默认选中状态
        $this->assign('choose_menu', 'cl='.$classid.'&t='.$type);
        if(__SELF__ == '/company_case/'.$userInfo['user']['id']){
            $info['mobileagent'] = 'http://'.C('MOBILE_DONAMES').'/'.$bm.'/company_case/'.$userInfo['user']['id'];
        }
        //seo 标题/描述/关键字
        $keys["title"] = $content."装修案例效果图";
        $keys["keywords"] = $content."装修案例效果图";
        $keys["description"] = $content."装修案例效果图";
        $this->assign("keys",$keys);
        //如果是3D效果图的话用另一个方法获取
        if($classid == 4){
            $cases = $this->getThreedListByComId($pageIndex,$pageCount,I("get.id"),$_SESSION["cityId"],$classid,$type);
        }else{
            $cases = $this->getCasesListByComId($pageIndex,$pageCount,I("get.id"),$_SESSION["cityId"],$classid,$type);
        }
        $userInfo["cases"] = $cases["cases"];
        $userInfo["page"] = $cases["page"];
        $this->assign("userInfo",$userInfo);
        $this->assign("tabIndexOld",3);
        $this->assign("info",$info);
        $this->display();
    }

     //装修公司设计师页面
    public function team(){
        $bm = $this->bm;
        if(I("get.id") == ""){
            $this->_error();
        }
        $id = I("get.id");
        //跳转到手机端
        if (ismobile()) {
            header( "HTTP/1.1 301 Moved Permanently");
            header("Location: http://". C('MOBILE_DONAMES').'/'.$bm. $_SERVER['REQUEST_URI']);
            exit();
        }

        $type = I("get.type");
        $bm = $this->bm;
        $cityInfo = $this->cityInfo;

        if(!empty($type)){
            $url = 'http://'.$bm. '.' .C('QZ_YUMING').'/company_team/'.$id;
            header( "HTTP/1.1 301 Moved Permanently" );
            header( "Location:".$url);
            die();
        }
        $userInfo = S('Cache:SubCompanyTeam:'.$bm.':'.I("get.id"));
        if(!$userInfo){

            $id = I("get.id");
            //用户信息
            $user = $this->getUserInfo($id, $cityInfo["id"]);
            if(count($user) == 0){
                $this->_error();
                die();
            }
            $userInfo["user"] = $user;
            //获取装修公司职位信息
            $zw = D("Team")->getZwInfo($id);
            $userInfo["zw"] = $zw;

            S('Cache:SubCompanyTeam:'.$bm.':'.I("get.id"),$userInfo,900);
        }

        //seo 标题/描述/关键字
        $keys["title"] = $userInfo["user"]["qc"]."设计团队";
        $keys["keywords"] = $userInfo["user"]["qc"]."设计团队,".$userInfo["user"]["qc"]."设计团师, 装修设计师";
        $keys["description"] = $userInfo["user"]["qc"]."设计团队";
        $this->assign("keys",$keys);

        //获取设计师列表
        $pageIndex =1;
        $pageCount = 15;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
        }

        $team = $this->getTeamDesignerList($id,"",2,$pageIndex,$pageCount);

        $userInfo["team"] = $team["team"];
        $userInfo["page"] = $team["page"];
        $this->assign("userInfo",$userInfo);
        //菜单导航
        $this->assign("tabIndexOld",2);
        $this->display();
    }

    //装修公司优惠活动
    public function event(){
        $cityInfo = $this->cityInfo;
        $bm = $this->bm;
        $companyId = I('get.id');
        $info["user"] = $this->getUserInfo($companyId,$_SESSION["cityId"]);

        if(empty($companyId)){
            $this->error();
        }

        $pageIndex = 1;
        $pageCount = 10;
        $condition['cid'] = $companyId;
        $condition['check'] = array('EQ','1');
        $condition['del'] = array('EQ','1');

        if(!empty($_GET["p"])){
            $pageIndex = remove_xss($_GET["p"]);
            $pageContent ="第".$pageIndex."页";
        }

        $result = $this->getEventList($condition,$pageIndex,$pageCount);
        $list = $result["list"];
        foreach ($list as $key => $value) {
            $list[$key]['text'] = htmlToText($value['text']);
            //0 暂停 1 等待中 2正在进行 3过期
            if($value['state'] == '0'){
                $list[$key]['status'] = '0';
            }else{
                //等待中
                if(time() <= $value['start']){
                    $list[$key]['status'] = '1';
                }
                //正在进行
                if(time() >= $value['start'] && time() <= $value['end']){
                    $list[$key]['status'] = '2';
                }
                //过期
                if(time() >= $value['end']){
                    $list[$key]['status'] = '3';
                }
            }
        }

        //dump($list);

        //seo 标题/描述/关键字
        $keys["title"] = $userInfo["user"]["qc"]."优惠活动";
        $keys["keywords"] = $userInfo["user"]["qc"]."优惠活动,".$userInfo["user"]["qc"]."优惠活动";
        $keys["description"] = $userInfo["user"]["qc"]."优惠活动";
        $this->assign("keys",$keys);

        //dump($list);
        $this->assign("list",$list);
        $this->assign("page",$result["page"]);
        $this->assign("userInfo",$info);
        $this->assign("tabIndexOld",4);
        $this->display();
    }

    //装修公司优惠活动详情页
    public function eventView(){
        $cityInfo = $this->cityInfo;
        $bm = $this->bm;
        $id = I('get.id');
        $event = D('Companys')->getEvent($id);
        $companyId = $event['cid'];
        $info["user"] = $this->getUserInfo($companyId,$_SESSION["cityId"]);

        //0 暂停 1 等待中 2正在进行 3过期
        if($event['state'] == '0'){
            $event['status'] = '0';
        }else{
            //等待中
            if(time() <= $event['start']){
                $event['status'] = '1';
            }
            //正在进行
            if(time() >= $event['start'] && time() <= $event['end']){
                $event['status'] = '2';
            }
            //过期
            if(time() >= $event['end']){
                $event['status'] = '3';
            }
        }

        D('Companys')->updateEventViews($id);

        //seo 标题/描述/关键字
        $keys["title"] = $event['title'];
        $keys["keywords"] = $userInfo["user"]["qc"]."优惠活动,".$userInfo["user"]["qc"]."优惠活动";
        $keys["description"] = $event['title']."优惠活动";
        $this->assign("keys",$keys);

        $this->assign("info",$event);
        $this->assign("userInfo",$info);
        $this->assign("tabIndexOld",4);
        $this->display('event_view');
    }

    //装修公司资讯详细页面
    public function article(){
        $bm = $this->bm;
        if(I("get.id") !== ""){
            $articleInfo = S('Cache:SubCompanyArticle:'.$bm.':'.I("get.id"));
            if(!$articleInfo){
                $id = I("get.id"); //文章id
                //通过文章id获取本文章所属公司信息
                $companyinfo = D("Common/Info")->getCompanyInfoByArticleId($id);
                if(empty($companyinfo)){
                    $this->_error();
                    die();
                }
                $cid = $companyinfo['id']; // 公司id
                //公司用户信息
                $user = $this->getUserInfo($cid,$_SESSION["cityId"]);
                if(count($user) == 0){
                    $this->_error();
                    die();
                }

                //获取资讯内容
                $articleInfo["user"] = $user;
                $article = $this->getArticleInfo($cid,$id,$_SESSION["cityId"],$user["on"]);
                $articleInfo["article"] = $article;
                //获取资讯分类列表
                $types = $this->getZixunTypeList($cid,$_SESSION["cityId"]);
                $articleInfo["types"] = $types;
                //本文章分类
                if ($types['zxType']) {
                    foreach ($types['zxType'] as $key => $value) {
                        if ($value['id'] == $article['type']) {
                            $articleInfo["type"] = $value['name'];
                            break;
                        }
                    }
                }


                //文章描述  取正文前面 100个字符, 过滤html ,过滤换行
                $description = mbstr($article['text'],0,1000,"utf8"); //先取1000个字符,这样做的目的是避免前面都是空格或者换行取出来的数据不对
                $description = str_replace(array("\n","\r\n","\r"), '', strip_tags($description)); //过滤html php 过滤换行
                $description = trim(mbstr($description,0,100,"utf8"))."…"; //去首位空格 拼接 ...
                $articleInfo["description"] = $description;

                S('Cache:SubCompanyArticle:'.$bm.':'.$id,$articleInfo,900);
            }

			 //获取城市信息
			$citys = D("Common/Area")->getCityArray($_SESSION["cityId"]);
			$articleInfo["citys"] = json_encode($citys);

            $articleInfo["collect"] = false;
            //查询用户是否关注过该案例
            if(isset($_SESSION["u_userInfo"])){
                $count =  D("Usercollect")->getCollectCount(I("get.id"),$_SESSION['u_userInfo']['id'],5);
                if($count > 0){
                    $articleInfo["collect"] = true;
                }
            }

            //seo 标题/描述/关键字
            $keys["title"] = $articleInfo["article"]["title"]. '_' . $articleInfo["type"];
            $keys["keywords"] = $articleInfo["article"]["gjz"] ? $articleInfo["article"]["gjz"] : $articleInfo["article"]["title"];
            $keys["description"] = $articleInfo["description"];
            $this->assign("keys",$keys);

            $this->assign("cityid",$this->cityInfo['id']);

            //如果是咨询文章，显示招标弹窗按钮
            if( $articleInfo["article"]["type"] == 1){
                 $this->assign("isshow",1);
            }

            //菜单导航
            $this->assign("tabIndexOld",6);
            $this->assign("userInfo",$articleInfo);
            $this->display();
        }else{
            $this->_error();
        }
    }

    //装修公司资讯列表页
    public function zixun(){
        $bm = $this->bm;
        if(I("get.id") !== ""){
            $userInfo = S('Cache:SubCompanyComment:'.$bm.':'.I("get.id"));
            if(!$userInfo){
                $id = I("get.id");
                //用户信息
                $user = $this->getUserInfo($id,$_SESSION["cityId"]);
                if(count($user) == 0){
                    $this->_error();
                    die();
                }
                $userInfo["user"] = $user;
                S('Cache:SubCompanyComment:'.$bm.':'.I("get.id"),$userInfo,900);
            }

            $content = $userInfo["user"]["qc"];
            //获取资讯分类列表
            $types = $this->getZixunTypeList(I("get.id"),$_SESSION["cityId"]);

            $userInfo["zixun_types"] = $types;
            //获取资讯列表
            $pageIndex = 1;
            $pageCount = 10;
            if(I("get.p")!== ""){
                $pageIndex = I("get.p");
            }


            if(I("get.t")!== ""){
                $type = str_replace("/","",I("get.t"));
                foreach ($userInfo["types"]["zxType"] as $key => $value) {
                    if($value["id"] == $type){
                         $content .=$value["name"];
                        break;
                    }
                }
            }

            if(I("get.act")!== ""){
                $active = str_replace("/","",I("get.act"));
            }

            //seo 标题/描述/关键字
            $keys["title"] = $content."_装修资讯";
            $keys["keywords"] = $content;
            $keys["description"] = $content."发布的装修资讯,".$content."的装修优惠信息";
            $this->assign("keys",$keys);

            $articles = $this->getArticleList(I("get.id"),$_SESSION["cityId"],$pageIndex,$pageCount,$type,$active);
            $userInfo["articles"] = $articles["info"];
            $userInfo["page"] = $articles["page"];
            $this->assign("userInfo",$userInfo);

            //菜单导航
            $this->assign("tabIndexOld",6);

            //获取报价模版
            $this->assign("order_source",108);
            $t = T("Common@Order/orderTmp");
            $orderTmp = $this->fetch($t);
            $this->assign("orderTmp",$orderTmp);
            $this->display();
        }else{
            $this->_error();
        }
    }

    //装修公司评论页
    public function comment(){
        $bm = $this->bm;
        //跳转到手机端
        if (ismobile()) {
            header( "HTTP/1.1 301 Moved Permanently");
            header("Location: http://". C('MOBILE_DONAMES').'/'.$bm. $_SERVER['REQUEST_URI']);
            exit();
        }

        if(I("get.id") !== ""){
            $userInfo = S('Cache:SubCompanyComment:'.$bm.':'.I("get.id"));
            if(!$userInfo){
                $id = I("get.id");
                //用户信息
                $user = $this->getUserInfo($id,$_SESSION["cityId"]);

				if(count($user) == 0){
                    $this->_error();
                    die();
                }
                $userInfo["user"] = $user;
                S('Cache:SubCompanyComment:'.$bm.':'.I("get.id"),$userInfo,900);
            }
            $pageIndex = 1;
            $pageCount = 6;
            if(I("get.p") !== ""){
                $pageIndex = I("get.p");
            }

            //seo 标题/描述/关键字
            $keys["title"] = $userInfo["user"]["qc"]."评价_业主点评";
            $keys["keywords"] = $userInfo["user"]["qc"]."评价,业主点评";
            $keys["description"] = $userInfo["user"]["qc"]."评价";
            $this->assign("keys",$keys);

            //业主评论
            $comments = $this->getComments(I("get.id"),$_SESSION["cityId"],$pageIndex,$pageCount,true);

            $userInfo["comments"] = $comments["comments"];
            $userInfo["page"] = $comments["page"];
            $this->assign("userInfo",$userInfo);
            $this->display();
        }else{
            $this->_error();
        }
    }

    //装修公司关于我们
    public function about(){
        $bm = $this->bm;
        if(I("get.id") !== ""){
            $userInfo = S('Cache:SubCompanyAbout:'.$bm.':'.I("get.id"));
            if(!$userInfo){

                $id = I("get.id");
                //用户信息
                $user = $this->getUserInfo($id, $cityInfo["id"]);
                $companyInfo = $this->getCompanyInfo($id,$_SESSION["cityId"]);
                $user = array_merge($user,$companyInfo);

                if(count($user) == 0){
                    $this->_error();
                    die();
                }

                //非会员或假会员更改联系方式
                if(!($user["on"]  == 2 && $user["fake"] ==0)){
                    $user["tel"] = OP("QZ_CONTACT_TEL400");
                    $user["cals"] = "";
                    $user["cal"] = OP("QZ_CONTACT_TEL400");
                    $user["dz"] = "";
                    $user["luxian"] = "";
                    $user["qq"] = OP("QZ_CONTACT_QQ1");
                }
                $userInfo["user"] = $user;
                S('Cache:SubCompanyAbout:'.$bm.':'.I("get.id"),$userInfo,900);
            }

            //seo 标题/描述/关键字
            $citys = json_decode($userInfo["citys"],true);
            $keys["title"] = $userInfo["user"]["qc"]."介绍";
            $keys["keywords"] = $userInfo["user"]["qc"]."简介";
            $keys["description"] = mb_substr($userInfo["user"]["jianjie"], 0,100,"utf-8");
            $this->assign("keys",$keys);

            if($userInfo['user']['video'] == ''){
                $userInfo['user']['video'] = OP('videoQizuang480');
                $userInfo['user']['video_type'] = 'jw';
                $userInfo['user']['isautoplay'] = 'false';
                $userInfo['user']['video_image'] = '/assets/common/plugin/jwplayer/videoface640.jpg';
            }else{
                $filetype = trim(substr(strrchr($userInfo['user']['video'], '.'), 1));
                if($filetype == 'mp4'){
                    $userInfo['user']['video_type'] = 'jw';
                    $userInfo['user']['isautoplay'] = 'true';
                }
            }

            $this->assign("userInfo",$userInfo);
            //菜单导航
            $this->assign("tabIndexOld",5);
            $this->display();
        }else{
            $this->_error();
        }
    }

    //装修公司问答
    public function wenda(){
        $bm = $this->bm;
        $id = I("get.id");

        empty($id) && $this->_error();

        $user = $this->getCompanyInfo($id,$_SESSION["cityId"]);
        if(count($user) == 0){
            $this->_error();
        }

        $pageIndex = 1;
        $pageCount = 10;
        if(!empty($_GET["p"])){
            $pageIndex = remove_xss($_GET["p"]);
            $pageContent ="第".$pageIndex."页";
        }
        $userInfo["user"] = $user;

        //获取资讯分类列表
        $types = $this->getZixunTypeList($id,$_SESSION["cityId"]);
        $userInfo["zixun_types"] = $types;


        $condition['a.uid'] = $id;
        $wenda = $this->getAskList($condition,$pageIndex,$pageCount);
        $this->assign("wenda",$wenda['list']);
        $this->assign("page",$wenda['page']);

        //seo 标题/描述/关键字
        $keys["title"] = $userInfo["user"]["qc"].'装修问答';
        $keys["keywords"] = $userInfo["user"]["qc"].'装修问答';
        $keys["description"] = $userInfo["user"]["qc"].'装修问答';
        $this->assign("keys",$keys);
        $this->assign("userInfo",$userInfo);
        //菜单导航
        $this->assign("tabIndexOld",7);
        $this->display();
    }

    //保存评论
    public function setComment(){
        if($_POST){
            //用户登录后
            if(isset($_SESSION["u_userInfo"])){
                $verify = session("geetest_verify");
                if($verify === true){
                    session("geetest_verify",null);

                    //查询当前用户的user_type
                    $u_data = D("Companys")->getVipUserInfoById($_SESSION["u_userInfo"]['id']);


                    $result = D("Comment")->getLastPost(session("u_userInfo.id"));
                    if (count($result) > 0) {
                        $offset = floor((time() - $result["time"])%86400/60);
                        //发送间隔
                        if($u_data['user_type'] != 3){
                            if ($offset <= 3) {
                                $this->ajaxReturn(array("data"=>"","info"=>"您的操作过于频繁，请休息3分钟后再试！","status"=>0));
                                exit();
                            }
                        }
                    }


                    import('Library.Org.Util.App');
                    import('Library.Org.Util.Fiftercontact');
                    $filter = new \Fiftercontact();
                    $data = array(
                            "text"=>$filter->filter_common(I("post.content"),array("Sbc2Dbc","filter_script","filter_empty","filter_link","filter_url",array('filter_sensitive_words',array(2,3,5)))),
                            "comid"=>I("post.id"),
                            "time"=>time(),
                            "name"=>$_SESSION["u_userInfo"]["name"],
                            "userid"=>$_SESSION["u_userInfo"]["id"],
                            "isveritfy"=>0,//默认审核
                            "cs"=>I("post.cs"),
                            "count"=>10,
                            "ip"=>\App::get_client_ip(),
                            "sj"=>I("post.sj")*2,
                            "fw"=>I("post.fw")*2,
                            "sg"=>I("post.sg")*2,
                            "step"=>I("post.step"),
                            "lp"=>$filter->fifter_contact(I("post.lp"))
                    );

                    $badwords_array = array (
                      '顾海华' => '`&[顾海华]&`',
                      '320625195109242159' => '`&[320625195109242159]&`',
                      '绑架犯' => '`&[绑架犯]&`',
                      '断子绝孙' => '`&[断子绝孙]&`',
                      '王八蛋' => '`&[王八蛋]&`',
                      '小畜牲' => '`&[小畜牲]&`',
                      '顾文新' => '`&[顾文新]&`',
                      '贼羔子' => '`&[贼羔子]&`',
                      '贼羔子' => '`&[贼羔子]&`',
                      '操你' => '`&[操你]&`',
                      '傻逼' => '`&[傻逼]&`',
                    );

                    //关键词过滤
                    $data['text'] = strtr($data['text'],$badwords_array);

                    if(strstr($data['text'],'`&[') != ''){
                        //设状态为2
                        $data['isveritfy'] = '2';
                    }

                    $result = D("Comment")->setComment($data);

                    if($result !== false){
                        //更新评论数量
                        $comid = I("post.id");
                        $tempdata['comment_count'] = M('comment')->where(array('isveritfy' => '0','comid' => $comid))->count();
                        $comment_score = M('comment')->field('avg(if(fw != 0,((fw+sg+sj)/3),null)) as score')->
                        where(array('isveritfy' => '0','comid' => $comid))->find();
                        $tempdata['comment_score'] = $comment_score['score'];
                        M("user_company")->where(array('userid' => $comid))->save($tempdata);

                        $this->ajaxReturn(array("data"=>'',"info"=>"谢谢您的评论！","status"=>1));
                    }
                }
            }else{
                $this->ajaxReturn(array("data"=>"","info"=>"用户未登录,请先登录!","status"=>0));
            }
        }
        $this->ajaxReturn(array("data"=>"","info"=>"非法提交","status"=>0));
    }

    //获取活动列表
    private function getEventList($condition,$pageIndex = 1,$pageCount = 10){
        import('Library.Org.Page.LitePage');
        $result = D("Companys")->getEventList($condition,($pageIndex-1) * $pageCount,$pageCount);
        $count = $result['count'];
        $list = $result['result'];
        $config  = array("prev","next");
        $page = new \LitePage($pageIndex,$pageCount,$count,$config);
        $pageTmp =  $page->show();
        return array("list"=>$list,"page"=>$pageTmp,"num"=>$count);
	}

    //取问答列表
    private function getAskList($condition,$pageIndex = 1,$pageCount = 10){
        $pageIndex = intval($pageIndex)<=0?1:intval($pageIndex);
		import('Library.Org.Page.LitePage');
        $result = D("Common/Ask")->getAnwsersByUid($condition,($pageIndex-1) * $pageCount,$pageCount);
        $count = $result['count'];
        $list = $result['result'];
        $config  = array("prev","first","last","next");
        $page = new \LitePage($pageIndex,$pageCount,$count,$config);
        $pageTmp =  $page->show();
        return array("list"=>$list,"page"=>$pageTmp,"num"=>$count);
    }

    private function getArticleInfo($cid,$id,$cs,$on){
        import('Library.Org.Util.Fiftercontact');
        $filter = new \Fiftercontact();
        $article = D("Info")->getArticleInfo($cid,$id,$cs);
        //处理文章中的超链接
        if($on == 2){
            //会员公司不过滤联系方式
            $article["text"] =$filter->filter_common($article["text"],array("Sbc2Dbc","filter_script","filter_empty","filter_link","filter_url"));
        }else{
            $article["text"] =$filter->filter_text($article["text"]);
        }

        //代码废弃，暂时保留
        // $pattern ='/<a\s*href\s*=[\'|"](.*?)[\'|"]>(.*?)<\/a>/is';
        // preg_match_all($pattern,$article["text"], $matches);
        // if(!empty($matches[0])){
        //     foreach ($matches[0] as $key => $value) {
        //         if(!empty($matches[2])){
        //             foreach ($matches[2] as $k => $v) {
        //                 $article["text"] = str_ireplace($value,$v,$article["text"]);
        //             }
        //         }
        //     }
        // }
        $patt = '/<img\s*alt=[\'|"](.*?)[\'|"]\s*src=[\'|"](\/upload\/.*?)[\'|"]\s*\/>/is';
        preg_match_all($patt,$article["text"], $matches);
        if(!empty($matches[2])){
            foreach ($matches[2] as $key => $value) {
                $path = "http://".C("STATIC_HOST1")."/";
                $article["text"] = str_ireplace($value, $path.$value,$article["text"]);
            }
        }

        //$article["text"] = $filter->fifter_contact($article["text"]);
        return $article;
    }

    /**
     * [getZixunTypeList description]
     * @return [type] [description]
     */
    private function getZixunTypeList($id,$cs){
        $result = D("Info")->getZixunTypeList($id,$cs);
        $types = array();
        foreach ($result as $key => $value) {
            //将优惠活动信息分离
            if($value["id"] !== "1"){
                $types["zxType"][] = $value;
            }else{
                $types["yxhd"]["hd"] = $value["yxcount"];
                $types["yxhd"]["historyhd"] = $value["wxcount"];
            }
        }
        return $types;
    }

    /**
     * 获取案例图片
     * @param  string $comid   [description]
     * @param  string $cs      [description]
     * @param  string $classid [description]
     * @return [type]          [description]
     */
    private function getCasesListByComId($pageIndex,$pageCount,$comid ='',$cs ='',$classid='',$type ='')
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Cases")->getCasesListByComIdCount($comid,$cs,$classid,$type,1);
        if($count > 0){
            import('Library.Org.Page.LitePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \LitePage($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();
            $list =D("Cases")->getCasesListByComId(($page->pageIndex-1)*$pageCount,$pageCount,$comid,$cs,$classid,$type,1);

            return array("cases"=>$list,"page"=>$pageTmp);
       }
       return null;
    }

    /**
     * 获取装修公司案例类型
     * @return [type] [description]
     */
    private function getCasesClass($id,$cs,$classid){
        $result =  D("Cases")->getCasesClass($id,$cs,$classid);
        return $result;
    }

    /**
     * 获取装修公司所有信息
     * @return [type] [description]
     */
    private function getCompanyInfo($id,$cs){
          $result = D("User")->getCompanyInfo($id,$cs);
          import('Library.Org.Util.Fiftercontact');
          $filter = new \Fiftercontact();
          $content_q1 = OP("QZ_CONTACT_QQ1");
          $content_t400 = OP("QZ_CONTACT_TEL400");
          foreach ($result as $key => $value) {
                if($key == 0){
                    $value["dz"] = str_replace("#", "",$value["dz"]);
                    $reg ='/(.*?)[.\n]/i';
                    $value["jianjie"] = $value["jianjie"]."\n"; //避免编辑时候，有序换行最后不添加换行造成的漏掉一条记录的问题
                    preg_match_all($reg, $value["jianjie"], $matches);
                    if(count($matches[1]) > 0){
                      $matches = array_filter($matches[1]);
                    }else{
                        $matches = array($value["jianjie"]);
                    }
                    foreach ($matches as $k => $v) {
                        $matches[$k] = $filter->filter_common($v,array("Sbc2Dbc","filter_script","fifter_blank","filter_tel","filter_mobile","filter_link","filter_url"));
                    }
                    $value["jianjie"] = $matches;//
                    $user = $value;
                    $user["pictures"] = array();
                }

                if(!empty($value["img"])){
                    $sub = array(
                            "img"=>$value["img"],
                            "img_host"=>$value["img_host"]
                                 );
                    $user["pictures"][]  = $sub;
                }
                //判断当前用户是否是会员 如果不是会员公司 将该公司电话和qq替换为我们的电话和qq
                if ($value['on']!=2)
                {
                    #替换电话
                    $user['tel']=$content_t400;//换成我们的电话
                    $user['cal']=$content_t400;//换成我们的电话
                    $user['cals']="";//电话前缀清空
                    $user['qq']=$content_q1;//换成我们的qq
                }
          }
          return $user;
    }

    /**
     * 获取设计师列表
     * @param  [type] $id        [用户编号]
     * @param  [type] $zw      [职位名称]
     * @param  [type] $pageIndex [description]
     * @param  [type] $pageCount [description]
     * @return [type]            [description]
     */
    private function getTeamDesignerList($id,$zw,$zt,$pageIndex,$pageCount)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("User")->getTeamDesignerListCount($id,$zw,$zt);

        if($count > 0){
            import('Library.Org.Page.LitePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \LitePage($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();

            //查询设计师资料
            $users = D("Companys")->getDesignerListByCompany($id,$zw,$zt,($page->pageIndex-1)*$pageCount,$pageCount);

            $ids = array();
            foreach ($users as $key => $value) {
                $ids[] = $value["uid"];
            }

            if(!empty($ids)){
                //查询设计师的设计作品
                $cases = D("Cases")->getDesinerCase($ids);
                foreach ($users as $key => $value) {
                    foreach ($cases as $k => $val) {
                        if($value["uid"] == $val["userid"]){
                           $users[$key]["child"][]=$val;
                        }
                    }
                }
            }

            return array("team"=>$users,"page"=>$pageTmp);
        }
        return null;
    }

    /**
     * 获取业主评论
     * @param  [type] $id    [公司编号]
     * @param  [type] $cs    [所在城市]
     * @param  [type] $limit [显示数量]
     * @param  [type] $reply [是否显示回复]
     * @return [type]        [description]
     */
    private function getComments($id,$cs,$pageIndex,$pageCount,$reply)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Comment")->getCommentByComIdCount($id,$cs);
        if($count > 0){
            import('Library.Org.Page.LitePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \LitePage($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();

            $comments = D("Comment")->getCommentByComId($id,$cs,($page->pageIndex-1)*$pageCount,$pageCount,$reply);
            foreach ($comments as $key => $value) {
                $total = $value["count"];
                if($value["sj"] != 0 && $value["fw"]!= 0 && $value["sg"]!= 0){
                    $total = round((($value["sj"]+$value["fw"]+$value["sg"])/3),1);

                }
                $comments[$key]["totalCount"] = $total;
            }

            return array("comments"=>$comments,"page"=>$pageTmp);
        }
        return null;
    }

    /**
     * 获取设计师列表
     * @param  [type] $id [公司编号]
     * @return [type]     [description]
     */
    private function getDesignerList($id,$limit){
        $designer = D("User")->getDesignerListByCompany($id,$limit);
        return $designer;
    }

    /**
     * 获取最新的订单信息
     * @param  [type] $id    [description]
     * @param  [type] $limit [description]
     * @return [type]        [description]
     */
    private function getOrders($id,$limit,$on){
        $orders = D("Orders")->getOrdersByComId($id,$limit);
        if(count($orders) < 5){
            //如果实际订单小于5个的时候，拿全部订单补充
            //计算偏移量
            $offset = 5 - count($orders);
            //取全部50条最新订单
            $allOrders = D("Common/Orders")->getNewOrders(50,4);
            //打乱订单
            shuffle($allOrders);
            $allOrders = array_slice($allOrders,0, $offset);
            //合并数组
            for ($i=0; $i <count($allOrders); $i++) {
                //有些订单没有填写小区，在尺给一个默认的小区
                if (empty($allOrders[$i]["xiaoqu"])) {
                    $allOrders[$i]["xiaoqu"] = '世纪佳园';
                }
                $sub = array(
                    "addtime"=>$on == 2?$allOrders[$i]["time"]:time(),
                    "name"=>$allOrders[$i]["name"],
                    "mianji"=>$allOrders[$i]["mianji"],
                    "lx"=>$allOrders[$i]["lx"],
                    "huxing"=>$allOrders[$i]["hxname"],
                    "yusuan"=>$allOrders[$i]["yusuan"],
                    "xiaoqu"=>$allOrders[$i]["xiaoqu"]
                            );
                array_push($orders, $sub);
            }
        }
        return $orders;
    }

    //电话处理~
    private function getCalNumber($tel){
        if(strstr($tel,"-")){
            return $tel;
        }elseif(strstr($tel,"400")){
            if(strlen($tel) == 10){
                $s = str_split($tel);
                $s['2'] = $s['2'].'-';
                $s['5'] = $s['5'].'-';
                return implode($s);
            }
        }
        return $tel;
    }

    /**
     * 获取资讯列表
     * @param  [type] $id [公司编号]
     * @param  [type] $cs [所在城市]
     * @return [type]     [description]
     */
    private function getArticleList($id,$cs,$pageIndex,$pageCount,$type ='',$active = '',$notClass="")
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Info")->getArticlesByComIdCount($id,$cs,$type,$active,$notClass,false);
        if($count > 0){
            import('Library.Org.Page.LitePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \LitePage($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();

            $info = D("Info")->getArticlesByComId($id,$cs,($page->pageIndex-1)*$pageCount,$pageCount,$type,$active,$notClass,false);
            return array("info"=>$info,"page"=>$pageTmp);
        }
        return null;
    }

    /**
     * 获取用户信息
     * @param  [type] $id [用户编号]
     * @param  [type] $cs [所在城市]
     * @return [type]     [description]
     */
    private function getUserInfo($id,$cs){
        $result =  D("User")->getUserInfoById($id,$cs);
		$user = array();
        if($result[0]["id"] != 0){
            $reg ='/[8|4][0]{2}\d+/';
            import('Library.Org.Util.Fiftercontact');
            $filter = new \Fiftercontact();
            $contact_q1 = OP('QZ_CONTACT_QQ1');
            $contact_q2 = OP('QZ_CONTACT_QQ2');
            $contact_t400 = OP("QZ_CONTACT_TEL400");
            $contact_address = OP("QZ_CONTACT_ADDRESS");

            foreach ($result as $key => $value) {
                if($key == 0){
                    $user["id"] = $value["id"];
                    $user["hengfu"] = $value["hengfu"];
                    $user["img_host"] = $value["img_host"];
                    $user["on"] = $value["on"];
                    $user["qc"] = $value["qc"];
                    $user["kouhao"] = $filter->filter_common($value["kouhao"],array("Sbc2Dbc","fifter_blank","filter_tel","filter_mobile","filter_link","filter_url"));
                    $user["logo"] = $value["logo"];
                    $user["pv"] = $value["pv"];
                    $user["jianjie"] = $filter->filter_common($value["jianjie"],array("Sbc2Dbc","filter_script","fifter_blank","filter_tel","filter_mobile","filter_link","filter_url"));
                    $user["jiawei"] = $value["jiawei"];
                    $user["fake"] = $value["fake"];
                    $user["nickname"] = empty($value["nickname"])== true?"家装咨询顾问":$value["nickname"];
                    $user["nickname1"] = empty($value["nickname1"])== true?"公装咨询顾问":$value["nickname1"];
                    $user["area"] = $value["area"];
                    $user["fw"] = $value["fw"];
                    $user["fg"] = $value["fg"];
                    $user["dcount"] = $value["dcount"];
                    $user["ccount"] = $value["ccount"];
                    $user["avgsj"] = round($value["avgsj"],1);
                    $user["avgfw"] = round($value["avgfw"],1);
                    $user["avgsg"] = round($value["avgsg"],1);
                    $user["avgcount"] = round($value["avgcount"],1) == 0?1:round($value["avgcount"],1);
                    $user["casecount"] = $value["casecount"];
                    $user["video"] = $value["video"];
                    preg_match($reg,$value["qq"],$m);
                    if(!empty($m)){
                      $user["qq400"] =  $value["qq"];
                    }

                    preg_match($reg,$value["qq1"],$m);
                    if(!empty($m)){
                      $user["qq401"] =  $value["qq1"];
                    }

                    $user["qq"] =  ($value["on"] == 2 && $value["fake"] ==0)?$value["qq"]:$contact_q1;
                    $user["qq1"] = ($value["on"] == 2 && $value["fake"] ==0)?$value["qq1"]:$contact_q2;
                    $user["dz"] = $value["dz"];
                    $user["cal"] = ($value["on"] == 2 && $value["fake"] ==0)?$value["cal"]:"";
                    $user["cals"] =($value["on"] == 2 && $value["fake"] ==0)?$value["cals"]:$contact_t400;
                    $user["tel"] = ($value["on"] == 2 && $value["fake"] ==0)?$value["tel"]:$contact_t400;

                    $user["cs"] = $value["cs"];
                    $user["gm"] = $value["gm"];
                    $user["chengli"] = date("Y年m月",strtotime($value["chengli"]));
                    //取计划任务中的数据计算好评率
					if( !empty($value['ping']) ){
						$user['haopinglve'] = round(($value['haoping']/$value['ping'])*100,2);
					}
					//此处代码，茁壮性有问题导致产生 NAN 数据，使得数据无法被json_encode 到底后面bug
					if( !empty($value['oldcount']) ){
						$user["oldgood"] =round(($value["oldgood"]/$value["oldcount"])*100,2);
					}else{
						$user["oldgood"] = 100;
					}
					if( !empty($value['newcount']) ){
						$user["good"] = round(($value["good"]/$value["newcount"])*100,2);
					}else{
						$user["good"] = 100;
					}
					$user["evaluation"] = $user["avgcuont"];
                    if($value["avgsj"] != 0 && $value["avgfw"] != 0 && $value["avgsg"] != 0){
                        $user["evaluation"] = round(($value["avgsj"]+$value["avgfw"]+$value["avgsg"])/3,2);
                    }
                }
                if(!empty($value["hid"])){
                    $sub = array(
                        "name"=>$value["shortname"],
                        "tel" => ($value["on"] == 2 && $value["fake"] ==0)?$value["htel"]:$contact_t400,
                        "addr"=>($value["on"] == 2 && $value["fake"] ==0)?$value["addr"]:$contact_address,
                        "qq"=> ($value["on"] == 2 && $value["fake"] ==0)?$value["qq3"]:$contact_q1,
                        "qq1"=>($value["on"] == 2 && $value["fake"] ==0)?$value["qq4"]:$contact_q1,
                        "nickname"=>empty($value["nickname2"])== true?"家装咨询顾问":$value["nickname2"],
                        "nickname1"=>empty($value["nickname3"])== true?"家装咨询顾问":$value["nickname3"]
                             );
                    $user["child"][] = $sub;
                }
            }
        }
        return $user;
    }

    /**
     * 获取3D效果图图片
     * @param  string $comid   [description]
     * @param  string $cs      [description]
     * @param  string $classid [description]
     * @return [type]          [description]
     */
    private function getThreedListByComId($pageIndex,$pageCount,$comid ='',$cs ='',$classid='',$type ='')
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);
        $count = D("Cases")->getCasesListByComIdCount($comid,$cs,$classid,$type,1);
        if($count > 0){
            import('Library.Org.Page.LitePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \LitePage($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();
            $list =D("Cases")->getThreedListByComId(($page->pageIndex-1)*$pageCount,$pageCount,$comid,$cs,$classid,$type,1);

            return array("cases"=>$list,"page"=>$pageTmp);
       }
       return null;
    }

}