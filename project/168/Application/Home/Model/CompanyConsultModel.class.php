<?php
/**
 * 公司入驻咨询信息表
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/22
 * Time: 16:07
 */

namespace Home\Model;

Use Think\Model;

class CompanyConsultModel extends Model
{

    public function selectConsult($where, $order, $skip, $page_size)
    {
        return M("company_consult")->alias("a")
            ->where($where)
            ->field('a.*, b.cname AS city, c.qz_area AS area,d.ip,d.time')
            ->join('LEFT JOIN qz_quyu AS b ON b.cid = a.cs')
            ->join('LEFT JOIN qz_area AS c ON c.qz_areaid = a.qx')
            ->join('LEFT JOIN qz_company_ip_info AS d ON d.id = a.ip_id')
            ->order($order)
            ->limit($skip, $page_size)
            ->select();
    }

    public function countConsult($where)
    {
        return M("company_consult")->alias("a")
            ->where($where)
            ->count();
    }

}