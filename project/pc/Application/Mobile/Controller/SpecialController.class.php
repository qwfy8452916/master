<?php

//专题页
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;

class SpecialController extends MobileBaseController{

    public function index(){
        $this->_error();
    }


    //微信专页
    public function about(){



        //$this->assign("info",$info);
        $this->display();
    }






}