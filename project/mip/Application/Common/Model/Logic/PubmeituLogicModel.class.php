<?php
/**
 *  公装美图逻辑层
 */

namespace Common\Model\Logic;

class PubmeituLogicModel
{
    /**
     * 获取美图列表数量
     * @return [type] [description]
     */
    public function getPubMeiTuCount($location = "", $fengge = "", $mianji = "", $keyword = '', $is_single = '99')
    {
        if (!empty($location)) {
            $complex[] = "find_in_set($location,location)";
        }
        if (!empty($fengge)) {
            $complex[] = "find_in_set($fengge,fengge)";
        }
        if (!empty($mianji)) {
            $complex[] = "find_in_set($mianji,mianji)";
        }

        if (!empty($complex)) {
            $map["_complex"] = $complex;
        }

        if (!empty($keyword)) {
            $map["title"] = array("LIKE", "%" . $keyword . "%");
        }

        if ('99' != $is_single) {
            $map["is_single"] = array("EQ", $is_single);
        }

        $map["visible"] = array("EQ", 0);

        $result = D("Common/Db/Pubmeitu")->getPubMeituCount($map);
        return $result;
    }


    /**
     * 获取美图列表
     * @return [type] [description]
     */
    public function getPubMeiTuList($pageIndex, $pageCount, $location = "", $fengge = "", $mianji = "", $order, $is_single = '99')
    {
        if (!empty($location)) {
            $complex[] = "find_in_set($location,location)";
        }
        if (!empty($fengge)) {
            $complex[] = "find_in_set($fengge,fengge)";
        }

        if (!empty($mianji)) {
            $complex[] = "find_in_set($mianji,mianji)";
        }

        if (!empty($complex)) {
            $map["_complex"] = $complex;
        }

        if (empty($order)) {
            $order = 'id desc';
        }

        if ('99' != $is_single) {
            $map["is_single"] = array("EQ", $is_single);
        }

        $map["visible"] = array("EQ", 0);

        $result = D("Common/Db/pubmeitu")->getPubMeituList($map, $pageIndex, $pageCount, $order);
        return $result;
    }
}