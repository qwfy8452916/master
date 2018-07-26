<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/7
 * Time: 17:45
 */

namespace app\jiajum\controller;

use app\common\controller\JiajumBase;
use app\common\enums\ApiConfig;
use app\common\logic\JjdgGoodsLogic;
use app\common\logic\SubjectLogic;

class Subject extends JiajumBase
{

    public function index(SubjectLogic $subjectLogic)
    {
        $subject = $subjectLogic->getList([], ['create_time' => 'desc'], 1, 10);
        $this->assign('subject', $subject);
        $title = "精选专题-齐装家具网上商城";
        $this->assign('head', $title);
        return view();
    }

    public function indexAjaxList(SubjectLogic $subjectLogic)
    {
        $p = (int)input('p', '1');
        $subject = $subjectLogic->getList([], ['create_time' => 'desc'], $p, 10);
        $this->assign('subject', $subject);
        $data = $this->fetch('list_content');
        return json(['status' => ApiConfig::REQUEST_SUCCESS, 'info' => '获取数据成功', 'data' => $data]);
    }

    public function detail(SubjectLogic $subjectLogic, JjdgGoodsLogic $jjdgGoodsLogic)
    {
        if(!$id = input('id')){
            $this->error('异常请求');
        }
        //专题详情
        $subject = $subjectLogic->getDetail($id);

        //未查询到专题
        if(!$subject){
            $this->error('该专题已不存在');
        }
        //pv量加1
        $subject ->setInc('views',1);
        //单品推荐
        $this->assign('recommend', $jjdgGoodsLogic->getRecommend());

        $this->assign('subject', $subject);

        $this->assign('head', $subject['title']);
        return view();
    }
}