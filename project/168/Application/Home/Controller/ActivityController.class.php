<?php

//装修公司活动管理

namespace Home\Controller;
use Home\Common\Controller\HomeBaseController;

class ActivityController extends HomeBaseController{
    private $status = array(
        "2" => "未开始",
        "1" => "进行中",
        "0" => "已失效",
    );

    private $level = array(
        "1" => "一等奖",
        "2" => "二等奖",
        "3" => "三等奖",
        "4" => "四等奖",
        "5" => "五等奖",
        "6" => "六等奖",
        "7" => "七等奖",
        "8" => "八等奖",
        "9" => "九等奖",
        "99" => "安慰奖"
    );

    private $type = array(
        "1" => "礼品",
        "2" => "门店优惠券",
        "3" => "电商优惠券",
        "4" => "微信口令红包"
    );

    private $model = array(
        "1" => "线下兑奖",
        "2" => "公众号兑奖",
        "3" => "网页兑奖"
    );

    //首页
    public function index(){
        //获取活动列表
        $result = $this->getActivityList(I("get.name"),I("get.start"),I("get.end"),I("get.status"));
        $this->assign("status",$this->status);
        $this->assign("list",$result["list"]);
        $this->assign("page",$result["page"]);
        $this->display();
    }

    //活动设置
    public function setActivity(){

        if ($_POST) {
            $status = 0;
            $id = I("post.id");
            if (I("post.start") >= I("post.end")) {
                $this->ajaxReturn(array("info"=>"活动开始时间不能小于活动结束时间","status"=>0));
            }

            if (I("post.prize_start") >= I("post.prize_end")) {
                $this->ajaxReturn(array("info"=>"兑奖开始时间不能小于兑奖结束时间","status"=>0));
            }

            $data = array(
                "name" => I("post.name"),
                "mobile_url" => I("post.mobile_url"),
                "mobile_cover_url" => I("post.mobile_cover_url"),
                "cover" => I("post.cover"),
                "start" =>  I("post.start"),
                "end" => I("post.end"),
                "prize_start" => I("post.prize_start"),
                "prize_end" => I("post.prize_end"),
                "enrollment" => I("post.enrollment"),
                "src" => str_replace('，', ',', trim(I("post.src"))),
                "source_id" => implode(",",I("post.source")),
                "activity_location" => I("post.activity_location"),
                "time" => time()
            );

            $item = htmlspecialchars_decode(I("post.item"));
            $item = json_decode($item,true);

            foreach ($item as $key => $value) {
                foreach ($value as $k => $val) {
                    if ($val["name"] == "prize_rate") {
                        if (  !is_numeric($val["value"]) ) {
                            $val["value"] = 0;
                        }
                    }
                    $subData[$key][$val["name"]] = $val["value"];
                }
            }

            if (!empty($id)) {
                $i =  D("Activity")->eidtActivity($id,$data);
            } else {
               //添加活动
                $id = $i =  D("Activity")->addActivity($data);
            }

            if ($i !== false) {
                //删除原有奖品设置
                D("Activity")->delPrize($id);

                foreach ($subData as $key => $value) {
                    $all[] = array(
                        "activity_id" => $id,
                        "prize_name" => $value["prize_name"],
                        "prize_level" => $value["prize_level"],
                        "prize_type" => $value["prize_type"],
                        "prize_count" => $value["prize_num"],
                        "prize_rate" => $value["prize_rate"],
                        "prize_address" => $value["address"],
                        "prize_tips" => $value["tips"],
                        "prize_mode" => $value["prize_model"]
                    );
                }

                $i = D("Activity")->addAllPrize($all);

                if ($i !== false) {
                    $this->ajaxReturn(array("status"=>1));
                }
            }

            $this->ajaxReturn(array("info"=>"操作失败,请是刷新重试！","status"=>0));
        } else {
            $id = I("get.id");
            if (!empty($id)) {
                $info =  $this->getActivity($id);
                $this->assign("info",$info);
                if (!empty($info['cover'])) {
                    $this->assign("coverPreview","'".'<img style="width:100%;" src="http://'.C('QINIU_DOMAIN').'/'.$info['cover'].'">'."'");
                }
                if (!empty($info['mobile_cover_url'])) {
                    $this->assign("mobileCoverPreview","'".'<img style="width:100%;" src="http://'.C('QINIU_DOMAIN').'/'.$info['mobile_cover_url'].'">'."'");
                }
            }

               //获取发单位置标识
            $result = D("OrderSource")->getSourceList(2);
            $this->assign("source",$result);
            $this->assign("level",$this->level);
            $this->assign("type",$this->type);
            $this->assign("model",$this->model);
            $this->display("setActivity");
        }
    }

   //活动详情
    public function activityDetail(){
        $id = I("get.id");
        $info =  $this->getActivity($id);

        //获取发单位置标识
        $result = D("OrderSource")->getSourceList(2);
        $this->assign("source",$result);

        //获取中奖信息人员名单
        if (count($info["source_id"]) > 0) {
            $result = $this->getPrizeUserList($info["id"]);
        } else {
            $result = $this->getNoSourcePrizeUserList($info["name"]);
        }

        $this->assign("userList",$result["list"]);
        $this->assign("page",$result["page"]);
        $this->assign("info",$info);
        $this->assign("level",$this->level);
        $this->assign("type",$this->type);
        $this->assign("model",$this->model);
        $this->display("activityDetail");
    }

   /**
    * 编辑奖品发放
    * @return [type] [description]
    */
    public function editPrizeUser()
    {
        if ($_POST) {
            $id = I("post.id");
            $data = array(
                "prize_status" => 1
            );
            $i = D("Activity")->editPrizeUser($id,$data);
            if ($i !== false) {
                $this->ajaxReturn(array("status"=>1));
            }
            $this->ajaxReturn(array("info"=>"操作失败,请是刷新重试！","status"=>0));
        }
    }

   /**
    * 活动列表
    * @param  string $name   [活动名称]
    * @param  datetime $begin  [活动开始时间]
    * @param  datetime $end    [活动结束时间]
    * @param  int $status [活动状态]
    * @return array
    */
    private function getActivityList($name,$begin,$end,$status)
    {
        $count = D("Activity")->getActivityListCount($name,$begin,$end,$status);
        if ($count > 0) {
            import('Library.Org.Util.Page');
            $p = new \Page($count, 20);
            $show = $p->show();
            $result = D("Activity")->getActivityList($name,htmlspecialchars_decode($begin),htmlspecialchars_decode($end),$status,$p->firstRow, $p->listRows);
            //通过活动时间来判断当前活动状态
            foreach ($result as $k => $v) {
                $now = date('Y-m-d H:i:s', time());
                if ($v['start'] < $now && $v['end'] < $now) {
                    $result[$k]['status'] = 2;
                } elseif ($v['start'] <= $now && $v['end'] >= $now) {
                    $result[$k]['status'] = 1;
                } elseif ($v['start'] > $now && $v['end'] > $now) {
                    $result[$k]['status'] = 0;
                }
            }
        }
        return array("list"=>$result,"page"=>$show);
    }


    private function getActivity($id)
    {
        $result = D("Activity")->getActivity($id);

        foreach ($result as $key => $value) {
            if (!isset($info)) {
                $info["id"] = $value["id"];
                $info["name"] = $value["name"];
                $info["cover"] = $value["cover"];
                $info["mobile_url"] = $value["mobile_url"];
                $info["mobile_cover_url"] = $value["mobile_cover_url"];
                $info["start"] = $value["start"];
                $info["end"] = $value["end"];
                $info["prize_start"] = $value["prize_start"];
                $info["prize_end"] = $value["prize_end"];
                $info["enrollment"] = $value["enrollment"];
                $info["src"] = $value["src"];
                $info["source_id"] = array_flip(array_filter(explode(",", $value["source_id"])));
                $info["status"] = $value["status"];
                $info["activity_location"] = $value["activity_location"];
                $info["itemCount"] = count($result);
            }

            $info["child"][] = array(
                "activity_id" => $value["activity_id"],
                "prize_name"  =>  $value["prize_name"],
                "prize_level" => $value["prize_level"],
                "prize_type"  =>  $value["prize_type"],
                "prize_count" => $value["prize_count"],
                "prize_rate"  =>  $value["prize_rate"],
                "prize_address"=> $value["prize_address"],
                "prize_tips"  =>  $value["prize_tips"],
                "prize_mode"  =>  $value["prize_mode"],
                "level" => $this->level[$value["prize_level"]],
                "type" => $this->level[$value["prize_type"]]
            );
        }

        return $info;
    }

   /**
    * 参与人员名单
    * @param  [type] $id [description]
    * @return [type]     [description]
    */
    private function getPrizeUserList($id)
    {
        $count = D("Activity")->getPrizeUserListCount($id);
        if ($count > 0) {
            import('Library.Org.Util.Page');
            $p = new \Page($count, 50);
            $show = $p->show();
            $result = D("Activity")->getPrizeUserList($id,$p->firstRow, $p->listRows);
        }

        return array("list"=>$result,"page"=>$show);
    }

   /**
    * 获取非发单活动的中奖人员名单
    * @param  [type] $id [description]
    * @return [type]     [description]
    */
    private function getNoSourcePrizeUserList($id)
    {
        $count = D("Activity")->getNoSourcePrizeUserListCount($id);
        if ($count > 0) {
            import('Library.Org.Util.Page');
            $p = new \Page($count, 50);
            $show = $p->show();
            $result = D("Activity")->getNoSourcePrizeUserList($id,$p->firstRow, $p->listRows);
        }

        return array("list"=>$result,"page"=>$show);
    }
}