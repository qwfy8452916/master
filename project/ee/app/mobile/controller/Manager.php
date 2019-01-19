<?php
namespace app\mobile\controller;
use app\common\controller\MobileCommonBase;
use think\Controller;

/**
 * 项目经理视角首页
 * Class Manager
 * @package app\mobile\controller
 */
class Manager extends MobileCommonBase
{
    public function index()
    {
        return $this->fetch();
    }

    //团队管理
    public function team(){
        return $this->fetch();
    }

    //施工组工人列表
    public function groupworker(){
        return $this->fetch();
    }

    //施工组新增工人
    public function addworker(){
        return $this->fetch();
    }

    //施工组编辑工人
    public function editworker(){
        return $this->fetch();
    }

    //施工组添加
    public function addgroup(){
        return $this->fetch();
    }

    //施工组编辑
    public function editgroup(){
        return $this->fetch();
    }

    //项目经理设置
    public function managerset(){
        return $this->fetch();
    }

    //项目经理个人设置
    public function manageruserset(){
        return $this->fetch();
    }

    //项目经理密码更改
    public function manageruserpsw(){
        return $this->fetch();
    }

    //项目经理跟单管理
    public function managerorder(){
        return $this->fetch();
    }

    //项目经理跟单管理施工图
    public function managerconstructdraw(){
        return $this->fetch();
    }


    //上传页面
    public function upload(){
        return $this->fetch();
    }
    //上传页面上传图片
    public function uploadpic(){
        return $this->fetch();
    }

    //设计图
    public function designdraw(){
        return $this->fetch();
    }
    //编辑
    public function manageredit(){
        return $this->fetch();
    }
    //详情
    public function managerdetail(){
        return $this->fetch();
    }
    //示例
    public function example(){
        return $this->fetch();
    }
    //不合格点
    public function unqualified(){
        return $this->fetch();
    }

    //添加订单
    public function addorder(){
        return $this->fetch();
    }

    //查看大图
    public function picture(){
        return $this->fetch();
    }

}