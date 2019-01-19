<?php
/**
 * 移动端家具报价
 */
namespace Mobile\Controller;

use Common\Enums\ApiConfig;
use Mobile\Common\Controller\MobileBaseController;

class JiajuZbController extends MobileBaseController{

    public function _initialize(){
        parent::_initialize();
    }

    public function baojia(){
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("mapUseInfo",$_SESSION["m_mapUseInfo"]);
        $this->assign("info",$info);
        $this->display();
    }

    // 新增临时模板
    public function gdtfive(){
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("mapUseInfo",$_SESSION["m_mapUseInfo"]);
        $this->assign("info",$info);
        $this->display();
    }
    //临时新增模板
    public function toutiaojiaju(){
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("mapUseInfo",$_SESSION["m_mapUseInfo"]);
        $this->assign("info",$info);
        $this->display();
    }
    public function baojiaDetail(){
        $jiajuData = unserialize($_COOKIE['QZ_JIAJU_ORDER']);
        if(empty($jiajuData)){
            header("Location:http://m.qizuang.com/qwdzbj/");
            die();
        }
        $jiajuzb_logic = D("Common/Logic/JiajuZbLogic");
        $result = $jiajuzb_logic->calculatePrice($jiajuData["mianji"],$jiajuData['huxing']);
        setcookie("QZ_JIAJU_ORDER", null, -1, '/', '.'.C('QZ_YUMING'));
        $this->assign("info",$result);
        $this->display();
    }
    //报价计算/发单入库
    public function baojiaCalculate(){
        $data = I('post.');
        if($data){
            //发单入库
            if(!empty(trim($data['tel']))){
                $tel =trim($data['tel']);
            }

            if(!empty(trim($data['mianji']))){
                $mianji = trim($data['mianji']);
            }

            if(!empty(trim($data['huxing']))){
                $temphuxing = preg_split('/(?<!^)(?!$)/u', trim($data['huxing']) );
                $huxing[$temphuxing[1]] = $temphuxing[0];
                $huxing[$temphuxing[3]] = $temphuxing[2];
                $huxing[$temphuxing[5]] = $temphuxing[4];
                $huxing[$temphuxing[7]] = $temphuxing[6];
            }

            if(!empty(trim($data['cs']))){
                $cs= trim($data['cs']);
            }

            if(!empty(trim($data['qy']))){
                $qx = trim($data['qy']);
            }

            if(!empty(trim($data['source']))){
                $source = trim($data['source']);
            }

            $resultFd = R('Common/JiajuZbfb/jiaju_boajia',array($tel,$mianji,$huxing,$cs,$qx,$source));
            $this->ajaxReturn($resultFd);
        }else{
           $this->ajaxReturn(['error_code' => 9000003,"error_msg"=> ApiConfig::CODE_9000003]);
        }

    }

}
