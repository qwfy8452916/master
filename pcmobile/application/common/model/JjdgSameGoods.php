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
    public function goods()
    {
        return $this->belongsTo('JjdgGoods','same_goods_code','code')->where(['is_del' => 2,'on_sale' => 1]);
    }


}