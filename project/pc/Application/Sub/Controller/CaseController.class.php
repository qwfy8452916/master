<?php
namespace Sub\Controller;
use Sub\Common\Controller\SubBaseController;
class CaseController extends SubBaseController{
    public function _initialize()
    {
        parent::_initialize();
        //添加顶部搜索栏信息
        $this->assign('serch_uri', 'xgt');
        $this->assign('serch_type', '装修案例');
        $this->assign('holdercontent', '全国超过十万家装修公司为您免费设计');
        //导航栏标识
        $this->assign("tabIndex", 2);
        $this->assign("choose_menu", 'xgt');
    }

    public function index(){
        if(I("get.id") != "" && preg_match('/\d+/i', I("get.id"))){
            $bm = $this->bm;
            //跳转到手机端
            if (ismobile()) {
                header( "HTTP/1.1 301 Moved Permanently");
                header("Location: http://". C('MOBILE_DONAMES') .'/'.$bm. $_SERVER['REQUEST_URI']);
                exit();
            }

            $cityInfo = $this->cityInfo;
            //获取筛选参数
            $referer = ltrim(parse_url($_SERVER['HTTP_REFERER'])['path'], '/');
            $params = array();
            //根据来源获取参数，总站进来的不设置跟随参数
            if (!empty($referer) && 'www' != explode('.', $_SERVER['HTTP_HOST'])[0]) {
                $match = array();
                if (1 === preg_match('/xgt\/list-(h([\d+]+)f([\d+]+)z([\d+]+)(t([\d+]+))?(p[\d+]+)?)$/', $referer, $match)) {
                    $params = array(
                        'uid'     => 0,
                        'userid'  => 0,
                        'classid' => intval($match['6']),
                        'huxing'  => intval($match['2']),
                        'fengge'  => intval($match['3']),
                        'zaojia'  => intval($match['4']),
                        'leixing' => 0,
                    );
                } else if (1 === preg_match('/xgt\/list-(lx([\d+]+)f([\d+]+)z([\d+]+)(t([\d+]+))?(p[\d+]+)?)$/', $referer, $match)) {
                    $params = array(
                        'uid'     => 0,
                        'userid'  => 0,
                        'classid' => intval($match['6']),
                        'huxing'  => 0,
                        'fengge'  => intval($match['3']),
                        'zaojia'  => intval($match['4']),
                        'leixing' => intval($match['2']),
                    );
                } else if (1 === preg_match('/blog\/(\d+)/', $referer, $match)) {
                    $params = array(
                        'uid'     => 0,
                        'userid'  => intval($match['1']),
                        'classid' => 0,
                        'huxing'  => 0,
                        'fengge'  => 0,
                        'zaojia'  => 0,
                        'leixing' => 0,
                    );
                } else if (1 === preg_match('/company_home\/(\d+)/', $referer, $match)) {
                    //获取类型
                    $map = array(
                        'id' => intval(I("get.id"))
                    );
                    $temp = D("Common/Cases")->getCaseInfo($map);
                    $params = array(
                        'uid'     => intval($match['1']),
                        'userid'  => 0,
                        'classid' => intval($temp[0]['classid']),
                        'huxing'  => 0,
                        'fengge'  => 0,
                        'zaojia'  => 0,
                        'leixing' => 0,
                    );
                } else if (1 === preg_match('/company_case\/(\d+)/', $referer, $match)) {
                    $query_array = explode('&',parse_url($_SERVER['HTTP_REFERER'])['query']);
                    $query_param  = array();
                    foreach ($query_array as $k => $v) {
                        $res = explode('=',$v);
                        if (!empty($res['0'])) {
                            $query_param[$res['0']] = $res['1'];
                        }
                    }
                    $params = array(
                        'uid'     => intval($match['1']),
                        'userid'  => 0,
                        'classid' => 0,
                        'huxing'  => 0,
                        'fengge'  => 0,
                        'zaojia'  => 0,
                        'leixing' => 0,
                    );
                    $classid = intval($query_param['cl']);
                    if (in_array($classid, array('1', '3'))) {
                        $params['classid'] = $classid;
                        $params['huxing'] = intval($query_param['t']);
                    } else if (in_array($classid, array('2'))) {
                        $params['classid'] = $classid;
                        $params['leixing'] = intval($query_param['t']);
                    }
                } else if (1 === preg_match('/caseinfo\/(\d+)\.shtml/', $referer, $match)) {
                    $temp = json_decode(cookie('case_terminal_params'));
                    $params = array(
                        'uid'     => intval($temp['0']),
                        'userid'  => intval($temp['1']),
                        'classid' => intval($temp['2']),
                        'huxing'  => intval($temp['3']),
                        'fengge'  => intval($temp['4']),
                        'zaojia'  => intval($temp['5']),
                        'leixing' => intval($temp['6']),
                    );
                }
            }
            cookie('case_terminal_params', null);

            //查询案例信息
            $cacheKey = md5(md5(I("get.id")) . md5($cityInfo["id"]) . md5(serialize($params)));

            $case = S('C:Sub:Case:index:case:v4:' . $cacheKey);
            if (empty($case)) {
                $case = $this->getCaseInfo(I("get.id"), $cityInfo["id"], $params);
                S('C:Sub:Case:index:case:v4:' . $cacheKey, $case, 300);
            }

            import('Library.Org.Util.Fiftercontact');
            $filter = new \Fiftercontact();
            $case["now"]["text"] = $filter->filter_common($case["now"]["text"],array("Sbc2Dbc","filter_script",array("filter_sensitive_words",array(2,3,5)),"filter_tel","filter_mobile","filter_link","filter_url"));
            $caseInfo["id"] = I("get.id");
            $caseInfo["case"] = $case;

            //获取案例评论
            $commnet = $this->getCaseCommentList(I("get.id"));
            $caseInfo["comment"] = $commnet["tmp"];
            $caseInfo["TotalCount"] = $commnet["TotalCount"];
            $caseInfo["show"] = $commnet["show"];

            //获取 标签
            $newTags = S('Cache:SubCaseInfo:index:newTags');
            if(empty($newTags)){
                $newTags = D("Common/Tags")->getHotTags('2','10');
                S('Cache:SubCaseInfo:index:newTags', $newTags, 3600);
            }
            $caseInfo["newTags"] = $newTags;

            //查询用户是否关注过该案例
            $caseInfo["collect"] = false;
            if(isset($_SESSION["u_userInfo"])){
                $count =  D("Usercollect")->getCollectCount(I("get.id"),$_SESSION['u_userInfo']['id'],2);
                if($count > 0){
                    $caseInfo["collect"] = true;
                }
            }

            $this->assign("hotDiary",$this->getHotDiary(12));

            //装修风格内链
            $fenggeLink = array(
                '现代简约'   => 'http://' . C('MEITU_DONAMES') . '/list-l0f5h0c0',
                '欧式风格'   => 'http://' . C('MEITU_DONAMES') . '/list-l0f8h0c0',
                '中式风格'   => 'http://' . C('MEITU_DONAMES') . '/list-l0f4h0c0',
                '古典风格'   => 'http://' . C('MEITU_DONAMES') . '/list-l0f24h0c0',
                '田园风格'   => 'http://' . C('MEITU_DONAMES') . '/list-l0f13h0c0',
                '地中海风格' => 'http://' . C('MEITU_DONAMES') . '/list-l0f6h0c0',
                '美式风格'   => 'http://' . C('MEITU_DONAMES') . '/list-l0f7h0c0',
                '混搭风格'   => 'http://' . C('MEITU_DONAMES') . '/list-l0f17h0c0',
                '其它'       => 'http://' . C('MEITU_DONAMES') . '/list/'
            );
            $this->assign('fenggeLink', $fenggeLink);

            //seo 标题/描述/关键字
            $keys["title"] = $caseInfo["case"]["now"]["mianji"]."平米".$caseInfo["case"]["now"]["hname"].$caseInfo["case"]["now"]["fengge"]."家装装修图片设计";
            $keys["keywords"] = $caseInfo["case"]["now"]["title"].",".$caseInfo["case"]["now"]["fengge"].$caseInfo["case"]["now"]["hname"]
                                .",".$caseInfo["case"]["now"]["now"]["fengge"].$caseInfo["case"]["now"]["hname"]
                                ."设计,".$caseInfo["case"]["now"]["fengge"].$caseInfo["case"]["now"]["hname"]
                                ."装修图片,".$caseInfo["case"]["now"]["mianji"]."平米".$caseInfo["case"]["now"]["hname"]."装修图片";
            $keys["description"] =$cityInfo["name"]."齐装网装修效果图频道为您提供".$caseInfo["case"]["now"]["title"].$caseInfo["case"]["now"]["mianji"]."平米".$caseInfo["case"]["now"]["hname"].$caseInfo["case"]["now"]["fengge"].
                                "家装装修图片设计，以及".date("Y")."年国内外流行的装修效果图大全。";
            $this->assign("keys",$keys);

            //获取报价模版
            $this->assign("order_source",68);
            $t = T("Common@Order/orderTmp");
            $orderTmp = $this->fetch($t);
            $this->assign("orderTmp",$orderTmp);


            //获取黄历报价模版
            $hlBaoJia = $this->fetch(T("Common@Order/hlBaoJia"));
            $this->assign("hlBaoJia",$hlBaoJia);

            //canonical标签
            $info['canonical'] = 'http://' . $bm . '.' . C('QZ_YUMING') . '/caseinfo/' . I("get.id") . '.shtml';
            $this->assign("info", $info);
            $this->assign("caseInfo",$caseInfo);
            $this->assign("params", json_encode(array_values($params)));
            $this->display('index_p260');
        }else{
            $this->_error();
        }
    }

    //获取相关美图
    private function getRelatedMeitu($map){
        $result = D('Cases')->getRelatedCase($map);
        return $result;
    }

    //取装修案例
    private function getRankMeitu($limit){
        $result = S('Cache:Article:RankMeitu');
        if(empty($result)){
            S('Cache:Article:RankMeitu',null);
            $result = D("Meitu")->getRankMeitu(30);
            S('Cache:Article:RankMeitu',$result,900);
        }
        shuffle($result);
        return array_slice($result,0,$limit);
    }

    /**
     * 获取案例信息
     * @param  string $id [案例编号]
     * @param  string $cs [所在城市]
     * @return [type]     [description]
     */
    private function getCaseInfo($id = '', $cs = '', $params = array()){
        //获取当前的案例
        $map = array(
            'id' => $id,
            'cs' => $cs,
        );
        $temp = D("Common/Cases")->getCaseInfo($map);

        //如果该案例的ID和城市不匹配，查询出该ID的城市，然后301跳转
        if (empty($temp)) {
            if (!empty($cs)) {
                $map = array(
                    'id' => $id
                );
                $temp = D("Common/Cases")->getCaseInfo($map);
                if (!empty($temp)) {
                    //根据城市编号查询城市信息
                    $area = D("Quyu")->getCityById($temp[0]["cs"]);
                    if (count($area) > 0) {
                        $url = "http://".$area["bm"].".".C("QZ_YUMING")."/caseinfo/".$id.".shtml";
                        header( "HTTP/1.1 301 Moved Permanently" );
                        header( "Location:".$url);
                        die();
                    } else {
                        $this->_error();
                    }
                    die();
                } else {
                    $this->_error();
                    die();
                }
            } else {
                $this->_error();
                die();
            }
        }
        $result['now'] = $this->getCaseInfoResult($temp);

        //获取上一个案例(id大于当前案例)
        $map = array(
            'id' => array('GT', $id),
            'cs' => $cs,
        );
        $temp = D("Common/Cases")->getCaseInfo($map, 'asc', $params);
        //如果带参数的查询为空，则取该参数条件下的第一个（id最小）图片
        if (empty($temp)) {
            $map = array(
                'cs' => $cs
            );
            $temp = D("Common/Cases")->getCaseInfo($map, 'asc', $params);
        }
        //上一个图集只需取第一个图片用作封面图就可以了，减小缓存
        if (!empty($temp)) {
            $temp = array($temp[0]);
        }
        $result['prv'] = $this->getCaseInfoResult($temp);

        //获取下一个案例(id小于当前案例)
        $map = array(
            'id' => array('LT', $id),
            'cs' => $cs,
        );
        $temp = D("Common/Cases")->getCaseInfo($map, 'desc', $params);
        //如果带参数的查询为空，则取该查询条件下的最后一个（id最大）案例
        if (empty($temp)) {
            $map = array(
                'cs' => $cs,
            );
            $temp = D("Common/Cases")->getCaseInfo($map, 'desc', $params);
        }
        //下一个图集只需取第一个图片用作封面图就可以了，减小缓存
        if (!empty($temp)) {
            $temp = array($temp[0]);
        }
        $result['next'] = $this->getCaseInfoResult($temp);

        //返回数据
        return $result;
    }

    private function getCaseInfoResult($temp){
        $result = array();
        foreach ($temp as $key => $value) {
            if (empty($result['id'])) {
                $result["text"] = $value["text"];
                $result["title"] = $value["title"];
                $result["id"] = $value["id"];
                $result["uid"] = $value["uid"];
                $result["mianji"] = $value["mianji"];
                $result["fengge"] = $value["gname"];
                $result["classid"] = $value["classid"];
                $result["cs"] = $value["cs"];
                $result["classid"] = $value["classid"];
                switch ($value["classid"]) {
                    case '1':
                        $result["type"] = "家装";
                        break;
                    case '2':
                        $result["type"] = "公装";
                        break;
                    case '3':
                        $result["type"] = "在建工地";
                        break;
                }
                $result["bm"] = $value["bm"];
                $result["hname"] = $value["hname"];
                $result["time"] = $value["time"];
                $result["jc"] = $value["jc"];
                $result["qc"] = $value["qc"];
                $result["logo"] = $value["logo"];
                $result["count"] = 0;
                $result["fake"] = $value["fake"];
                $result["on"] = $value["on"];
                $result["casecount"] = $value["casecount"];
                $result["groupcount"] = $value["groupcount"];
                $result["commentcount"] = $value["commentcount"];
                $result["shi"] = $value["shi"];
                $result["ting"] = $value["ting"];
                $result["wei"] = $value["wei"];
                $result["child"] = array();
            }
            $result["count"] ++;
            //案例的图片只缓存需要的字段
            $result["child"][] = array(
                'title'    => $value['title'],
                'img'      => $value['img'],
                'img_host' => $value['img_host'],
                'img_path' => $value['img_path'],
            );
        }
        return $result;
    }

    /**
     * 获取案例评论模版
     * @return [type] [description]
     */
    public function getComment(){
        if($_POST){
            $id = I("post.id");
            $index = I("post.index");
            $result = $this->getCaseCommentList($id,$index+1);
            $this->ajaxReturn(array("data"=>$result,"info"=>"","status"=>1));
        }
    }

    /**
     * 添加案例评论
     */
    public function addCaseComment(){
        if($_POST){
            $code = I("post.code");
            //检验验证码
            if(check_verify($code)){
                $id = $_POST["id"];
                $data = array(
                        "text"=>I("post.content"),
                        "caseid"=>I("post.id"),
                        "time"=>time(),
                        "img"=>"/assets/common/pic/userhead.jpg",
                        "name"=>"齐装网网友",
                        "userid"=>"0",
                        "isverify"=>1
                              );
                //用户登录后
                if(isset($_SESSION["u_userInfo"])){
                    $data["img"] = $_SESSION["u_userInfo"]["logo"];
                    $data["userid"] = $_SESSION["u_userInfo"]["id"];
                    $data["name"] = $_SESSION["u_userInfo"]["name"];
                }
                //添加评论
                $result = D("Message")->addMessage($data);
                if($result !== false){
                    $tmp = $this->getCaseCommentList(I("post.id"),1);
                    $this->ajaxReturn(array("data"=>"","info"=>"评论审核中,请耐心等待...","status"=>1));
                }else{
                    $this->ajaxReturn(array("data"=>"","info"=>"评论添加失败,请稍后再试!","status"=>0));
                }

            }
            $this->ajaxReturn(array("data"=>"","info"=>"验证码输入错误,请刷新验证码","status"=>0));
        }
        $this->ajaxReturn(array("data"=>"","info"=>"非法提交","status"=>0));
    }

    /**
     * [getCaseCommentList description]
     * @param  [type] $id [案例编号]
     * @return [type]        [description]
     */
    private function getCaseCommentList($id,$pageIndex = 1){
        $pageIndex = intval($pageIndex)<=0?1:intval($pageIndex);
        $count = D("Common/Message")->getCaseCommentListCount($id);

        if($count > 0){
            $pageCount = 3;
            if($pageIndex >=ceil($count/$pageCount) ){
                $pageIndex = ceil($count/$pageCount);
            }
            $comments = D("Common/Message")->getCaseCommentList($id,($pageIndex-1)*$pageCount,$pageCount);

            $this->assign("comments",$comments);
            $this->assign("show",true);
        }
        $tmp = $this->fetch("Case/commentTpl");
        $show = true;
        $TotalPage =ceil($count/$pageCount);
        if($pageIndex >= $TotalPage){
            $show = false;
        }
        return array("tmp"=>$tmp,"TotalCount"=>$count,"show"=> $show,"index"=>$pageIndex);
    }

    private function getRecommendArticles($classid,$limit){
        //获取相同分类的点击量最高的文章
        $recommendArticles = D("WwwArticle")->getRecommendArticles($classid);
        if(count($recommendArticles) > 0){
            shuffle($recommendArticles);
            $recommendArticles = array_slice($recommendArticles,0,$limit);
        }
        return $recommendArticles;
    }

    private function getRecommendCases($cs,$classid,$limit){
        $cases = D("Cases")->getRecommendCases($cs,$classid);
        if(count($cases) > 0){
            shuffle($cases);
            $cases = array_slice($cases,0,$limit);
            return $cases;
        }
        return null;
    }

    //获取装修日记
    private function getHotDiary($num){
        $result = S('Cache:Diary:Hot');
        if(empty($result)){
            S('Cache:Diary:Hot',null);
            $result = D('Diary')->getHotDiaryUser(30);
            S('Cache:Diary:Hot',$result,900);
        }
        shuffle($result);
        return array_slice($result,0,$num);
    }
}