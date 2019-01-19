<?php
namespace User\Common\Controller;
use Think\Controller;
class UserCenterBaseController extends Controller {
    public function _initialize(){
        // 访问来源追踪,来源进行cookie标记
        // 逻辑当有get参数 src的时候,例如 ?src=video
        // 打客户端浏览器cookie标记为  cookie('src_mark', I('get.src'), 3600 * 24); // 指定cookie保存时间为24小时
        B("Common\Behavior\MarkTrackingOrderSourceCheck");
        $keys["title"] = "用户中心";
        $keys["description"] = "用户中心";
        $keys["keywords"] = "用户中心";

        if (!IS_AJAX) {
            $area = getUserPosition();
            $this->assign('area',$area);
        }


        $this->assign("keys",$keys);
        $this->assign("title","齐装网");
        $this->assign('cityfile','http://'.OP('QINIU_DOMAIN').'/common/js/'.OP('ALL_CITY_JSON'));
    }


    //空操作
    public function _empty() {
        header("HTTP/1.1 404 Not Found");
        header("Status: 404 Not Found");
        $this->display('Public:404');
        die();
    }

    /**
     * [_error description]
     * @return [type] [description]
     */
    public function _error(){
        header("HTTP/1.1 404 Not Found");
        header("Status: 404 Not Found");
        $this->display('Public:404');
        die();
    }

     /**
     * 删除图片路由
     * @return [type] [description]
     */
    public function removeImg(){
        if($_POST){
            $id = I("post.id");
            $path = I("post.key");
            $i = D("Caseimg")->removeImg($id,$path);
            if($i !== false){
                $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"操作失败","status"=>0));
        }
    }
}