<?php
namespace User\Controller;
use User\Common\Controller\CompanyBaseController;
class CasesController extends CompanyBaseController{
    public function index(){
        $pageIndex = 1;
        $pageCount = 10;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
        }
        $class = I("get.class");
        switch (strtolower($class)) {
            case 'gzcases':
                $classid = 2;
                $tabNav = 1;
                break;
            case 'zzcases':
                $classid = 3;
                $tabNav = 2;
                break;
            default:
                 $classid = 1;
                break;
        }
        //获取装修公司的基本信息
        $info["user"] = $this->baseInfo;
        $info["user"]["bm"] = $_SESSION["u_userInfo"]["bm"];
        //获取家装案例
        $cases = $this->getCasesList($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"],$classid,$pageIndex,$pageCount);
        $info["cases"] = $cases["cases"];
        $info["page"] = $cases["page"];
        $this->assign("info",$info);
        //tab栏
        $this->assign("tabNav",$tabNav);
        //侧边栏
        $this->assign("nav",5);
        $this->display();
    }

    /**
     * 上传/编辑案例
     * @return [type] [description]
     */
    public function caseup(){
        if($_POST){
            import('Library.Org.Util.Fiftercontact');
            $filter = new \Fiftercontact();
            //获取新添加的图片信息
            $newData = json_decode($_POST["newData"],true);
            //1.获取装修公司的最新状态
            $company = D("User")->getSingleUserInfoById($_SESSION["u_userInfo"]["id"]);
            if(count($company) > 0){
                $case = D("Cases");
                $flag = true;
                $data = array(
                    "uon"=>$company["on"],
                    "uid"=>$company["id"],
                    "classid"=>I("post.class"),
                    "qx"=>I("post.qx"),
                    "cs"=>I("post.cs"),
                    "title"=> $filter->filter_common(remove_xss(I("post.xiaoqu")),array("Sbc2Dbc","filter_script","filter_link",array("filter_sensitive_words",array(2,3,5)),"filter_400","filter_mobile","filter_tel","filter_url")),
                    "huxing"=>I("post.huxing"),
                    "mianji"=>remove_xss(I("post.mianji")),
                    // "fangshi"=>I("post.fangshi"),
                    "fengge"=>I("post.fengge"),
                    "zaojia"=>I("post.zaojia"),
                    "start"=>remove_xss(I("post.start")),
                    "end"=>remove_xss(I("post.end")),
                    "userid"=>I("post.designer"),
                    // "text"=>$filter->filter_common(remove_xss(I("post.text")),array("Sbc2Dbc","filter_script",array("filter_sensitive_words",array(2,3,5)),"filter_link","filter_400","filter_mobile","filter_tel","filter_url")),
                    "shi"=>I("post.shi"),
                    "ting"=>I("post.ting"),
                    "wei"=>I("post.wei"),
                    "type"=>"1",
                    "leixing"=>I("post.leixing")
                          );
                //如果是公装案例,去除户型值
                if($data["classid"] == 2){
                    $data["huxing"] ="";
                }else{
                    //去除类型值
                    $data["leixing"] ="";
                }
               // $case->startTrans();
                if(I("post.caseid") !== ""){
                    //编辑案例保存
                    $caseid = I("post.caseid");
                    $imgs = json_decode($_POST["imgs"],true);
                    //修改原有图片的排序状态
                    foreach ($imgs as $key => $value) {
                        $subData = array(
                            "px"=>$value["index"],
                            "img_on"=>$value["on"]
                                     );
                        $i = D("Caseimg")->editCase($value["id"],$subData);
                        if($i === false){
                            $flag = false;
                        }
                    }
                    //编辑时间
                    $data["update_time"] = time();
                    //最后修改人
                    $data["last_opid"] = $_SESSION["u_userInfo"]["id"];
                    $id = $case->editCase($caseid,$data);
                    D('cases')->relationXiaoQuEdit($caseid,I("post.xiaoquid"));
                    $msg = "用户编辑案例作品【".$data["title"]."】 成功";
                    //操作日志
                    $logData = array(
                            "company_id"=>$company["id"],
                            "company_name"=>empty($company["jc"])?"":$company["jc"],
                            "case_id"=>$caseid,
                            "case_title"=>I("post.xiaoqu"),
                            "case_city"=>I("post.cs"),
                            "act_time"=>time(),
                            "act_name"=>"update"
                                     );
                }else{
                    //新增案例
                    //案例审核状态 1 审核 2 未审核
                    $on = 1;
                    if( $company["on"] != 2 ){
                        //非会员公司
                        $on = 1;
                    }
                    $data["time"] = time();
                    $data["on"] = $on;
                    $caseid = $case->addCase($data);
                    D('cases')->relationXiaoQuAdd($caseid,I("post.xiaoquid"));
                    $msg = "用户添加案例作品【".$data["title"]."】 成功";
                    if($caseid !== false){
                        //更新装修公司的案例图片数
                        //3.判断当前案例数是否与案例表中的案例数一致
                        $casecount = $case->getCasesCount($company["cs"],$company["id"]);
                        //如果两个案例数不一致，实际案例数大于case_count的数时,更新case_count,uptime
                        if($casecount >= $company['case_count']){
                            $subData = array(
                                    "case_count"=>$casecount,
                                    "uptime"=>time()
                                        );
                            D("User")->edtiUserInfo($company["id"],$subData);
                            //清除该公司的分站首页的热门装修公司缓存
                            S("Cache:hotCompany".$_SESSION["u_userInfo"]["bm"],null);
                        }

                        //案例操作日志
                        $logData = array(
                            "company_id"=>$company["id"],
                            "company_name"=>$company["jc"],
                            "case_id"=>$caseid,
                            "case_title"=>I("post.xiaoqu"),
                            "case_city"=>I("post.cs"),
                            "act_time"=>time(),
                            "act_name"=>"add"
                        );
                    }
                }

                if(count($newData) > 0){
                    //添加新增的案例图片
                    foreach ($newData as $key => $value) {
                        $subData = array(
                                "caseid"=>$caseid,
                                "img"=>$value["img"],
                                "img_path"=>$value["path"],
                                "img_host"=>"qiniu",
                                "img_on"=>$value["on"],
                                "px"=>$value["tabIndex"]
                                         );
                        $i = D("Caseimg")->addImg($subData);
                        if($i === false){
                            $flag = false;
                        }
                    }
                }

                //写入案例日志
                D("Logcase")->addLog($logData);
                if($flag){
                    //导入扩展文件
                    import('Library.Org.Util.App');
                    $app = new \App();
                    //写入用户记录日志
                    $data = array(
                      "username"=>$_SESSION["u_userInfo"]["name"],
                      "userid"=>$_SESSION["u_userInfo"]["id"],
                      "ip"=>$app->get_client_ip(),
                      "user_agent"=>$_SERVER["HTTP_USER_AGENT"],
                      "info"=>$msg,
                      "time"=>date("Y-m-d H:i:s"),
                      "action"=>CONTROLLER_NAME."/".ACTION_NAME
                    );
                    D("Loguser")->addLog($data);
                    //$case->commit();
                    $this->ajaxReturn(array("data"=>"","info"=>$caseid,"status"=>1));
                }else{
                    //$case->rollback();
                    $this->ajaxReturn(array("data"=>"","info"=>"添加失败","status"=>0));
                }
            }
        }else{
            //如果caseid存在,判断为编辑案例
            if(I("get.caseid") !== ""){
                //编辑案例
                $case = $this->getCaseInfoAndImgs(I("get.caseid"),$_SESSION["u_userInfo"]["id"]);
                $info["case"] = $case;
            }
            //案例类型
            $class = array(
                    array("name"=>"家装案例","value"=>"1"),
                    array("name"=>"公装案例","value"=>"2"),
                    array("name"=>"在建工地","value"=>"3")
                           );
            $info["class"] = $class;
            //区域信息
            //获取当前城市
            $citys = D("Area")->getCityArray($_SESSION["u_userInfo"]["cs"]);
            $citys["shen"] = $citys["shen"][0];
            $citys["shi"] = $citys["shi"][$_SESSION["u_userInfo"]["cs"]];
            $info["citys"] = $citys;
            //获取户型
            $hx = D("Common/Huxing")->gethx();
            $info["huxing"] = $hx;
            //获取室厅卫
            $info["shi"] = array(1,2,3,4,5,6);
            $info["ting"] = array(0,1,2);
            $info["wei"] = array(0,1,2,3);
            // //获取装修方式
            // $fangshi  =  D("Common/Fangshi")->getfs();
            // $info["fangshi"] = $fangshi;
             //获取装修风格列表
            $fg = D("Common/Fengge")->getfg();
            $info["fengge"] = $fg;
            //获取价格列表
            $jiage = D("Common/jiage")->getJiage();
            $info["jiage"] = $jiage;
            //获取设计师列表
            $designers = D('User')->getDesignerNameList($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"]);
            $info["designers"] = $designers;
            //获取装修类型
            $leixing = D("Common/Leixing")->getlx();
            $info["leixing"] = $leixing;

            //获取装修公司的基本信息
            $info["user"] = $this->baseInfo;
            $this->assign("info",$info);
            //tab栏
            $this->assign("tabNav",3);
            //侧边栏
            $this->assign("nav",5);
            $this->display();
        }
    }
    /**
     * 删除案例
     * @return [type] [description]
     */
    public function delcase(){
        if($_POST){
            $id = I("post.id");
            //判断该案例是否是该公司的
            $case = D("Cases")->getSingleById($id,$_SESSION["u_userInfo"]["id"]);
            if(count($case) > 0){
                $data = array(
                        "isdelete"=>2,
                        "last_opid"=>$_SESSION["u_userInfo"]["id"],
                        "update_time"=>time()
                              );
                $i = D("Cases")->editCase($id,$data);
                if($i !== false){
                    D('cases')->relationXiaoQuDel($id);
                    $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
                }
                $this->ajaxReturn(array("data"=>"","info"=>"删除失败,请刷新重试！","status"=>0));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"该案例不是您发布的,无权删除","status"=>0));
        }
    }

    /**
     * 恢复案例
     * @return [type] [description]
     */
    public function resetcase(){
        if($_POST){
            $id = I("post.id");
            //判断该案例是否是该公司的
            $case = D("Cases")->getSingleById($id,$_SESSION["u_userInfo"]["id"]);
            if(count($case) > 0){
                $data = array(
                        "isdelete"=>1
                              );
                $i = D("Cases")->editCase($id,$data);
                if($i !== false){
                    D('cases')->relationXiaoQuReset($id);
                    $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
                }
                $this->ajaxReturn(array("data"=>"","info"=>"删除失败,请刷新重试！","status"=>0));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"该案例不是您发布的,无权恢复","status"=>0));
        }
    }

    /**
     * 获取装修公司案例列表
     * @param  [type] $comid   [公司编号]
     * @param  [type] $cs      [所在城市]
     * @param  [type] $classid [案例类型]
     * @return [type]          [description]
     */
    private function getCasesList($comid,$cs,$classid,$pageIndex,$pageCount)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $classid = array($classid);
        $count = D("Cases")->getCasesListByComIdCount($comid,$cs,$classid);
        if($count > 0){
            import('Library.Org.Page.Page');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \Page($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();
            $cases = D("Cases")->getCasesListByComId(($page->pageIndex-1)*$pageCount,$pageCount,$comid,$cs,$classid);
            return array("cases"=>$cases,"page"=>$pageTmp);
        }
        return null;
    }

    private function getCaseInfoAndImgs($id,$cid){
        $result = D("Cases")->getCaseInfoAndImgs($id,$cid);
        $cases = array();
        foreach ($result as $key => $value) {
            if($key == 0){
                $cases = $value;
            }
            $img = array(
                    "id" => $value["img_id"],
                    "img"=>$value["img"],
                    "img_host"=>$value["img_host"],
                    "img_path"=>$value["img_path"],
                    "img_on"=>$value["img_on"]
                         );
            $cases["imgs"][] =$img;
        }
        $cases["imgs"] = json_encode($cases["imgs"]);
        return $cases;
    }
}