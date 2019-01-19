<?php

/**
 * 装修公司列表页
 */

namespace Common\Model;
use Think\Model;

class CompanyModel extends Model{

    protected $autoCheckFields = false;


    public function getList($condition='',$pagesize= 1,$pageRow = 10, $keyword='', $classid=3){
        $map["classid"] = array("EQ",3);

        //如果是装修公司根据关键字查询公司全称,否则根据用户昵称查询
        if(!empty($keyword)){
            if($classid == 3){
                $map["qc"] = array("LIKE","%$keyword%");
            }else{
                $map["name"] = array("LIKE","%$keyword%");
            }
        }

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
                    ->field("a.`id`,a.on,a.qc,a.pv,a.uv,a.cs,a.logo,a.uptime,a.info_time,a.case_count,q.team_count,q.comment_count,q.comment_score,q.fake,a.sales_count,a.activte_score,e.bm,q.id as comid,.a.dz,q.team_num,q.img")
                    ->join("INNER JOIN qz_user_company as q on q.userid = a.id $isSale ")
                    ->join("INNER JOIN qz_quyu as e on e.cid = a.cs")
                    ->order("`on` desc,q.fake,".$orderby." desc")
                    ->limit($pagesize.",".$pageRow)
                    ->select();
        return array("result"=>$result);
    }

    /**
     * 获取用户信息列表数量
     * @param  string $keyword [关键字]
     * @param  string $cs      [所在城市]
     * @return [type]          [description]
     */
    public function getCompanyCount($condition, $keyword=''){

        $map["classid"] = array("EQ",3);

        if(!empty($keyword)) {
            $map["qc"] = array("LIKE", "%$keyword%");
        }

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

    //获取优惠券
    public function getSpecialCardById($comid){
        if(!$comid){
            return array();
        }
        $map = [];
        $map['b.com_id'] = array('EQ',$comid);
        $map['c.start'] = array('ELT',time());
        $map['c.end'] = array('EGT',time());
        $map['c.check'] = array('EQ',2);
        $map['c.apply_state'] = array('EQ',1);
//        $map['a.enable'] = array('EQ',1);
        $map['_string'] = '(a.enable =1 or (a.enable = 2 and a.disable_time >'.time().'))'; //未禁用或禁用时间未到

        $list = M('card_com')->alias('b')
            ->field('a.id,a.`name`')
            ->where($map)
            ->join('qz_card a on a.id = b.card_id')
            ->join('qz_card_com_record c on c.card_com_id = b.id')
            ->order('c.apply_time desc')
            ->limit(2)
            ->select();
        return $list ? $list : array();
    }


    /**
     * getCardInfoById  根据优惠券id获取优惠券信息
     * @param $map
     */
    public function getCardInfoById($map){
        return M('card_com')->alias('b')
            ->where($map)
            ->field('a.id,a.`name`,a.money1,a.money2,a.service,a.add_time,a.`rule`,a.module,a.`enable`,c.activity_start,c.activity_end,c.`start`,c.`end`,c.amount,c.`check`,c.apply_state,c.check_reason')
            ->join('qz_card a on a.id = b.card_id')
            ->join('qz_card_com_record c on c.card_com_id = b.id')
            ->find();
    }

    /**
     * 根据公司id获取公司正在使用的礼券总数量
     * @param $comid
     */
    public function getSpecialCardCountById($comid){
        if(!$comid){
            return 0;
        }
        $map = [];
        $map['b.com_id'] = array('EQ',$comid);
        $map['c.start'] = array('ELT',time());
        $map['c.end'] = array('EGT',time());
        $map['c.check'] = array('EQ',2);
        $map['c.apply_state'] = array('EQ',1);
//        $map['a.enable'] = array('EQ',1);
        $map['_string'] = '(a.enable =1 or (a.enable = 2 and a.disable_time >'.time().'))'; //未禁用或禁用时间未到

        $count = M('card_com')->alias('b')
            ->field('a.id,a.`name`')
            ->where($map)
            ->join('qz_card a on a.id = b.card_id')
            ->join('qz_card_com_record c on c.card_com_id = b.id')
            ->order('c.apply_time desc')
            ->count();
        return $count ? $count : 0;

    }


    /**
     * getMoreCompanyData  获取假会员数据
     * @param $neednum   需要的数据数量
     * @param $cityid    城市
     */
    public function getMoreCompanyData($neednum,$cityid){
        $map = [];
        $map['u.on'] = array('EQ',2);
        $map['u.classid'] = array('EQ',3);
        $map['c.fake'] = array('EQ',1);
        if($cityid){
            $map['u.cs'] = array('EQ',$cityid);
        }

        $buildSql = M('user')->alias('u')
            ->where($map)
            ->field('u.id,u.`user`,round(r.ping/r.haoping,2) hpl,r.`day`,u.cs,u.jc,u.logo')
            ->join('left join qz_user_company c on c.userid = u.id')
            ->join('qz_user_company_rank r on r.comid = u.id')
            ->group('u.id')
            ->buildSql();
        $list =  M('user')->table($buildSql)->alias('t')
            ->field('t.*,count(a.id) casenum')
            ->join('qz_cases  a on a.uid = t.id')
            ->group('t.id')
            ->order('t.hpl desc,casenum desc')
            ->limit($neednum)
            ->select();
        return $list;
    }


}