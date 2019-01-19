<?php
namespace Home\Controller;
use Home\Common\Controller\HomeBaseController;
class CompanycommentController extends HomeBaseController{

    //评论列表页面
    public function index(){
        $admincitys = getAdminCityIds(true, true, true);
        $city = getCityListByCityIds($admincitys);
        $search = $_GET;
        if(empty($_GET['ordertype'])){
            $search['ordertype'] = 1;
        }else{
            $search['ordertype'] = I("get.ordertype");
        }

        $c_page = intval($_GET['p']);
        if ($_SESSION['uid'] != 1)
        {
            $map['c.cs'] = array('in', $admincitys);
        }
        if ($_GET['cityid'] != 0)
        {
            $map['c.cs'] = array('eq', $_GET['cityid']);
        }
        $start_time = date("Y-m-d",strtotime("-1 day"));
        $end_time = date("Y-m-d");
        //选择时间段
        if (!empty($_GET['start_time']) && !empty($_GET['end_time'])) {
            $start_time  = strtotime($_GET['start_time'] ." 00:00:00");
            $end_time = strtotime($_GET['end_time'] ." 23:59:59");
            $map['c.time'] = array('between',"$start_time,$end_time");
        }
        //公司名称、ID
        if(!empty($_GET['company'])){
            $company = I("get.company");
            $map['u.company'] = $company;
        }
        //公司状态
        if(!empty($_GET['companytype']) || intval($_GET['companytype']) === 0){
            $companytype = I("get.companytype");
            if($companytype != 9 && $companytype != ''){
                $map['u.on'] = array('EQ',$companytype);//-1过期 0注册  1认证 2会员
            }else{
                if($companytype == ''){
                    $map['u.on'] = 2;
                }
            }
        }else{
            $map['u.on'] = 2;//取消morning查询
            $search['companytype'] = 2;
        }

        //推荐状态
        if(!empty($_GET['recommend_state']) || intval($_GET['recommend_state']) === 0){
            $recommend = I("get.recommend_state");
            if($recommend != 2 && $recommend != '')
                $map['c.recommend'] = array('EQ',$recommend);
            
        }
        //审核状态
        if(!empty($_GET['audit_state']) || intval($_GET['audit_state']) === 0){
            $isveritfy = I("get.audit_state");
            if($isveritfy != 2 && $isveritfy != '')
                $map['c.isveritfy'] = array('EQ',$isveritfy);
        }
        //排序
        if(!empty($_GET['ordertype'])){
            $map['order'] = I("get.ordertype");
        }else{
            $map['order'] = 1;
        }
        

        if(empty($_GET['p'])){
            $page = 1;
        }else{
            $page = intval(I("get.p"));
        }
        if(empty($_GET['pagecount'])){
            $pagecount = 20;
        }else{
            $pagecount = I("get.pagecount");
        }
        $search['pagecount'] = $pagecount;
        $list = $this->getCommentList($map,$page,$pagecount);

        for ($i = 0; $i < count($list['list']); $i++){
            //如果 sg sj fw三项都为0 说明是老的分数 直接取count分数即可
            //如果 sg sj fw三项不为0 说明是新的分数 取sg sj fw三项平均分
            if($list['list'][$i]["sj"]!= 0 && $list['list'][$i]["fw"]!=0 && $list['list'][$i]["sg"]!=0){
                $list['list'][$i]['count']=sprintf("%01.1f",($list['list'][$i]["sj"]+$list['list'][$i]["fw"]+$list['list'][$i]["sg"])/3);
            }else
            {
                $list['list'][$i]['sj']=$list['list'][$i]["fw"]=$list['list'][$i]["sg"]=$list['list'][$i]['count'];
            }

            $list['list'][$i]['text'] = str_replace('`&[',' &#x261b;[',$list['list'][$i]['text']);
            $list['list'][$i]['text'] = str_replace(']&`',']&#x261a; ',$list['list'][$i]['text']);
        }

        $this->assign("citys",$city);//取城市
        $this->assign('search',$search);//搜索条件
        $this->assign('list', $list);
        $this->display();
    }


    /**
     * 获取评论列表
     * @param  array            $map             查询条件
     * @param  string           $page            页码
     * @param  string           $count           分页长度 
     * @return array            $result          修改结果
     */
    private function getCommentList($map,$pageIndex,$pageCount)
    {
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 20 : intval($pageCount);

        $count = D('Comment')->getCommentAllNum($map);//原查询有默认条件on=2
        $result['list'] = D('Comment')->getCommentList($map,($pageIndex-1)*$pageCount,$pageCount);
        //var_dump(M()->getLastSql());

        if($count > $pageCount){
            import('Library.Org.Util.Page');
            $page = new \Page($count,$pageCount);
            $result['page'] =  $page->show();
        }
        $result['totalnum'] = $count;
        //var_dump($result);
        return $result;
    }

    /**
     * 推荐
     * @param  array            $map             查询条件
     * @param  string           $page            页码
     * @param  string           $count           分页长度 
     * @return array            $result          修改结果
     */
    public function checkRecommend()
    {
        $map['id'] = I("post.id");//操作的评论ID
        $data['recommend'] = I("post.recommend");//推荐状态
        $result = D('Comment')->setRecommend($map,$data);
        //var_dump($result);
        if($result){
            $this->ajaxReturn(array('data'=>$result,'info'=>'操作成功！^v^','status'=>1)); 
        }else{
            $this->ajaxReturn(array('data'=>'','info'=>'操作失败，请重试！','status'=>0));
        }   
    }


    /**
     * 审核、批量审核
     * @param  array            $map             查询条件
     * @param  string           $page            页码
     * @param  string           $count           分页长度 
     * @return array            $result          修改结果
     */
    public function checkVerify()
    {
        $map['id'] = array('IN',I("post.id"));//操作的评论ID
        $data['isveritfy'] = I("post.verify");//推荐状态
        $result = D('Comment')->setVerify($map,$data);
        //var_dump($result);
        if($result){
            //重新更新对应公司的评论数
            D('Comment')->checkCompanyCountByCompanyId($map['id']);
            $this->ajaxReturn(array('data'=>$result,'info'=>'操作成功！^v^','status'=>1)); 
        }else{
            $this->ajaxReturn(array('data'=>'','info'=>'操作失败，请重试！','status'=>0));
        }
    }
}


