<?php
/**
 * Created by PhpStorm.
 * User: jsb
 * Date: 2018/6/9
 * Time: 15:40
 */

namespace app\common\logic;

use app\common\model\JjdgGoodsGrade;
use app\common\model\JjdgSubject;
use app\common\model\JjdgSubjectGoods;
use app\common\validate\JjdgScore;
use think\Cache;
use think\Model;

class SubjectLogic extends Model
{

    public function getPcTop()
    {
        $subject = Cache::tag('jjdg_subject')->get('subject_pc_top');
        if ($subject === false) {
            $map = [
                'status' => 1,
            ];
            $subject = JjdgSubject::field('id,headimg,title')->where($map)->order(['create_time' => 'desc'])->limit(50)->select();
            Cache::tag('jjdg_subject')->set('subject_pc_top', $subject);
        }
        return $subject;
    }

    /**
     * 获取最新的5个专题
     * @return false|mixed|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getTop()
    {
        $subject = Cache::tag('jjdg_subject')->get('subject_top', '');
        if (!$subject) {
            $map = [
                'status' => 1,
            ];
            $subject = JjdgSubject::field('id,headimg,title')->where($map)->order(['create_time' => 'desc'])->limit(5)->select();
            Cache::tag('jjdg_subject')->set('subject_top', $subject);
        }
        return $subject;
    }

    /**
     * 获取专题列表数据
     * @param array $map
     * @param array $order
     * @param int $p
     * @param int $p_size
     * @return false|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getList($map = [], $order = [], $p = 1, $p_size = 10)
    {
        $skip = ($p - 1) * $p_size;
        $condition = array_merge($map, ['status' => 1]);
        if (empty($order)) {
            $order = ['update_time' => 'desc'];
        }
        $subject = JjdgSubject::field('id,headimg,title')
            ->where($condition)
            ->order($order)
            ->limit($skip, $p_size)
            ->select();
        return $subject;
    }

    public function getDetail($id)
    {
        $where = [
            'status' => 1,
            'id' => $id,
        ];
        $with = [
            'relatedGoods'=>[
                'goodsImgs',
                'goodsSubCate'
            ]
        ];
        $subject = JjdgSubject::field('id,title,content,headimg,create_time,views')
            ->where($where)
            ->with($with)
            ->find();
        return $subject;
    }

    //pv量加1
    public function subjectIncOne($id)
    {
        $id = ['id' => $id];
        return JjdgSubject::where($id)->setInc('views');
    }

    //专题推荐
    public function getRecommend($subject_ids = [])
    {

        $map = ['status' => 1];
        if ($subject_ids) {
            $map['id'] = ['not in', $subject_ids];
        }
        return JjdgSubject::field('id, title, headimg')
            ->where($map)
            ->order('views', 'desc')
            ->limit(4)
            ->select();
    }

}