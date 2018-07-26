<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/5/24
 * Time: 14:44
 * 处理banner业务逻辑
 */
namespace app\common\logic;

use app\common\model\JjdgSubjectBanner;
use think\Cache;
use think\Model;

class BannerLogic extends Model
{
    /**
     * 获取今日特价商品
     * @return false|mixed|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getBanner()
    {
        $banners = Cache::tag('jjdg_banners')->get('banners');
        if ($banners === false) {
            $banner_map = [
                'status' => 1,
            ];
            $banners = JjdgSubjectBanner::field('url,img,pcurl,pcimg')->where($banner_map)->limit(8)->order('sort asc,create_time desc')->select();
            Cache::tag('jjdg_banners')->set('banners', $banners);
        }
        return $banners;
    }
}