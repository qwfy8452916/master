<?php

namespace Home\Model;
Use Think\Model;

/**
*
*/
class CommentModel extends Model
{
    protected $autoCheckFields = false;

    /**
     * @param  array            $map             查询条件数组
     * @return string           $result          查询结果
     */
    public function getCommentAllNum($map)
    {
        //公司
        if(!empty($map["u.company"])){
            $company = $map["u.company"];
        }
        unset($map["u.company"]);
        //排序
        if($map['order'] == 1){
            $order = 'c.time DESC';
        }else{
           $order = 'c.time ASC'; 
        }
        unset($map['order']);
        if(!empty($company)){
            $result = M("comment")->alias("c")
                            ->join("qz_user as u on c.comid = u.id and (u.id = '$company' or u.user = '$company')")
                            ->where($map)
                            ->count();
        }else{
            $result = M("comment")->alias("c")->join("qz_user as u on c.comid = u.id")->where($map)->count();
        }
        
        return $result;
    }

    /**
     * @param  array            $map             修改讲师的ID
     * @return string           $result          查询结果
     */
    public function getCommentList($map,$start,$end)
    {
        //公司
        if(!empty($map["u.company"])){
            $company = $map["u.company"];
        }
        unset($map["u.company"]);
        //排序
        if($map['order'] == 1){
            $order = 'c.time DESC';
        }else{
           $order = 'c.time ASC'; 
        }
        unset($map['order']);
        if(!empty($company)){
            $result = M("comment")->alias("c")
                            ->join("qz_user as u on c.comid = u.id and (u.id = '$company' or u.user = '$company')")
                            ->join("qz_quyu as q on c.cs = q.cid")
                            ->where($map)
                            ->field("c.*,u.on as companytype,u.user as companyname,q.cname as cname,q.bm")
                            ->limit($start.",".$end)
                            ->order($order)
                            ->select();
        }else{
            $result = M("comment")->alias("c")
                                ->join("qz_user as u on c.comid = u.id")
                                ->join("qz_quyu as q on c.cs = q.cid")
                                ->where($map)
                                ->field("c.*,u.on as companytype,u.user as companyname,q.cname as cname,q.bm")
                                ->limit($start.",".$end)
                                ->order($order)
                                ->select();
        }

        return $result;
    }

    /**
     *  推荐/取消推荐
     * @param  array            $map             查询条件数组
     * @param  data             $data            修改的推荐状态数组
     * @return string           $result          查询结果
     */
    public function setRecommend($map,$data)
    {
        return M("comment")->where($map)->save($data);
    }

    /**
     *  审核/取消审核
     * @param  array            $map             查询条件数组
     * @param  data             $data            修改的审核状态数组
     * @return string           $result          查询结果
     */
    public function setVerify($map,$data)
    {
        return M("comment")->where($map)->save($data);
    }

    /**
     *  更新公司评论数
     *  $id 评论id
     */
    public function checkCompanyCountByCompanyId($map)
    {
        $where['id'] = $map;
        //获取所有评论对应的公司id
        $comments = $this->field('id,comid')->where($where)->select();
        //查询每个公司评论数
        $request = array();
        foreach ($comments as $key => $comment) {
            $w['comid'] = array('eq', $comment['comid']);
            $w['isveritfy'] = array('eq', 0);
            //查询对应公司的评论数
            $count = $this->field('count(id) as count')->where($w)->find();
            $data = array(
                'comment_count' => $count['count']
            );
            //更新对应公司的评论数
            M('user_company')->where('userid = ' . $comment['comid'])->save($data);
        }
        return $request;
    }
}