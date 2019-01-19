<?php

namespace Sub\Controller;
use Sub\Common\Controller\SubBaseController;
class CompanyController extends SubBaseController{
    protected $myBreadCheck = [];
    public function _initialize(){
        parent::_initialize();
        //导航栏标识
        $this->assign("tabIndex",3);
    }

    public function index(){
        $bm = $this->cityInfo['bm'];

        //跳转到手机端
        if (ismobile()) {
            header( "HTTP/1.1 301 Moved Permanently");
            header("Location: http://". C('MOBILE_DONAMES').'/'.$bm.'/company/');
            exit();
        }


        $cityid = $this->cityInfo['id'];
        $companyInfo = [];
        S('Cache:Company:Home:'.$bm);
        if(!$companyInfo){
            $top = array("id"=>"","name" =>"不限");

            //获取公司规模选项
            $guimo = D("Common/Guimo")->gethGm();
            array_unshift($guimo,$top);
            $companyInfo["guimo"] = $guimo;

            //获取服务保障列表
            $baozhang = D("Common/Leixing")->getbg();
            array_unshift($baozhang,$top);
            $companyInfo["baozhang"] = $baozhang;

            //获取城市信息
            $result = D("Common/Quyu")->getAreaByFatherId($cityid);
            foreach ($result as $key => $value) {
               $city[] = array(
                    "qz_areaid"=>$value["id"],
                    "oldName"=>$value["name"],
                    "cname"=>$value["name"]
               );
            }
            unset($city[count($city)-1]);
            foreach ($city as $k => $v) {
                $tempCity[] = array("id"=>$v["qz_areaid"],"name"=>$v["oldName"]);
            }

            array_unshift($tempCity,$top);
            $companyInfo["city"] = $tempCity;

            S('Cache:Company:Home:'.$bm,$companyInfo,900);
        }

        $pageIndex = intval(I('get.p', '')) == 0 ? 1 : intval(I('get.p', 1));
        $pageCount = 10;
        //设置城市ID
        $companyInfo['cs'] = $cityid;
        //设置查询条件城市ID
        $condition['cs'] = $cityid;

        $url = str_replace(array('/company/','/company'),'', __SELF__);
        $url = preg_replace('/\&?p=([0-9]*)?.\&?/i','', $url);
        $url = $url == '?' ? '' : $url;
        //301
        if(strpos(__SELF__,'?') == false && $url&&substr($url,-1)!=="/"){
            $redirect = 'http://'.$bm.'.'.C('QZ_YUMING') .'/company/' .$url.'/';
            header( "HTTP/1.1 301 Moved Permanently" );
            header( "Location:".$redirect);
            die();
        }
        //如果url最后字符串存在？和/
        if(substr($url,-1)=="?"){
            $url = substr($url,0,strlen($url)-1);
        }
        if(substr($url,-1)=="/"){
            $url = substr($url,0,strlen($url)-1);
        }

        $urlParams = $this->getUrlParams($url);
        if ($urlParams['fu'] == 0 && $urlParams['f'] == 0 && $urlParams['g'] == 0 && $urlParams['bz'] == 0 && $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] != $bm . '.' . C('QZ_YUMING') . '/company/' && $pageIndex == 1 && empty($_GET['keyword']) && empty($_GET['issale']) && empty($_GET['orderby']) && empty($_GET['iscert'])) {
            header("HTTP/1.1 301 Moved Permanently");
            header("Location:" . 'http://' . $bm . '.' . C('QZ_YUMING') . '/company/');
            die();
        }
        //404判断
        if (!empty($this->cityInfo['id'])&&!empty($urlParams['fu'])&&!in_array($urlParams['fu'],array_column($this->cityInfo['child'],'qz_areaid'))){
            $this->_empty();die();
        };
        if (!empty($urlParams['g'])&&!in_array($urlParams['g'],array_column($companyInfo["guimo"],'id'))){
            $this->_empty();die();
        };
        if (!empty($urlParams['bz'])&&!in_array($urlParams['bz'],array_column($companyInfo["baozhang"],'id'))){
            $this->_empty();die();
        };

        if(!empty($urlParams['fu'])){
            $condition['fw'] = $urlParams['fu'];
        }
        if(!empty($urlParams['f'])){
            $condition['fg'] = $urlParams['f'];
        }
        if(!empty($urlParams['g'])){
            $condition['gm'] = $urlParams['g'];
            $companyInfo['gmstyle'] = $urlParams['g'];
        }
        if(!empty($urlParams['bz'])){
            $condition['bz'] = $urlParams['bz'];
        }
        //替换城市URL
        $companyInfo["city"] = $this->replaceCateUrl($url,$urlParams['fu'],$companyInfo["city"],'fu');
        $companyInfo["guimo"] = $this->replaceCateUrl($url,$urlParams['g'],$companyInfo["guimo"],'g');
        $companyInfo["baozhang"] = $this->replaceCateUrl($url,$urlParams['bz'],$companyInfo["baozhang"],'bz');

        //获取选择的风格,规模
        $select = array();

        if (!empty($condition['gm'])) {
            foreach ($companyInfo["guimo"] as $key => $value) {
                if ($value['id'] == $condition['gm']) {
                    $select['gm'] = $value;
                }
            }
        }
        if (!empty($condition['bz'])) {
            foreach ($companyInfo["baozhang"] as $key => $value) {
                if ($value['id'] == $condition['bz']) {
                    $select['bz'] = $value;
                }
            }
        }
        if(I("get.keyword") != ""){
            $keyword = I("get.keyword");
            if(!checkKeyword($keyword)){
                $this->_error();
            }
            $keyword = remove_xss($keyword);
            $this->assign("keyword",$keyword);
            $condition['keyword'] = $keyword;
        }

        //URL替换 -- 此处写的比较随意
        $urlArray = array(
            '0'=> array('name'=> '热门排序','url' => 'hot','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
            '1'=> array('name'=> '信赖度','url' => 'star','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
            '2'=> array('name'=> '案例','url' => 'case','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
            '3'=> array('name'=> '设计师','url' => 'design','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
            '4'=> array('name'=> '活跃度','url' => 'active','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
            '5'=> array('name'=> '综合实力','url' => 'shili','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
            '6'=> array('name'=> '量房','url' => 'liangfang','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'), //201801011新增
            '7'=> array('name'=> '签单','url' => 'qiandan','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),//201801011新增
        );

        foreach ($urlArray as $k => $v) {
            $urlArray[$k]['url'] = $this->replaceUrlNew($url,$v['url'],$urlParams);
        }

        //拼接优惠跳转地址
        $isSale = I('get.issale','');
        $isCert = I('get.iscert','');
        if($isCert == '1'){
            $condition['vip'] = '1';
        }
        if($isSale == '1'){
            $condition['sale'] = '1';
        }
        $companyInfo['isSale'] = !empty($isSale) ? 'checked' : '';
        $companyInfo['isCert'] = !empty($isCert) ? 'checked' : '';
        //获取query参数
        $sale_query_string = $this->getSaleQuery();
        //最终的优惠跳转地址
        $companyInfo['saleUrl']  = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu' . $urlParams['fu'] . 'f' . $urlParams['f'] . 'g' . $urlParams['g'] . 'bz' . $urlParams['bz'].$sale_query_string;
        //优惠选中效果
        $this->assign('issale',$isSale);

        //排序
        $orderby = I('get.orderby','');
        switch ($orderby) {
            case 'star'://信赖度 | 口碑
                $urlArray['1']['active'] = 'xuanzcolor';
                $urlArray['1']['icon'] = '';
                break;
            case 'liangfang'://量房
                $urlArray['6']['active'] = 'xuanzcolor';
                $urlArray['6']['icon'] = '';
                break;
            case 'qiandan'://签单
                $urlArray['7']['active'] = 'xuanzcolor';
                $urlArray['7']['icon'] = '';
                break;
            default:
               // 综合实力
                $urlArray['5']['active'] = 'xuanzcolor';
                $urlArray['5']['icon'] = '';
                break;
        }


        $result = $this->getNewList($orderby,$condition,$pageIndex,$pageCount,$urlParams);

        if(!empty($result)){
            $companyInfo["companyList"] = $this->getStar($result["list"]);
            $companyInfo["page"] = $result["page"];
            $companyInfo["count"] = $result["num"];
        }

        //头部分页处理
        $companyInfo['pageNum'] = ceil($result["num"] / $pageCount);
        $companyInfo['thisPage'] = $pageIndex;
        $companyInfo['prevUrl'] = ($pageIndex - 1) < 1 ? '1' : ($pageIndex - 1);
        $companyInfo['nextUrl'] = ($pageIndex + 1) >= $companyInfo['pageNum'] ? $companyInfo['pageNum'] : $pageIndex + 1;
        $companyInfo['prevUrl'] = "/company/".$this->getHeadPage($url,$companyInfo['prevUrl']);
        $companyInfo['nextUrl'] = "/company/".$this->getHeadPage($url,$companyInfo['nextUrl']);

        //获取是否显示获取报价弹层
        if(!isset($_COOKIE["w_index"])){
            $this->assign("isOpen",true);
        }

        $tkd['city'] = $this->cityInfo["name"];
        foreach ($this->cityInfo["child"] as $key => $value) {
            if ($value['qz_areaid'] == $condition['fw']) {
                $tkd['area'] = $value['oldName'];
            }
        }

        //a.17.05.06 20170510
        $keys["title"] = $tkd['city'] . $tkd['area'] . $select['fg']['name'] . $select['gm']['name'] . '装修公司排名_' . $tkd['city'] . $tkd['area'] . $select['fg']['name'] . $select['gm']['name'] . '十大装修公司大全-' . $tkd['city'] . '齐装网';
        $keys["keywords"] = $tkd['city'] . $tkd['area'] . $select['fg']['name'] . $select['gm']['name'] . '装修公司, ' . $tkd['city'] . $tkd['area'] . $select['fg']['name'] . $select['gm']['name'] . '装修公司排名,' . $tkd['city'] . $tkd['area'] . $select['fg']['name'] . $select['gm']['name'] . '十大装修公司,' . $tkd['city'] . $tkd['area'] . $select['fg']['name'] . $select['gm']['name'] . '装修公司大全';
        $keys["description"] = $tkd['city'] . '齐装网汇集了' . $tkd['city'] . $tkd['area'] . $select['fg']['name'] . $select['gm']['name'] . '装修公司排名大全，免费提供' . $tkd['area'] . $select['fg']['name'] . $select['gm']['name'] . '装修公司设计与报价，以及装修知识。免费拨打电话将直接转接到装修公司，无额外收费！';

        //获取后台配置的TDK
        $config = [
            'cs' => $this->cityInfo['id'], //城市id
            'model' => 2, //模块 1.首页 2.装修公司 3.装修资讯
            'category' => '', //装修资讯子频道栏目
            'location' => 1, //位置 1.pc端 2.移动端
            'page' => I('get.p'), //分页
        ];
        $keys = getCommonManageTdk($keys,$config);

        $this->assign("keys",$keys);

        $friendLink = S("C:FL:CL:ONE:".$cityid);
        if (empty($friendLink)) {
            $friendLink['hotCity'] = D("Quyu")->getHotCity();
            $friendLink['provinceCity'] = D("Quyu")->getProvinceCityLinkByCid($cityid);
            S("C:FL:CL:ONE:".$cityid, $friendLink, 900);
        }
        if(!isset($_SERVER['REQUEST_URI'][9])){
            //获取友情链接
            $friendLink['link'] = S("C:FL:CL:TWO:".$cityid);
            if (empty($friendLink['link'])) {
                $friendLink['link'] = D("Friendlink")->getFriendLinkList($cityid,1,'company-list');
                S("C:FL:CL:TWO:".$cityid, $friendLink['link'], 900);
            }
        }

        $seoRequest = explode('?',$_SERVER['REQUEST_URI']);

        $info['mobileagent'] = 'http://'.C('MOBILE_DONAMES').'/'.$this->cityInfo['bm'].$seoRequest['0'];

        //添加通栏C逻辑
        //获取通栏A
        $info["bigbanner_c"] = S('Cache:Sub:Index:bigbanner_c:'.$bm);
        if(!$info["bigbanner_c"]){
            $info["bigbanner_c"] = D("Advbanner")->getAdvList("home_bigbanner_c",$cityid,3);
            S('Cache:Sub:Index:bigbanner_c:'.$bm,$info["bigbanner_c"],900);
        }

        //添加顶部搜索栏信息
        $this->assign('serch_uri','companysearch');
        $this->assign('serch_type','装修公司');
        $this->assign('holdercontent','全国超过十万家装修公司为您免费设计');

        //顶部预约人数
        if (!S('Sbu:Company:TopNum')) {
            S('Sbu:Company:TopNum', mt_rand(100, 200), 2592000);
        }

        //页面canonical
        $info['canonical'] = 'http://'.$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];

        //推荐文章（从缓存中获取）
        $companyInfo['recomArticle'] = S('Cache:Sub:recomArticle:city:'.$this->cityInfo['id']);
        if (empty($companyInfo['recomArticle'])){
            $companyInfo['recomArticle'] = D('Common/Logic/LittlearticleLogic')->getRecomArticleList($this->cityInfo['id'],1,10);
            if (!empty($companyInfo['recomArticle'])){
                S('Cache:Sub:recomArticle:city:'.$this->cityInfo['id'], $companyInfo['recomArticle'],900);
            }
        }

        $this->assign("friendLink",$friendLink);
        $this->assign("cityinfo",$this->cityInfo);
        $this->assign("orderby",$urlArray);
        //header搜索框搜索条件绑定
        $this->assign("header_search",0);
//        var_dump($companyInfo["companyList"]);exit;
        $this->assign("companyInfo",$companyInfo);
        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);
        //获取报价模版
        $this->assign("order_source",170);
        $this->assign("orderTmp",$this->fetch(T("Common@Order/orderTmp")));
        $this->assign("info",$info);

        //面包屑选中内容
        $this->assign("breadcheck",$this->myBreadCheck);
        $this->display('index_p21414');
    }

    /**
     * 老连接做301跳转
     */
    public function oldindex()
    {
        $url = str_replace(array('/company/','/company'),'', __SELF__);
        $url = preg_replace('/\&?p=([0-9]*)?.\&?/i','', $url);

        //如果url最后字符串存在？和/
        if(substr($url,-1)=="?"){
            $url = substr($url,0,strlen($url)-1);
        }
        if(substr($url,-1)=="/"){
            $url = substr($url,0,strlen($url)-1);
        }

        $urlParams = $this->getUrlParams($url);
        $url = '/company/list-';
        if (!empty($urlParams['fu'])) {
            $url = $url . 'fu' . $urlParams['fu'];
        } else {
            $url = $url . 'fu0';
        }
        if (!empty($urlParams['f'])) {
            $url = $url . 'f' . $urlParams['f'];
        } else {
            $url = $url . 'f0';
        }
        if (!empty($urlParams['g'])) {
            $url = $url . 'g' . $urlParams['g'];
        } else {
            $url = $url . 'g0';
        }
        if (!empty($urlParams['bz'])) {
            $url = $url . 'bz' . $urlParams['bz'];
        } else {
            $url = $url . 'bz0';
        }
        if (!empty($urlParams['p'])) {
            $url = $url . '/?p=' . $urlParams['p'];
        }
        if (parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY)) {
            $query = '/?' . parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
        } else {
            $query = '/';
        }
        header("HTTP/1.1 301 Moved Permanently");
        header("Location: http://" . $_SERVER['HTTP_HOST'] . $url.$query);
    }

    public function companylandpage(){
        $cityInfo = $this->cityInfo;
        //品牌榜 - 热门装修公司
        $info['brands'] = S('Cache:Sub:Company:companylandpage:'.$cityInfo['id']);
        if(empty($info['brands'])){
            //分站直接获取4条
            $brands = D("Advbanner")->getBrandList($cityInfo['id'],4);
            //查出每家装修公司的最新案列
            foreach ($brands as $k=>$v){
                if($v['img_is_all']){
                    $ids[] = $v['id'];
                }else{
                    $ids[] = $v['company_id'];
                }
            }
            $zhenUser = D("Cases")->getNewsCasesByCompanyId($ids);
            $counts = count($brands);
            //如果数据小于20,就再去取假会员数据
            if ($counts < 4) {
                $data = D('User')->getCompanyInfoForIndexBrandNum('', '', (4 - $counts));
                $ids = [];
                foreach ($data as $k=>$v){
                    $v['img_is_all'] = 1;
                    $ids[] = $v['company_id'];
                    array_push($brands,$v);
                }
            }
            //假会员的案例
            $jiaUser = D("Cases")->getNewsCasesByCompanyId($ids,2);
            $anli = array_merge($zhenUser,$jiaUser);
            foreach ($anli as $kk=>$vv){
                $dd[$vv['uid']] = $vv;
            }
            //将案例添加到数组中
            foreach ($brands as $k=>$v){
                $brands[$k]['cases'] = $dd[$v['company_id']];
            }
            $info['brands'] = $brands;
            S('Cache:Sub:Company:companylandpage:'.$cityInfo['id'], $info['brands'], 900);
        }
        //获取案例
        $info["cases"] = S('Cache:Sub:Index:cases:'.$cityInfo["bm"]);
        if(!$info["cases"]){
            $info["cases"] = D("Advbanner")->getAdvList("home_cases",$cityInfo["id"],5);
            $count = count($info["cases"]);
            if($count < 5){
                $info["cases"] = D("Advbanner")->getAdvList("home_cases",'000001',(5-$count));
            }
            S('Cache:Sub:Index:cases:'.$cityInfo["bm"],$info["cases"],900);
        }
        //根据渠道来源 来选择二维码
        $src = I('get.src');
        $orderSourceResult = D("OrderSource")->getOne($src);
        //根据sourceid获取微信管理信息
        $result = D("YySrcWeixin")->getOneBySourceid($orderSourceResult['id']);
        if (!$result) {
            $result = D("YySrcWeixin")->getDefaultData();
        }
        if (!empty($result)) {
            $this->assign("wx_title", $result['title']);
            $this->assign("wx_img", $result['img']);
        }
        //导航栏标识
        $this->assign("tabIndex",0);
        $this->assign("info",$info);
        $this->assign("source",18012250);
        $this->display();
    }

    public function getCompanyList($map,$pageIndex = 1,$pageCount = 10)
    {
        $result = $this->getList($map,$pageIndex,$pageCount);
        return $result["list"];
    }

    private function getList($map,$pageIndex = 1,$pageCount = 10,$urlParams){
        import('Library.Org.Page.Page');
        $result = D("Common/Company")->getList($map,($pageIndex-1) * $pageCount,$pageCount);
//        echo M()->_sql()."<br>";
        //获取最新
        $ids = [];
        foreach ($result['result'] as $key => $value) {
            $ids[] = $value['id'];
            //装修公司预约人数
            if (!S('Sub:Company:YuyueNum:' . $value['id'])) {
                S('Sub:Company:YuyueNum:' . $value['id'], mt_rand(100, 500), 2592000);
            }
        }
        if(!empty($ids)){
            //获取最新优惠
            $active = D('CompanyActivity')->getCompanyActiveListByIds($ids);
            //获取最新推荐的评论
            $comments = D('Comment')->getCommentByComs($ids);
            foreach ($result['result'] as $key => $value) {
                $result['result'][$key]['active_id'] = $active[$value['id']]['id'];
                $result['result'][$key]['active_title'] = $active[$value['id']]['title'];
                $result['result'][$key]['new_comment'] = $comments[$value['id']]['text'];
                $result['result'][$key]['yuyue_num'] = S('Sub:Company:YuyueNum:' . $value['id']);
            }
        }

        $count = D("Common/Company")->getCompanyCount($map);
        //使用效果图分页 , 直接用对应参数就行
        $normal_params = array(
            "fuwu" => 0,
            "fengge" => 0,
            "guimo" => 0,
            "baozhang" => 0,
            "paixu" => 0,
            "youhui" => 0,
        );
        //自定义配置项
        $config  = array("prev","next");
        $page = new \Page($pageIndex,$pageCount,$count,$config,null,$normal_params);
        //塞分页对应的数据
        $urlInfo['short_url'] = '/company/list-fu' . $urlParams['fu'] . 'f' . $urlParams['f'] . 'g' . $urlParams['g'] . 'bz' . $urlParams['bz'];
        $urlInfo['url'] = '/company/list?fu=' . $urlParams['fu'] . '&f' . $urlParams['f'] . '&g' . $urlParams['g'] . '&bz' . $urlParams['bz'];
        unset($urlParams);
        $pageTmp =  $page->show($urlInfo,$count,true);
        return array("list"=>$result['result'],"page"=>$pageTmp,"num"=>$count);
    }
    private function getNewList($orderby,$map,$pageIndex = 1,$pageCount = 10,$urlParams){
        import('Library.Org.Page.Page');
        switch ($orderby) {
            case 'star'://信赖度 | 口碑
                $result = D("Common/Company")->getStarList($map,($pageIndex-1) * $pageCount,$pageCount);
                break;
            case 'liangfang'://量房
                $result = D("Common/Company")->getLiangfangList($map,($pageIndex-1) * $pageCount,$pageCount);
                break;
            case 'qiandan'://签单
                $result = D("Common/Company")->getQiandanList($map,($pageIndex-1) * $pageCount,$pageCount);
                break;
            default:
                // 综合实力
                $result = D("Common/Company")->getShiliList($map, ($pageIndex - 1) * $pageCount, $pageCount);
                break;
        }

        //获取最新
        $ids = [];
        foreach ($result['result'] as $key => $value) {
            $ids[] = $value['id'];
            //装修公司预约人数
            if (!S('Sub:Company:YuyueNum:' . $value['id'])) {
                S('Sub:Company:YuyueNum:' . $value['id'], mt_rand(100, 500), 2592000);
            }
        }
        if(!empty($ids)){
            //获取最新优惠
            $active = D('CompanyActivity')->getCompanyActiveListByIds($ids);
            //获取最新推荐的评论
            $comments = D('Comment')->getCommentByComs($ids);
            foreach ($result['result'] as $key => $value) {
                $result['result'][$key]['active_id'] = $active[$value['id']]['id'];
                $result['result'][$key]['active_title'] = $active[$value['id']]['title'];
                $result['result'][$key]['new_comment'] = $comments[$value['id']]['text'];
                $result['result'][$key]['yuyue_num'] = S('Sub:Company:YuyueNum:' . $value['id']);
                $result['result'][$key]['logo'] = empty($value['logo'])?"http://".C('QINIU_DOMAIN')."/Public/default/images/default_logo.png":$value['logo'];
                $result['result'][$key]['koubei'] = isset($value['order_fenshu'])?$value['order_fenshu']*10:'';
                $result['result'][$key]['haopinglv'] = isset($value['haopinglv'])?$value['haopinglv']*100:'';

                if(!empty($value['xiaoqu'])&&isset($value['xiaoqu'])&&!empty($value['qiandan_addtime'])){
                    if(date('Y-m-d',$value['qiandan_addtime']) == date('Y-m-d')){
                        $result['result'][$key]['show_xiaoqu'] = $value['xiaoqu'];
                        $result['result'][$key]['show_time'] = $this->get_last_time($value['qiandan_addtime']);
                    }
                }

                if(!empty($value['liangfang_xiaoqu'])&&!empty($value['liangfang_xiaoqu'])){
                    if(date('Y-m-d',$value['liangfang_time']) == date('Y-m-d')){
                        $result['result'][$key]['lf_xiaoqu'] = $value['liangfang_xiaoqu'];
                        $result['result'][$key]['lf_time'] = $this->get_last_time($value['liangfang_time']);
                    }
                }


            }
        }

        $count = D("Common/Company")->getCompanyCount($map);

        //使用效果图分页 , 直接用对应参数就行
        $normal_params = array(
            "fuwu" => 0,
            "fengge" => 0,
            "guimo" => 0,
            "baozhang" => 0,
            "paixu" => 0,
            "youhui" => 0,
        );
        //自定义配置项
        $config  = array("prev","next");
        $page = new \Page($pageIndex,$pageCount,$count,$config,null,$normal_params);
        //塞分页对应的数据
        $urlInfo['short_url'] = '/company/list-fu' . $urlParams['fu'] . 'f' . $urlParams['f'] . 'g' . $urlParams['g'] . 'bz' . $urlParams['bz'];
        $urlInfo['url'] = '/company/list?fu=' . $urlParams['fu'] . '&f' . $urlParams['f'] . '&g' . $urlParams['g'] . '&bz' . $urlParams['bz'];
        unset($urlParams);
        $pageTmp =  $page->show($urlInfo,$count,true);
        return array("list"=>$result['result'],"page"=>$pageTmp,"num"=>$count);
    }

    private function get_last_time($time)
    {
        // 当天最大时间
        $todayLast = strtotime(date('Y-m-d 23:59:59'));
        $agoTimeTrue = time() - $time;
        $agoTime = $todayLast - $time;
        $agoDay = floor($agoTime / 86400);

        if ($agoTimeTrue < 60) {
            $result = '刚刚';
        } elseif ($agoTimeTrue < 3600) {
            $result = (ceil($agoTimeTrue / 60)) . '分钟前';
        } elseif ($agoTimeTrue < 3600 * 12) {
            $result = (ceil($agoTimeTrue / 3600)) . '小时前';
        } elseif ($agoDay == 1) {
            $result = '昨天 ';
        } elseif ($agoDay == 2) {
            $result = '前天 ';
        } else {
            $format = date('Y') != date('Y', $time) ? "Y-m-d" : "m-d";
            $result = date($format, $time);
        }
        return $result;
    }

    //取头部分页信息
    private function getHeadPage($url,$page){
        $urlDepr = strpos($url,'?') === false ? '?' : '&';
        //去除分页
        if(strpos($url,'p=') !== false){
            $url = str_replace($urlDepr.'p='.I('get.p'),'',$url);
        }
        return $url.$urlDepr.'p='.$page;
    }

    /**
     * 分类URL替换
     * @param  [type] $url    [完整的URL]
     * @param  [type] $params [当前参数]
     * @param  [type] $data   [当前数组]
     * @param  [type] $str    [替换前缀]
     * @return [type]         [带URL的数组]
     */
    private function replaceCateUrl($url,$params,$data,$str){
        if (strpos($url, 'list') === false) {
            $url = "list-fu0f0g0bz0";
        } else {
            //因为选择顶部筛选 所有分页跳第一页
            $urlParams = $this->getUrlParams($url);
            $url = "list-fu" . $urlParams['fu'] . "f" . $urlParams['f'] . "g" . $urlParams['g'] . "bz" . $urlParams['bz'];
        }
        $key = '';
        if ($str == 'fu'){
            $key = 'city';
        } elseif ($str == 'g') {
            $key = 'guimo';
        } elseif ($str == 'bz')  {
            $key = 'baozhang';
        }
        foreach ($data as $k => $v) {
            $v['id'] = empty($v['id']) ? '0' : $v['id'];
            $data[$k]["checked"] = 0;
            if($v['id'] == $params){
                $data[$k]["checked"] = 1;
                if(!empty($key) && $params != 0){
                    $this->myBreadCheck[$key] = $v;
                }
            }
            $data[$k]['url'] ='/company/'.str_replace($str.$params,$str.$v['id'],$url);
        }
        return $data;
    }

    //获取URL参数
    private function getUrlParams($url){
        if(stripos($url,'list') === false){
            $url = "fu0f0g0bz0";
        }else{
            $url = str_replace('list-','',$url);
        }

        //如果URL包含 ? 号
        if(stripos($url,'?') !== true){
            $url = explode('?',$url);
            $url = $url['0'];
        }
        if(stripos($url,'/') !== true){
            $url = explode('/',$url);
            $url = $url['0'];
        }
        $params = explode('|',strtr($url,array('fu'=>'|fu:','f'=>'|f:','g'=>'|g:','bz'=>'|bz:')));
        $sKey = [];
        foreach($params as $k => $v ){
            if(!empty($v)){
                $val = explode(':',$v);
                $sKey[$val['0']] = $val['1'];
            }
        }
        return $sKey;
    }

    //排序URL替换
    private function replaceUrl($url,$b='',$urlParams) {
        //没有url时 , 设置默认数据
        if (!$url) {
            //只有信赖度(1) 和 综合实力(5)才设置默认值 , 产品需求只保留这两个(p.2.11.35)
            if ($b == 'star') {
                $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu0f0g0bz0o1i0p1/';
            }
            if ($b == 'shili') {
                $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu0f0g0bz0o5i0p1/';
            }
        } else {
            if (!$urlParams['i']) {
                $urlParams['i'] = 0;
            }
            if ($b == 'star') {
                $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu' . $urlParams['fu'] . 'f' . $urlParams['f'] . 'g' . $urlParams['g'] . 'bz' . $urlParams['bz'] . 'o1i' . $urlParams['i'] . 'p1/';
            }
            if ($b == 'shili') {
                $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu' . $urlParams['fu'] . 'f' . $urlParams['f'] . 'g' . $urlParams['g'] . 'bz' . $urlParams['bz'] . 'o5i' . $urlParams['i'] . 'p1/';
            }
        }
        return $url;
    }

    //排序URL替换
    private function replaceUrlNew($url,$b='',$urlParams) {
        //没有url时 , 设置默认数据
        if (!$url) {
            //只有信赖度(1) 和 综合实力(5)才设置默认值 , 产品需求只保留这两个(p.2.11.35)
            switch ($b) {
                case 'star':
                    $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu0f0g0bz0/?orderby=star';
                    break;
                case 'shili':
                    $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu0f0g0bz0/?orderby=shili';
                    break;
                case 'liangfang':
                    $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu0f0g0bz0/?orderby=liangfang';
                    break;
                case 'qiandan':
                    $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu0f0g0bz0/?orderby=qiandan';
                    break;
                default:
                    break;

            }

        } else {
            if (!$urlParams['i']) {
                $urlParams['i'] = 0;
            }
            switch($b){
                case 'star':
                    $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu' . $urlParams['fu'] . 'f' . $urlParams['f'] . 'g' . $urlParams['g'] . 'bz' . $urlParams['bz'].'/?orderby=star';
                    break;
                case 'shili':
                    $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu' . $urlParams['fu'] . 'f' . $urlParams['f'] . 'g' . $urlParams['g'] . 'bz' . $urlParams['bz'].'/?orderby=shili';
                    break;
                case 'liangfang':
                    $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu' . $urlParams['fu'] . 'f' . $urlParams['f'] . 'g' . $urlParams['g'] . 'bz' . $urlParams['bz'].'/?orderby=liangfang';
                    break;
                case 'qiandan':
                    $url = '//' . $this->cityInfo['bm'] . '.' . 'qizuang.com/company/list-fu' . $urlParams['fu'] . 'f' . $urlParams['f'] . 'g' . $urlParams['g'] . 'bz' . $urlParams['bz'].'/?orderby=qiandan';
                    break;
                default:
                    break;
            }
        }
        return $url;
    }

    //计算星星
    private function getStar($list){
        foreach ($list as $key => $value) {
            if($value["comment_score"] >= 9 ){
                $list[$key]["star"] = 5;
            }elseif($value["comment_score"] >= 8 && $value["comment_score"] < 9){
                $list[$key]["star"] = 4;
            }elseif($value["comment_score"] >= 6 && $value["comment_score"] < 8){
                $list[$key]["star"] = 3;
            }elseif($value["comment_score"] >= 4 && $value["comment_score"] < 6){
                $list[$key]["star"] = 2;
            }else{
                $list[$key]["star"] = 1;
            }
        }
        return $list;
    }

    public function changePageCases(){
        $post = I('post.');
        switch ($post['location']) {
            case 'company':
                S('Sub:Company:YuyueNum:' . $post['change_cid'], ($post['change_cnum']+1), 2592000);
                break;
            case 'top':
                $num = S('Sbu:Company:TopNum');
                S('Sbu:Company:TopNum', ($num - 1), 2592000);
                break;
        }
        $this->ajaxReturn(['status' => 1, 'info' => '']);
    }

    /**
     * 获取issale的拼接地址
     * @return mixed|string
     */
    public function getSaleQuery()
    {
        $url = $_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
        $parse_url = parse_url($url);
        $query_string = isset($parse_url["query"])?$parse_url["query"]:'';
        if (!empty($query_string)){
            $query_string = preg_replace('/(&)?p=([0-9]*)?.\&?/i', "", $query_string);
            if (stripos($query_string,'issale')===false){
                $query_string = '/?'.$query_string.'&issale=1';
            }else{
                $query_string = str_replace("issale=1","",$query_string);
                $query_string= '/?'.$query_string;
            }
        }else{
            $query_string = '/?issale=1';
        }
        return $query_string;
    }
}