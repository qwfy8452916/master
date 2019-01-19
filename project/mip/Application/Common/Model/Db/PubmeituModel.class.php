<?php
/**
 *  公装美图DB层
 */

namespace Common\Model\Db;

use Think\Model;

class PubmeituModel extends Model
{
    /**
     * 获取公装美图数量
     */
    public function getPubMeituCount($map)
    {
        return M("pubmeitu")->where($map)->count();
    }

    /**
     * 获取公装美图列表
     */
    public function getPubMeituList($map, $limitFirst, $pageSize, $order)
    {
        //1.查询美图的基本信息
        $buildSql = M("pubmeitu")->where($map)->order($order)
            ->limit($limitFirst . "," . $pageSize)
            ->buildSql();

        //2.查询美图的其他信息
        $buildSql = M("pubmeitu")->table($buildSql)->alias("a")
            ->join("INNER JOIN qz_pubmeitu_att as b on find_in_set(b.id,a.location)")
            ->field("a.*,GROUP_CONCAT(b.name) as wz")
            ->group("a.id")
            ->buildSql();

        $buildSql = M("pubmeitu")->table($buildSql)->alias("a")
            ->join("INNER JOIN qz_pubmeitu_att as c on find_in_set(c.id,a.fengge) ")
            ->field("a.*,GROUP_CONCAT(c.name) as fg")
            ->group("a.id")
            ->buildSql();

        $buildSql = M("pubmeitu")->table($buildSql)->alias("a")
            ->join("INNER JOIN qz_pubmeitu_att as d on find_in_set(d.id,a.mianji) ")
            ->field("a.*,GROUP_CONCAT(d.name) as mj")
            ->group("a.id")
            ->buildSql();
        $buildSql = M("pubmeitu")->table($buildSql)->alias("a")->order("a.id desc")->buildSql();

        //3.获取美图图片信息
        $buildSql = M("pubmeitu")->table($buildSql)->alias("t")
            ->join("INNER JOIN qz_pubmeitu_img as f on f.caseid = t.id")
            ->field("t.*,f.img_path,f.img_host,f.img_on,f.px")
            ->buildSql();
        $buildSql = M("pubmeitu")->table($buildSql)->alias("t1")
            ->group("t1.id")
            ->order("img_on desc,px")
            ->buildSql();
        return M("pubmeitu")->table($buildSql)->alias("t1")->order("t1.id desc")->select();

    }
}