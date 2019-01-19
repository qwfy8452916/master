<?php

//城市会员

namespace Home\Model;
Use Think\Model;

class CityvipModel extends Model{

    protected $autoCheckFields = false;

    //取城市会员数
    public function getCityVipCount(){
        $buildSql = M("user")->alias("a")
                            ->field("a.cs,sum(if(a.on = 2,b.viptype,null)) as vipcnt,sum(if(b.viptype > 1,(b.viptype-1),null)) as doublecnt,count(if(a.on = 2,a.id,null)) as vipnum,count(if(a.on = 2 and (b.viptype > 1),1,null )) as mulitnum,count(if(a.on = 2 and (b.viptype =0.5),1,null )) as halfnum")
                            ->join("inner join qz_user_company b on a.id = b.userid WHERE (a.classid = 3) AND (b.fake = 0) AND (a.on = '2' )")
                            ->group('a.cs')
                            ->order("vipcnt desc")
                            ->buildSql();

        return M()->table($buildSql)
                ->field('t.*,c.cname,c.manager,c.bm')
                ->alias("t")
                ->join("left join qz_quyu as c on c.cid = t.cs")
                ->order("vipcnt desc,bm")
                ->select();
    }





}

