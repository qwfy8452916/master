<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/7/2
 * Time: 11:15
 */

namespace app\jiaju\controller;

use app\common\controller\JiajuBase;
use app\common\logic\SubjectLogic;

class Subject extends JiajuBase
{
    public function detail(SubjectLogic $subjectLogic)
    {
        if (!$id = input('id')) {
            $this->error('异常请求');
        }
        $subject = $subjectLogic->getDetail($id);
        if (!$subject) {
            $this->error('该专题已不存在');
        }
        $this->assign('subject', $subject);
        //pv量加1
        $subject->setInc('views', 1);
        //专题推荐
        $this->assign('recommend', $subjectLogic->getRecommend([$subject->id]));

        return view();
    }

}