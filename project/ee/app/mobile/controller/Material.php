<?php
namespace app\mobile\controller;

use app\common\controller\MobileCommonBase;
use app\common\model\logic\MaterialLogic;
use app\common\model\logic\LogLogic;
use app\common\enums\ErrorCode;

/**
 * 移动端材料进销
 * Class Material
 * @package app\mobile\controller
 */
class Material extends MobileCommonBase
{
    public $company_id;
    public function initialize()
    {
        parent::initialize();
        $this->company_id = session('userInfo.company_id');
    }

    // 材料进销
    public function index(MaterialLogic $MaterialLogic){
        $post = input('get.');
        $where["yzname"]  = isset($post["yzname"])?$post["yzname"]:'';
        $info = $MaterialLogic->getmMaterialOrder( $this->company_id,$where);

        if($this->request->isAjax()){
            return json(['error_code'=>ErrorCode::SUCCESS,'data'=>$info['list'],'page'=>$info['page']]);
        }else{
            $this->assign('list',$info['list']);
            $this->assign('page',$info['page']);
            return $this->fetch();
        }
    }

    // 添加
    public function add(){
        return $this->fetch();
    }

    // 编辑
    public function edit(){
        return $this->fetch();
    }

    // 详情
    public function detail(MaterialLogic $MaterialLogic){
        $m_order_id = input('get.id');
        if(!empty($m_order_id)&&isset($m_order_id)){
            //获取材料订单信息
            //获取材料信息
            $info = $MaterialLogic->getMaterialOrderOne($m_order_id,$this->company_id);
            $this->assign("list",$info["list"]);
        }else{
            $this->error('信息不全');
        }
        return  $this->fetch();
    }

    /**
     * 删除材料进销信息
     */
    public function del(MaterialLogic $MaterialLogic,LogLogic $LogLogic){
        if($this->request->isAjax()){
            $post = input('post.');
            $oid = input('post.oid');
            if(!empty($oid)&&isset($oid)){
                $result = $MaterialLogic->del($oid,$this->company_id);
                if($result['order']){
                    //删除日志
                    $LogLogic->addLog(3, json_encode($post));
                    return json(['error_code'=>ErrorCode::SUCCESS]);
                }else{
                    return json(['error_code'=>ErrorCode::SERVICE_MYSQL_ERROR,'error_msg'=>'操作失败']);
                }
            }else{
                return json(['error_code'=> ErrorCode::PARAMETER_LACK,'error_msg'=>"操作失败"]); //成功
            }
        }
    }


}
