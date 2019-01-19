<?php
namespace Mip\Controller;
use Mip\Common\Controller\MipBaseController;

class ActivityController extends MipBaseController
{
    public function index()
    {
        //获取正在进行和即将进行的活动
        $vars['effective'] = S('C:Mobile:Activity:index:effective');

        if (empty($vars['effective'])) {
            $effective = D('Activity')->getEffectiveActivity();
            foreach ($effective as $k => $v) {
                $now = time();
                $v['start'] = strtotime($v['start']);
                $v['end'] = strtotime($v['end']);
                if ($v['start'] < $now && $v['end'] < $now) {
                    //已结束
                    $v['status'] = 2;
                } elseif ($v['start'] <= $now && $v['end'] >= $now) {
                    //进行中
                    $v['status'] = 1;
                } elseif ($v['start'] > $now && $v['end'] > $now) {
                    //预热中
                    $v['status'] = 0;
                }
                $vars['effective'][$v['status']][] = $v;
            }
            S('C:Mobile:Activity:index:effective', $vars['effective'], 60);
        }

        //获取已过期的活动
        $vars['expired'] = S('C:Mobile:Activity:index:expired');
        if (empty($vars['expired'])) {
            $vars['expired'] = $vars['effective'][2];

            S('C:Mobile:Activity:index:expired', $vars['expired'], 60);
        }

        $basic["head"]["title"] = '最新装修活动专题-家装设计活动专题页面-齐装网';
        $basic["head"]["keywords"] = '装修活动,家装设计活动,装修活动专题';
        $basic["head"]["description"] = '齐装网装修活动专题为您提供装修案例整合、全新装修活动、装修设计创新报道等内容。齐装网为客户提供高品质、个性化家装设计服务 ，互联网装修领导品牌。';

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];

        $this->assign("canonical", $canonical);
        $this->assign("head", $basic['head']);
        $this->assign('vars', $vars);
        $this->assign('basic', $basic);
        $this->display();
    }


}