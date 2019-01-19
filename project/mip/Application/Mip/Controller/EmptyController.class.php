<?php
namespace Mip\Controller;
use Mip\Common\Controller\MipBaseController;

class EmptyController extends MipBaseController{
    public function index(){
        //mip分站跳转首页
       /* header( "HTTP/1.1 301 Moved Permanently");
        header("Location:http://mip.qizuang.com");
        exit;*/
       $this->_empty();
    }
}