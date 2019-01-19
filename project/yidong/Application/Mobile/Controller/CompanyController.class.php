<?php
/**
 * 移动版装修公司列表页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
use Common\Enums\ApiConfig;
class CompanyController extends MobileBaseController{
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
        $cityInfo = $this->cityInfo;
        $bm = $cityInfo['bm'];

        $bmflag = '1';
        if(empty($bm)){
            $bmflag = '0';
        }
        $this->assign("bmflag", $bmflag);
        $this->assign('showlocation',1);//显示页面name为‘location’的meta标签

        $cityid = $cityInfo['id'];

        $content = $cityInfo["name"];
        if(I("get.keyword") !== ""){
            $keyword = I("get.keyword");
            if(!checkKeyword($keyword)){
                $this->_error();
            }
            $info["keyword"] = $keyword;
            $content .= $keyword;
        }


        if(!empty($cityInfo)){
            $prefix = "http://".C("MOBILE_DONAMES").'/'.$cityInfo['bm'].'/company/list-';
            $result = $this->analyseUrl($_SERVER['REQUEST_URI'], $prefix, array('fu', 'f', 'g', 'bz'));

            if(!$result['checked']){
                $this->_error('页面不存在');
            }

            $navurl = $result['realurl'];
            $param = $result['config'];

            //获取城市信息
            $navbar["area"] = [];//S("Cache:m:navbar:area:".$cityInfo['id']);
            if (!$navbar["area"]) {
                $company["area"] = D("Quyu")->getAreaByFatherId($cityInfo['id']);
                $navbar['area'] = $this->getNavUrl($company["area"], 'fu', $navurl, $param['fu'], $prefix.'fu0f0g0bz0');
                S("Cache:m:navbar:area:".$cityInfo['id'],$navbar['area'],3600);
            }

            //获取服务保障列表
            $navbar["baozhang"] = [];//S("Cache:m:navbar:baozhang");
            if (!$navbar["baozhang"]) {
                $company["baozhang"] = D("Common/Leixing")->getbg();
                $navbar['baozhang'] = $this->getNavUrl($company["baozhang"], 'bz', $navurl, $param['bz'], $prefix.'fu0f0g0bz0');
                S("Cache:m:navbar:baozhang",$navbar['baozhang'],3600);
            }

            //获取公司规模选项
            $navbar["guimo"] = [];//S("Cache:m:navbar:guimo");
            if (!$navbar["guimo"]) {
                $company["guimo"] = D("Common/Guimo")->gethGm();
                $navbar['guimo'] = $this->getNavUrl($company["guimo"], 'g', $navurl, $param['g'], $prefix.'fu0f0g0bz0');
                S("Cache:m:navbar:guimo",$navbar['guimo'],3600);
            }
        }


        //获取装修公司列表
        $pageIndex = 1;
        $pageCount = 10;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
            $pageContent ="第".$pageIndex."页";
        }

        //根据pc端逻辑获取列表页
        $url = str_replace(array("/" . $bm . '/company/', "/" . $bm . '/company'),'', __SELF__);
        $url = preg_replace('/\&?p=([0-9]*)?.\&?/i','', $url);
        $url = $url == '?' ? '' : $url;
        $urlDepr = strpos($url,'?') === false ? '?' : '&';
        $isSale = I('get.issale');
        $isCert = I('get.iscert');
        $orderby = I('get.orderby');


        //URL替换 -- 此处写的比较随意
        $urlArray = array(
            '0'=> array('name'=> '热门排序','url' => 'hot','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
            '1'=> array('name'=> '信赖度','url' => 'star','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
            '2'=> array('name'=> '案例','url' => 'case','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
            '3'=> array('name'=> '设计师','url' => 'design','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
            '4'=> array('name'=> '活跃度','url' => 'active','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
            '5'=> array('name'=> '综合实力','url' => 'shili','active' => '','icon'=>'<i class="fa fa-long-arrow-down"></i>'),
        );

        foreach ($urlArray as $k => $v) {
            $urlArray[$k]['url'] = $this->replaceUrl($url,$orderby,$v['url']);
        }
        $saleUrl = empty($isSale)?__SELF__.$urlDepr.'issale=1' : str_ireplace(array('?issale=1','&issale=1'),'',__SELF__);
        $companyInfo['isSale'] = !empty($isSale) ? 'checked' : '';
        $companyInfo['isCert'] = !empty($isCert) ? 'checked' : '';
        $companyInfo['saleUrl']  = str_ireplace(array('/&', $urlDepr."p=$pageIndex"),array('/?',''),$saleUrl);


        if(!empty($orderby)){
            switch ($orderby) {
                case 'star'://信赖度 | 口碑
                    $condition['orderby'] = 'comment_score desc,id';
                    $urlArray['1']['active'] = 'xuanzcolor';
                    $urlArray['1']['icon'] = '';
                    break;
                case 'shili'://综合实力
                    $condition['orderby'] = '(COALESCE(case_count,0) + COALESCE(team_count,0)) desc,id';
                    $urlArray['5']['active'] = 'xuanzcolor';
                    $urlArray['5']['icon'] = '';
                    break;
                default:
                    $condition['orderby'] = 'case_count desc,team_count desc,comment_score desc,info_time';
                    $urlArray['0']['active'] = 'class="active"';
                    $urlArray['0']['icon'] = '';
                    break;
            }
        }else{
            $condition['orderby'] = 'case_count desc,team_count desc,comment_score,info_time ';
            $urlArray['0']['active'] = 'class="active"';
            $urlArray['0']['icon'] = '';
        }

        if($isCert == '1'){
            $condition['vip'] = '1';
        }
        if($isSale == '1'){
            $condition['sale'] = '1';
        }


        //设置城市ID
        $condition['cs'] = $cityid;

        //当点击信赖度时获取三天内的评论数最高

        foreach($param as $key => $value){
            if($value != "0"){
                if($key == "g"){
                    $condition["gm"] = $value;
                }elseif($key == 'fu'){
                    $condition['fw'] = $value;
                }elseif($key == "f"){
                    $condition['fg'] = $value;
                }else{
                    $condition[$key] = $value;
                }
            }
        }

        if($orderby == 'star'){

            $week = date("W")-1;
            $result = S('Cache:Company:comment:'.$bm.$week);

            if(empty($result)){

                S('Cache:Company:comment:'.$bm.($week-1), null);
                //获取三天内的评论数

                $threeResult = D("Common/Comment")->getThreeCommentCount($condition);

                foreach($threeResult as $key => $value){
                    $comids[] = $value['comid'];
                }

                if(!empty($comids)){
                    $condition['comids'] = $comids;
                }

                $resultNew = $this->getList($condition,$pageIndex,$pageCount);

                unset($condition['comids']);
                if(!empty($comids)){
                    $condition['comid'] = $comids;
                }

                $resultOld = $this->getList($condition,$pageIndex,$pageCount - count($resultNew['list']));

                $list = array_merge($resultNew['list'], $resultOld['list']);

                $result['list'] = $list;
                $result['page'] = $resultOld['page'];
                $result['num'] = $resultOld['num'];

                S('Cache:Company:comment:'.$bm.$week, $result, 1296000);
            }
        }

        $result = $this->getList($condition,$pageIndex,$pageCount, $keyword);

        if(!empty($result)){
            $companyInfo["companyList"] = $this->getStar($result["list"]);
            $companyInfo["page"] = $result["page"];
            $companyInfo["count"] = $result["num"];
        }

        //$list =  $this->getCompanyList($pageIndex, $pageCount, $keyword, $cityInfo["id"], $param);

        if(empty($keyword)){
            $area = [];
            foreach ($company["area"] as $key => $val) {
                $area[$val['id']] = $val['name'];
            }
            if(empty($area[$param['fu']])){
                $basic["head"]["title"] = $cityInfo["name"] . "装修公司排名_" . $cityInfo["name"] . "装修公司大全-" . $cityInfo["name"] . "齐装网";
                $basic["head"]["keywords"] = $content."装修公司,".$content."装修公司排名,".$content."装修公司大全".$pageContent;
                $basic["head"]["description"] ="齐装网为您提供".$content."装修公司排名以及".$content."装修公司大全查询,并提供免费设计服务，注册即可免费获得4份装修设计与报价！";
            }else{
                $content = $cityInfo["name"] . $area[$param['fu']];
                $basic["head"]["title"] = $content . '装修公司排名 - '. $cityInfo["name"] .'齐装网';
                $basic["head"]["keywords"] = $content . '装修公司，'. $content .'装修设计';
                $basic["head"]["description"] = $cityInfo["name"] . '齐装网汇集了'.$content.'装修公司排名大全，免费为您提供'.$content.'装修公司的装修案例和装修预算方案，让您知道'.$content.'装修公司哪家好，彻底为您解决装修难题。';
            }
        }else{
            //关键字、描述、标题
            $basic["head"]["title"] = $content.",".$content."怎么样".$pageContent;
            $basic["head"]["keywords"] =  $content;
            $basic["head"]["description"] = "齐装网为您提供".$content."的相关信息，".$content."怎么样，找".$content."就上齐装网！";
        }

        //获取后台配置的TDK
        $config = [
            'cs' => $this->cityInfo['id'], //城市id
            'model' => 2, //模块 1.首页 2.装修公司 3.装修资讯
            'category' => '', //装修资讯子频道栏目
            'location' => 2, //位置 1.pc端 2.移动端
            'page' => I('get.p'), //分页
        ];
        $basic["head"] = getCommonManageTdk($basic["head"], $config);

        if(empty($cityInfo)){
            $info['canonical'] = 'http://'.C('QZ_YUMINGWWW').'/company/';
        }else{
            $info['canonical'] = $cityInfo['bm'].'/company' == trim($_SERVER['REQUEST_URI'],'/') ? 'http://'.$cityInfo['bm'].'.'.C('QZ_YUMING').'/company/' : '';
            $query = str_replace('/'.$bm,'',$_SERVER['REQUEST_URI']);
            if(empty($info['canonical'])){
                $info['canonical'] = 'http://'.$cityInfo['bm'].'.'.C('QZ_YUMING').$query;
            }
        }

        //根据src获得当前一条记录
        $src = $_GET['src'];
        if(!empty($src)){
            $source = D("OrderSource")->getOne($src);
            $weixinResult = D("YySrcWeixin")->getOneBySourceid($source['id']);
        }

        if(empty($weixinResult)){
            $weixinResult = D("YySrcWeixin")->getDefault();
        }

        $noresult = 0;
        if(empty($companyInfo['companyList'])){
            $noresult = 1;
        }

        $arr_url = explode("?", $_SERVER['REQUEST_URI']);
        //获取优惠券（专用券/通用券）
        $companyInfo['companyList'] = $this->getSpecialCard($companyInfo['companyList']);
        $this->assign("url", $arr_url[0]);
        $this->assign("url_2", $arr_url[1]);
        $this->assign("param", $param);
        $this->assign("companyInfo", $companyInfo);
        $this->assign("noresult", $noresult);
        $this->assign("navbar",$navbar);

        $info["list"] = $this->getStar($list["companyList"]);
        $info["page"] = $list["page"];
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("info",$info);
        $this->assign("img", $weixinResult['img']);
        $this->assign("basic",$basic);
        $this->display("index_2815");
    }

    //计算星星
    private function getStar($list){
        $logo = OP('DEFAULT_LOGO');
        foreach ($list as $key => $value) {
            if(empty($value['logo'])){
                $list[$key]["logo"] = "http://".C('QINIU_DOMAIN').'/'.$logo;
            }
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

    /**
     * [getNavUrl 获取导航URL]
     * @param  [type] $datas [该类型下的所有类型]
     * @param  [type] $type  [静态参数和动态参数数组]
     * @param  [type] $urls  [当前页面去掉分页和动态参数之后的URL]
     * @return [type]        [description]
     */
    public function getNavUrl($datas, $type, $url, $present, $init = '')
    {
        //如果去掉自己之后的分类数后分类ID组合小于等于零,说明是初始化
        if(intval(preg_replace('/\D/s', '', $url)) == 0 && !empty($init)){
            $url = $init;
        }
        $selected = array();

        //去掉当前的
        $reg = '/' . $type . '\d+/i';

        foreach ($datas as $key => $value) {
            $datas[$key]["link"] = preg_replace($reg, $type.$value["id"], $url);
            if($value['id'] == $present){
                $selected = $value;
            }
        }

        $array = array(
           'name' => '不限',
           'link' => preg_replace($reg, $type.'0', $url)
        );
        array_unshift($datas, $array);
        return array('result' => $datas, 'selected' => $selected);
    }

    //新增装修公司落地页
    public function companylandpage(){

        //城市信息
        $cityInfo = session('m_cityInfo');

        //装修公司
        $info['company'] = S('C:Mobile:Company:companylandpage:company:' . md5($cityInfo['id']));
        if (empty($info['company'])) {
            $number = 4;
            if (empty($cityInfo['id'])) {
                $company = D("Advbanner")->getBrandList('000001', $number);
            } else {
                $company = D("Advbanner")->getBrandList($cityInfo['id'], $number);
                //数量不足四个则获取主站的
                if (count($company) < $number) {
                    //获取主站的四个
                    $commons = D("Advbanner")->getBrandList('000001', $number);
                    $company = array_merge($company, array_slice($commons, 0, $number - count($company)));
                }
            }

            $companyIds = array();
            foreach ($company as $key => $value) {
                $companyIds[] = $value['company_id'];
            }

            $caseCount = $caseImage = $commentScore = array();
            //获取各个公司案例数量
            $temp = D('Cases')->getCaseCountByCompanyIds($companyIds);
            foreach ($temp as $key => $value) {
                $caseCount[$value['uid']] = $value['number'];
            }

            //获取各个公司最新案例
            $temp = D('Cases')->getLastCaseByCompanyIds($companyIds);
            foreach ($temp as $key => $value) {
                $caseImage[$value['uid']] = $value;
            }

            //获取各个公司评论数量
            $temp = D('User')->getCommentCountByCompanyIds($companyIds);
            foreach ($temp as $key => $value) {
                $commentCount[$value['uid']] = $value['comment_count'];
            }

            foreach ($company as $key => $value) {
                $company[$key] = array(
                    'jc' => $value['jc'],
                    'img_url' => $value['img_url'],
                    'caseCount' => $caseCount[$value['company_id']],
                    'caseImage' => $caseImage[$value['company_id']],
                    'commentCount' => $commentCount[$value['company_id']]
                );
            }
            $info['company'] = $company;
            S('C:Mobile:Company:companylandpage:company:' . md5($cityInfo['id']), $info['company'], 900);
        }

        //装修案例
        $cid = empty($cityInfo['id']) ? '000001' : $cityInfo['id'];
        $info['case'] = S('C:Mobile:Company:companylandpage:case:v1:' . md5($cid));
        if (empty($info['case'])) {
            $temp = D("Advbanner")->getCaseList($cid, 5);
            if (count($temp) < 5) {
                //数量不足5个则补充全站的
                $common = D("Advbanner")->getCaseList('', 5 - count($temp));
                $temp = array_merge($temp, $common);
            }
            foreach ($temp as $key => $value) {
                $result = array(
                    'url' => $value['url'],
                    'img_url' => $value['img_url'],
                    'title' => $value['title'],
                    'jc' => $value['jc'],
                    'url_mobile' => $value['url_mobile'],
                );
                if (!empty($value['img_url_mobile'])) {
                    $result['img_url'] = $value['img_url_mobile'];
                }
                if (!empty($value['url_mobile'])) {
                    $result['url'] = $value['url_mobile'];
                } else {
                    $parse = parse_url($value['url']);
                    $result['url'] =  "http://".C("MOBILE_DONAMES").'/'.explode('.', $parse['host'])[0] . $parse['path'];
                }
                $info['case'][] = $result;
            }
            S('C:Mobile:Company:companylandpage:case:v1:' . md5($cid), $info['case'], 900);
        }

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];

        $this->assign('info', $info);
        $this->assign('showTmp', '1');
        $this->display();
    }
    //空间招标落地页
    public function spacelandpage(){
        $info = S('Cache:mobile:spacelandpage');
        if (!$info) {
            //户型
            $huxing = D("Huxing")->gethx(false);
            $info["huxing"] = $huxing;
            S("Cache:mobile:spacelandpage", $info, 3600);
        }
        //获取该城市第一个区，用于显示默认城市
        $cityarea['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("info", $cityarea);
        $this->assign("zbInfo", $info);
        $this->assign("huxing", json_encode($info['huxing']));
        $this->display();
    }

    // 平台装修落地页
    public function plateformlandpage(){
        //根据src获得当前一条记录
        $src = $_GET['src'];
        if(!empty($src)){
            $source = D("OrderSource")->getOne($src);
            $weixinResult = D("YySrcWeixin")->getOneBySourceid($source['id']);
        }

        if(empty($weixinResult)){
            $weixinResult = D("YySrcWeixin")->getDefault();
        }

        $head = [
            "title" => "好的装修公司推荐_家装公司排名_装修公司哪家好-齐装网",
            "keywords" => "装修哪家公司好,家装公司排名,好的装修公司推荐",
            "description" => "齐装网汇集了6万多靠谱的家装公司排名,让您更快捷更全面的了解装修哪家公司好,帮助业主根据自身需求推荐好的装修公司,体验贴心的一站式服务,享受靠谱的六大保障,轻松装修乐无忧,就上齐装网吧!",
        ];

        $this->assign("img", $weixinResult['img']);
        $this->assign("head", $head);
        $this->display();
    }


    //品牌落地页
    public function pinpai(){

        //随机生成获取设计与报价的人数并且生成缓存数据
        $randPeople = S("m:company:pinpai");
        if(empty($randPeople)){
            $randPeople = rand(200, 1000);
        }
        if(!empty($_GET['key'])){
            //ajax传入的数据写入缓存
            S("m:company:pinpai", $_GET['key'], 900);
            $this->ajaxReturn(array("status"=> "1", "info"=>"success", "data"=>$_GET['key']));
        }

        //获取该城市第一个区，用于显示默认城市
        $cityarea['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("info", $cityarea);

        //根据src获得当前一条记录
        $src = $_GET['src'];
        if(!empty($src)){
            $source = D("OrderSource")->getOne($src);
            $weixinResult = D("YySrcWeixin")->getOneBySourceid($source['id']);
        }

        if(empty($weixinResult)){
            $weixinResult = D("YySrcWeixin")->getDefault();
        }

        $head = [
            "title" => "专业靠谱的互联网装修平台_找满意的装修公司就上齐装网",
            "keywords" => "齐装网,专业装修平台,找装修公司",
            "description" => "齐装网，中国知名大型装修平台，专业靠谱的互联网装修平台。入驻全国6万家装修公司与设计师,为全国500多个城市业主提供专业的装修服务:五大审核标准，为您找到满意的装修公司。六大装修服务，为您整个装修过程省钱。2018年我们追求的是优质的用户口碑，找满意的装修公司就上齐装网。",
        ];

        $this->assign("randPeople", $randPeople);
        $this->assign("img", $weixinResult['img']);
        $this->assign("head", $head);
        $this->display();
    }


    /**
     * [analyseUrl /company/list-fu320582f4g27]
     * @param  [type]  $url    [当前访问URL]
     * @param  [type]  $prefix [前缀]
     * @param  [type]  $param  [短参数]
     * @param  boolean $check  [是否检查非法输入]
     * @return [type]          [description]
     */
    private function analyseUrl($url, $prefix, $param, $check = true)
    {
        $realurl = rtrim(strstr($url, '?', true), '/');

        if(empty($realurl)){
            $realurl = rtrim($url,'/');
        }
        //去掉前缀
        $count = 0;
        $result = str_ireplace($prefix, '', $realurl, $count);

        //对非法url输入过滤
        if($check){
            if($count == 0){
                $checked = true;
            }else{
                $str = str_ireplace('/', '\/', $prefix);
                //拼接正则表达式
                $pattern = '/^'.$str.'(';
                foreach ($param as $key => $val) {
                    $pattern = $pattern . $val . '[\d]' . '+';
                }
                $pattern = $pattern . ')$/';
                $i = preg_match($pattern, $realurl);
                $checked = $i == 0 ? false : true;
            }
            $return['checked'] = $checked;
        }

        foreach ($param as $key => $val) {
            $pattern = '/'. $val .'\d+/i';
            $count = preg_match($pattern, $result, $match);
            if($count > 0){
                $k = preg_replace('/\d/s', '', $match[0]);
                $v = preg_replace('/\D/s', '', $match[0]);
                $config[$k] = $v;
            }else{
                //如果没有匹配到设置默认值为0
                $config[$val] = 0;
            }
        }

        //重组url，避免他人乱输入URL造成死链接
        if(array_sum($config) > 0){
            $realurl = $prefix;
            foreach ($config as $key => $val) {
                $realurl = $realurl . $key .$val;
            }
        }

        $return['config'] = $config;
        $return['realurl'] = $realurl;
        return $return;
    }

    /**
     * 获取装修公司列表
     * @return [type] [description]
     */
    private function getCompanyList($pageIndex,$pageCount,$keyword,$cs,$param)
    {
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);
        $count = D("Common/User")->getUserInfoListCount(3,$keyword,$cs,$param['fu'],$param['f'],$param['g']);

        if ($count >= $pageCount*100) {
            $count = $pageCount*100;
        }

        if ($pageIndex > 100) {
            $pageIndex = 100;
        }

        if($count > 0){
            import('Library.Org.Page.MobilePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \MobilePage($pageIndex,$pageCount,$count,$config,"html");
            $pageTmp =  $page->show2();
            $result = D("Common/User")->getUserInfoList(($page->pageIndex-1)*$pageCount,$pageCount,3,$keyword,$cs,$param['fu'],$param['f'],$param['g']);
            import('Library.Org.Util.Fiftercontact');
            $filter = new \Fiftercontact();
            foreach ($result as $key => $value) {
                $result[$key]["qc"] = $filter->filter_title($value["qc"]);
                $result[$key]["uv"] = ceil($value["uv"]) < 1?1:ceil($value["uv"]) ;
                $result[$key]["qd"] = $value["qdcount"] +$value["zzqd"];
            }
            return array("companyList"=>$result,"page"=>$pageTmp);
        }
        return null;
    }



    //排序URL替换
    private function replaceUrl($url,$a='',$b='')
    {
        //dump($url.'|'.$a.'|'.$b);
        $urlDepr = '?';
        if (strpos($url, '&') === true || strpos($url, '?') === true || strpos($url, '?') === 0 || strpos($url, '?')) {
            $urlDepr = '&';
        }
        //存在分页
        if (strpos($url, 'p=') !== false) {
            $page = I('get.p');
            $url = str_replace($urlDepr . 'p=' . $page, '', $url);
        }
        if (empty($url)) {
            return '?orderby=' . $b;
        }
        if (!empty($a)) {
            return strtr('/company/' . $url, array("$a" => "$b"));
        } else {
            return "/company/" . $url . $urlDepr . 'orderby=' . $b;
        }
    }

    //ajax获取落地页信息
    public function getLandList(){
        if(IS_AJAX){
            $type = I("get.type");
            $info = I('get.info');
            $param = explode('|',$info);
            $location = intval($param[0]);
            $fengge = intval($param[1]);
            $huxing = intval($param[2]);
            $color = intval($param[3]);


            $html = S('Cache:Company:jxxgt:mobile:ajax'.":".$location.":".$fengge.":".$huxing.":".$color);
            if(!$html){
                $list = D('Meitu')->getLandPageMeiTuList($location,$fengge,$huxing,$color,12,$type);
                if(!empty($list)){
                    $html = '';
                    foreach($list as $key=>$val){
                        $html .=  '<li class="box'.++$key.'"><a href="http://m.qizuang.com/meitu/p'.$val["id"].'.html" target="_blank"><div class="img"><img  src="http://'.C('QINIU_DOMAIN').'/'.$val["img_path"].'-w300.jpg" ><p> '.$val["title"].'</p></div></a></li>';
                    }
                    S('Cache:Company:jxxgt:mobile:ajax'.":".$location.":".$fengge.":".$huxing.":".$color,$html,900);
                    $this->ajaxReturn(array("data"=>$html,"info"=>"","status"=>1));
                }else{
                    $this->ajaxReturn(array("status"=>0));
                }
            }else{
                $this->ajaxReturn(array("data"=>$html,"info"=>"","status"=>1));
            }


        }


    }

    public function addNum(){
        if(IS_AJAX) {
            $num = S('Cache:Company:jxxgt');
            S('Cache:Company:jxxgt', $num + 1, strtotime(date("Y-m-d" . "23:59:59")) - time());
            $this->ajaxReturn(array("data" => $num + 1, "info" => "", "status" => 1));
        }
    }



    private function getList($map,$pageIndex = 1,$pageCount = 10, $keyword){

        import('Library.Org.Page.LitePage');

        $result = D("Common/Company")->getList($map,($pageIndex-1) * $pageCount,$pageCount,$keyword);

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

        $count = D("Common/Company")->getCompanyCount($map, $keyword);
        import('Library.Org.Page.MobilePage');
        //自定义配置项
        $config  = array("prev","next");
        //移动端分页
        $page = new \MobilePage($pageIndex,$pageCount,$count,$config,"html");
        $pageTmp =  $page->show2();
        //PC端分页
        /*$page = new \LitePage($pageIndex,$pageCount,$count,$config);
        $pageTmp =  $page->show();*/
        return array("list"=>$result['result'],"page"=>$pageTmp,"num"=>$count);
    }


    //装修效果图落地页
    public function jxxgtlandpage(){
        //发单人数
        //获取缓存中的数据
        $num = S('Cache:Company:jxxgt');
        if(!$num){
            //不存在 则缓存中没有数据 当天第一次申请
            $num = rand(200,2000);
            S('Cache:Company:jxxgt',$num,strtotime(date("Y-m-d"."23:59:59"))-time());
        }

        //底部户型
        $zbInfo["huxing"]= D("Huxing")->gethx(false);

        //推荐
        $reFirst = D('Meitu')->getLandPageMeiTuList(0,0,10,0,6,1);
        $category["recommand"]  = array('xh','yj','bo','ds','ty','et','bj','pm','cf','jg','dh');

        //获取户型
        $fix = '4,5,6,10,11,12,14,15,7,8,9,16,17,18,19';//指定户型id
        $category['hx'] = D('Meitu')->getHuxing('',false,$fix);


        //获取风格
        $fix = '4,5,12,31,6,7,8,9,13,15,24,10,11,16,17';//指定风格
        $category['fg'] = D('Meitu')->getFengge('',false,$fix);

//        $category['fg']['fgFirst']  = D('Meitu')->getLandPageMeiTuList(0,4,0,0,12);
        //获取颜色
        $fix = '12,11,6,8,9,10,15,14,5,4,7,13';//指定风格
        $category['cl'] = D('Meitu')->getColor('',false,$fix);

        //获取局部
        $fix = '4,5,9,6,7,8,10,11,12，22,25，13,14，15,16';//指定风格
        $category['lt'] = D('Meitu')->getLocation('',false,$fix);



        //获取首页 3D
        $threeDList = S('Cache:Company:jxxgt:mobile:3d');
        if(!$threeDList){
            $threeDList = D('Pubmeitu')->getLandPubMeiTuList(1,5,1);
            S('Cache:Company:jxxgt:mobile:3d',$threeDList,3600);
        }

        //获取案例
        $huxing = array(10,11,12,14,15);
        $caseList = S('Cache:Company:jxxgt:mobile:cases');
        if(!$caseList){
            foreach($huxing as $val){
                $caseList[$val] = D("Common/Cases")->getLandCaseImagesList( 0, 10,1,$val,0,0,$ys = "",$sm="",$keyword='',$city = '',$leixing='',5);//普通
            }
            S('Cache:Company:jxxgt:mobile:cases',$caseList,3600);
        }


//        print_r($caseList);exit;
        //微信二维码
        $src = I('get.src');
        //根据渠道来源 来选择二维码
        $source = D("OrderSource")->getOne($src);
        $weixinResult = D("YySrcWeixin")->getOneBySourceid($source['id']);
        if(empty($weixinResult)){
            $weixinResult = D("YySrcWeixin")->getDefault();
        }
        if (!empty($weixinResult)) {
            $this->assign("wx_img", $weixinResult['img']);
        }
        $keys["title"] = "2018精选装修效果图_家居装修效果图欣赏_3D实景装修案例效果图-齐装网装修效果图";
        $keys["keywords"] ="装修效果图,2018家居装修效果图,装修效果图案例,小户型装修效果图";
        $keys["description"] ="齐装网为您提供精选2018年家居装修效果图及全新款家居装修搭配图片欣赏,精选大小户型装修效果图，田园北欧等风格3D实景装 修效果图，还有时尚的客厅、卧室、卫生间等各类2018装修效果图。";
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("info",$info);
        $this->assign("keys",$keys);
        $this->assign("zbInfo",$zbInfo);
        $this->assign("num",$num);
        $this->assign("reFirst",$reFirst);
        $this->assign("category",$category);
        $this->assign("threeDList",$threeDList);
        $this->assign("caseList",$caseList);
        $this->assign("source", 18032349);
        $this->display('jssdk');
    }

    function huanYiHuan(){
        $page_count = 5;
        $p = I('post.p')?I('post.p'):1 ;
        $skip = $page_count*($p-1);
        $response = [
            'status' => 0,
            'info' => '请求失败'
        ];
        $cityInfo = $this->cityInfo;
        $condition = [
            'orderby' => 'case_count desc,team_count desc,comment_score,info_time ',
        ];
        if($cityInfo){
            $condition['cs'] = $cityInfo['id'];
        }
        $this->assign('cityInfo',$cityInfo);
        $data = D("Common/Company")->getList($condition,$skip,$page_count);
        $company = $this->getStar($data['result']);
        $response['status'] = 1;
        $response['info'] = '成功';
        $response['result'] = $company;
        $this->ajaxReturn($response);
    }


    //装修类型落地页
    public function quanbao()
    {
        $head['title'] = '装修公司全包还是半包好_装修公司选择标准_齐装一站式装修服务解决方案平台-齐装网';
        $head['keywords'] = '装修公司全包还是半包好,装修公司选择标准,装修服务平台';
        $head['description'] = '齐装网装修服务平台为广大业主提供齐装一站式装修服务解决方案，帮助业主合理选择全包、半包和清包装修方式，严格按照标准筛选装修公司，注重高品质的装修服务体验，解决业主普遍面临的各种装修问题。上齐装平台，只需七步，装修无忧！';
        $this->assign('head',$head);

        //根据src获得当前一条记录
        $src = $_GET['src'];
        if(!empty($src)){
            $source = D("OrderSource")->getOne($src);
            $weixinResult = D("YySrcWeixin")->getOneBySourceid($source['id']);
        }

        if(empty($weixinResult)){
            $weixinResult = D("YySrcWeixin")->getDefault();
        }
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("info", $info);

        $this->assign("img", $weixinResult['img']);
        $this->display();
    }

    public function liangfang()
    {
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("info",$info);
        $this -> display();
    }

    //获取专用券/通用券
    private function getSpecialCard($companyinfo){
        //$companyInfo['companyList']
        foreach ($companyinfo as $key => $val){
            //公司id  = $val['id'];
            $companyinfo[$key]['cardlist'] = D('Company')->getSpecialCardById($val['id']);
            $companyinfo[$key]['cardcount'] = D('Company')->getSpecialCardCountById($val['id']);
        }
        return $companyinfo;
    }

    /**
     * getCardInfoById   根据id获取优惠券信息
     */
    public function getCardInfoById(){
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $id = I('get.cardid');
            if(empty($id)){
                $this->ajaxReturn(['error_code' => ApiConfig::LACK_CARDID, 'error_msg' => '缺少优惠券id']);
            }
            $map = [];
            $map['a.id'] = $id;
            $info = D('Company')->getCardInfoById($map);
            if($info){
                $info['start'] = date('Y-m-d H:i:s',$info['start']);
                $info['end'] = date('Y-m-d H:i:s',$info['end']);
                $info['money1'] = $info['money1'] ? (int)$info['money1'] : 0;
                $info['money2'] = $info['money2'] ? (int)$info['money2'] : 0;
            }
            $this->ajaxReturn(['error_code' => ApiConfig::REQUEST_SUCCESS, 'error_msg' => '请求成功', 'data'=>$info]);
        }else{
            $this->ajaxReturn(['error_code' => ApiConfig::REQUEST_TYPE_ERROR, 'error_msg' =>'错误的请求方式']);
        }
    }


}