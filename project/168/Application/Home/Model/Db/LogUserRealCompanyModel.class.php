<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/9/5
 * Time: 16:27
 */

/**
 * 每日真会员记录模块
 */

namespace Home\Model\Db;
Use Think\Model;

class LogUserRealCompanyModel extends Model {


    /**
     * 获取 城市平均会员统计  统计个数
     * @param  string $cs 城市id
     * @param  string $begin 开始时间
     * @param  string $begin 结束时间
     * @return mixed
     */
    public function cityAvgVipListCount($cs,$begin,$end) {
        $map = [];
        $beginDate = date('Y-m-d',$begin);
        $endDate = date('Y-m-d',$end);
        $map['ur.time'] = ['BETWEEN',[$beginDate, $endDate]];

        $days = diffBetweenTwoDays($beginDate,$endDate) + 1;

        if (!empty($cs)) {
            $map["ur.city_id"] = array("EQ",$cs);
        }

        $map2['oi.addtime'] = ['BETWEEN',[$begin, $end]];
        //$map2['oi.type_fw'] = ['EQ',1];
        $map2['o.`on`'] = ['EQ',4];
        $map2['o.type_fw'] = ['EQ',1];

        $buildSql = M("log_user_real_company")->where($map)->alias("ur")
            ->join("LEFT JOIN qz_quyu qy ON qy.cid=ur.city_id")
            ->field('qy.cname,ur.city_id,
                      SUM(ur.vip_count)/'. $days .' AS vip_count,
                      SUM(ur.vip_num)/'. $days .' AS vip_num,
                      '. $days .' AS vip_days
                      ')
            // DATE_FORMAT(ur.time,\'%m\') AS vip_month,
            // day(LAST_DAY(ur.time)) AS vip_days
            ->order('city_id')
            ->group('city_id')
            ->buildSql();
        $buildSql1 = M('')->table($buildSql)->alias("vip")->where($map2)
            ->join("LEFT JOIN qz_orders o ON o.cs = vip.city_id")
            ->join("LEFT JOIN qz_order_info oi force INDEX(idx_addtime_type_fw) ON oi.`order` = o.id")
            ->field("vip.cname,
                    round(vip.vip_count,1) AS vip_count,
                    round(vip.vip_num,1) AS vip_num,
                    round(COUNT(DISTINCT o.id),1) AS dd_sum,
                    round(COUNT(o.id),1)  AS fd_sum,
                    round(COUNT(o.id)/vip.vip_num,1) AS fd_avg")
            ->group("vip.city_id")
            // ->limit($pageIndex.",".$pageCount)
            ->order("vip.city_id")
            ->buildSql();

        return M('')->table($buildSql1)->alias("t1")->count();
    }

    /**
     * 获取 城市平均会员统计  列表
     * @param  string $cs 城市id
     * @param  string $begin 开始时间
     * @param  string $begin 结束时间
     * @return mixed
     */
    public function cityAvgVipList($cs, $begin, $end, $pageIndex, $pageCount) {
        $map = [];
        $beginDate = date('Y-m-d',$begin);
        $endDate = date('Y-m-d',$end);
        $map['ur.time'] = ['BETWEEN',[$beginDate, $endDate]];

        $days = diffBetweenTwoDays($beginDate,$endDate) + 1;

        if (!empty($cs)) {
            $map["ur.city_id"] = array("EQ",$cs);
        }

        $map2['oi.addtime'] = ['BETWEEN',[$begin, $end]];
        //$map2['oi.type_fw'] = ['EQ',1];
        $map2['o.`on`'] = ['EQ',4];
        $map2['o.type_fw'] = ['EQ',1];

        $buildSql = M("log_user_real_company")->where($map)->alias("ur")
            ->join("LEFT JOIN qz_quyu qy ON qy.cid=ur.city_id")
            ->field('qy.cname,ur.city_id,
                      SUM(ur.vip_count)/'. $days .' AS vip_count,
                      SUM(ur.vip_num)/'. $days .' AS vip_num,
                      '. $days .' AS vip_days
                      ')
                      // DATE_FORMAT(ur.time,\'%m\') AS vip_month,
                      // day(LAST_DAY(ur.time)) AS vip_days
            ->order('city_id')
            ->group('city_id')
            ->buildSql();
        return M('')->table($buildSql)->alias("vip")->where($map2)
            ->join("LEFT JOIN qz_orders o ON o.cs = vip.city_id")
            ->join("LEFT JOIN qz_order_info oi force INDEX(idx_addtime_type_fw) ON oi.`order` = o.id")
            ->field("vip.cname,
                    round(vip.vip_count,1) AS vip_count,
                    round(vip.vip_num,1) AS vip_num,
                    round(COUNT(DISTINCT o.id),1) AS dd_sum,
                    round(COUNT(o.id),1)  AS fd_sum,
                    round(COUNT(o.id)/vip.vip_num,1) AS fd_avg")
            ->group("vip.city_id")
            ->limit($pageIndex,$pageCount)
            ->order("vip.city_id")
            ->select();
     }

}