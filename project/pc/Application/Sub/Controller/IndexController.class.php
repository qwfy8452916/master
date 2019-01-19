<?php
namespace Sub\Controller;
use Sub\Common\Controller\SubBaseController;
class IndexController extends SubBaseController{
    public function _initialize(){
        parent::_initialize();
        //添加顶部搜索栏信息
        $this->assign('serch_uri','companysearch');
        $this->assign('serch_type','装修公司');
        $this->assign('holdercontent','全国超过十万家装修公司为您免费设计');
    }

    private $stars = array(
              "5"=>array("min"=> 9,"max"=>11),
              "4"=>array("min"=> 8,"max"=> 9),
              "3"=>array("min"=> 4,"max"=> 7),
              "2"=>array("min"=> 2,"max"=> 4),
              "1"=>array("min"=> 1,"max"=>2)
        );

    public function index(){
        //处理为0的控制器页面为404
        if (0 === strrpos($_SERVER['REQUEST_URI'], '/0')) {
            $this->_error();
        }
        //检查客户端设备类型 移动版本跳转到
        B("Home\Behavior\MobileBrowserCheck");
        //判断是否是搜索引擎蜘蛛
        $robotIsTrue = B("Common\Behavior\RobotCheck");
        //$robotIsTrue = true; //debug 警告线上应该为注释状态
        if (true === $robotIsTrue) {
            $this->assign('robot',1);
        }
        $cityInfo = $this->cityInfo;
        //获取head头关键字keywords描述description标题title
        $keys["title"] =$cityInfo["name"]."装修_".$cityInfo["name"]."装修公司_".$cityInfo["name"]."装修网-齐装网";
        $keys["keywords"] = $cityInfo["name"].'装修,'.$cityInfo["name"].'装修公司,'.$cityInfo["name"].'装修网';
        $keys["description"] = $cityInfo["name"].'齐装网致力于为广大业主提供透明、保障、省心的装修服务，汇集众多优秀的'.$cityInfo["name"].'装修装饰公司和家装工装设计师，并提供权威的'.$cityInfo["name"].'装修公司排名供您参考';

        //获取注册业主数量
        $info["userCount"] = releaseCount("user");
        //获取装修案例数量
        $info["casesCount"] = releaseCount("cases");
        //获取装修效果图数量
        $info["caseimgsCount"] = releaseCount("caseimgs");
        //获取注册公司数量
        $info["companyCount"] = releaseCount("company");
        //获取注册设计师数量
        $info["designerCount"] = releaseCount("designer");

        //获取轮播,不限制数量
        $info["lunbo"] = S('Cache:Sub:Index:lunbo:v3:'.$cityInfo["bm"]);
        if(!$info["lunbo"]){

            //1.第一张是全站理轮播
            //2.后面5张分站轮播
            //3.最后一张是全站
            //4.如果分站不够全站补

            //获取分站轮播图片
            $subLunbo = D("Advbanner")->getAdvBannerList($cityInfo["id"],5);

            $offset = 5 - count($subLunbo);
            $limit = 2;
            if ($offset > 0) {
                $limit += $offset;
            }

            //获取全站轮播图片
            $mainLunbo = D("Advbanner")->getAdvBannerList('0',$limit);

            $info["lunbo"][] = $mainLunbo[0];
            unset($mainLunbo[0]);
            foreach ($subLunbo as $key => $value) {
                $info["lunbo"][] = $value;
            }
            if ($limit > 1) {
                foreach ($mainLunbo as $key => $value) {
                    $info["lunbo"][] = $value;
                }
            }
            //每三小时统计一次轮播展示
            $isUpdateLunboLog = S('Cache:Sub:Index:lunboLog:'.$cityInfo["bm"]);
            if(!$isUpdateLunboLog){
                foreach ($info["lunbo"] as $k => $v) {
                    if(!empty($v['company_id'])){
                        $this->advBannerShowLog($v['id'],$v['company_id'],$v['city_id']);
                    }
                }
                S('Cache:Sub:Index:lunboLog:'.$cityInfo["bm"],time(),10800);
            }
            //装修公司如果不填写链接，默认公司主页
            foreach ($info["lunbo"] as $key => $value) {
                if (empty($value['url']) && !empty($value['company_id'])) {
                    $value['url'] = "http://".$value["bm"].".".C('QZ_YUMING')."/company_home/".$value["company_id"]."/";
                }
                $info["lunbo"][$key]['url'] = $value['url'];
            }
            S('Cache:Sub:Index:lunbo:v3:'.$cityInfo["bm"],$info["lunbo"],900);
        }

        //获取案例
        $info["cases"] = S('Cache:Sub:Index:cases:v2:'.$cityInfo["bm"]);
        if(!$info["cases"]){
            $info["cases"] = D("Advbanner")->getAdvList("home_cases",$cityInfo["id"],5);
            $count = count($info["cases"]);
            if($count < 5){
                $info["cases"] = D("Advbanner")->getAdvList("home_cases",'000001',(5-$count));
            }
            S('Cache:Sub:Index:cases:v2:'.$cityInfo["bm"],$info["cases"],900);
        }

        //获取通栏A
        $info["bigbanner_a"] = S('Cache:Sub:Index:bigbanner_a:'.$cityInfo["bm"]);
        if(!$info["bigbanner_a"]){
            $info["bigbanner_a"] = D("Advbanner")->getAdvList("home_bigbanner_a",$cityInfo["id"],3);
            S('Cache:Sub:Index:bigbanner_a:'.$cityInfo["bm"],$info["bigbanner_a"],900);
        }

        //获取通栏B
        $info["bigbanner_b"] = S('Cache:Sub:Index:bigbanner_b:'.$cityInfo["bm"]);
        if(!$info["bigbanner_b"]){
            $info["bigbanner_b"] = D("Advbanner")->getAdvList("home_bigbanner_b",$cityInfo["id"],3);
            S('Cache:Sub:Index:bigbanner_b:'.$cityInfo["bm"], $info["bigbanner_b"],900);
        }

        //效果图和效果图类别
        $info["effect_meitu"] = S('Cache:Index:effect_meitu:v2:');
        if(!$info["effect_meitu"]){
            $subdata = unserialize(D('Options')->getOptionNoCache('subhome_effect_meitu_dist')['option_value']);
            foreach ($subdata as $key => $value) {
                switch ($value['type']) {
                    case '1':
                        $imrecommend[] = $value;
                        break;
                    case '2':
                        $wdrecommend[] = $value;
                        break;
                    default:
                        break;
                }
            }
            $info["effect_meitu"] = ['imrecommend' => $imrecommend, 'wdrecommend' => $wdrecommend];
            foreach ($info["effect_meitu"]["imrecommend"] as $key => $value) {
                    if(strpos($value["url"],"http://") === false){
                        $info["effect_meitu"]["imrecommend"][$key]["url"] = "http://".$value["url"];
                    }
                    $info["effect_meitu"]["imrecommend"][$key]["img"] = "http://staticqn.qizuang.com/".$value["img"];
            }
            S('Cache:Index:effect_meitu:v2:',$info["effect_meitu"] ,900);
        }

        //装修攻略
        $info["steps"] = S('Cache:Index:steps:v2:');
        if(!$info["steps"]){
            $info["steps"] = $this->getStep(87,6,true);
            S('Cache:Index:steps:v2:',$info["steps"],900);
        }

        $cityid = session('cityId');
        $info['cityname'] = $this->cityInfo['name'];
        //品牌榜 - 热门装修公司
        $info['brands'] = S('Cache:Sub:Index:hotBrands:v2:'.$cityid);
        if(empty($info['brands'])){
            //分站直接获取9条
            $brands = D("Advbanner")->getBrandList($cityid,9);
            foreach ($brands as $key => $value) {
                $ids[] = $value["company_id"];
            }
            $info['brands'] = $brands;
            S('Cache:Sub:Index:hotBrands:v2:'.$cityid, $info['brands'], 900);
        }

        $info['brandscount'] = 10-count($info['brands']);

        //装修流程
        $info['liucheng'] = S('Cache:PC:Index:lc:v2:');
        if (!$info['liucheng']) {
            $arr = D('WwwArticleClass')->getArticleClassIdsByClass('87');
            $id = array();
            foreach ($arr as $row) {
                $id[] = $row['id'];
            }
            if (!empty($id)) {
                $liucheng['class_id'] = array('IN', $id);
            } else {
                //文章分类为空
                $liucheng['class_id'] = array('EQ', '');
            }
            $liucheng['a.recommend'] = 1; //推荐
            $liucheng['a.state'] = 2; //审核
            $info['liucheng'] = D('WwwArticle')->getWwwArticleList($liucheng, 0, 6, 'a.addtime DESC');
            S('Cache:PC:Index:lc:v2:', $info['liucheng'], 900);
        }

        //装修问答
        $info['wenda'] = S('Cache:Home:Index:wenda:v2:');
        if (!$info['wenda']) {
            //最多回答
            $info['wenda'] = M("ask")->field('id,title,views,anwsers')->where(['visible'=>'0'])->order('id desc,create_time desc')->limit('0,6')->select();
            S('Cache:Home:Index:wenda:v2:',$info['wenda'],900);
        }

        //装修百科
        $info['baike'] = S('Cache:Home:Index:baike:v2:');
        if (!$info['baike']) {
            $baike['_string'] = 'a.review != 0 AND a.visible = 0';
            //只获取删除状态为0的
            $baike['remove'] = 0;
            $info['baike'] = D("Adminbaike")->getDetailList($baike,0,6,'a.id,a.title, z.name AS category,c.name sub_category,c.url');
            S('Cache:Home:Index:baike:v2:',$info['baike'],900);
        }

        //装修日记
        $info['riji'] = S('Cache:Home:Index:riji:v2:');
        if (!$info['riji']) {
            $info['riji'] = D("Diary")->getNewList(6);
            S('Cache:Home:Index:riji:v2:',$info['riji'],900);
        }
        //文章分类和文章内容
       $info["cateGory"] = S('Cache:'.$cityInfo["bm"].':Index:cateGory:v2:');
        if(!$info["cateGory"]){
            $cateGoryList = D('Infotype')->getTypes(2);
            foreach ($cateGoryList as $key => $value) {
                $cateGoryList[$key]['content'] = D('Littlearticle')->getArticleListNew($value['id'], $cityInfo['id'], 0, 3, '', 'addtime desc');
                foreach ($cateGoryList[$key]['content'] as $k=>$v){
                    $desc = trim($v['description']);
                    if (empty($desc)){
                        $cateGoryList[$key]['content'][$k]['description'] = mbstr(strip_tags(htmlspecialchars_decode($v['content'])), 0, 45, 'utf-8',false);
                    }
                }
                switch ($value['shortname'])
                {
                    case "bendi":
                        $cateGoryList[$key]['px'] = 1;
                        break;
                    case "xuetang":
                        $cateGoryList[$key]['px'] = 2;
                        break;
                    case "gongsi":
                        $cateGoryList[$key]['px'] = 3;
                        break;
                    case "daogou":
                        $cateGoryList[$key]['px'] = 4;
                        break;
                    case "baojia":
                        $cateGoryList[$key]['px'] = 5;
                        break;
                    case "wenwen":
                        $cateGoryList[$key]['px'] = 6;
                        break;
                    case "jingyan":
                        $cateGoryList[$key]['px'] = 7;
                    break;
                    case "zxsj":
                        $cateGoryList[$key]['px'] = 8;
                        break;
                    default:
                        break;
                }
            }
            //重新排序
            $edition = array();
            foreach ($cateGoryList as $key => $value) {
                $edition[] = $value["px"];
            }
            array_multisort($edition, SORT_ASC,$cateGoryList);
            $info["cateGory"]=$cateGoryList;
            S('Cache:'.$cityInfo["bm"].':Index:cateGory:v2:',$info["cateGory"],900);
        }

        //获取当前城市设计案例最多的设计师,会员公司设计师优先
        $info["designer"] = S('Cache:'.$cityInfo["bm"].':Index:designer:v2:');
        if(!$info["designer"]){
            $info["designer"] = D("Advdesigner")->getDesignerList($cityInfo["id"],6);
            S('Cache:'.$cityInfo["bm"].':Index:designer:v2:',$info["designer"],900);
        }
        $info['designercount'] = 6-count($info["designer"]);

        //获取最新的业主点评
        $info["comment"] = S('Cache:'.$cityInfo["bm"].':Index:comment:v2:');
        if(!$info["comment"]){
            $info["comment"]  = D("Comment")->getRemovalCommentsByCity(4,$cityInfo["id"]);
            S('Cache:'.$cityInfo["bm"].':Index:comment:v2:',$info["comment"],900);
        }

        //获取友情链接
        $friendLink = S('Cache:Sub:Index:friendLink:v2:'.$cityInfo["bm"]);
        if(!$friendLink){
            $friendLink["link"] = D("Friendlink")->getFriendLinkList($cityInfo["id"],1);
            //获取热门城市
            $result =D("Friendlink")->getFriendLinkList($cityInfo["id"],2);
            foreach ($result as $key => $value) {
                $hotCity[] = $value;
            }
            $friendLink["hotCity"] = $hotCity;

            //获取附近城市
            $result =D("Friendlink")->getFriendLinkList($cityInfo["id"],4);
            foreach ($result as $key => $value) {
                $recentCity[] = $value;
            }
            $friendLink["recentCity"] = $recentCity;

            //获取区域装修公司
            $result =D("Friendlink")->getFriendLinkList($cityInfo["id"],5);
            foreach ($result as $key => $value) {
                $areaCompany[] = $value;
            }
            $friendLink["areaCompany"] = $areaCompany;
            S('Cache:Sub:Index:friendLink:v2:'.$cityInfo["bm"],$friendLink,900);
        }

        //获取是否显示获取报价弹层
        if(!isset($_COOKIE["w_index"])){
            $result = $this->getShowWindowTmp();
            if ($result) {
                $this->assign("isOpen",true);
            }
        }

        //添加返回总站按钮
        $info['returnhome'] = '<span class="returnhome"></span><div style="padding-left:2px; float:left;"><span><a href="http://'.C('QZ_YUMINGWWW').'" title="齐装网">返回总站</a></span></div>';

        //获取最新视屏的前四条
        $videos = D('ArticleVedio')->getArticleVedioList(1, 0, 4);
        //获取推荐视频
        $vRecommend = D('ArticleVedio')->getRecommendArticleVedio(1)[0];
        //导航栏标识
        //$this->assign("companys",$companys);

        //获取后台配置的TDK
        $config = [
            'cs' => $this->cityInfo['id'], //城市id
            'model' => 1, //模块 1.首页 2.装修公司 3.装修资讯
            'category' => '', //装修资讯子频道栏目
            'location' => 1, //位置 1.pc端 2.移动端
        ];
        $keys = getCommonManageTdk($keys,$config);

        $this->assign("videos", $videos);
        $this->assign("vRecommend", $vRecommend);
        $this->assign("tabIndex",0);
        $this->assign("keys",$keys);
        $this->assign("info",$info);
        $this->assign("friendLink",$friendLink);
        $this->display("index_20181221");
    }

    /**
     * 增加轮播显示日志
     * @param  [type] $bid [description]
     * @param  [type] $cid [description]
     * @return [type]      [description]
     */
    private function advBannerShowLog($bid,$cid,$cityid){
        $isCount = array(
            'bid' => $bid,
            'cid' => $cid,
            'dates' => date('Y').date('m').date('d')
        );
        $isCount = M("adv_banner_showlog")->field('id')->where($isCount)->find();
        if(empty($isCount)){
            //插入轮播日志
            $advLog = array(
                'bid' => $bid,
                'cid' => $cid,
                'city_id' => $cityid,
                'year' => date('Y'),
                'month' => date('m'),
                'days' => date('d'),
                'dates' => date('Y').date('m').date('d')
            );
            M("adv_banner_showlog")->add($advLog);
        }
    }



    //推荐装修公司
    private function recommendBrands($cityid){
        $recommendBrands = S('Cache:Home:Index:recommendBrands:'.$cityid);
        if(!$recommendBrands){
            //此处先判断是否有真实会员
            $realMembers = S('Cache:Home:Index:isRealMembers:'.$cityid);
            if(!$realMembers){
                //先取推荐品牌
                $vipMembers = D("Advbanner")->getBrandList($cityid,27,15);
                $ids = array_map(function($element){return $element['company_id'];},$vipMembers);
                $ids = implode($ids,',');
                $realMembers = D('User')->getRealMemberCount($cityid,$ids);
                if($realMembers < 1){
                    $realMembers = 'no';
                }
                S('Cache:Home:Index:isRealMembers:'.$cityid,$realMembers,900);
            }
            //有会员
            if($realMembers != 'no'){
                $recommendBrands = D("Advbanner")->getBrandList($cityid,27,15);
                if(!empty($recommendBrands)){
                    $count = 27 - count($recommendBrands);
                    for ($i=0; $i < $count; $i++) {
                        $recommendBrands[] = array(
                            'img_url' => 'logoadv/20160315/FibEpkWsCnwBPoa-I-Vopv2dqhWV.',
                        );
                    }
                }
                S('Cache:Home:Index:recommendBrands:'.$cityid,$recommendBrands,900);
            }
        }
        return $recommendBrands;
    }

    private function brands($cityid){
        $brands = S('Cache:Home:Index:brands:'.$cityid);
        if($brands || count($brands) < 56){
            $brands = D("Advbanner")->getBrandList($cityid,56);
            if(!empty($brands)){
                $count = 14 - count($brands);
                for ($i=0; $i < $count; $i++) {
                    $brands[] = array(
                        'img_url' => 'logoadv/20160315/FibEpkWsCnwBPoa-I-Vopv2dqhWV.',
                    );
                }
            }
            S('Cache:Home:Index:brands:'.$cityid,$brands,900);
        }
        return $brands;
    }

    //月活跃度排行
    private function getRankList($cs){
        $ranks = D("User")->getRanksList($cs);
        $comids = null;
        foreach ($ranks as $key => $value) {
            $comids[] = $value['id'];
        }
        $comids_count = D("User")->getCompanysCount($comids);  //查询公司 所有统计
        foreach ($ranks as $key => &$value) {
            foreach ($comids_count as $keys => $values) {
                if ($value['id'] == $values['id']) {
                    $value['casecount']    = $values['casecount'];    //所有案例个数统计
                    $value['infocount']    = $values['infocount'];    //所有文章个数统计
                    $value['commentcount'] = $values['commentcount']; //所有业主点评个数统计
                    $value['allCounts'] = $value['casecount'] + $value['infocount'] + $value['commentcount'];
                }
            }
        }
        return $ranks;
    }

    /**
     * 获取验证码
     * @return [type] [description]
     */
    public function verify(){
        getVerify("",4,120,35);
    }

    public function company(){
        $p = I("get.p");
        $url = "http://".C("QZ_YUMINGWWW")."/company/";
        if(!empty($url)){
            $url .= "?p=".$p;
        }
        header( "HTTP/1.1 301 Moved Permanently" );
        header( "Location:".$url);
    }

     /**
     * 从www主站访问的装修公司文章301到对应的分站上去
     *
     */
    public function zixun(){
        $id = I("get.id");
        if(!empty($id)){
            $info = D("Info")->getSingleInfoById($id);
            if(count($info)>0){
                header( "HTTP/1.1 301 Moved Permanently");
                header("Location:http://".$info["bm"].".".C("QZ_YUMING")."/zixun_info/".$id.".shtml");
                die();
            }
        }
        $this->_error();
    }

    /**
     * 老版装修公司案例路由
     * @return [type] [description]
     */
    public function company_case(){
        $id = I("get.id");
        $p = I("get.p");
        $user = D("User")->getSingleUserInfoById($id);
        if(count($user) > 0){
            $bm = $user["bm"];
            $url = "http://".$bm.".".C("QZ_YUMING")."/company_case/".$id;
            if(!empty($p)){
                $url .= "?p=".$p;
            }
            header( "HTTP/1.1 301 Moved Permanently" );
            header( "Location:".$url);
            die();
        }
        $this->_error();
        die();
    }


    /**
     * 老版设计师文章
     * @return [type] [description]
     */
    public function works_info(){
        $id = I("get.id");
        $article = D("Article")->getSingleArticle($id);

        if(count($article) > 0){
            $bm = $article["bm"];
            header( "HTTP/1.1 301 Moved Permanently" );
            header( "Location:http://".$bm.".".C("QZ_YUMING")."/article_info/".$id.".html");
            die();
        }
        $this->_error();
        die();
    }

    /**
     * 老版主站效果图跳转方法
     * @return [type] [description]
     */
    public function caseinfo(){
        $id = I("get.id");
        $case = D("Cases")->getSingleById($id);
        if(count($case) > 0){
            $bm = $case["bm"];
            header( "HTTP/1.1 301 Moved Permanently" );
            header( "Location:http://".$bm.".".C("QZ_YUMING")."/caseinfo/".$id.".shtml");
            die();
        }
        $this->_error();
    }

    /**
     * 老版装修公司路由
     * @return [type] [description]
     */
    public function company_home(){
        $id = I("get.id");
        $user = D("User")->getSingleUserInfoById($id);
        if(count($user) > 0){
            $bm = $user["bm"];
            header( "HTTP/1.1 301 Moved Permanently" );
            header( "Location:http://".$bm.".".C("QZ_YUMING")."/company_home/".$id);
            die();
        }
        $this->_error();
    }

    /**
     * 老版装修公司路由
     * @return [type] [description]
     */
    public function blog(){
        $id = I("get.id");
        $user = D("User")->getSingleUserInfoById($id);
        if(count($user) > 0){
            $bm = $user["bm"];
            header( "HTTP/1.1 301 Moved Permanently" );
            header( "Location:http://".$bm.".".C("QZ_YUMING")."/blog/".$id);
            die();
        }
        $this->_error();
    }

    /**
     * 验证验证码
     * @return [type] [description]
     */
    public function check_verify(){
        if($_POST){
            $code = strtolower($_POST["code"]);
            if(check_verify($code)){
                 $this->ajaxReturn(array("data"=>"","info"=>"验证码正确！","status"=>1));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"验证码不正确！","status"=>0));
        }
    }

    /**
     * 老版设计师案例列表
     * @return [type] [description]
     */
    public function works(){
        $id = I("get.id");
        if(!empty($id)){
            $info = D("User")->getSingleUserInfoById($id);
            if(count($info)>0){
                header( "HTTP/1.1 301 Moved Permanently");
                header("Location:http://".$info["bm"].".".C("QZ_YUMING")."/blog/".$id);
                die();
            }
        }
        $this->_error();
    }

    /**
     * 附近招标模版
     * @return [type] [description]
     */
    public function fujin(){
        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);

        $tmp = $this->fetch("fujin");
        $this->ajaxReturn(array("data"=>$tmp,"info"=>"","status"=>1));
    }

    /**
     * 老版设计师列表页
     * @return [type] [description]
     */
    public function article(){
        $id = I("get.id");
        if(!empty($id)){
            $info = D("User")->getSingleUserInfoById($id);
            if(count($info)>0){
                header( "HTTP/1.1 301 Moved Permanently");
                header("Location:http://".$info["bm"].".".C("QZ_YUMING")."/blog/".$id."?extra=2");
                die();
            }
        }
        $this->_error();
    }

    public function goodcase(){
        $cityInfo = $this->cityInfo;
        header( "HTTP/1.1 301 Moved Permanently");
        header("Location:http://".$cityInfo["bm"].".".C("QZ_YUMING")."/xgt/");
        die();
    }

    /**
     * 用户登录框
     * @return [type] [description]
     */
    public function login(){
        R("Common/Login/Login");
        die();
    }

    /**
     * 用户登录
     * @return [type] [description]
     */
    public function loginin(){
        R("Common/Login/Loginin");
        die();
    }
    /**
     * 用户退出
     * @return [type] [description]
     */
    public function loginout(){
         R("Common/Login/loginout");
          die();
    }
    /**
     * 用户收藏
     * @return [type] [description]
     */
    public function collect(){
         R("Common/Collect/setCollect");
          die();
    }

    public function getBJData(){
        R("Home/Zxbj/getBJData");
        die();
    }

    public function getBJResult(){
        R("Common/Zbfb/getBJResult");
        die();
    }

    //设置首页弹窗不显示的COOKIE
    public function setwindowswitch(){
        R("Common/Zbfb/setwindowswitch");
        die();
    }

    //设置首页弹窗不显示的COOKIE
    public function refresh(){
        R("Common/Zbfb/refresh");
        die();
    }

    //设置首页弹窗不显示的COOKIE
    public function dispatcher(){
        R("Common/Zbfb/dispatcher");
        die();
    }

    //反馈信息路由
    public function feedback(){
        R("Common/Zbfb/feedback");
        die();
    }

    public function getZbPrice(){
        R("Common/Zbfb/getZbPrice");
        die();
    }

    public function fb_order(){
        R("Common/Zbfb/fb_order");
        die();
    }
    //装修小贴士路由
    public function guide(){
        R("Common/Zbfb/guide");
        die();
    }
    /**
     * 短信发送
     * @return [type] [description]
     */
    public function sendsms(){
        R("Common/Sms/sendsms");
        die();
    }

    //验证验证码是否正确
    public function verifysmscode(){
        R("Common/Sms/verifysmscode");
        die();
    }

    public function run(){
        R("Common/Login/run");
        die();
    }
    //免费电话咨询
    public function freetel() {
        R("Common/Zbfb/freetel");
        die();
    }

    public function wenda(){
        R("Home/Wenda/quickask");
        die();
    }

    /**
     * 采集数据
     * @return [type] [description]
     */
    public function hm()
    {
        die();
        $state = 0;
        $engine = "";
        if (I("get.ref") !== "") {
            //判断是否是外链
            $result = preg_match('/qizuang.com/',I("get.ref"));
            if (!$result) {
               //不是本站点击的都算是外链
               $state = 2;
            }

            //查看是否是搜索引擎访问的
            //主流搜索引擎域名
            $engineArray = array("baidu.com"=>"百度","sogou.com"=>"搜狗","so.com"=>"360","youdao.com"=>"有道","soso.com"=>"搜搜","cn.bing.com"=>"必应中国","sm.cn"=>"神马");

            foreach ($engineArray as $key => $value) {
                $result = preg_match('/'.$key.'/',I("get.ref"));
                if ($result) {
                    $engine = $value;
                    break;
                }
            }

            if (!empty($engine)) {
                $state = 1;
                cookie('QZENGINE', $engine, array('expire'=> 3600 ,'domain' => '.'.C('QZ_YUMING')));
            }

            if ($state != 0) {
               cookie('QZSTATE', $state, array('expire'=> 3600 ,'domain' => '.'.C('QZ_YUMING')));
            }

        }

        $host = I("get.host") != ""? I("get.host"):cookie("QZHOST");
        // cookie('QZHOST',$host, array('expire'=> 3600,'path'=>'/','domain' => '.'.C('QZ_YUMING')));
        $engine = cookie('QZENGINE') == null?$engine:cookie('QZENGINE');
        $state = cookie('QZSTATE') == null?$state:cookie('QZSTATE');

        $uuid = I("get.uuid");
        if (empty($uuid)) {
            $tag = cookie("QZUUID") == null?"":cookie("QZUUID");
        }

        $tag =  I("get.tag");
        if (empty($tag)) {
            $tag = cookie("QZSRC") == null?"":cookie("QZSRC");
        }
        $tag = explode("#",$tag);
        $tag = explode("?",$tag[0]);
        $tag = $tag[0];
        //导入扩展文件
        import('Library.Org.Util.App');
        $ip = \App::get_client_ip();
        //获取友链信息
        $data = array(
            "user_agent" => $_SERVER["HTTP_USER_AGENT"],
            "ip" => $ip,
            "host" => $host,
            "time_in" => I("get.timeIn"),
            "time_out" => I("get.timeOut"),
            "visit_time" => I("get.visit_time"),
            "ck" => I("get.ck"),
            "referer" => I("get.ref"),
            "tag" => $tag,
            "ua" => md5($ip.$_SERVER["HTTP_USER_AGENT"]),
            "uuid" => $uuid,
            "engine" => $engine,
            "state" => $state,
            "time" => time(),
            "date" => date("Y-m-d")
        );
        M("market_acquisition")->add($data);

        header('HTTP/1.1 200 OK');
        header ('Content-Type: image/gif');
        header('Cache-Control:no-cache');
        $im = imagecreate(1, 1);
        $bg_color = imagecolorallocate($im, 255, 255, 255);
        imagefilledrectangle($im, 0, 0, 1, 1, $bg_color);
        echo imagegif($im);
        imagedestroy($im);
    }

     /**
     * 获取装修三步骤
     * @return [type] [description]
     */
    private function getStep($id,$limit,$isTop){
        //根据ID查询相对应的文章类别
        $result =  D("WwwArticleClass")->getArticleClassById($id);
        $category = array();

        foreach ($result["child"] as $key => $value) {
            //获取子类的文章
            $articles = D("WwwArticle")->getArticleListByIds($value["ids"],0,$limit,"",true);

            foreach ($articles as $i => $j) {
              $value["child"][$j["cid"]]["articles"][] = $j;
            }

            foreach ($value["child"] as $k => $val) {
                $category["child"][$key]["classnames"][] = $val["classname"];
                foreach ($val["articles"] as $n => $v) {
                    $category["child"][$key]["child"][$k]["classname"] = $val["classname"];
                    $category["child"][$key]["child"][$k]["shortname"] = $val["shortname"];
                    $category["child"][$key]["child"][$k]["articles"][$n+1]["title"] = $v["title"];
                    $category["child"][$key]["child"][$k]["articles"][$n+1]["id"] = $v["id"];
                    $category["child"][$key]["child"][$k]["articles"][$n+1]["shortname"] = $v["shortname"];
                    if($n == 0){
                      $category["child"][$key]["child"][$k]["articles"][$n+1]["face"] = $v["face"];
                      $category["child"][$key]["child"][$k]["articles"][$n+1]["subtitle"] = $v["subtitle"];
                    }
                }
            }
        }

        return $category;
    }

    /**
     * 获取分站文章
     * @return [type] [description]
     */
    private function getLittleArticle($limit,$cs){
        $articles = D("Littlearticle")->getArticleList("",$cs,0,$limit);
        foreach ($articles as $key => $value) {
            $title = strstr($value["title"],"_",true);
            if($title !== false){
                $articles[$key]["title"] = $title;
            }
            //usnet掉不需要的字段数据
            unset($articles[$key]["cs"]);
            unset($articles[$key]["authid"]);
            unset($articles[$key]["state"]);
            unset($articles[$key]["classid"]);
            unset($articles[$key]["keywords"]);
            unset($articles[$key]["content"]);
            unset($articles[$key]["description"]);
            unset($articles[$key]["addtime"]);
            unset($articles[$key]["optime"]);
            unset($articles[$key]["istop"]);
            unset($articles[$key]["tags"]);
            unset($articles[$key]["classtitle"]);
            unset($articles[$key]["littledescription"]);
            unset($articles[$key]["classkeywords"]);
            unset($articles[$key]["classname"]);
        }
        return $articles;
    }

    private function getBrands($city){
       $result = D("Advbanner")->getBrandList($city,14);

        foreach ($result as $key => $value) {
          $result[$key]["star_sj"] = 5;
          $result[$key]["star_fw"] = 5;
          $result[$key]["star_sg"] = 5;
          foreach ($this->stars as $k => $val) {
              if($value["avgsj"] >= $val["min"] &&  $value["avgsj"] < $val["max"]){
                  $result[$key]["star_sj"] = $k;
                  break;
              }
          }
          foreach ($this->stars as $k => $val) {
            if($value["avgfw"] >= $val["min"] &&  $value["avgfw"] < $val["max"]){
                $result[$key]["star_fw"] = $k;
                break;
            }
          }

            foreach ($this->stars as $k => $val) {
                if($value["avgsg"] >= $val["min"] &&  $value["avgsg"] < $val["max"]){
                    $result[$key]["star_sg"] = $k;
                    break;
                }
            }
        }
        return $result;
    }

    /**
     * 获取推荐设计师
     * @return [type] [description]
     */
    private function getDesigners($cs){
      $list = D("Advdesigner")->getDesignerList($cs);
      return $list;
    }

    //获取首页问答模块
    private function getWenda($bm, $cityId){
      $result = S('Cache:Sub:Index:wenda:'.$bm);
      if(!$result){
        //实例化Model
        $Db = D('Common/Ask');
        //取分类
        $category = $Db->getCategorys('',true);
        foreach ($category as $key => $value) {
          $result['category'][] = array('cid' => $value['cid'],'cname' => $value['name']);
        }
        unset($category);
        //精华
        $dist = $Db->getOption('ask_dist',true);
        $result['dist'] = $dist['0'];
        //热门装修问答
        $hotAsk = $Db->getHotQuestion('6', $cityId);
        if(count($hotAsk) == 1){
            $result['hotImg'] = $hotAsk[0];
            $result['hot'] = $hotAsk;
        }else{
            $result['hotImg'] = array_shift($hotAsk);
            $result['hot'] = $hotAsk;
        }
        //等你来答
        $result['noAnwser'] = $Db->getQuestionList(array("anwsers"=>array("EQ",'0'), 'city_id'=>$cityId),'rand()',0,'4');
        //帮助人数
        $result['helpPeople'] = R("Home/Wenda/getHelpPeople");
        S('Cache:Sub:Index:wenda:'.$bm,$result,900);
      }
      return $result;
    }
}
