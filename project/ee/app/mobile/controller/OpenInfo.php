<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/27
 * Time: 9:09
 */
namespace app\mobile\controller;

use think\Controller;
use think\facade\Request;


class OpenInfo extends Controller{
	// 图片示例
	public function examplePic(){
		$order_no = Request::get('order_no','');
		$this->assign('order_no',$order_no);
		return $this->fetch();
	}
}