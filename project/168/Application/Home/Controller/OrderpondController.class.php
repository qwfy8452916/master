<?php
// +----------------------------------------------------------------------
// | DeliveryPoolController  派单池
// +----------------------------------------------------------------------
namespace Home\Controller;

use Home\Common\Controller\HomeBaseController;

class OrderpondController extends HomeBaseController
{
    /**
     * 派单池配置页面
     */
    public function config()
    {
        //获取客服名单
        $kfList = D('Adminuser')->getKfList();
        //获取城市信息
        $cityList = A('Home/Api')->getAllCityInfo();
        $kfNum = count($kfList);
        $cityNum = count($cityList);
        //获取订单池列表
        $pondList = D('Home/Logic/OrderPondLogic')->getPondList();
        //计算分配城市和客服数量
        $isUsedCity = array_sum(array_column($pondList,'city_num'));
        $isUsedKf = array_sum(array_column($pondList,'kf_num'));
        //计算剩余城市和客服数量
        foreach ($pondList as $key=>$value) {
            if ($value['id'] == 1) {
                //主池剩余
                $pondList[$key]['un_city_num'] = $cityNum - $isUsedCity;
                $pondList[$key]['un_kf_num'] = $kfNum - $isUsedKf;
            } else {
                //分池剩余
                $pondList[$key]['un_city_num'] = $cityNum - $isUsedCity + $pondList[0]['city_num'];
                $pondList[$key]['un_kf_num'] = $kfNum - $isUsedKf + $pondList[0]['kf_num'];
            }
        }
        $this->assign('list',$pondList);
        $this->display();
    }

    /**
     * 订单池添加
     */
    public function addPond()
    {
        if (IS_POST) {
            $data = I('post.');
            $vali = D('Home/Logic/OrderPondLogic')->validatePond($data);
            if ($vali !== true) {
                $this->ajaxReturn($vali);
            }
            $data['create_user'] = session('uc_userinfo.id');
            $data['update_time'] = $data['create_time'] = time();
            $flag = D('Home/Logic/OrderPondLogic')->addOrderPond($data);
            if ($flag !== false) {
                $this->ajaxReturn(['status' => 1, 'info' => '订单池新增成功']);
            } else {
                $this->ajaxReturn(['status' => 0, 'info' => '订单池保存失败']);
            }
        }
        $this->ajaxReturn(['status' => 0, 'info' => '请求错误']);
    }

    /**
     * 订单池编辑
     */
    public function editPond()
    {
        if (IS_POST) {
            $data = I('post.');
            $vali = D('Home/Logic/OrderPondLogic')->validatePond($data, 1);
            if ($vali !== true) {
                $this->ajaxReturn($vali);
            }
            $data['sort'] = intval($data['sort']);
            $data['update_time'] = time();
            $flag = D('Home/Logic/OrderPondLogic')->addOrderPond($data, ['id' => $data['id']]);
            if ($flag !== false) {
                $this->ajaxReturn(['status' => 1, 'info' => '订单池修改成功']);
            } else {
                $this->ajaxReturn(['status' => 0, 'info' => '订单池保存失败']);
            }
        }
        $this->ajaxReturn(['status' => 0, 'info' => '请求错误']);
    }

    /**
     * 删除订单池
     */
    public function delPond()
    {
        if (IS_POST) {
            $ids = I('post.id');
            if (empty($ids)) {
                $this->ajaxReturn(['status' => 0, 'info' => '参数错误']);
            }
            if ($ids == 1 || stripos('1',$ids)) {
                $this->ajaxReturn(['status' => 0, 'info' => '主订单池不能删除']);
            }
            $flag = D('Home/Logic/OrderPondLogic')->delOrderPond($ids);
            if ($flag !== false) {
                $this->ajaxReturn(['status' => 1, 'info' => '订单池删除成功']);
            } else {
                $this->ajaxReturn(['status' => 0, 'info' => '订单池删除失败']);
            }
        }
        $this->ajaxReturn(['status' => 0, 'info' => '请求错误']);
    }

    /**
     * 派单池详情页面
     */
    public function configdetail()
    {
        $id = I('get.id');
        //获取客服名单
        $kfResult = D('Adminuser')->getKfList();
        //获取其他订单池已经分配的客服
        $kfused = D('Home/Logic/OrderPondLogic')->getUsedService($id);
        foreach ($kfResult as $k1=>$v1) {
            if (in_array($v1['id'],$kfused)) {
                unset($kfResult[$k1]);
            }
        }
        $edition = $kfList = [];
        foreach ($kfResult as $key => $value) {
            $kfList[$value['kfgroup']][] = $value;
            $edition[] = $value['kfgroup'];
        }
        $edition = array_unique($edition);
        array_multisort($edition, SORT_ASC, $kfList);
        $this->assign('kfList',$kfList);
        //获取城市信息
        $cityList = A('Home/Api')->getAllCityInfo();
        //获取其他订单池已经分配的城市
        $cityused = D('Home/Logic/OrderPondLogic')->getUsedCity($id);
        foreach ($cityList as $k=>$v) {
            if (in_array($v['cid'],$cityused)) {
                unset($cityList[$k]);
            }
        }
        $this->assign('cityList',$cityList);
        //获取分配详情
        $pondDetail = D('Home/Logic/OrderPondLogic')->getPondDetail($id);
        $this->assign('detail',$pondDetail['detail']);
        $this->assign('checkkf',array_column($pondDetail['kflist'],'kf_id'));
        $this->assign('checkcity',array_column($pondDetail['cityList'],'city_id'));
        $this->display();
    }

    /**
     * 添加客服和城市
     */
    public function addCityAndServ()
    {
        if (IS_POST) {
            $data = I('post.');
            $vali = D('Home/Logic/OrderPondLogic')->validatePondDetail($data);
            if ($vali !== true) {
                $this->ajaxReturn($vali);
            }
            $flag = D('Home/Logic/OrderPondLogic')->addCityAndServ($data);
            if ($flag !== false) {
                $this->ajaxReturn(['status' => 1, 'info' => '分配成功']);
            } else {
                $this->ajaxReturn(['status' => 0, 'info' => '分配失败']);
            }
        }
        $this->ajaxReturn(['status' => 0, 'info' => '请求错误']);
    }
}