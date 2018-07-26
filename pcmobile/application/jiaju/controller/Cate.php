<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/7/2
 * Time: 11:11
 */

namespace app\jiaju\controller;

use app\common\controller\JiajuBase;
use app\common\logic\CollectLogic;
use app\common\logic\JjdgGoodsLogic;
use app\common\logic\ScoreLogic;
use app\common\logic\SpecificationsLogic;
use app\common\logic\StaticUrlLogic;
use app\common\logic\SubCateLogic;
use app\common\logic\TopCateLogic;
use think\Session;
use Util\Page;

class Cate extends JiajuBase
{
    //todo 此处封装需要优化 author:mcj
    public function index(StaticUrlLogic $staticUrlLogic, TopCateLogic $topCateLogic, SubCateLogic $subCateLogic, JjdgGoodsLogic $jjdgGoodsLogic, CollectLogic $collectLogic, ScoreLogic $scoreLogic, SpecificationsLogic $specificationsLogic)
    {
        $param = $this->request->param();
        $par = isset($param['par']) ? $param['par'] : '';
        $p = $staticUrlLogic->getP($param); //当前页
        $page_size = 40;
        $top_cate = null;
        $sub_cate = null;
        $all_specification = null;
        $all_specification_url = null;
        //最终筛选条件
        $map = [];
        $order = [];
        //搜索
        if (isset($param['keywords'])) {
            $map['keywords'] = $param['keywords'];
        }
        //排序
        $o = isset($param['o']) ? $param['o'] : 5;
        $order['order_by'] = $o;


        if ($param['cate'] === 'all') {
            $goods = $jjdgGoodsLogic->goodsFilter($map, $order, $p, $page_size, $this->user);
        } else {
            //筛选条件为一级分类
            $top_cate = $topCateLogic->getAvailbleCate(['short_name' => $param['cate']]);
            if (!$top_cate) {
                //一级分类不存在则筛选条件二级分类
                $sub_cate = $subCateLogic->getAvailbleCate(['short_name' => $param['cate']]);
                //异常路由
                if (!$sub_cate) {
                    return $this->_empty();
                }
                $map['sub_cate_id'] = $sub_cate->getAttr('id');
                //解析二级分类下的属性筛选条件
                if (!empty($par)) {
                    $specification_values = $staticUrlLogic->analysis($par);
                    $map['specification_value'] = $specification_values;
                }

            } else {
                $map['top_cate_id'] = $top_cate->getAttr('id');
            }
            $goods = $jjdgGoodsLogic->goodsFilter($map, $order, $p, $page_size, $this->user);
        }
        if (empty($goods) && isset($param['keywords'])) {
            //检索结果为空 展示全部数据
            $this->assign('search_empty', true);
            $goods = $jjdgGoodsLogic->goodsFilter([], $order, $p, $page_size, $this->user);
        }
        //根据列表要求整理原始数据
        $data = [];
        foreach ($goods as $key => $v) {
            $data[$key]['sub_cate']['short_name'] = $v->goods_sub_cate->getAttr('short_name');
            $data[$key]['title'] = $v['title'];
            $data[$key]['code'] = $v['code'];
            $data[$key]['describtion'] = $v['describtion'];
            $data[$key]['img_url'] = $v->goods_imgs[0]->img_url;
            $data[$key]['zk_final_price'] = $v->zk_final_price;
            $data[$key]['volume'] = $v->volume;
            $data[$key]['collect_num'] = $collectLogic->getCollectNumByObj($v);
            $data[$key]['score'] = $scoreLogic->getGoodsScoreAvg($v);
            $data[$key]['collect_button_status'] = $collectLogic->getCollectButtonStatus($v, $this->user);
        }
        $this->assign('goods', $data);
        //伪静态分页
        $count = $jjdgGoodsLogic->goodsFilterCount($map);
        if ($count == 0 && isset($param['keywords'])) {
            $count = $jjdgGoodsLogic->goodsFilterCount([]);
        }
        $page = new Page($count, $page_size);
        $this->assign('page', $page->show());

        //筛选栏目数据处理
        $all_top_cate = $topCateLogic->selectAvailbleCate([]);
        $this->assign('all_top_cate', $all_top_cate);
        if (!empty($top_cate)) {
            $this->assign('select_top_cate_id', $top_cate->getAttr('id'));
            $all_sub_cate = $subCateLogic->selectAvailbleCate(['pid' => $top_cate->getAttr('id')]);
            $this->assign('all_sub_cate', $all_sub_cate);
        }
        if (!empty($sub_cate)) {
            $top_cate = $topCateLogic->getAvailbleCate(['id' => $sub_cate->getAttr('pid')]);
            $this->assign('select_sub_cate_short_name', $sub_cate->getAttr('short_name'));
            $this->assign('select_top_cate_id', $sub_cate->getAttr('pid'));
            $all_sub_cate = $subCateLogic->selectAvailbleCate(['pid' => $sub_cate->getAttr('pid')]);
            $this->assign('all_sub_cate', $all_sub_cate);
            $this->assign('select_sub_cate_id', $sub_cate->getAttr('id'));
            $all_specification = $specificationsLogic->selectAvailbleSpeByPid($sub_cate->getAttr('id'));
            $selected_specification_values = isset($specification_values) ? $specification_values : [];
            $all_specification_url = $staticUrlLogic->getSpecificationUrl($par, $all_specification, $selected_specification_values);
            $this->assign('all_specification_url', $all_specification_url);
        }
        $this->assign('top_cate', $top_cate);


        //排序按钮
        $sort_url = trim($param['cate'] . '/' . $par, '/');
        if (isset($param['keywords'])) {
            $sort_url .= '?keywords=' . $param['keywords'] . '&o=';
        } else {
            $sort_url .= '?o=';
        }
        $this->assign('sort_url', $sort_url);
        //排序选中效果
        $this->assign('sort', $o);
        //搜索样式变动
        if (isset($param['keywords'])) {
            $this->assign('search_content', $param['keywords']);
        }
        //面包屑控制
        $crumbs = $staticUrlLogic->getPcCrumbs($top_cate, $sub_cate, $par, $all_specification_url);
        $this->assign('crumbs', $crumbs);

        //TDK
        $head = $this->_getTDk($map, $top_cate, $sub_cate, $all_specification_url);
        $this->assign('head', $head);


        return view();
    }


    private function _getTDk($map, $top_cate, $sub_cate, $all_specification_url)
    {
        $data = [
            'title' => '',
            'keywords' => '',
            'description' => '',
        ];
        if (isset($map['keywords'])) {
            $data['title'] = "搜索{$map['keywords']}结果页-齐装家具网上商城";
            $data['keywords'] = "搜索{$map['keywords']}结果页-齐装家具网上商城";
            $data['description'] = "搜索{$map['keywords']}结果页-齐装家具网上商城";
            return $data;
        }
        if (!$top_cate) {
            $data['title'] = "所有分类";
            $data['keywords'] = "所有分类";
            $data['description'] = "所有分类";
            return $data;
        }
        if (!$sub_cate) {
            $data['title'] = $top_cate->getAttr('name') . '家具_' . $top_cate->getAttr('name') . '家具品牌_' . $top_cate->getAttr('name') . '家具价格_' . $top_cate->getAttr('name') . '家具尺寸图片大全_齐装家具网上商城';
            $data['keywords'] = $top_cate->getAttr('name') . '家具_' . $top_cate->getAttr('name') . '家具品牌_' . $top_cate->getAttr('name') . '家具价格_' . $top_cate->getAttr('name') . '家具尺寸图片大全_齐装家具网上商城';
            $data['description'] = $top_cate->getAttr('name') . '家具_' . $top_cate->getAttr('name') . '家具品牌_' . $top_cate->getAttr('name') . '家具价格_' . $top_cate->getAttr('name') . '家具尺寸图片大全_齐装家具网上商城';
            return $data;
        }
        if ($all_specification_url) {
            $str = '';
            foreach ($all_specification_url as $v) {
                foreach ($v['children'] as $vv) {
                    if (isset($vv['selected']) && $vv['id']) {
                        $str .= $vv['name'];
                    }
                }
            }
            if ($str) {
                $data['title'] = $str . '品牌_' . $str . '价格_' . $str . '尺寸图片大全_齐装家具网上商城';
                $data['keywords'] = $str . '品牌_' . $str . '价格_' . $str . '尺寸图片大全_齐装家具网上商城';;
                $data['description'] = $str . '品牌_' . $str . '价格_' . $str . '尺寸图片大全_齐装家具网上商城';;
                return $data;
            } else {
                $data['title'] = $sub_cate->getAttr('name') . '品牌_' . $sub_cate->getAttr('name') . '价格_' . $sub_cate->getAttr('name') . '尺寸图片大全_齐装家具网上商城';
                $data['keywords'] = $sub_cate->getAttr('name') . '品牌_' . $sub_cate->getAttr('name') . '价格_' . $sub_cate->getAttr('name') . '尺寸图片大全_齐装家具网上商城';
                $data['description'] = $sub_cate->getAttr('name') . '品牌_' . $sub_cate->getAttr('name') . '价格_' . $sub_cate->getAttr('name') . '尺寸图片大全_齐装家具网上商城';
                return $data;
            }
        }
        return $data;
    }

}