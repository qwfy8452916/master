<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/13
 * Time: 17:01
 */

namespace app\common\model\logic;

use app\common\model\db\HuXing;


class HuXingLogic
{
    /**
     * 获取户型列表
     * author: mcj
     * @return array|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getList()
    {
        return HuXing::where('type', '=', 'huxing')->order('px')->field('id,name')->select();
    }
}