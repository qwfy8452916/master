<?php
/**
 * Created by PhpStorm.
 * User: jsb
 * Date: 2018/10/22
 * Time: 13:55
 */
//ERP装修公司管理
namespace Home\Controller;
use Home\Common\Controller\HomeBaseController;

class BasicinfoController extends HomeBaseController{
    //城市区域管理
    public function index(){
        $fen = trim(I('get.fen'));
        $ptype = trim(I('get.ptype'));
        //智能分单城市
        if($fen == 1){
            $map['a.fen_type'] = 2; //智能分单
        }
        if($ptype == 1){
            $map['c.type'] = 1; // 南方
        }

        $result = D('Home/Db/Adminquyu')->getList($map);
        $this->assign("fen",$fen);
        $this->assign("ptype",$ptype);
        $this->assign("quyuList",$result);
        $this->display();
    }
    //增加/编辑城市
    public function edit(){
        $id = trim(I('get.id'));
        if(!empty($id)){
            $quyuInfo  = D('Home/Db/Adminquyu')->getQuyu(array('cid'=>$id));

            $this->assign("quyuInfo",$quyuInfo[0]);
        }
        $result = D('quyu')->getProvince();
        //城市级别
        $level = D("Home/Logic/QuyuLogic")->getlittle();
        $this->assign("level",$level);
        $this->assign("provinceList",$result);
        $this->display();
    }

    public function editcity(){
        if($_POST){
            $post = I("post.");
            //城市信息
            $data['cname']        = trim($_POST['cname']);
            $data['plate']        = trim($_POST['plate']);
            $data['map_name']     = trim($_POST['map_name']);
            $data['little']       = trim($_POST['little']);
            $data['is_open_city'] = $_POST['is_open_city'];
            $data['manager']      = trim($_POST['manager']);
            $data['fen_type']      = $_POST['fen_type'];
            $data['mark_red']      = $_POST['mark_red'];
            $data['type']         = '1';


            if(!empty($post["id"])){
                //编辑
                $map['action'] = 'add_city';
                $quyuInfo  = D('Home/Db/Adminquyu')->getQuyu(array('cid'=>$post["id"]));
                $result = D("Home/Db/Adminquyu")->editQuyu($post["id"],$data);
                if($result){
                    /*S-修改城市管辖权限*/
                    $manager = $quyuInfo[0]['manager'];
                    if ($manager != $data['manager']) {
                        // 从外销变为商务
                        if ($manager == 1 && $data['manager'] != 1) {
                            $this->editManager($post["id"], 2);
                            //从商务变为外销
                        } elseif ($manager != 1 && $data['manager'] == 1) {
                            $this->editManager($post["id"], 1);
                        }
                    }
                    /*E-修改城市管辖权限*/
                }
            }else{
                //添加
                //判断区划代码或BM是否存在
                $data['cid']          = trim($_POST['cid']);
                $data['bm']           = trim($_POST['bm']);
                $data['px_abc']       = substr($data['bm'],0,1).'099';

                $map['bm'] = $data['bm'];
                $map['cid'] = $data['cid'];
                $map['_logic'] = 'or';
                $isHave  = D('Home/Db/Adminquyu')->getQuyu($map);
                if($isHave){
                    $this->ajaxReturn(array('status'=>1,'info'=>'该城市或二级域名或区划代码已存在，增加失败！'));
                }
                $data['uid']          = trim($_POST['provinceid']);
                $data['px']           = substr($data['uid'], 0, 2).'99';

                $result = D("Home/Logic/QuyuLogic")->addQuyu($data);
                $map['action'] = 'add_city';
            }

            //修改省份信息
            $province['type'] = $_POST['province_type'];
            $data['uid'] = isset($data['uid'])?$data['uid']:trim($_POST['province']);
            D("Home/Logic/QuyuLogic")->editProvince($province,$data['uid']);

            $map['id'] = $data['cid'];
            D('Home/Db/Adminquyu')->addLog($map,$data); //打日志
            $this->ajaxReturn(array('status'=>0,'info'=>"操作成功"));
        }
    }

    /**
     * [editManager 编辑城市管辖]
     * @param  integer $cid     [城市ID]
     * @param  integer $operate [操作，1:将城市管辖改为外销，2:将城市管辖改为商务]
     * @return [type]           [description]
     */
    public function editManager($cid = 0, $operate = 0){
        if (empty($cid) || empty($operate)) {
            return false;
        }
        // 1:将城市管辖改为外销
        if ($operate == 1) {
            // 去除商务部的城市
            D('Home/Db/Adminuser')->delUserCitysByDepartment($cid,6);
            // 给外销经理，外销助理增加城市
            D('Home/Db/Adminuser')->addUserCitysByUid(['59','67'],[$cid]);
            // 2:将城市管辖改为商务
        } elseif ($operate == 2) {
            // 去除外销部的城市
            D('Home/Db/Adminuser')->delUserCitysByDepartment($cid,5);
            // 给商务经理，商务助理增加城市
            D('Home/Db/Adminuser')->addUserCitysByUid(['39','45'],[$cid]);
        }
        return true;
    }
    

    //排序
    public function paixu(){
        $cid = $_GET['id'];
        $quyuInfo  = D('Home/Db/Adminquyu')->getQuyu(array('cid'=>$cid));
        $areaList = D('Home/Db/Adminquyu')->getArea(array('fatherid'=>$cid),'orders','100');
        //dump($areaList);

        if($_POST){

            $ids = $_POST['id'];
            $orders = $_POST['orders'];

            foreach ($ids as $k => $v) {
                $data['orders'] = $orders[$k];
                M("area")->where(array('id'=>$v))->save($data);
                //日志
                $logData[] = array(
                    'id' => $v,'orders'=>$data['orders']
                );
            }
            $map['id'] = $data['qz_areaid'];
            $map['action'] = 'edit_area_orders';
            D('Home/Db/Adminquyu')->addLog($map,$logData); //打日志
            $this->ajaxReturn(array('status'=>0));
        }else{
            $quyuInfo['0']['count'] = count($areaList);
            $this->assign("quyuInfo",$quyuInfo['0']);
            $this->assign("areaList",$areaList);
            $this->assign('title',$quyuInfo['0']['cname'].'区域管理 - ');
            $this->display();
        }

    }
    //区域管理
    public function quyu(){
        $cid = empty(I('get.id'))?I('post.id'):I('get.id');
        $quyuInfo  = D('Home/Db/Adminquyu')->getQuyu(array('cid'=>$cid));
        $areaList = D('Home/Db/Adminquyu')->getArea(array('fatherid'=>$cid),'orders','100');
        if($_POST){
            //取上级邮编
            //取已有区域数
            $areaCount = count($areaList);
            $areaCount = $areaCount + 1;
            $qz_area = $_POST['qz_area'];

            if(!empty($_POST['qz_area_all'])){
                $areas = str_replace(array('，',',','、'),',',$_POST['qz_area_all']);
                $areas = array_unique(array_filter(explode(",",$areas))); //数组形式
                foreach ($areas as $key => $value) {
                    if(!empty($value)){
                        $value = preg_replace('/\s+/', '', $value);
                        $qz_area[] = $value;
                    }
                }
            }
            //获取目前最大的areaid值-start
            $areaList_sort = multi_array_sort($areaList,'qz_areaid',SORT_DESC);
            $max_areaid = $areaList_sort[0]['qz_areaid']+1;
            $areaList_order_sort = multi_array_sort($areaList,'orders',SORT_DESC);
            $max_order = $areaList_order_sort[0]['orders']+1;
            //end
            $areaNumber = count($qz_area);
            for ($i=0; $i <= $areaNumber; $i++) {
                if(empty($qz_area[$i])){
                    continue;
                }
                $data = array();

                if(empty(count($areaList))){
                    $theNumber = str_pad($areaCount,2,"0",STR_PAD_LEFT);
                    $data['qz_areaid'] = $cid.$theNumber;
                    $data['orders'] = intval($areaCount);
                }else{
                    $data['qz_areaid'] = $max_areaid;
                    $data['orders'] = intval($max_order);
                }

                $data['qz_area'] = htmlspecialchars($qz_area[$i]);
                $data['fatherid'] = $cid;

                $result = D('Home/Db/Adminquyu')->addArea($data);
                if (false == $result) {
                    //操作失败可能是区域ID重复的问题，发现桂阳的区域ID不是从1开始算的，故这样修改
                    $maxaid = M('area')->where(['fatherid' => $cid])->order('qz_areaid DESC')->find()['qz_areaid'];
                    if (!empty($maxaid)) {
                        $data['qz_areaid'] = $maxaid + 1;
                        $result = D('Home/Db/Adminquyu')->addArea($data);
                    }
                }
                $map['id'] = $data['qz_areaid'];
                $map['action'] = 'add_area';
                D('Home/db/Adminquyu')->addLog($map,$data); //打日志
                $areaCount++;
                $max_order++;
                $max_areaid++;
            }
            $this->ajaxReturn(array('status'=>0,'info'=>'操作成功'));
            
        }else{
            $quyuInfo['0']['count'] = count($areaList);
            $this->assign("quyuInfo",$quyuInfo['0']);
            $this->assign("areaList",$areaList);
            $this->assign('title',$quyuInfo['0']['cname'].'区域管理 - ');
            $this->display();
        }
    }

    //会员公司管理
    public function company(){
        //获取城市小区信息
        $citys = D('Home/Logic/AuthLogic')->getCityArray('',true);

        $post = I('get.');
        $list = D("Home/Logic/CompanyLogic")->getTrueCompany($post);
        $this->assign('citys',$citys);
        $this->assign('list',$list["list"]);
        $this->assign('page',$list["page"]);
        $this->assign('shi',I('get.city'));
        $this->assign('area',I('get.area'));
        $this->display();
    }

    //获取编辑公司数据
    public function getvipcompany(){
        if($_POST){
            $id = I('post.id');
            $data = D("Home/Logic/CompanyLogic")->getvipcompany($id);
            if(!empty($data)){
                $this->ajaxReturn(array('status'=>0,'data'=>$data));
            }else{
                $this->ajaxReturn(array('status'=>1,'info'=>'操作失败'));
            }
        }
    }

    //保存公司信息
    public function savevipcompany(){
        if($_POST){
            $post = I('post.');
//            $data =
            $id = $post["id"];
            $user["cs"] = $post["model-city"];
            $user["qx"] = $post["model-area"];
            $user["dz"] = $post["dz"];
            $company["contract"] = $post["qb"];
            $company["lx"] = $post["zx"];
            $company["other_id"] = $post["other_id"];

            //经纬度不能为空
            $post["jingwei"] = str_replace(array('，',',','、'),',',$post["jingwei"]);
            $jingwei = explode(',',$post["jingwei"]);
            if(empty($jingwei[0])||empty($jingwei[1])){
                $this->ajaxReturn(array("info"=>"坐标填写错误!", "status"=>1));
            }else{
                if(count($jingwei)>2){
                    $this->ajaxReturn(array("info"=>"坐标填写错误!", "status"=>1));
                }
                $lng = '/^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/';
                $lan = '/^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/';
                if(!preg_match($lng,$jingwei[0])||!preg_match($lan,$jingwei[1])){
                    $this->ajaxReturn(array("info"=>"坐标填写错误!", "status"=>1));
                }
            }
            $company["lng"] = $jingwei[0];
            $company["lat"] = $jingwei[1];
            //对立公司id必须填写已存在的-start
            $other_id = str_replace(array('，',','),',',$post["other_id"]);
            $other_id = explode(',',$other_id);
            foreach($other_id as $key=>$val){
                if(empty($val)){
                    unset($other_id[$key]);
                }else{
                    $other_id[$key] = trim($val);
                }

            }
            $other_now = count($other_id);
            if($other_now>0){
                if(in_array($id,$other_id)){
                    $this->ajaxReturn(array('status'=>1,'info'=>'不能输入本公司id'));
                }
                $other_exist = D("Home/db/Company")->getvipcompanycount($other_id);
                if($other_now!=$other_exist){
                    $this->ajaxReturn(array('status'=>1,'info'=>'请输入已存在真会员公司id'));
                }
            }

            //end
            $result = D("Home/Logic/CompanyLogic")->savevipcompany($user,$company,$id);

            if($result){
                $this->ajaxReturn(array('status'=>0,'info'=>'操作成功'));
            }else{
                $this->ajaxReturn(array('status'=>1,'info'=>'操作失败'));
            }
        }
    }

    /**
     * 模板下载
     */
   public function dowmmodule(){
       //设置表头
       $title = array(
           '会员ID','会员简称','所属城市','所在区域','详细地址','坐标','半包/全包','公装/家装','对立公司ID','所属销售'
       );
       D("Home/Logic/CompanyLogic")->downExcel($title,'会员公司模板');
       die;
   }

    /**
     * 导入数据
     */
    public function companyUploadExcel(){
        //分析Excel内容
        $ex = $_FILES['excel'];
        $filename = TEMP_PATH.'/'.time().substr($ex['name'],stripos($ex['name'],'.'));
        move_uploaded_file($ex['tmp_name'],$filename);
        $excel = importExcel($filename);

        if(count($excel['0'])  != 10 ){
            $this->ajaxReturn(array('data' => '','info' => '数据格式不正确','status' => 'error'));
        }
        unset($excel['0']);
        $lng = '/^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/';
        $lan = '/^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/';
        //逐行导入数据
        foreach ($excel as $k => $v) {
            if(empty($v)){
                continue;
            }

            //检查经纬度
            $v[5] = str_replace(array(' ','，',',','、'),',',$v[5]);

            $jingwei = explode(',', $v[5]);
            if(!preg_match($lng,$jingwei[0])||!preg_match($lan,$jingwei[1])){
                continue;
            }

            //判断会员公司是否存在
            $city = D("Home/Logic/CompanyLogic")->getvipcompany(trim($v[0]));
            if(empty($city)){
                continue;
            }

            // '会员ID','会员简称1','所属城市2','所在区域3','详细地址4','坐标5','半包/全包6','公装家装7','对立公司ID8','所属销售9'
            $id = $v[0];
            $user["cs"] = D('Home/Db/Adminquyu')->getCityInfo($v[2]);
            $user["qx"] =  D('Home/Db/Adminquyu')->getAreaInfo($v[3]);
            $user["dz"] = trim($v[4]);

            $company['lng'] = $jingwei[0];
            $company['lat'] = $jingwei[1];
            if(trim($v[6]) == '半包'){
                $company['contact'] = 1;
            }else if(trim($v[6]) == '全包'){
                $company['contact'] = 2;
            }else{
                $company['contact'] = 3;
            }
            if(trim($v[7]) == "家装"){
                $company['lx'] = 1;
            }else if(trim($v[7]) == "公装"){
                $company['lx'] = 2;
            }else{
                $company['lx'] = 3;
            }
            $company['other_id'] = $v[8];
            $company['saler'] = $v[9];
            D("Home/Logic/CompanyLogic")->savevipcompany($user,$company,$id);
        }

        $this->ajaxReturn(array('data'=>'','info'=>'操作成功','status'=>0));
    }

    public function editquyu(){
        $id = $_GET['id'];
        $areaInfo = D('Home/db/Adminquyu')->getArea(array('qz_areaid'=>$id));
        if($_POST){
            $data['qz_area'] = trim($_POST['qz_area']);
            $data['orders'] = trim($_POST['orders']);
            //排序不能有冲突
            if($areaInfo[0]['orders'] !=  $data['orders']){
                $count = D('Home/db/Adminquyu')->getExistOrder($areaInfo[0]['fatherid'],$data['orders']);
                if($count>0){
                    $this->ajaxReturn(array('status'=>1,'info'=>'排序冲突'));
                }
            }
             D('Home/db/Adminquyu')->editArea($id,$data);
            $map['id'] = $id;
            $map['action'] = 'edit_area';
            D('Home/db/Adminquyu')->addLog($map,$data); //打日志
            $this->ajaxReturn(array('status'=>0,'info'=>'操作成功'));
        }else{

            $cid = $areaInfo['0']['fatherid'];
            $quyuInfo  = D('Home/db/Adminquyu')->getQuyu(array('cid'=>$cid));
            $areaList = D('Home/db/Adminquyu')->getArea(array('fatherid'=>$cid),'orders','100');

            $quyuInfo['0']['count'] = count($areaList);
            $this->assign("quyuInfo",$quyuInfo['0']);
            $this->assign("areaList",$areaList);
            $this->assign("areaInfo",$areaInfo['0']);
            $this->display();
        }
    }

    //强制更新前台城市缓存 生成 City JSON 文件
    public function updateVipCityData(){
        //更新PC版城市JS文件
        $citys = D("Home/db/Buildcity")->getCityArray();

        $citys = json_encode($citys);
        $content =  "var citys = JSON.parse('".$citys."');";
        $filename = date('YmdHi').'.js';

        $result = $this->uploadContentToQiNiu('common/js/allcity'.$filename,$content);

        $filename = $result['key'];
        $filename = str_replace('common/js/','',$filename);

        $data['option_value'] = $filename;
        $result = M("options")->where(array('option_name' => 'ALL_CITY_JSON'))->save($data);

        //更新移动版城市JS文件
        $citys = D('Home/db/Buildcity')->getRealVipProvinceCityAndArea();
        $citys = 'var rlpca = '.json_encode($citys);

        $filename = 'common/js/rlpca' . date('YmdHis') . '.js';
        $result = $this->uploadContentToQiNiu($filename,$citys);

        $mdata['option_value'] = $filename;
        $result2 =  M("options")->where(array('option_name' => 'ALL_REAL_VIP_PCA_JSON'))->save($mdata);
        //清空OP缓存
        $redis_logic = D('Home/Logic/RedisLogic');
        $redis_logic->del('C:OP:N:ALL_CITY_JSON');
        $redis_logic->del('C:OP:N:ALL_REAL_VIP_PCA_JSON');

        $this->success('更新PC端和移动端城市JS操作成功！');
    }




    //上传内容到七牛
    private function uploadContentToQiNiu($filename,$content){
        import('Library.Org.Qiniu.io', '', '.php');
        import('Library.Org.Qiniu.rs', '', '.php');
        $bucket = OP('QINIU_BUCKET');
        $accessKey = OP('QINIU_AK');
        $secretKey = OP('QINIU_CK');
        Qiniu_SetKeys($accessKey, $secretKey);
        $putPolicy = new \Qiniu_RS_PutPolicy($bucket);
        $putPolicy->SaveKey = $filename;
        $upToken = $putPolicy->Token(null);
        $putExtra = new \Qiniu_PutExtra();
        $putExtra->Crc32 = 1;
        list($ret, $err) = Qiniu_Put($upToken, null, $content, $putExtra);
        if($err == null){
            $result = array(
                "hash"=>$ret["hash"],
                "key"=> $ret["key"]
            );
            return $result;
        }
        return $err;
    }


}