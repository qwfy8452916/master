<?php

/**
 * 主站装修公司
 */

namespace Common\Model;
use Think\Model;

class CompanyModel extends Model{

    protected $autoCheckFields = false;

    //装修公司信赖榜 取最近一个月评论榜
    public function getTrustTop($cityid,$limit){

        !empty($cityid) && $map['u.cs'] = array('eq',$cityid);

        $monthtime = strtotime(date('Y-m-d',time()))  - 86400 * 30;
        $map['u.classid'] = array('eq',3);
        $map['u.on'] = array('eq',2);

        $buildSql = M('user')->alias("u")
                        ->field('u.id,u.jc,u.qc,u.logo,u.case_count,q.bm,p.fake,p.comment_score,p.comment_count')
                        ->join("inner join qz_quyu as q on u.cs = q.cid ")
                        ->join("inner join qz_user_company as p on u.id = p.userid")
                        ->order('p.comment_score+0 DESC,comment_count DESC')
                        ->limit("0,15")
                        ->where($map)
                        ->buildSql();

        return M("user")->table($buildSql)->alias("t1")
                                ->field('t1.*,count(c.id) as ccount')
                                ->join("LEFT join qz_comment as c on t1.id = c.comid and c.time >= '$monthtime' ")
                                ->group('t1.id')
                                ->order('fake ASC,comment_score+0 DESC,ccount DESC,comment_count DESC')
                                ->limit("0,".$limit)
                                ->select();
    }


    //获取装修公司活跃度排行
    public function getActiveCompany($cs,$num = 5){
        $map['a.on'] = array("EQ",2);
        //$map['b.fake'] = array("EQ",0);

        !empty($cs) && $map['a.cs'] = array('eq',$cs);

        return M("user")->where($map)->alias("a")
                 ->join("LEFT JOIN qz_user_company as b on b.userid = a.id")
                 ->join("LEFT JOIN qz_quyu as q on a.cs = q.cid " )
                 ->field("a.id,a.qc,a.jc,a.logo,a.activte_score,a.case_count,b.comment_score,q.bm")
                 ->order('activte_score DESC')
                 ->limit("0,".$num)
                 ->select();
    }


    //装修公司热心回答排行榜
    public function getAskTopUser($limit=6){

        return M('user')->alias("u")
                ->field('u.id,u.name,u.jc,u.qc,u.logo,u.ask_anwsers,u.activte_score,u.case_count,q.bm,b.comment_score')
                ->join("inner join qz_quyu as q on u.cs = q.cid ")
                ->join("LEFT JOIN qz_user_company as b on b.userid = u.id")
                ->order('u.ask_anwsers DESC')
                ->limit("0,".$limit)
                ->where('u.classid = 3')
                ->select();
    }

    /**
     * 获取案例信息
     *
     * @return     <type>  The case.
     *
     *
     *
     */
    public function getCases($number){

        //$time = strtotime(date('Y-m-d',time()))  - 86400 * 90;
        $map = array(
            //"time" => array('EGT',$time)
        );

        //1.查询最新的案例信息
        $buildSql = M("cases")->field("id,title,huxing,mianji as zarea,fengge,zaojia,time,uid,cs")
                              ->where($map)
                              ->order("usort DESC, id desc")
                              ->limit("0,".$number)
                              ->buildSql();

        //2.查询案例相关的图片信息
        $buildSql = M("cases")->table($buildSql)->alias("a")
                              ->join("INNER JOIN qz_case_img as b on a.id = b.caseid AND b.status < 3")
                              ->field("a.*,b.img_path as src,b.img,b.img_host,b.img_on")
                              ->order("a.id desc,b.img_on desc")
                              ->buildSql();

        //3.查询案例封面图片
        $buildSql = M("cases")->table($buildSql)->alias("t")
                               ->group("t.id ")
                               ->order("t.id desc")
                               ->buildSql();

        return  M("cases")->table($buildSql." as t1")
                              ->join("LEFT JOIN qz_fengge as c on c.id = t1.fengge")
                              ->join("LEFT JOIN qz_jiage as d on d.id = t1.zaojia")
                              ->join("LEFT JOIN qz_user as  e on e.id = t1.uid")
                              ->join("LEFT JOIN qz_quyu as  f on f.cid = e.cs")
                              ->field("t1.*,c.name as zstyle,d.name as zcost,e.jc as writer,f.bm")
                              ->select();
    }

    /**
    * 全国装修公司活跃度排行(上个月的数据排行)
    */
    public function getCompanyActiveRank($cs,$num = 5){
        !empty($cs) && $map['a.cs'] = array('eq',$cs);

        $builSql1 = M('user_company_rank')->order("day desc")->buildSql();

        $buildSql =  M('user_company_rank')->table($builSql1)->alias("r")
                ->where("TO_DAYS(NOW()) - TO_DAYS(r.`day`) <= 30")
                ->field("r.`day`,r.comid,sum(r.liangfang) as liangfang,r.wanzhengdu,sum(r.loginnum) as loginnum,r.answernum as answernum,r.haoping as haoping,r.ping as ping,r.casesnum")
                ->group("comid")
                ->buildSql();

        return M("user")->where($map)->alias("a")
                 ->join("LEFT JOIN qz_user_company as b on b.userid = a.id")
                 ->join("LEFT JOIN qz_quyu as q on a.cs = q.cid " )
                 ->join("INNER JOIN".$buildSql.'as r on r.comid = a.id')
                 ->field("a.id,a.qc,a.jc,a.register_time,a.logo,a.activte_score,a.case_count,((r.haoping / r.ping) *10) as comment_score,q.bm,(1.5 * r.liangfang + 0.1 * r.wanzhengdu + 0.5 * r.loginnum + 0.5 * r.answernum) AS rank,r.haoping,r.ping")
                 ->group('a.id')
                 ->order('rank DESC,register_time')
                 ->limit("0,".$num)
                 ->select();
    }

    /**
     * 全国装修公司口碑排行榜（上个月的数据排行）
     */
    public  function getKoubeiRank($cs,$num=5){
        !empty($cs) && $map['a.cs'] = array('eq',$cs);

        $builSql1 = M('user_company_rank')->order("day desc")->buildSql();

        $buildSql =  M('user_company_rank')->table($builSql1)->alias("r")
                ->where("TO_DAYS(NOW()) - TO_DAYS(r.`day`) <=30")
                ->field("r.`day`,r.comid,sum(r.liangfang) as liangfang,sum(r.qiandan) as qiandan,r.haoping as haoping,r.wanzhengdu,r.ping,r.casesnum")
                ->group("comid")
                ->buildSql();

        return M("user")->where($map)->alias("a")
                 ->join("LEFT JOIN qz_user_company as b on b.userid = a.id")
                 ->join("LEFT JOIN qz_quyu as q on a.cs = q.cid " )
                 ->join("INNER JOIN".$buildSql.'as r on r.comid = a.id')
                 ->field("a.id,a.qc,a.jc,a.register_time,a.logo,a.activte_score,a.case_count,((r.haoping / r.ping) *10) as comment_score,q.bm,(1 * r.liangfang + 5 * r.qiandan + 0.1 * r.haoping + 0.1 * r.wanzhengdu) AS rank,r.haoping,r.ping")
                 ->group('a.id')
                 ->order('rank DESC,register_time')
                 ->limit("0,".$num)
                 ->select();
    }

    /**
     * 处理全国排行数据(活跃度)
     */
    public function changeDataRank($data){
        foreach ($data as $key => $val) {
            $data[$key]['rank'] = $val['rank']?(int)($val['rank']*10):'0';
        }
        return $data;
    }

    /**
     * 处理全国排行数据(口碑值)
     */
    public function changeKouBeiRank($data){
        foreach ($data as $key => $val) {
            $data[$key]['rank'] = $val['rank']?(int)($val['rank']*100):'0';
        }
        return $data;
    }


}