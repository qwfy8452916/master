<?php
/**
 * Created by PhpStorm.
 * User: jsb
 * Date: 2018/6/7
 * Time: 15:45
 */
namespace app\jiajum\controller;

use app\common\controller\JiajumBase;
use app\common\logic\SceneLogic;

class Channel extends JiajumBase
{



    public function sceneGuide(SceneLogic $sceneLogic){
        $this->assign('scene', $sceneLogic->getSceneAndCate());
        return view();
    }



}