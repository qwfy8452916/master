<?php
/**
 * 路由逻辑模块
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/15
 * Time: 16:50
 */

namespace app\common\logic;

use app\common\enums\ExceptionCode;
use think\Model;
use think\Exception as tException;

class StaticUrlLogic extends Model
{
    /**
     * 获取伪静态路由中的当前页码
     * @param array $param
     * @return int
     */
    public function getP($param = [])
    {
        if (!empty($param['p'])) {
            preg_match('/(?<=p)\d+/', $param['p'], $mm);
            return $mm[0];
        }
        return 1;
    }

    public function getPcCrumbs($top_cate, $sub_cate, $par, $all_specification_url)
    {
        $data = [];
        if ($top_cate) {
            $data[1] = [
                'key_name' => '场景',
                'value_name' => $top_cate->getAttr('name'),
                'url' => 'all/',
            ];
        }
        if ($sub_cate) {
            $data[2] = [
                'key_name' => '分类',
                'value_name' => $sub_cate->getAttr('name'),
                'url' => $top_cate->getAttr('short_name') . '/',
            ];
        }
        if ($par) {
            foreach ($all_specification_url as $v) {
                foreach ($v['children'] as $vv) {
                    if (isset($vv['selected']) && $vv['id']) {
                        $par_url = trim(str_replace($v['short_name'] . $vv['id'], '', $vv['url']), '/');
                        $url = trim($sub_cate->getAttr('short_name') . '/' . $par_url, '/');
                        $data[] = [
                            'key_name' => $v['name'],
                            'value_name' => $vv['name'],
                            'url' => $url . '/',
                        ];
                    }
                }

            }

        }
        return $data;
    }

    public function analysis($par_str)
    {
        preg_match_all('/(?<=[a-z])\d+/', $par_str, $m);
        if ($m) {
            return $m[0];
        }
        return [];
    }

    public function getSpecificationUrl($par = '', $all_specification, $selected_specification_values = [])
    {
        $data = [];
        foreach ($all_specification as $k => $v) {
            $short_name = $this->getSpecificationShortName($k);
            $data[$k]['name'] = $v->getAttr('name');
            $data[$k]['short_name'] = $short_name;
            $data[$k]['children'] = [];
            $data[$k]['children'][0]['id'] = 0;
            $data[$k]['children'][0]['name'] = '不限';
            $data[$k]['children'][0]['selected'] = true;
            $data[$k]['children'][0]['url'] = $this->setPar($par, $short_name, 0);
            foreach ($v->specifications_value as $kk => $vv) {
                $data[$k]['children'][$kk + 1]['id'] = $vv->getAttr('id');
                $data[$k]['children'][$kk + 1]['url'] = $this->setPar($par, $short_name, $vv->getAttr('id'));
                $data[$k]['children'][$kk + 1]['name'] = $vv->getAttr('name');
                if (in_array($vv->getAttr('id'), $selected_specification_values)) {
                    $data[$k]['children'][$kk + 1]['selected'] = true;
                    $data[$k]['children'][0]['selected'] = false;
                }
            }
        }
        return $data;
    }

    public function setPar($par, $short_name, $id)
    {
        if ($id != 0) {
            if (strstr($par, $short_name) === false) {
                $str = $par . $short_name . $id;
            } else {
                $str = preg_replace('/(?<=' . $short_name . ')\d+/', $id, $par);
            }
        } else {
            if (strstr($par, $short_name) === false) {
                $str = $par;
            } else {
                $str = preg_replace('/' . $short_name . '\d+/', '', $par);
            }
        }
        return $str;
    }

    public function getSpecificationShortName($order_number)
    {
        if ($order_number < 14) {
            $key = $order_number + 65;
        } elseif ($order_number <= 25) {
            $key = $order_number + 66;
        } else {
            throw new tException('属性超长', ExceptionCode::SPECIFICATION_OVERFLOW);
        }
        return strtolower(chr($key));
    }

}