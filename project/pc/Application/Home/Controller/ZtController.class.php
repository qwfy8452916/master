<?php

namespace Home\Controller;
use Home\Common\Controller\HomeBaseController;

class ZtController extends HomeBaseController{

    public function _initialize(){
        parent::_initialize();
        if (IS_GET) {
            $uri = $_SERVER['REQUEST_URI'];
            preg_match('/html$/', $uri, $m);
            if (count($m) == 0) {
                preg_match('/\/$/', $uri, $m);
                $parse = parse_url($uri);
                if (count($m) == 0 && empty($parse["query"])) {
                    header("HTTP/1.1 301 Moved Permanently");
                    if (isSsl()) {
                        $http = "https://";
                    } else {
                        $http = "http://";
                    }
                    header("Location: " . $http . $_SERVER["HTTP_HOST"] . $uri . "/");
                    die();
                }
            }
        }
        $headerTmp = "";
        if(empty($this->cityInfo["bm"])){
            $t = T("Home@Index:header");
             //导航栏标识
            $this->assign("tabIndex",4);
        }else{
            if(!$robotIsTrue){
                $t = T("Sub@Index:header");
            }
            //显示头部导航栏效果
            $this->assign("nav_show",true);
             //导航栏标识
            $this->assign("tabIndex",5);
        }
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);
        $headerTmp = $this->fetch($t);
        $this->assign("headerTmp",$headerTmp);
    }


    //活动主页
    public function index(){
        $info['allViews'] = $this->getViews();
        $this->assign("diary",$diary);
        $this->assign("info",$info);
        $this->display();
    }

    public function show(){
        $id = I('get.id');

        //增加参与人数
        $this->getViews(true);

        if($id == '1'){
            $companyList = S('Cache:Zt:NewVipCompany');
            if(empty($companyList)){
                $companyList = D('Zt')->getNewVipCompany(4);
                S('Cache:Zt:NewVipCompany',$companyList,900);
            }
            $this->assign("companyList",$companyList);
            $this->display('spring');
        }else{
            $this->_empty();
        }
    }


    public function special(){

        $name = I('get.name');

        $info = D('Zt')->getActivity($name);
        if(empty($info)){
            $this->error();
        }

        $info['lefttime'] = ceil(($info['end_time'] - time()) / 86400);
        $info['lefttime'] = str_split($info['lefttime']);

        $status = $this->getStatus($info);


        if($info['name'] == 'crazyjuly'){

            //每5分钟更新活动虚拟报名人数
            $crazyjulybmrs = S('Cache:Zt:crazyjuly:bmrs');
            if(empty($crazyjulybmrs)){
                $crazyjulybmrs = $info['fake_enroll_count'];
                $this->updateEnrollCount($info['id']);
                S('Cache:Zt:crazyjuly:bmrs',$crazyjulybmrs,300);
            }

            $info['splitEnrolls'] = str_split($info['fake_enroll_count']);

        }



        $this->assign("info",$info);
        $this->display($info['name']);
    }

    //状态：0报名中 1正在进行 2 暂停 3结束 5未知
    private function getStatus($info){
        $time = time();

        //不是暂停 (状态2)
        if($info['status'] != '2'){
            //设个未知状态
            $status = '5';
            //招募中 当前时间小于报名截止时间，并且小于活动开始时间
            if($time < $info['enroll_time'] && $time < $info['start_time']){
                $status = '0';
            }
            //结束    当前时间大于结束时间
            if($time > $info['end_time']){
                $status = '3';
            }
            //正在进行 当前时间大于开始时间小于结束时间
            if($time > $info['start_time'] && $time < $info['end_time']){
                $status = '1';
            }
        }

        if(!empty($status)){
            $info['status'] = $status;
        }

        return $info['status'];
    }


    //更新活动虚拟报名人数
    public function updateEnrollCount($id){

        //随机生成一个数
        $data = mt_rand(1,8);
        D('Zt')->updateEnrollCount($id,$data);
    }



    //旧活动增加访问量
    public function getViews($update = false){
        $Data = D("Common/Ask");
        //读取配置文件
        $ztViews = $Data->getOption('zt_all_views',true);
        //如果没有总数，那么重新定义总数，一般在第一次运行时出现
        if(empty($ztViews['allViews'])){
            $ztViews['allViews'] = 27030;
        }
        if($update == true){
            $ztViews['allViews'] = $ztViews['allViews'] + 1;
            //把总数写入数据库
            $Data->updateOption('zt_all_views',serialize($ztViews));
        }
        return $ztViews['allViews'];
    }
}