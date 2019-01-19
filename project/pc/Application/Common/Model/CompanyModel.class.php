<?php

/**
 * 装修公司列表页
 */

namespace Common\Model;
use Think\Model;

class CompanyModel extends Model{

    protected $autoCheckFields = false;


    public function getList($condition='',$pagesize= 1,$pageRow = 10){
        $map["classid"] = array("EQ",3);

        if(!empty($condition['cs'])){
            $map["cs"] = array("EQ",$condition['cs']);
        }

        if(!empty($condition['keyword'])){
            $map['qc']  = array('LIKE','%'.$condition['keyword'].'%');
        }
        //认证
        if(!empty($condition['vip'])){
            $map["on"] = array("EQ",2);
            //$map['fake'] = array('EQ',0);
        }
        if(!empty($condition['fw'])){
            $fw = $condition['fw'];
            $map["_string"] = "FIND_IN_SET($fw,q.quyu)";
        }
        if(!empty($condition['fg'])){
            $fg = $condition['fg'];
            $map["_string"] = "FIND_IN_SET($fg,q.fengge)";
        }
        if(!empty($condition['bz'])){
            $bz = $condition['bz'];
            $map["_string"] = "FIND_IN_SET($bz,q.baozhang)";
        }

        if(!empty($condition['gm'])){
            $map["q.guimo"] = array("EQ",$condition['gm']);
        }

        if(!empty($condition['comids'])){
            $map['q.userid'] = array('in', $condition['comids']);
        }

        if(!empty($condition['comid'])){
            $map['q.userid'] = array('not in', $condition['comid']);
        }

        $isSale = !empty($condition['sale']) ? "AND a.sales_count > '0'  " : '';
        if (!empty($condition['sale'])) {
            //点击优惠时 筛除假会员
            $map['a.on'] = array('eq', 2);
            $map['q.fake'] = array('eq', 0);
        }
        //dump($map);

        $orderby = $condition['orderby'];
        unset($condition['orderby']);

        $Db = M('user');

        $result = $Db->where($map)->alias("a")
                    ->field("a.`id`,a.on,a.jc,a.qc,a.pv,a.uv,a.cs,a.logo,a.uptime,a.info_time,a.case_count,q.team_count,q.comment_count,q.comment_score,q.fake,a.sales_count,a.activte_score,e.bm,q.id as comid,a.dz,q.team_num,q.img")
                    ->join("INNER JOIN qz_user_company as q on q.userid = a.id $isSale ")
                    ->join("INNER JOIN qz_quyu as e on e.cid = a.cs")
                    ->order("`on` desc,q.fake,".$orderby." desc")
                    ->limit($pagesize.",".$pageRow)
                    ->select();
        return array("result"=>$result);
    }

    /**
     * 获取口碑排行
     * @param string $condition
     * @param int $pagesize
     * @param int $pageRow
     * @return array
     */
    public function getStarList($condition='',$pagesize= 1,$pageRow = 10){
        $map["classid"] = array("EQ",3);
        $map['a.qc'] = array('exp', 'IS NOT NULL');
        $map['a.qc'] = array('NEQ', '');
        if(!empty($condition['cs'])){
            $map["cs"] = array("EQ",$condition['cs']);
        }

        if(!empty($condition['keyword'])){
            $map['qc']  = array('LIKE','%'.$condition['keyword'].'%');
        }
        //认证
        if(!empty($condition['vip'])){
            $map["on"] = array("EQ",2);
            //$map['fake'] = array('EQ',0);
        }
        if(!empty($condition['fw'])){
            $fw = $condition['fw'];
            $map["_string"] = "a.qx  = $fw";
        }
        if(!empty($condition['fg'])){
            $fg = $condition['fg'];
            $map["_string"] = "FIND_IN_SET($fg,q.fengge)";
        }
        if(!empty($condition['bz'])){
            $bz = $condition['bz'];
            $map["_string"] = "FIND_IN_SET($bz,q.baozhang)";
        }

        if(!empty($condition['gm'])){
            $map["q.guimo"] = array("EQ",$condition['gm']);
        }

        if(!empty($condition['comids'])){
            $map['q.userid'] = array('in', $condition['comids']);
        }

        if(!empty($condition['comid'])){
            $map['q.userid'] = array('not in', $condition['comid']);
        }

        $isSale = !empty($condition['sale']) ? "AND a.sales_count > '0'  " : '';
        if (!empty($condition['sale'])) {
            //点击优惠时 筛除假会员
            $map['a.on'] = array('eq', 2);
            $map['q.fake'] = array('eq', 0);
        }

        //获取前30天开始结束时间
        $rand_time  = $this->getlastthirtyDays();
        $start_time = $rand_time["start"];
        $end_time = $rand_time["end"];

        $Db = M('user');
        $buildSql = $Db->where($map)->alias("a")
            ->field("a.`id`,a.on,a.qc,a.pv,a.uv,a.cs,a.logo,a.uptime,a.info_time,a.case_count,q.team_count,q.comment_count,q.comment_score,q.fake,a.sales_count,a.activte_score,e.bm,q.id as comid,a.dz,q.team_num,q.img,a.register_time,e.cname as cityname,z.qz_area as area_name")
            ->join("INNER JOIN qz_user_company as q on q.userid = a.id $isSale ")
            ->join("INNER JOIN qz_quyu as e on e.cid = a.cs")
            ->join("LEFT JOIN qz_area as z on a.qx = z.qz_areaid")
            ->buildSql();
        //1*量房数+5*签单数+0.1*好评数+10*店铺完成度
        $buildSql1 = $Db->table($buildSql)->alias('t')
            ->field('t.*, uc1.liangfang,uc1.haoping,uc1.qiandan,uc1.wanzhengdu,uc1.ping')
            ->join("left join qz_user_company_rank uc1 on uc1.comid = t.id and uc1.day between '".$start_time."' and  '".$end_time."'")
            ->order("day desc")
            ->buildSql();

        $buildSql2 =  $Db->table($buildSql1)->alias('t2')
            ->field('t2.*,sum( t2.liangfang) as liangfang_num,t2.haoping as haoping_num,t2.ping as ping_num,sum( t2.qiandan) as qiandan_num')
            ->group('t2.id')
            ->buildSql();

        $result = $Db->table($buildSql2)->alias('t1')
            ->field('t1.*,
            (t1.liangfang_num+5*t1.qiandan_num+0.1*t1.haoping_num+0.1*t1.wanzhengdu) as order_fenshu,(t1.haoping_num/t1.ping_num) as haopinglv,
              case
            when t1.on = 2 and t1.fake=0 then 1
            when t1.on <> 2 and t1.fake=0  then 2
            else 3 end paixu
            ')
            ->order('paixu,t1.fake,order_fenshu desc,t1.register_time')
            ->limit($pagesize.",".$pageRow)
            ->select();
       
        return array("result"=>$result);
    }

    /**
     * 获取综合排行
     * @param string $condition
     * @param int $pagesize
     * @param int $pageRow
     * @return array
     */
    public function getShiliList($condition='',$pagesize= 1,$pageRow = 10){
        $map["classid"] = array("EQ",3);
        $map['a.qc'] = array('exp', 'IS NOT NULL');
        $map['a.qc'] = array('NEQ', '');
        if(!empty($condition['cs'])){
            $map["cs"] = array("EQ",$condition['cs']);
        }

        if(!empty($condition['keyword'])){
            $map['qc']  = array('LIKE','%'.$condition['keyword'].'%');
        }
        //认证
        if(!empty($condition['vip'])){
            $map["on"] = array("EQ",2);
            //$map['fake'] = array('EQ',0);
        }
        if(!empty($condition['fw'])){
            $fw = $condition['fw'];
            $map["_string"] = "a.qx = $fw";
        }
        if(!empty($condition['fg'])){
            $fg = $condition['fg'];
            $map["_string"] = "FIND_IN_SET($fg,q.fengge)";
        }
        if(!empty($condition['bz'])){
            $bz = $condition['bz'];
            $map["_string"] = "FIND_IN_SET($bz,q.baozhang)";
        }

        if(!empty($condition['gm'])){
            $map["q.guimo"] = array("EQ",$condition['gm']);
        }

        if(!empty($condition['comids'])){
            $map['q.userid'] = array('in', $condition['comids']);
        }

        if(!empty($condition['comid'])){
            $map['q.userid'] = array('not in', $condition['comid']);
        }

        $isSale = !empty($condition['sale']) ? "AND a.sales_count > '0'  " : '';
        if (!empty($condition['sale'])) {
            //点击优惠时 筛除假会员
            $map['a.on'] = array('eq', 2);
            $map['q.fake'] = array('eq', 0);
        }

        //获取前30天数据
        $rand_time  = $this->getlastthirtyDays();
        $start_time = $rand_time["start"];
        $end_time = $rand_time["end"];

        $Db = M('user');
        $build = $Db->where($map)->alias("a")
            ->field("a.`id`,a.on,a.qc,a.pv,a.uv,a.cs,a.logo,a.uptime,a.info_time,a.case_count,q.team_count,q.comment_count,q.comment_score,q.fake,a.sales_count,a.activte_score,e.bm,q.id as comid,a.dz,q.img,a.register_time,e.cname as cityname,z.qz_area as area_name")
            ->join("INNER JOIN qz_user_company as q on q.userid = a.id $isSale ")
            ->join("INNER JOIN qz_quyu as e on e.cid = a.cs")
            ->join("LEFT JOIN qz_area as z on a.qx = z.qz_areaid")
            ->buildSql();

        $buildSql = $Db->table($build)->alias('t11')
            ->field('t11.*,count(c.id) as team_num')
            ->join("LEFT JOIN qz_cases as c on c.uid=t11.id and c.isdelete in(1,3) and c.on=1 and c.classid=3")
            ->group('t11.id')
            ->buildSql();


        //1*量房数+5*签单数+0.1*案例数+0.2*团队人数+0.2*好评数+0.5*问答回答数
        $buildSql1 = $Db->table($buildSql)->alias('t')
            ->field('t.*, uc1.liangfang,uc1.haoping,uc1.qiandan,uc1.casesnum,uc1.answernum ,uc1.designnum,uc1.ping')
            ->join("left join qz_user_company_rank uc1 on uc1.comid = t.id and uc1.day between '".$start_time."' and  '".$end_time."'")
            ->order("day desc")
            ->buildSql();

        $buildSql2 =  $Db->table($buildSql1)->alias('t2')
            ->field('t2.*,sum(t2.liangfang) as liangfang_num,t2.haoping as haoping_num,t2.ping as ping_num,sum(t2.qiandan) as qiandan_num,t2.casesnum as cases_num,t2.answernum as answer_num')
            ->group('t2.id')
            ->buildSql();



        $result = $Db->table($buildSql2)->alias('t1')
            ->field('
            t1.*,
            (t1.liangfang_num+5*t1.qiandan_num+0.1*t1.cases_num+0.2*t1.designnum+0.2*t1.haoping_num+0.5*t1.answer_num) as order_fenshu,(t1.haoping_num/t1.ping_num) as haopinglv,
            case
            when t1.on = 2 and t1.fake=0 then 1
            when t1.on <> 2 and t1.fake=0  then 2
            else 3 end paixu
            ')
            ->order('paixu,t1.fake,order_fenshu desc,t1.register_time')
            ->limit($pagesize.",".$pageRow)
            ->select();
        return array("result"=>$result);
    }

    /**
     * 获取量房排行
     * @param string $condition
     * @param int $pagesize
     * @param int $pageRow
     * @return array
     */
    public function getLiangfangList($condition='',$pagesize= 1,$pageRow = 10){
        $map["classid"] = array("EQ",3);
        $map['a.qc'] = array('exp', 'IS NOT NULL');
        $map['a.qc'] = array('NEQ', '');
        if(!empty($condition['cs'])){
            $map["cs"] = array("EQ",$condition['cs']);

        }

        if(!empty($condition['keyword'])){
            $map['qc']  = array('LIKE','%'.$condition['keyword'].'%');
        }
        //认证
        if(!empty($condition['vip'])){
            $map["on"] = array("EQ",2);
            //$map['fake'] = array('EQ',0);
        }
        if(!empty($condition['fw'])){
            $fw = $condition['fw'];
            $map["_string"] = "a.qx = $fw";
        }
        if(!empty($condition['fg'])){
            $fg = $condition['fg'];
            $map["_string"] = "FIND_IN_SET($fg,q.fengge)";
        }
        if(!empty($condition['bz'])){
            $bz = $condition['bz'];
            $map["_string"] = "FIND_IN_SET($bz,q.baozhang)";
        }

        if(!empty($condition['gm'])){
            $map["q.guimo"] = array("EQ",$condition['gm']);
        }

        if(!empty($condition['comids'])){
            $map['q.userid'] = array('in', $condition['comids']);
        }

        if(!empty($condition['comid'])){
            $map['q.userid'] = array('not in', $condition['comid']);
        }

        $isSale = !empty($condition['sale']) ? "AND a.sales_count > '0'  " : '';
        if (!empty($condition['sale'])) {
            //点击优惠时 筛除假会员
            $map['a.on'] = array('eq', 2);
            $map['q.fake'] = array('eq', 0);
        }

        $Db = M('user');
        $buildSql = $Db->where($map)->alias("a")
            ->field("a.`id`,a.on,a.qc,a.pv,a.uv,a.cs,a.logo,a.uptime,a.info_time,a.case_count,q.team_count,q.comment_count,q.comment_score,q.fake,a.sales_count,a.activte_score,e.bm,q.id as comid,a.dz,q.team_num,q.img,a.register_time,e.cname as cityname,z.qz_area as area_name")
            ->join("INNER JOIN qz_user_company as q on q.userid = a.id $isSale ")
            ->join("INNER JOIN qz_quyu as e on e.cid = a.cs")
            ->join("LEFT JOIN qz_area as z on a.qx = z.qz_areaid")
            ->buildSql();
        //先按照【量房时间排序，最新量房放最上面】再【店铺创建时间】
        $buildSql1 = $Db->table($buildSql)->alias('t')
            ->field('t.*,cr.time as liangfang_time,o.xiaoqu as liangfang_xiaoqu')
            ->join("left join qz_order_company_review cr on cr.comid = t.id and cr.status=1")
            ->join("left join qz_orders o on o.id = cr.orderid")
            ->order('cr.time desc')
            ->buildSql();

        $buildSql2 = $Db->table($buildSql1)->alias('t1')
            ->group("t1.comid")
            ->buildSql();

        $result = $Db->table($buildSql2)->alias('t2')
            ->field('
            t2.*,
            case
            when t2.on = 2 and t2.fake=0 then 1
            when t2.on <> 2 and t2.fake=0  then 2
            else 3 end paixu
            ')
            ->order('paixu,liangfang_time desc,t2.register_time')
            ->limit($pagesize.",".$pageRow)
            ->select();

        return array("result"=>$result);
    }

    /**
     * 获取签单排行
     * @param string $condition
     * @param int $pagesize
     * @param int $pageRow
     * @return array
     */
    public function getQiandanList($condition='',$pagesize= 1,$pageRow = 10){
        $map["classid"] = array("EQ",3);
        $map['a.qc'] = array('exp', 'IS NOT NULL');
        $map['a.qc'] = array('NEQ', '');
        if(!empty($condition['cs'])){
            $map["cs"] = array("EQ",$condition['cs']);
        }

        if(!empty($condition['keyword'])){
            $map['qc']  = array('LIKE','%'.$condition['keyword'].'%');
        }
        //认证
        if(!empty($condition['vip'])){
            $map["on"] = array("EQ",2);
            //$map['fake'] = array('EQ',0);
        }
        if(!empty($condition['fw'])){
            $fw = $condition['fw'];
            $map["_string"] = "a.qx = $fw";
        }
        if(!empty($condition['fg'])){
            $fg = $condition['fg'];
            $map["_string"] = "FIND_IN_SET($fg,q.fengge)";
        }
        if(!empty($condition['bz'])){
            $bz = $condition['bz'];
            $map["_string"] = "FIND_IN_SET($bz,q.baozhang)";
        }

        if(!empty($condition['gm'])){
            $map["q.guimo"] = array("EQ",$condition['gm']);
        }

        if(!empty($condition['comids'])){
            $map['q.userid'] = array('in', $condition['comids']);
        }

        if(!empty($condition['comid'])){
            $map['q.userid'] = array('not in', $condition['comid']);
        }

        $isSale = !empty($condition['sale']) ? "AND a.sales_count > '0'  " : '';
        if (!empty($condition['sale'])) {
            //点击优惠时 筛除假会员
            $map['a.on'] = array('eq', 2);
            $map['q.fake'] = array('eq', 0);
        }

        $Db = M('user');
        $build = $Db->where($map)->alias("a")
            ->field("a.`id`,a.on,a.qc,a.pv,a.uv,a.cs,a.logo,a.uptime,a.info_time,a.case_count,q.team_count,q.comment_count,q.comment_score,q.fake,a.sales_count,a.activte_score,e.bm,q.id as comid,a.dz,q.img,a.register_time,e.cname as cityname,z.qz_area as area_name")
            ->join("INNER JOIN qz_user_company as q on q.userid = a.id $isSale ")
            ->join("INNER JOIN qz_quyu as e on e.cid = a.cs")
            ->join("LEFT JOIN qz_area as z on a.qx = z.qz_areaid")
            ->buildSql();

        $buildSql = $Db->table($build)->alias('t11')
            ->field('t11.*,count(c.id) as team_num')
            ->join("LEFT JOIN qz_cases as c on c.uid=t11.id and c.isdelete in(1,3) and c.on=1 and c.classid=3")
            ->group('t11.id')
            ->buildSql();

        $buildSql1 = $Db->table($buildSql)->alias('t')
            ->field('t.*,o.qiandan_addtime,o.xiaoqu')
            ->join("left join qz_orders o on o.qiandan_companyid = t.id and o.qiandan_status=1")
            ->order("o.qiandan_addtime desc")
            ->buildSql();
       // 先按照【签单时间排序，最新签单放最上面】再【店铺创建时间】
        $buildSql2 = $Db->table($buildSql1)->alias('t1')
            ->group('t1.id')
            ->buildSql();

        $result = $Db->table($buildSql2)->alias('t2')
            ->field('
            t2.*,
            case
            when t2.on = 2 and t2.fake=0 then 1
            when t2.on <> 2 and t2.fake=0  then 2
            else 3 end paixu
            ')
            ->order('paixu,qiandan_addtime desc,t2.register_time')
            ->limit($pagesize.",".$pageRow)
            ->select();

        return array("result"=>$result);
    }

    public function getlastthirtyDays(){
        $firstday=date('Y-m-d',strtotime("-1 month"));
        $lastday=date('Y-m-d');
        return ['start'=>$firstday,'end'=>$lastday];
    }

    public function getCompanys($map=[],$order_by='id desc'){
        return M('user')->alias("a")
            ->field("a.id,a.case_count,a.qc")
            ->where($map)
            ->order($order_by)
            ->select();
    }

    /**
     * 获取用户信息列表数量
     * @param  string $keyword [关键字]
     * @param  string $cs      [所在城市]
     * @return [type]          [description]
     */
    public function getCompanyCount($condition){

        $map["classid"] = array("EQ",3);

        if(!empty($condition['cs'])){
            $map["cs"] = array("EQ",$condition['cs']);
        }
        if(!empty($condition['keyword'])){
            $map['qc']  = array('LIKE','%'.$condition['keyword'].'%');
        }
        //认证
        if(!empty($condition['vip'])){
            $map["on"] = array("EQ",2);
            $map['fake'] = array('EQ',0);
        }
        if(!empty($condition['fw'])){
            $fw = $condition['fw'];
            $map["_string"] = "a.qx = $fw";
        }
        if(!empty($condition['fg'])){
            $fg = $condition['fg'];
            $map["_string"] = "FIND_IN_SET($fg,q.fengge)";
        }
        if(!empty($condition['bz'])){
            $bz = $condition['bz'];
            $map["_string"] = "FIND_IN_SET($bz,q.baozhang)";
        }
        if(!empty($condition['gm'])){
            $map["q.guimo"] = array("EQ",$condition['gm']);
        }

        $isSale = !empty($condition['sale']) ? "AND a.sales_count > '0'  " : '';

        $result = M('user')->where($map)->alias("a")
                    ->field("a.`id`,a.on,a.qc,a.pv,a.uv,a.cs,a.logo,a.uptime,a.info_time,a.case_count,q.team_count,q.comment_count,q.comment_score,q.fake,a.sales_count")
                    ->join("INNER JOIN qz_user_company as q on q.userid = a.id $isSale ")
                    ->count();

        return $result;
    }

    //取最新优惠活动
    public function getSaleInfo($row='5',$cityid = ''){
        if(!empty($cityid)){
            $map["cs"] = array("EQ",$cityid);
        }
        $map['type'] = '1';
        //$map['time'] = array('EGT',strtotime(date('Y-m-d',time()))  - 86400 * 30); //30天内的装修公司活动
        $buildSql = M('info')->field('id,title,cs')->order('time DESC')->limit("0,".$row)->where($map)->buildSql();
        $result = M('info')->table($buildSql)->alias("t")
                    ->field("t.*,q.bm")
                    ->join("LEFT JOIN qz_quyu as q on q.cid = t.cs")
                    ->select();
        return $result;
    }

    // rank取整
    public function getIntData($data){
        if(empty($data) || !isset($data)){
            return false;
        }
        foreach ($data as $key => $val) {
            $data[$key]['rank'] = $val['rank']?(int)$val['rank']:'0';
        }
        return $data;
    }

}