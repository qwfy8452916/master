<?php
/**
 * 注册用户表 user
 */
namespace Common\Model;
use Think\Model;
class DesignerModel extends Model{
    protected $tableName ="user";
    /**
     * 获取某城市的设计师列表
     * @param  [type] $cs [所在城市]
     * @return [type] [description]
     */
    /*public function getDesignerList($cs ='',$pageIndex = 0,$pageCount = 10)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 0 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $map = array(
                "a.cs"=>array("EQ",$cs)
                     );
        return M("cases")->where($map)->alias("a")
                         ->join("LEFT JOIN qz_team as b on a.userid = b.userid")
                         ->join("LEFT JOIN qz_user_des as f on f.userid = a.userid")
                         ->join("INNER JOIN qz_user as c on c.id = a.userid")
                         ->join("LEFT JOIN qz_user_company as g on g.userid = a.uid")
                         ->join("LEFT JOIN qz_user as h on h.id = b.comid")
                         ->field("count(a.id) as count,a.userid,a.uid as cid,c.name,b.zw,c.logo,f.text as jianjie,f.jobtime,f.fengge")
                         ->limit($pageIndex.",".$pageCount)
                         ->order("h.on desc,g.fake,count desc")->group("a.userid")->select();
    }*/
    /**
     * 获取某城市的设计师列表---修改版
     * @param  [type] $cs [所在城市]
     * @return [type] [description]
     */
    public function getDesignerList($cs ='',$map,$pageIndex = 0,$pageCount = 10)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 0 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $mapcs = array(
                       "a.cs" => array("EQ",$cs),
                       "a.classid" => array("EQ",'2')
                       );
        //查询当前城市的所有设计师
        $buildSql = M("user")->where($mapcs)->alias("a")
                        ->join("INNER JOIN qz_team as m on m.userid = a.id and zt = 2")
                        ->field("a.id,a.name,a.logo,m.comid,m.zw,a.cs")
                        ->buildSql();
        //关联案例表，查询对应设计师的案例时间，并且按照id desc排序
        $buildSql = M("user")->table($buildSql)->alias("t")
                        ->join("LEFT JOIN qz_cases as c on c.userid = t.id and c.cs = t.cs and c.isdelete = 1")
                        ->field("t.id,t.comid,t.name,t.logo,t.zw,c.time")
                        ->order("c.id desc")
                        ->buildSql();

        //获取最新的案例时间，并且统计所有的案例数目
        $buildSql = M("user")->table($buildSql)->alias("t")
                        ->field("t.id,t.comid,t.name,t.logo,t.zw,max(t.time) as time ,count(t.id) as count")
                        ->group("t.id")
                        ->buildSql();
        //判断最新案例数，如果在一个月之内则为1，否则为0
        $buildSql = M("user")->table($buildSql)->alias("t")
                        ->field("t.id,t.comid,t.name,t.logo,t.zw,t.count,if(t.time >= ".strtotime("-1 month").",'1','0') as time")
                        ->order("count desc,t.id desc")
                        ->buildSql();
        //
        return M("user")->table($buildSql)->alias("t1")
                        ->where($map)
                        ->join("INNER JOIN qz_user as u on u.id = t1.comid")
                        ->join("INNER JOIN qz_user_company as uc on uc.userid = u.id ")
                        ->join("INNER JOIN qz_user_des as ud on ud.userid = t1.id")
                        ->field("t1.id as userid,t1.comid,t1.zw,count,u.qc,t1.name,t1.logo,uc.fake,ud.fengge,ud.text as jianjie,ud.jobtime,u.on,t1.time")
                        ->limit($pageIndex.",".$pageCount)
                        ->order("u.on desc, fake,t1.time desc,count desc,t1.id desc")
                        ->select();

    }

    /**
     * 获取某城市的设计师榜
     * @param  [type] $cs [所在城市]
     * @return [type] [description]
     */
    public function getDesignerListFive($cs =''){
        $mapcs = array(
                       "a.cs" => array("EQ",$cs),
                       "a.classid" => array("EQ",'2')
                       );
        //查询出该城市所有设计师
        $buildSql = M("user")->where($mapcs)->alias("a")
                        ->join("INNER JOIN qz_team as m on m.userid = a.id")
                        ->field("a.id,a.name,m.comid,a.cs")
                        ->buildSql();
        //关联案例，查询案例数总数
        $buildSql = M("user")->table($buildSql)->alias("t")
                        ->join("INNER JOIN qz_cases as c on c.userid = t.id and c.cs = t.cs and c.isdelete = 1")
                        ->field("t.id,t.comid,t.name,count(t.id) as count")
                        ->group("c.userid")
                        ->buildSql();

        return M("user")->table($buildSql)->alias("t1")
                        ->join("INNER JOIN qz_user as u on u.id = t1.comid")
                        ->join("INNER JOIN qz_user_company as uc on uc.userid = u.id ")
                        ->join("INNER JOIN qz_user_des as ud on ud.userid = t1.id")
                        ->field("t1.id as userid,t1.comid,t1.name,count,uc.fake,u.on")
                        ->limit('0'.",".'5')
                        ->order("u.on DESC,fake,count DESC")
                        ->select();
    }
    /**
     * 获取某城市的设计师列数量
     * @param  [type] $cs [所在城市]
     * @return [type]     [description]
     */
    public function getDesignerListCount($cs,$map){
        $mapcs = array(
                       "a.cs" => array("EQ",$cs),
                       "a.classid" => array("EQ",'2')
                       );

        //查询当前城市的所有设计师
        $buildSql = M("user")->where($mapcs)->alias("a")
                        ->join("INNER JOIN qz_team as m on m.userid = a.id and zt = 2")
                        ->field("a.id,a.name,a.logo,m.comid,m.zw,a.cs")
                        ->buildSql();

        //
        return M("user")->table($buildSql)->alias("t1")
                        ->where($map)
                        ->join("INNER JOIN qz_user as u on u.id = t1.comid")
                        ->join("INNER JOIN qz_user_company as uc on uc.userid = u.id ")
                        ->join("INNER JOIN qz_user_des as ud on ud.userid = t1.id")
                        ->field("t1.id as userid,t1.comid,t1.zw,count,u.qc,t1.name,t1.logo,uc.fake,ud.fengge,ud.text as jianjie,ud.jobtime,u.on")
                        ->count();


        /*$buildSql = M("user")->where($mapcs)->alias("a")
                        ->join("INNER JOIN qz_team as m on m.userid = a.id")
                        ->field("a.id,m.comid,a.cs,m.zw")
                        ->buildSql();

        $buildSql = M("user")->table($buildSql)->alias("t")
                        ->join("INNER JOIN qz_cases as c on c.userid = t.id and c.cs = t.cs")
                        ->field("t.id,t.comid,count(t.id) as count,t.zw")
                        ->group("c.userid")
                        ->buildSql();

        return M("user")->table($buildSql)->alias("t1")
                        ->where($map)
                        ->join("INNER JOIN qz_user as u on u.id = t1.comid")
                        ->join("INNER JOIN qz_user_company as uc on uc.userid = u.id ")
                        ->join("INNER JOIN qz_user_des as ud on ud.userid = t1.id")
                        ->field("t1.id as userid,t1.comid,count,t1.zw,ud.fengge,ud.jobtime")
                        ->count();*/
    }

    /**
     * 获取设计师的最新3个案例信息
     * @param  string $ids [description]
     * @return [type]      [description]
     */
    public function getDesinerCase($ids=""){
        $map = array(
                "userid"=>array("IN",$ids),
                "isdelete"=>array("EQ",1),
                //因为考虑到数据量的问题,添加一个最新案例的最早时间
                "time"=>array("EGT",strtotime("-1 month"))
                     );
        //1.查询出用户的案例编号
        $buildSql = M("cases")->where($map)
                         ->buildSql();
        //2.条件子查询,查询每个设计师的最新3个案例
        $map["_string"] = "a.userid = b.userid AND a.id < b.id ";
        $sql = M("cases")->where($map)->alias("b")
                         ->field("count(id)")
                         ->buildSql();
        $map = array(
                $sql=>array("LT",3)
                     );
        $buildSql  = M("cases")->table($buildSql)->alias("a")
                               ->field("a.id,a.userid,a.title")
                               ->where($map)
                               ->buildSql();

        //3.查询出案例的封面图片
        $buildSql = M("case_img")->alias("m")
                     ->join("INNER JOIN $buildSql as t on t.id = m.caseid")
                     ->order("m.caseid desc,m.img_on DESC")
                     ->field("m.*,t.userid,t.title")
                     ->buildSql();
        return M("case_img")->table($buildSql)->alias("t1")
                            ->group("caseid")
                            ->select();

    }

}