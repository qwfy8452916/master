<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/5/24
 * Time: 14:44
 * 处理商品业务逻辑
 */

namespace app\common\logic;

use app\common\enums\GoodsSortConfig;
use app\common\model\JjdgGoods;
use app\common\model\JjdgGoodsSpecificationsValue;
use app\common\model\JjdgSameGoods;
use think\Cache;
use think\Db;
use think\Model;

class JjdgGoodsLogic extends Model
{

    public function goodsFilterCount($map = [])
    {
        $condition = $this->getFilterMap($map);
        return $this->getListByWhereCount($condition['where'], $condition['find']);
    }

    public function getFilterMap($map = [])
    {
        $where = [];
        if (!empty($map['top_cate_id'])) {
            $where['g.top_cate_id'] = $map['top_cate_id'];
        }
        if (!empty($map['sub_cate_id'])) {
            $where['g.sub_cate_id'] = $map['sub_cate_id'];
        }
        //商品属性
        $find = '';
        if (!empty($map['specification_value'])) {
            $find .= '(';
            foreach ($map['specification_value'] as $keys => $va) {
                $find .= "FIND_IN_SET('$va',spec_values)";
                if (isset($map['specification_value'][$keys + 1])) {
                    $find .= 'AND ';
                }
            }
            $find .= ')';
        }
        if (!empty($map['keywords'])) {
            $where['g.title|g.keywords'] = ['like', "%{$map['keywords']}%"];
        }
        return ['where' => $where, 'find' => $find];
    }

    /**
     * 根据多种负责条件分拣商品
     */
    public function goodsFilter($map, $order = [], $p = 1, $p_size = 40, $user = null)
    {
        $with = [
            'goodsImgs',
            'goodsSubCate' => function ($query) {
                $query->field('id,short_name');
            }
        ];
        if ($user) {
            $with = [
                'goodsImgs',
                'collection' => function ($query) use ($user) {
                    $query->where(['user_id' => $user['id']]);
                },
            ];
        }
        $condition = $this->getFilterMap($map);
        //排序
        if (empty($order['order_by'])) {
            $order['order_by'] = GoodsSortConfig::MULTIPLE;
        }
        switch ($order['order_by']) {
            case GoodsSortConfig::VOLUME_DESC:
                $order_by = 'volume desc'; //销量递减
                break;
            case GoodsSortConfig::ZK_FINAL_PRICE_ASC:
                $order_by = 'zk_final_price asc'; //单价递增
                break;
            case GoodsSortConfig::ZK_FINAL_PRICE_DESC:
                $order_by = 'zk_final_price desc'; //单价递减
                break;
            case GoodsSortConfig::VOLUME_ASC:
                $order_by = 'volume asc'; //销量递增
                break;
            default://综合排序
                return $this->getListByWhereMultipleOrder($condition['where'], $with, $p, $p_size, $condition['find']);
                break;
        }
        return $this->getListByWhere($condition['where'], $order_by, $with, $p, $p_size, $condition['find']);
    }


    public function getListByWhereMultipleOrder($map = [], $with = [], $p = 1, $p_size = 10, $find = '')
    {
        $data = $this->getMultipleOrderRule();
        $multiple_sql = '(g.avg_score*20+g.views*100/' . $data['max_view_num'] . '+volume*100/' . $data['max_sale_num'] . ') as multiple';
        $condition = array_merge($map, ['g.is_del' => 2, 'g.on_sale' => 1]);
        $collect_sql = model('JjdgGoodsCollection')
            ->field('goods_code,count(user_id) as collect_num')
            ->group('goods_code')
            ->buildSql();
        $buildSql = model('JjdgGoods')->alias('g')
            ->where($condition)
            ->join('jjdg_goods_specification_relationship gs', 'g.`code` = gs.goods_code', 'LEFT')
            ->join([$collect_sql => 'c'], 'g.code = c.goods_code', 'LEFT')
            ->field('g.*,c.collect_num,GROUP_CONCAT(gs.goods_specifications_value_id SEPARATOR \',\') as spec_values,' . $multiple_sql)
            ->group('g.`code`')
            ->buildSql();
        $list = model('JjdgGoods')
            ->table($buildSql)
            ->alias('g')
            ->where($condition)
            ->where($find)
            ->with($with)
            ->order('g.multiple desc')
            ->page($p, $p_size)
            ->select();
        return $list;
    }

    public function getListByWhereMultipleOrderSample($map = [], $with = [], $p = 1, $p_size = 10)
    {
        $condition = array_merge($map, ['is_del' => 2, 'on_sale' => 1]);
        $skip = ($p - 1) * $p_size;
        $data = $this->getMultipleOrderRule();
        $multiple_sql = '(avg_score*20+views*100/' . $data['max_view_num'] . '+volume*100/' . $data['max_sale_num'] . ') as multiple';
        $list = JjdgGoods::field('sub_cate_id,expand_link,zk_final_price,has_custom_price,custom_price,code,title,volume,has_custom_score,custom_score,avg_score,describtion,has_custom_collect,custom_collect,' . $multiple_sql)
            ->where($condition)
            ->order('multiple desc')
            ->with($with)
            ->limit($skip, $p_size)
            ->select();
        return $list;
    }


    public function getMultipleOrderRule()
    {
        $max_sale_num = 1;
        $max_sale = JjdgGoods::field('volume')->where(['is_del' => 2])->order('volume desc')->find();
        if (!empty($max_sale)) {
            $max_sale_num = empty($max_sale->volume) ? 1 : $max_sale->volume;
        }
        $max_view_num = 1;
        $max_view = JjdgGoods::field('views')->where(['is_del' => 2])->order('views desc')->find();
        if (!empty($max_view)) {
            $max_view_num = empty($max_view->views) ? 1 : $max_view->views;
        }
        return ['max_sale_num' => $max_sale_num, 'max_view_num' => $max_view_num];

    }


    public function getPcGoodsDetail($good_code)
    {
        $where = ['code' => $good_code];
        $with = [
            'goodsImgs',
            'goodsSpecificationsValue' => [
                'specifications' => function ($query) {
                    $query->field('id,name,pid');
                },
            ],
        ];
        $with_count = ['collection'];
        return $this->getGoodsDetail($where, $with, $with_count);
    }

    public function getTogetherGoods($good_code)
    {
        return JjdgSameGoods::where(['goods_code' => $good_code])
            ->order(['id' => 'desc'])
            ->with(['goods' => ['goodsImgs', 'goodsSubCate']])
            ->select();

    }

    public function getMGoodsDetail($good_code)
    {
        $where = ['code' => $good_code];
        $with = [
            'goodsImgs',
            'goodsSubCate',
            'goodsSpecificationsValue' => [
                'specifications' => function ($query) {
                    $query->field('id,name,pid');
                },
            ],
            'sameGoodsInfo' => ['goodsImgs', 'goodsSubCate'],
        ];
        return $this->getGoodsDetail($where, $with);
    }

    /**
     * 商品详情
     * @param $good_code
     * @return array|false|\PDOStatement|string|Model
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getGoodsDetail($where = [], $with = [], $with_count = [])
    {
        $condition = array_merge($where, ['is_del' => 2, 'on_sale' => 1]);
        $goods = JjdgGoods::where($condition)
            ->field('code,views,avg_score,describtion,volume,has_detail,expand_link,detail,expand_link,zk_final_price,has_custom_score,custom_score,has_custom_collect,custom_collect,title,buy_num,top_cate_id,sub_cate_id')
            ->with($with)
            ->withCount($with_count)
            ->find();
        return $goods;
    }


    public function getGoodsProfile($good_code)
    {
        $where = ['is_del' => 2, 'code' => $good_code];
        $goods = JjdgGoods::where($where)
            ->field('code,describtion,volume,has_detail,expand_link,detail,expand_link,zk_final_price,has_custom_score,custom_score,title,buy_num')
            ->find();
        return $goods;
    }

    public function specificationsFormat($specifications_obj)
    {
        $data = [];
        if ($specifications_obj) {
            foreach ($specifications_obj as $v) {
                $data[$v->specifications->getAttr('id')]['id'] = $v->specifications->getAttr('id');
                $data[$v->specifications->getAttr('id')]['name'] = $v->specifications->getAttr('name');
                $data[$v->specifications->getAttr('id')]['children'][] = ['id' => $v->getAttr('id'), 'name' => $v->getAttr('name')];
            }
        }
        return $data;
    }

    /**
     * 获取今日特价商品10条
     * @return false|mixed|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     *     public function getList($map = [], $with=[],$order = [], $p = 1, $p_size = 10)
     */
    public function getDiscount()
    {
        $discount_goods = Cache::tag('jjdg_goods')->get('discount_goods');
        if ($discount_goods === false) {
            $discount_with = [
                'goodsImgs' => function ($query) {
                    $query->field('img_url,goods_code');
                },
                'goodsSubCate' => function ($query) {
                    $query->field('id,short_name');
                }
            ];
            $discount_goods = $this->getList(['has_custom_price' => 2], $discount_with, ['update_time' => 'desc'], 1, 10);
            Cache::tag('jjdg_goods')->set('discount_goods', $discount_goods);
        }
        return $discount_goods;
    }

    /**获取今日畅销商品10条
     * @return false|mixed|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getBestSelling()
    {
        $best_sell_goods = Cache::tag('jjdg_goods')->get('best_sell_goods');
        if ($best_sell_goods === false) {
            $with = [
                'goodsImgs' => function ($query) {
                    $query->field('img_url,goods_code');
                },
                'goodsSubCate' => function ($query) {
                    $query->field('id,short_name');
                }
            ];
            $best_sell_goods = $this->getList([], $with, ['volume' => 'desc'], 1, 10);
            Cache::tag('jjdg_goods')->set('best_sell_goods', $best_sell_goods);
        }
        return $best_sell_goods;
    }

    /**
     * 根据商品关联表结果查相关推荐
     */
    public function getGoodsRecommend($goods_specifications_value_obj, $code, $sub_cate_id)
    {
        $specifications_value_ids = $this->getSpecificationsvalueIds($goods_specifications_value_obj);
        $same_spe_val_data = $this->getGoodsRecommendBySpeValIds($specifications_value_ids, $code);
        $remove_code = [$code];
        foreach ($same_spe_val_data as $v) {
            $remove_code[] = $v->code;
        }
        $need = 10 - count($same_spe_val_data);
        if ($need > 0) {
            $same_cat_data = $this->getGoodsRecommendBySubCateId($sub_cate_id, $remove_code, $need);
            return array_merge($same_spe_val_data, $same_cat_data);
        } else {
            return $same_spe_val_data;
        }

    }

    /**
     * 根据二级分类查相似商品
     * @param $sub_cate_id
     * @param $remove_code
     * @param $limit
     * @param array $order
     * @return false|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getGoodsRecommendBySubCateId($sub_cate_id, $remove_code, $limit, $order = ['code' => 'desc'])
    {
        $where = [
            'is_del' => 2,
            'on_sale' => 1,
            'code' => ['not in', $remove_code],
            'sub_cate_id' => $sub_cate_id
        ];
        $with = [
            'goodsImgs',
            'goodsSubCate',
        ];
        $goods = JjdgGoods::field('code,title,zk_final_price,sub_cate_id')
            ->where($where)
            ->with($with)
            ->order($order)
            ->limit($limit)
            ->select();
        return $goods;
    }


    /**
     * 根据属性值查询相似商品，按相识度倒叙
     * tp模型不支持hasWhere withCount 联合
     * @param $specifications_value_ids
     * @param $code
     * @return false|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getGoodsRecommendBySpeValIds($specifications_value_ids, $code)
    {
        $specification_where = [
            'goods_specifications_value_id' => [
                'IN',
                $specifications_value_ids,
            ],
        ];

        $specifications_sql = Db::table('qz_jjdg_goods_specification_relationship')
            ->where($specification_where)
            ->field('goods_code,count(goods_specifications_value_id) same_level')
            ->group('goods_code')
            ->buildSql();
        $goods = JjdgGoods::alias('a')
            ->field('a.sub_cate_id,a.code,a.title,a.zk_final_price,s.same_level')
            ->where(['a.is_del' => 2, 'a.on_sale' => 1, 'a.code' => ['NEQ', $code]])
            ->join([$specifications_sql => 's'], 'a.code = s.goods_code')
            ->with(['goodsImgs', 'goodsSubCate'])
            ->order('s.same_level desc,s.goods_code desc')
            ->limit(10)
            ->select();
        return $goods;
    }


    /**
     * 根据商品关联表结果拿取关联的属性id
     */
    public function getSpecificationsvalueIds($goods_specifications_value_obj)
    {
        $data = [];
        foreach ($goods_specifications_value_obj as $value) {
            $data[] = $value->id;
        }
        $ids = $this->getAbleSpecificationValue($data);
        return $ids;
    }

    public function getAbleSpecificationValue($data)
    {
        $where = [
            'id' => ['IN', $data],
            'is_lock' => 1,
        ];
        $spec_val = JjdgGoodsSpecificationsValue::where($where)
            ->field('id')
            ->select();
        $ids = [];
        foreach ($spec_val as $v) {
            $ids[] = $v->id;
        }
        return $ids;
    }


    public function getRecommend()
    {
        $recommend = Cache::tag('jjdg_goods')->get('recommend');
        if ($recommend === false) {
            $recommend = $this->selectRecommendData(10);
            Cache::tag('jjdg_goods')->set('recommend', $recommend);
        }
        return $recommend;
    }

    public function getSearchRecommend()
    {
        $recommend = Cache::tag('jjdg_goods')->get('search_recommend');
        if ($recommend === false) {
            $recommend = $this->selectRecommendData(20);
            Cache::tag('jjdg_goods')->set('search_recommend', $recommend);
        }
        return $recommend;
    }

    //指定数量查推荐商品
    public function selectRecommendData($limit)
    {
        $with = [
            'goodsImgs' => function ($query) {
                $query->field('img_url,goods_code');
            },
            'goodsSubCate' => function ($query) {
                $query->field('id,short_name');
            }
        ];
        return $this->getListByWhereMultipleOrderSample([], $with, 1, $limit);
    }


    /**
     * 获取商品数据列表
     * @param array $map
     * @param array $order
     * @param int $p
     * @param int $p_size
     * @return false|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getList($map = [], $with = [], $order = [], $p = 1, $p_size = 10)
    {
        $skip = ($p - 1) * $p_size;
        $condition = array_merge($map, ['is_del' => 2, 'on_sale' => 1]);
        if (empty($order)) {
            $order = ['sale_change_time' => 'desc'];
        }
        if (empty($with)) {
            $with = ['goodsImgs' => function ($query) {
                $query->field('img_url,goods_code');
            }];
        }
        $list = JjdgGoods::where($condition)
            ->field('expand_link,zk_final_price,has_custom_price,custom_price,code,title,buy_num,volume,sub_cate_id')
            ->with($with)
            ->order($order)
            ->limit($skip, $p_size)
            ->select();
        return $list;
    }

    public function getListByWhereCount($map = [], $find = '')
    {
        $condition = array_merge($map, ['g.is_del' => 2, 'g.on_sale' => 1]);
        $buildSql = model('JjdgGoods')->alias('g')->where($condition)
            ->join('jjdg_goods_specification_relationship gs', 'g.`code` = gs.goods_code', 'LEFT')
            ->field('g.*,GROUP_CONCAT(gs.goods_specifications_value_id SEPARATOR \',\') as spec_values')
            ->group('g.`code`')
            ->buildSql();
        $count = model('JjdgGoods')->table($buildSql)->alias('g')
            ->where($condition)
            ->where($find)
            ->count();
        return $count;
    }

    /**
     * 获取分类商品数据列表
     * @param array $map
     * @param array $order
     * @param array $with
     * @param int $p
     * @param int $p_size
     * @param string $find
     * @return mixed
     */

    public function getListByWhere($map = [], $order = [], $with = [], $p = 1, $p_size = 10, $find = '')
    {
        $condition = array_merge($map, ['g.is_del' => 2, 'g.on_sale' => 1]);
        if (empty($order)) {
            $order = ['sale_change_time' => 'desc'];
        }
        $collect_sql = model('JjdgGoodsCollection')
            ->field('goods_code,count(user_id) as collect_num')
            ->group('goods_code')
            ->buildSql();
        $buildSql = model('JjdgGoods')->alias('g')->where($condition)
            ->join('jjdg_goods_specification_relationship gs', 'g.`code` = gs.goods_code', 'LEFT')
            ->join([$collect_sql => 'c'], 'g.code = c.goods_code', 'LEFT')
            ->field('g.*,c.collect_num,GROUP_CONCAT(gs.goods_specifications_value_id SEPARATOR \',\') as spec_values')
            ->group('g.`code`')
            ->buildSql();
        $list = model('JjdgGoods')->table($buildSql)->alias('g')
            ->where($condition)
            ->where($find)
            ->with($with)
            ->order($order)
            ->page($p, $p_size)
            ->select();

        return $list;
    }

    /**
     * 关联按页获取收藏商品
     * @param $where
     * @param $page
     * @param $pageSize
     * @param string $order
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getCollectGoods($where, $page, $pageSize, $order = 'c.id desc,c.create_time desc')
    {
        return model('JjdgGoods')->with(['goodsImgs', 'goodsSubCate' => function ($query) {
            $query->field('id,short_name');
        }])->alias('g')
            ->join('qz_jjdg_goods_collection c', 'g.code = c.goods_code')
            ->where($where)->field('g.code,g.title,g.describtion,g.buy_num,g.zk_final_price,g.volume,g.sub_cate_id')
            ->order($order)
            ->page($page, $pageSize)->select();
    }


    /**
     * 关联按页获取收藏商品(自带分页)
     * @param $where
     * @param $page
     * @param $pageSize
     * @param string $order
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getCollectGoodsByPage($where, $pageSize = 10, $order = 'c.id desc,c.create_time desc')
    {
        return model('JjdgGoods')->with('goodsImgs')->alias('g')
            ->join('qz_jjdg_goods_collection c', 'g.code = c.goods_code')
            ->where($where)->field('g.code,g.title,g.describtion,g.buy_num,g.zk_final_price,g.volume')
            ->order($order)
            ->paginate($pageSize);
    }

    /**
     * 关联获取收藏商品总数量
     * @param $where
     * @param $page
     * @param $pageSize
     * @param string $order
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getCollectGoodsCount($where)
    {
        return model('JjdgGoods')->alias('g')
            ->join('qz_jjdg_goods_collection c', 'g.code = c.goods_code')
            ->where($where)
            ->count(1);
    }

    /**
     * 获取商品收藏数量
     */
    public function getCollectNumByGoods($goods_obj)
    {
        return \model('JjdgGoodsCollection')->where('goods_code', $goods_obj->code)->count(1);
    }
}