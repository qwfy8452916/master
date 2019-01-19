<?php
namespace Common\Controller;
use Think\Controller;

/**
 * 评论回复
 */

class CommentController extends Controller
{
    /**
     * 评论回复
     * @return [type] [description]
     */
    public function reply()
    {
        if ($_POST) {
            $user = session("u_userInfo");
            //判断用户是否登陆
            if (!session("?u_userInfo")) {
                if (I("post.name") == "") {
                    $this->ajaxReturn(array("status"=>2));
                }

                if (I("post.password") == "") {
                    $this->ajaxReturn(array("status"=>3));
                }

                //未登陆，验证用户名和用户密码
                $model = D("User");
                $data = array(
                    "user" => I("post.name"),
                    "pass" => I("post.password")
                );
                $status = 0;
                if ($model->create($date,1)) {
                    //查询用户
                    $user = $model->findUserInfoByUser($data["user"]);
                    if(count($user)>0){
                        if($user["pass"] == md5($data["pass"])){
                            $status = 1;
                            $data = array(
                                    "id"=>$user["id"],
                                    "name"=>$user["name"],
                                    "user"=>$user["user"],
                                    "cs"=>$user["cs"],
                                    "qx"=>$user["qx"],
                                    "logo"=>$user["logo"],
                                    "classid"=>$user["classid"],
                                    "bm"=>$user["bm"],
                                    "cname"=>$user["cname"],
                                    "qc"=>$user["qc"],
                                    "jc"=>$user["jc"],
                                    "on"=>$user["on"]
                            );
                            session("u_userInfo",$data);
                        }else{
                            $msg = "用户名/密码错误！";
                        }
                    }else{
                        $msg = "用户名/密码错误！";
                    }
                }else{
                    $status = 2;
                    $msg = $model->getError();
                }

                if ($status == 0) {
                    $this->ajaxReturn(array("info"=>$msg,"status"=>$status));
                }
            }

            if (I("post.content") == "") {
                $this->ajaxReturn(array("info"=>"请填写您的评论！","status"=>4));
            }

            $name = $user["name"];
            if ($user["classid"] == 3) {
                $name = $user["jc"];
            }

            //如果有回复ID，查询该回复的楼层
            $floor = 1;
            if (I("post.reply_id") !== "") {
               $count = D("CommentFull")->getReplyCount("wwwarticle",I("post.rel_id"),I("post.reply_id"));
               $floor = $count + 1;
            }

            //过滤回复内容
            import('Library.Org.Util.Fiftercontact');
            $filter = new \Fiftercontact();
            $content = $filter->filter_common(I("post.content"),array("Sbc2Dbc","filter_script",array("filter_sensitive_words",array(2,3,5)),"filter_link","filter_url","filter_html_url"));

            $data = array(
                "module" => I("post.module"),
                "userid" => $user["id"],
                "username" => $name,
                "cs" => $user["cs"],
                "ref_id" => I("post.rel_id"),
                "content" => $content,
                "floor" => $floor,
                "reply_id" => I("post.reply_id"),
                "time" => time()
            );

            $i = D("CommentFull")->addComment($data);

            if ($i !== false) {
                $this->ajaxReturn(array("status"=>1));
            }
            $this->ajaxReturn(array("info"=>"回复失败！","status"=>0));
        }
    }

    /**
     * 评论顶
     * @return [type] [description]
     */
    public function replyup()
    {
        if ($_POST) {
            $id = I("post.id");
            $i = D("CommentFull")->setLikes($id);
            if ($i !== false) {
               $this->ajaxReturn(array("status"=>1));
            }
            $this->ajaxReturn(array("info"=>"","status"=>0));
        }
    }

    /**
     * 评论踩
     * @return [type] [description]
     */
    public function replydown()
    {
        if ($_POST) {
            $id = I("post.id");
            $i = D("CommentFull")->setDisLike($id);
            if ($i !== false) {
               $this->ajaxReturn(array("status"=>1));
            }
            $this->ajaxReturn(array("info"=>"","status"=>0));
        }
    }
}