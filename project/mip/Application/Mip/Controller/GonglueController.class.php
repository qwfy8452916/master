<?php
namespace Mip\Controller;
use Mip\Common\Controller\MipBaseController;

class GonglueController extends MipBaseController
{
    public function _initialize(){
        parent::_initialize();
        $uri = $_SERVER['REQUEST_URI'];
        $parse = parse_url("http://". C("MOBILE_DONAMES").$uri);
        if (empty($parse["query"])) {
            preg_match('/html$/',$uri,$m);
            if (count($m) == 0) {
                preg_match('/\/$/',$uri,$m);
                if (count($m) == 0) {
                    header( "HTTP/1.1 301 Moved Permanently");
                    header("Location: http://". C("MIP_DONAMES").$uri."/");
                }
            }
        }
    }

    public function index()
    {
        $info["lunbo"] = S("Cache:m:zx:lunbo");
        if (!$info["lunbo"]) {
            $info["lunbo"] = $list = $this->getSpecialModule(5);
            S("Cache:m:zx:lunbo",$info["lunbo"],900);
        }

        //装修风水
        $info["zxfs"] = S("Cache:m:zx:zxfs");
        if (!$info["zxfs"]) {
            $info["zxfs"] = $this->getArticleList(114,1,3,true);
            S("Cache:m:zx:zxfs",$info["zxfs"],900);
        }


        //局部装修
        $info["jbzx"] = S("Cache:m:zx:jbzx");
        if (!$info["jbzx"]) {
            $info["jbzx"] = $this->getArticleList(105,1,3,true);
            S("Cache:m:zx:jbzx",$info["jbzx"],900);
        }

        //装修风格
        $info["zxfg"] = S("Cache:m:zx:zxfg");
        if (!$info["zxfg"]) {
            $info["zxfg"] = $this->getArticleList(121,1,3,true);
            S("Cache:m:zx:zxfg", $info["zxfg"], 900);
        }

        //选材导购
        $info["xcdg"] = S("Cache:m:zx:xcdg");
        if (!$info["xcdg"]) {
            $info["xcdg"] = $this->getArticleList(143,1,3,true);
            S("Cache:m:zx:xcdg", $info["xcdg"], 900);
        }

        //添加canonical标签
        $info['header']['canonical'] = 'http://' . C('QZ_YUMINGWWW') . $_SERVER['REQUEST_URI'];


        $basic["head"]["keywords"] = "装修攻略,装修流程,装修风水,装修风格,局部装修";
        $basic["head"]["title"]    ="装修攻略_装修流程_装修风水_装修风格_局部装修-";
        $basic["head"]["description"] ="齐装网官方旅游攻略基于广大业主装修真实经历和心得的装修全攻略。装修流程、装修风水、装修风格、局部装修等全新装修攻略应有尽有。";

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $lunboCount = count($info['lunbo']);

        $this->assign("lunboCount", $lunboCount);
        $this->assign("head", $basic['head']);
        $this->assign("basic",$basic);
        $this->assign('source',322);//设置发单入口标识
        $this->assign("header","装修攻略");
        $this->assign("info",$info);
        $this->display();
    }

    /**
     * 选材导购页
     * @return [type] [description]
     */
    public function xcdg()
    {
        //检查是否跳转到静态URL地址
        $this->checkStaticUrl();

        //获取分类
        $typeArr = S('Cache:Zixun:typeArrXcdg');
        if(!$typeArr){
            //菜单列表，没有则加缓存
            $typeArr = D("WwwArticleClass")->getArticleClassById(143);
            S('Cache:Zixun:typeArrXcdg',$typeArr,900);
        }
        //由于SEO添加分类出现问题，要求强行添加二级菜单，故此处文章分类进行强行分配处理，输出的内容已经写死
        $jiancai['title'] = "建材";
        $jiancai['content'] = [
            0 => $typeArr['child'][145],
            1 => $typeArr['child'][146],
            2 => $typeArr['child'][147],
            3 => $typeArr['child'][148],
            4 => $typeArr['child'][149],
            5 => $typeArr['child'][150],
            6 => $typeArr['child'][151],
            7 => $typeArr['child'][152],
            8 => $typeArr['child'][153],
            9 => $typeArr['child'][154],
            10 => $typeArr['child'][155]
        ];
        $ruanzhuang['title'] = "软装";
        $ruanzhuang['content'] = [
            0 => $typeArr['child'][156],
            1 => $typeArr['child'][245],
            2 => $typeArr['child'][157],
            3 => $typeArr['child'][158],
            4 => $typeArr['child'][159],
            5 => $typeArr['child'][160],
            6 => $typeArr['child'][161]
        ];
        $dianqi['title'] = "电器";
        $dianqi['content'] = [
            0 => $typeArr['child'][162],
            1 => $typeArr['child'][163],
            2 => $typeArr['child'][164],
            3 => $typeArr['child'][165]
        ];
        $jiaju['title'] = "家具";
        $jiaju['content'] = [
            0 => $typeArr['child'][166],
            1 => $typeArr['child'][167]
        ];
        $this->assign("jiancai",$jiancai);//菜单栏数据
        $this->assign("ruanzhuang",$ruanzhuang);//菜单栏数据
        $this->assign("dianqi",$dianqi);//菜单栏数据
        $this->assign("jiaju",$jiaju);//菜单栏数据

        //页面显示内容
        $category = I("get.category");
        $categoryId = I("get.categoryId");

        //获取该类别的编号,根据ID或者shortname获得
        if(!empty($categoryId)){
            $categoryClass = D("WwwArticleClass")->getArticleClassByCatagoryId($categoryId);
        }else{
            $categoryClass = D("WwwArticleClass")->getArticleClassByShortname($category);
        }
        //没有查询到类别的,404页面
        if(empty($categoryClass)){
            $this->_error();
            die();
        }
        if($categoryClass['level'] == 1){
            $result = $typeArr['ids'];
            $basic["now"]["title"] = "全部选材导购文章";
        }elseif($categoryClass['level'] == 2){
            $result = $typeArr['child'][$categoryClass["id"]]['ids'];
            $basic["now"]["title"] = "选材导购".'-'.$categoryClass['classname'];
        }else{
            $result[] = $categoryClass["id"];
            $basic["now"]["title"] = "选材导购".'-'.$categoryClass['classname'];
        }

        if(empty($result)){
            $this->_error();
        }

        $articles         = $this->getZxArticleList($result, $category, 10, '', true);
        $info["articles"] = $articles["articles"];
        $info["page"]     = $articles["page"];
        $info["nowPage"]  = $articles["nowPage"];

        //获取资讯文章
        if($articles['nowPage'] > 1){
            $pageContent ="第".$articles['nowPage']."页";
        }

        $info['canonical'] = '/gonglue/'.$category.'/';

        foreach ($info['articles'] as $k => $v) {
            $info['articles'][$k]['jianjie'] = strip_tags($v['content']);
        }
        //关键字、描述、标题
        $basic["body"]["title"] = '选材导购';
        $basic["head"]["title"] = $categoryClass["title"].$pageContent.'-齐装网';
        $basic["head"]["keywords"] = $categoryClass["keywords"];
        $basic["head"]["description"] = $categoryClass["description"];

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];

        $this->assign("canonical", $canonical);
        $this->assign("head", $basic['head']);
        $this->assign("basic",$basic);
        $this->assign("info",$info);
        $this->assign('source',322);//设置发单入口标识
        $this->display("xcdg");
    }




    public function artcile()
    {
        $preg = '/\/gonglue\/(\w+)\/(\d+).html/';
        $arr = [];
        preg_match($preg, $_SERVER['REQUEST_URI'], $arr);
        if($arr[1] == 'jiaotixian'){
            header( "HTTP/1.1 301 Moved Permanently");
            header("Location: http://". C("MOBILE_DONAMES") . '/gonglue/tijiaoxian/'. $arr[2] . '.html');
            exit;
        }
        //a.18.09.16需求， 选材导购栏目详情页-异常显示处理
        if($arr[1] == 'xcdg' && $arr[2]){
             $this->_error();
        }
        $category =  I("get.category");
        $id = I("get.id");

        //判断是否是搜索引擎蜘蛛
        $robotIsTrue = B("Common\Behavior\RobotCheck");
        //$robotIsTrue = true; //debug 警告线上应该为注释状态
        if ($robotIsTrue === false) {
            //导入扩展文件
            $ips = OP("ignore_ips");
            $iparr = explode(',', $ips);
            foreach ($iparr as $k => $v) {
                $iparr[$k] = ip2long($v);
            }
            import('Library.Org.Util.App');
            $app = new \App();
            $ip = $app->get_client_ip();
            //本地IP  223.112.69.58 屏蔽掉，不统计
            $ip1 = ip2long($ip);
            //$ip2 = ip2long("223.112.69.58");
            if(!in_array($ip1, $iparr)){
                $today = date("Y-m-d",time());
                $timeend = strtotime(($today.' 23:59:59'));
                $timelong = $timeend - time();
                //S('Cache:gonglue:'.$_SERVER['REMOTE_ADDR'].$id,'1',900);
                $status = S('Cache:Mobile:'.$ip.$id);
                if($status != 1){
                    //没有访问记录，浏览量+1，生成新缓存（根据ip.文章ID）
                    D("WwwArticle")->updateRealView($id);
                    S('Cache:Mobile:'.$ip.$id,1,$timelong);
                }
            }
        }

        if (preg_match('/\d+/i', I("get.id"))) {
            $articleInfo = S('Cache:Mip:ArticleInfo:'.$id);
            if(!$articleInfo){
                //获取分类
                if(!empty($category) && strtolower($category) != "history"){
                    //新分类
                    $category = D("WwwArticleClass")->getArticleClassByShortname($category);
                }else{
                    //老版文章
                    //获取根据文章的编号获取老版的分类
                    $category = D("WwwArticleClass")->getArticleClassByArticleId($id,'old');
                }

                if(empty($category)){
                    $this->_error();
                    die();
                }
                $articleInfo["category"] = $category;
                //文章内容
                $article = $this->getArticleInfo($id,$category["id"]);
                $articleInfo["article"] = $article;

                //获取推荐文章，缓存key和PC端的一样-m.1.5.0 移动端-装修攻略文章终端页数据项逻辑调整
                $recommendArticles = S('Article:Index:RecommendList:'.$articleInfo["article"]['id']);
                if(empty($recommendArticles)){
                    $recommendArticles = $this->getRelationArticle($category["id"],9,$articleInfo["article"]['id'],$articleInfo["article"]['tags'],$articleInfo["article"]['keywords']);
                    /*兼容老版本的文章*/
                    foreach ($recommendArticles as $key => $value) {
                        if (($category["id"] == $value['cid']) && (strtolower($category) == 'history')) {
                            $recommendArticles[$key]['shortname'] = 'history';
                        }
                    }
                    S('Article:Index:RecommendList:'.$articleInfo["article"]['id'],$recommendArticles,86400);
                }
                $articleInfo["recommendArticles"] = $recommendArticles;

                //处理文章中所有的style标签
                $pattern ='/style\=["|\'].*?["|\']/is';
                $articleInfo['article']['content'] =   preg_replace_callback($pattern, function(){
                        return "";
                    }, $articleInfo['article']['content']);
                $articleInfo['article']['content'] = str_replace("http://www.qizuang.com/zhaobiao/","http://m.qizuang.com/zhaobiao/",$articleInfo['article']['content']);

                //替换IMG为mip-img
                $pattern ='/<img(.*?)[\/]?>/is';
                preg_match_all($pattern,$articleInfo['article']['content'],$matches);

                if (count($matches) > 0) {
                    foreach ($matches[0] as $key => $value) {
                        $articleInfo['article']['content'] = str_replace($value,"<mip-img".$matches[1][$key]."></mip-img>",$articleInfo['article']['content']);
                    }
                }

                //添加所有的a便签data-type='mip'属性
                $pattern ='/<a(.*?)>/is';
                preg_match_all($pattern,$articleInfo['article']['content'],$matches);

                if (count($matches) > 0) {
                    foreach ($matches[0] as $key => $value) {
                        $articleInfo['article']['content'] = str_replace($value,"<a ".$matches[1][$key]." data-type='mip'",$articleInfo['article']['content']);
                    }
                }

                S('Cache:Mip:ArticleInfo:likes:'.$id, $articleInfo["article"]["likes"],1000);
                S('Cache:Mip:ArticleInfo:'.$id,$articleInfo,900);
            }

            if(empty($articleInfo["article"])){
                $this->_error();
            }

            $articleInfo["article"]["likes"] =  S('Cache:Mip:ArticleInfo:likes:'.$id);
            $articleInfo['article']['content'] = str_replace('www.qizuang.com/gonglue','m.qizuang.com/gonglue',$articleInfo['article']['content']);

            //更新文章阅读量
            D("WwwArticle")->updatePv($id);

            //流量部推广统计
            $this->promoStats($id);
            $basic["body"]["title"] = "装修攻略";
            $basic["head"]["title"] = $articleInfo["article"]["title"] . '-齐装网';
            $basic["head"]["keywords"] =$articleInfo["article"]["keywords"];
            $basic["head"]["description"] = $articleInfo["article"]["subtitle"];

            //百度官方号需求
            $baidu['url'] = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
            $baidu['str'] = mb_substr(strip_tags($articleInfo['article']['content']), 0, 100, 'utf-8');
            if(empty($articleInfo['article']['addtime'])){
                $optimee =date("Y-m-d",$articleInfo["article"]['optime']);
                $optimes =date("H:i:s",$articleInfo["article"]['optime']);
            }else{
                $optimee =date("Y-m-d",$articleInfo["article"]['addtime']);
                $optimes =date("H:i:s",$articleInfo["article"]['addtime']);
            }
            $baidu['optime'] = $optimee."T".$optimes;
            $images =explode(",",$articleInfo["article"]['imgs']);
            $this->assign("baidu",$baidu);

            /*生成canonical标签属性值*/
            if(!isset($_GET['a1'])){
                $articleInfo['canonical'] = 'http://'.C('MOBILE_DONAMES').$_SERVER['REQUEST_URI'];
            }
            $articleInfo['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_cityInfo.id'))[0];

            //去除文章详情页中的图片的水印
            $articleInfo['article']['content'] = str_replace("-s3.jpg", "-s4.jpg", $articleInfo['article']['content']);

            //百度官方号需求
            $baidu['url'] = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
            if(empty($articleInfo['article']['addtime'])){
                $optimee =date("Y-m-d",$articleInfo["article"]['optime']);
                $optimes =date("H:i:s",$articleInfo["article"]['optime']);
            }else{
                $optimee =date("Y-m-d",$articleInfo["article"]['addtime']);
                $optimes =date("H:i:s",$articleInfo["article"]['addtime']);
            }
            $baidu['optime'] = $optimee."T".$optimes;
            $images =explode(",",$articleInfo["article"]['imgs']);
            $this->assign("baidu",$baidu);

            $this->assign("head", $basic['head']);
            $this->assign("basic",$basic);
            $this->assign("images",$images);
            $this->assign("category",$articleInfo["category"]);
            $this->assign("info",$articleInfo);
            $this->display();
        }else{
            $this->_error();
        }
    }



    /**
     * 资讯列表页
     * @return [type] [description]
     */
    public function wenzList(){

        //检查是否跳转到静态URL地址
        $this->checkStaticUrl();

        $category = $_GET["category"];

        $categoryClass = D("WwwArticleClass")->getArticleClassByShortname($category);
        //没有查询到类别的,404页面
        if(empty($categoryClass)){
            $this->_error();
            die();
        }

        $cats = array(
            '114' => '全部装修风水文章',
            '105' => '全部空间搭配文章',
            '121' => '全部装修风格文章',
            '143' => '全部选材导购文章'
        );

        if($categoryClass["pid"] == 0){
            $info["now"]["title"] = $cats[$categoryClass["id"]];
            $cat =  D("WwwArticleClass")->getArticleClassById($categoryClass["id"]);
            if(!empty($cats[$categoryClass["id"]])){
                $info["title"] = $cats[$categoryClass["id"]];
                $info['children'] =  D("WwwArticleClass")->getArticleClassById($categoryClass["id"]);
                $info['children']['nowtitle'] = $cats[$info['children']['id']];
            }
            $result = $cat["ids"];
        }else{
            $cat =  D("WwwArticleClass")->getArticleClassById($categoryClass["pid"]);
            $info["now"]["title"] = $cat["classname"]."-".$categoryClass["classname"];
            $result[] = $categoryClass["id"];
            $info['children'] =  D("WwwArticleClass")->getArticleClassById($categoryClass["pid"]);
        }

        if(empty($result)){
            $this->_error();
        }

        //获取资讯文章
        $articles         = $this->getZxArticleList($result, $category, 10, '', true);
        $info["articles"] = $articles["articles"];
        $info["page"]     = $articles["page"];
        $info["nowPage"]  = $articles["nowPage"];

        if ($info["nowPage"] > 1) {
            $pageContent ="第".$info["nowPage"]."页";
        }

        $info['canonical'] = '/gonglue/'.$category.'/';

        foreach ($info['articles'] as $k => $v) {
            $info['articles'][$k]['jianjie'] = strip_tags($v['content']);
        }
        //关键字、描述、标题
        $basic["body"]["title"] = $info['children']['classname'];
        $basic["head"]["title"] = $categoryClass["title"].$pageContent.'-齐装网';
        $basic["head"]["keywords"] = $categoryClass["keywords"];
        $basic["head"]["description"] = $categoryClass["description"];

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];

        $this->assign("canonical", $canonical);
        $this->assign("head", $basic['head']);
        $this->assign("basic",$basic);
        $this->assign("info",$info);
        $this->assign('source',322);//设置发单入口标识
        $this->display("wenzList");
    }


    /**
     * 根据分类ID，将URL分流到选材导购/老分类
     */
    public function lclist(){
        $category = I("get.category");

        //脚踢线改成踢脚线,对应URL修改
        if($_SERVER['REQUEST_URI'] == '/gonglue/jiaotixian' || $_SERVER['REQUEST_URI'] == '/gonglue/jiaotixian/'){
            header( "HTTP/1.1 301 Moved Permanently");
            header("Location: http://". C("MOBILE_DONAMES") . '/gonglue/tijiaoxian/');
            exit;
        }

        //获取该类别的编号
        $categoryClass = D("WwwArticleClass")->getArticleClassByShortname($category);

        //获取选材导购分类下的子分类
        $sonIds = D("WwwArticleClass")->getArticleClassById("143");

        $ids = $sonIds['ids'];

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];

        if($categoryClass['id'] == '143' || in_array($categoryClass['id'], $ids)){
            $this->xcdg();
        }else{
            $this->wenzList();
        }
    }


    public function zxstep(){
        $basic["body"]["title"] = "装修流程";

        //动态获取流程的tkd
//        $basic["head"] = S('Mobile:Zixun:zxlc:basic:head');
//        if (empty($basic["head"])) {
//            $temp = D("WwwArticleClass")->getArticleClassByShortname('lc');
//            $basic["head"]["title"] = $temp['title'].'-齐装网';
//            $basic["head"]["keywords"] = $temp['keywords'];
//            $basic["head"]["description"] = $temp['description'];
//            S('Mobile:Zixun:zxlc:basic:head', $basic["head"], 300);
//
//        }
        $basic["head"]["title"] = "装修流程_装修步骤_装修知识-齐装网";
        $basic["head"]["keywords"] = "装修流程,装修施工,装修检测";
        $basic["head"]["description"] = "齐装网为提供全新的装修流程知识分享，装修流程包括收房验收、找装修公司、设计与预算、装修选材、拆改、水电、防水、泥瓦、木工、油漆、竣工、检测验收、后期配饰、装修保养等。";

        /*生成canonical标签属性值*/
        if(!isset($_GET['a1'])){
            $info['canonical'] = 'http://'.C('MOBILE_DONAMES').'/gonglue/lc/';
        }
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];

        $this->assign("head", $basic['head']);
        $this->assign('source',325);//设置发单入口标识
        $this->assign("info",$info);
        $this->assign("basic",$basic);
        $this->display();
    }


    /**
     * 流程详细
     * @return [type] [description]
     */
    public function zxlclist(){
        //检查是否跳转到静态URL地址
        $this->checkStaticUrl();

        $category = I("get.category");
        $categoryClass = D("WwwArticleClass")->getArticleClassByShortname($category);
        if (count($categoryClass) == 0) {
            $this->_error();
        }
        $type = I("get.type");
        switch ($type) {
            case 1:
                $basic["head"]["bread"] = "装修前";
                break;
            case 2:
                $basic["head"]["bread"] = "装修中";
                break;
            case 3:
                $basic["head"]["bread"] = "装修后";
                break;
        }

        $info = $this->getZxArticleList($categoryClass["id"],$category,10,'',true);
        foreach ($info['articles'] as $k => $v) {
            $info['articles'][$k]['jianjie'] =  mbstr(strip_tags($v['content']),0,28);
        }

        if($info['nowPage'] > 1){
            $pageContent ="第".$info['nowPage']."页";
        }

        $basic["categoryClass"] = $categoryClass;
        $basic["body"]["title"] = "装修流程";
        $basic["head"]["title"] = $categoryClass["title"].$pageContent;
        $basic["head"]["keywords"] = $categoryClass["keywords"];
        $basic["head"]["description"] = $categoryClass["description"];


        $info['canonical'] = '/gonglue/'.$category.'/';

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];

        $this->assign("canonical", $canonical);
        $this->assign("head", $basic['head']);
        $this->assign('source',322);//设置发单入口标识
        $this->assign("info",$info);
        $this->assign("basic",$basic);
        $this->display();
    }


    private function getSpecialModule($limit)
    {
        $result = D("ArticleSpecialModule")->getIndexSpecialModule($limit);
        return $result;
    }

    /**
     * 获取文章分类及文章
     * @return [type] [description]
     */
    private function getArticleList($id,$pageIndex,$pageCount,$isTop)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        //根据ID查询相对应的文章类别
        $result =  D("WwwArticleClass")->getArticleClassById($id);
        $ids[] = array_unique($result["ids"]);
        //根据文章类别查询出所有的文章
        $articles = D("WwwArticle")->getArticleListByIds($ids,($pageIndex-1)*$pageCount,$pageCount,'',$isTop);
        return  $articles;
    }

    /**
     * 检测并跳转到静态URL规则
     */
    private function checkStaticUrl()
    {
        $info  = parse_url($_SERVER['REQUEST_URI']);
        $path  = array_filter(explode('/', trim($info['path'], '/')));
        $query = array_filter(explode('&', $info['query']));
        $p     = I("get.p");
        //1.只有分页参数；2.URL类似'/gonglue/lc'的
        if (count($query) == 1 && !empty($p) && count($path) == 2 && $path[0] == 'gonglue' && false === strpos($path['1'],'.html')) {
            header('HTTP/1.1 301 Moved Permanently');
            header('Location:http://mip.' . C('QZ_YUMING') . '/gonglue/list-' . $path['1'] . '-' . $p . '.html');
            exit();
        }
    }

    /**
     * 获取资讯列表页文章列表
     * @param  string  $id        [分类编号]
     * @param  integer $pageIndex [description]
     * @param  integer $pageCount [description]
     * @param  boolean $isTop     [是否置顶]
     * @return [type]             [description]
     */
    private function getZxArticleList($category_ids = '',$category = '', $pageCount = 5, $keyword ="", $isTop=true)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        //获取文章的分类
        if(empty($category_ids)){
            $result = D("WwwArticleClass")->getAllArticleClass();
        }else{
            $result = $category_ids;
        }
        $count = D("WwwArticle")->getArticleListCount($result,$keyword);
        if($count > 0){
            import('Library.Org.Page.SPage');
            $page = new \SPage($count, $pageCount, array(
                'templet' => '/gonglue/list-' . $category . '-[PAGE].html',
                'firstUrl' => '/gonglue/' . $category . '/'
            ));
            $page->config['theme'] = "%UP_PAGE%<span>%NOW_PAGE%/%TOTAL_PAGE%</span>%DOWN_PAGE%";
            $pageTmp =  $page->show();
            $result = D("WwwArticle")->getArticleListByIds(array($result),($page->nowPage-1)*$pageCount,$pageCount,$keyword);
            foreach ($result as $key => $value) {
                $result[$key]["img_host"] = "qiniu";
                //如果是老站链接过来的文章，同一用history代替
                if(empty($value["shortname"])){
                    $result[$key]["shortname"] ="history";
                    $result[$key]["title"] = str_replace("_齐装网", "", $value["title"]);
                    $result[$key]["img_host"] = "";
                }
                if(!empty($value["imgs"])){
                    $exp = explode(",", $value["imgs"]);
                    $exp = array_filter($exp);
                    $result[$key]["imgs"] = $exp;
                }

                if (empty($value["face"])) {
                    $img = str_replace("http://staticqn.qizuang.com/","",$result[$key]["imgs"][0]);
                    $img = str_replace("-s3.jpg","",$img);
                    $result[$key]["face"] = $img;
                }

            }
            return array("articles"=>$result,"page"=>$pageTmp, "nowPage" => $page->nowPage);
        }
    }


    /**
     * 获取文章信息
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    private function getArticleInfo($id,$category){
        $result = D("WwwArticle")->getMobileArticleInfoById($id,$category);

        $article = array();
        foreach ($result as $key => $value) {
            if(empty($value["shortname"])){
                $value["shortname"] = "history";
                $value["classname"] ="历史资讯";
                $value["title"] = str_replace("_齐装网", "", $value["title"]);
            }

            //处理文章中的图片
            $pattern ='/<img.*?\/>/is';
            preg_match_all($pattern,$value["content"], $matches);

            if(count($matches[0]) > 0){
                foreach ($matches[0] as $k => $val) {
                    $pattern ='/src=[\"|\'](.*?)[\"|\']/is';
                    preg_match_all($pattern,$val, $m);
                    foreach ($m[1] as $j => $v) {
                        if(!strpos($v,C('QINIU_DOMAIN'))){
                            $path ="http://".C('STATIC_HOST1').$v;
                            $value["content"]  = str_replace($v,$path,$value["content"]);
                        }
                    }

                    $pattern = '/width\=[\"|\'].*?[\"|\']/is';
                    $value["content"] = preg_replace_callback($pattern, function(){
                        return "";
                    }, $value["content"]);

                    $pattern = '/height\=[\"|\'].*?[\"|\']/is';
                    $value["content"] = preg_replace_callback($pattern, function(){
                        return "";
                    }, $value["content"]);
                }
            }
            $article = $value;
        }
        return $article;
    }



    /**
     * [getRelationArticle 获取相关文章]
     * @param  string  $type     [文章类型]
     * @param  integer $limit    [获取数目]
     * @param  integer $tagid    [标签id]
     * @param  string  $keywords [关键字]
     * @return [type]            [description]
     */
    private function getRelationArticle($type = '', $limit = 9, $notid = 0, $tagid = 0, $keywords= '')
    {
        //如果有标签id或者关键字，先利用分类和(标签或者关键字)搜索,不考虑分类
        //文章属于不同分类，但是标签或者关键字只要有一个相同，就可以调用
        //如果文章有多个关键字或者标签（有空格需要过滤空格），只要其中有一个相同，就调用
        if(!empty($tagid) || !empty($keywords)){
            $string = '';
            //拼接标签查询
            if(!empty($tagid)){
                $tags = array_filter(explode(',', $tagid));
                foreach ($tags as $key => $value) {
                    $string = $string . 'FIND_IN_SET("' . $value . '",a.tags) OR ';
                }
            }
            //拼接关键字查询
            if(!empty($keywords)){
                $keys = array_filter(explode(',', $keywords));
                foreach ($keys as $key => $value) {
                    $string = $string . 'FIND_IN_SET("' . $value . '",a.keywords) OR ';
                }
            }
            $string = rtrim($string, 'OR ');
            if(!empty($string)){
                $map = array(
                    [
                        '_string' => $string,
                        '_logic' => 'OR'
                    ]
                );
            }
        }

        if(empty($limit)){
            $limit = 6;
        }

        //排除某个标签，避免调用了相同文章
        if(!empty($notid)){
            $map['a.id'] = array('NEQ',$notid);
        }
        $result = D("WwwArticle")->getArticleListByMap($map, $limit);

        //如果更加标签或关键字获取的数量少于需要的数量，再次根据分类来获取
        $count = $limit - count($result);
        $other = [];
        if($count > 0){
            $map = [];
            if(!empty($type)){
                $map['b.class_id'] = $type;
            }
            //排除相同ID的文章
            if(!empty($result)){
                $ids = '';
                if(!empty($notid)){
                    $ids = $notid . ',';
                }
                foreach ($result as $key => $value) {
                    $ids = $ids . $value['id'] . ',';
                }
                $map['a.id'] = array('NOT IN',trim($ids,','));
            }
            $other = D("WwwArticle")->getArticleListByMap($map, $count);
        }
        $return = array_merge($result,$other);
        return $return;
    }

    //流量部推广统计
    public function promoStats($id){
        //获取Cookie
        $isMark = cookie('contentPromoMark');
        //如果Cookie不存在
        if(empty($isMark['module'])){
            //过期时间 = 今天最后一秒时间戳 - 当前时间戳
            $expireTime = strtotime(date('Y-m-d').' 23:59:59') - time();
            $cookieVar = array('module' => 'article','id' => $id);
            //指定cookie保存时间
            cookie('contentPromoMark',$cookieVar, array('expire' => $expireTime,'domain' => '.'.C('QZ_YUMING')));
        }
    }

}