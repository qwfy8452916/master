<?php
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class MuserController extends MobileBaseController{
    public function index(){
       $url = "http://old.qizuang.com".$_SERVER["REQUEST_URI"];
       header( "HTTP/1.1 301 Moved Permanently" );
       header( "Location:".$url);
    }
}