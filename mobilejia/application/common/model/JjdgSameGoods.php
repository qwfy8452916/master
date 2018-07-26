<?php
// +----------------------------------------------------------------------
// | JjdgOpreateLog 相关商品
// +----------------------------------------------------------------------
// | Author: 2851986856@qq.com
// +----------------------------------------------------------------------

namespace app\common\model;

use think\Model;

class JjdgSameGoods extends Model
{
    protected $autoWriteTimestamp = false;
    public function goodsImgs()
    {
        return $this->hasMany('JjdgGoodsImgs', 'same_goods_code');
    }

}