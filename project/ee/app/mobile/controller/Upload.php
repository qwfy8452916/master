<?php

namespace app\mobile\controller;

use app\common\controller\MobileCommonBase;
use app\common\enums\ErrorCode;
use think\facade\Request;
use Util\YXBQiNiu;

/**
 * 图片上传模块
 * Class Order
 * author: mcj
 * @package app\index\controller
 */
class Upload extends MobileCommonBase
{
    public function image()
    {
        $file = Request::file('file');
        if (empty($file)) {
            return json(['error_code' => ErrorCode::FILE_NOT, 'error_msg' => '未获取到数据']);
        }
        $fileInfo = $file->getInfo();
        // 要上传图片的本地路径
        $filePath = $fileInfo['tmp_name'];
        if ($fileInfo['size'] > 1024 * 1024 * 6) {
            return json(['error_code' => ErrorCode::FILE_SIZE_OVER, 'error_msg' => '上传图片大小超限']);
        }
        // 上传到七牛后保存的文件名
        $key = 'house/' . date('Y/m/dHis') . substr(md5($file->getRealPath()), 0, 5) . rand(0, 9999);
        $domain = config('app.qiniu.domain');
        list($ret, $err) = YXBQiNiu::putFile($key, $filePath);
        if ($err !== null) {
            return json(['error_code' => ErrorCode::QINIU_UPTOKEN, 'error_msg' => '令牌不合法', 'data' => $err]);
        } else {
            //返回图片的完整URL
            return json(['error_code' => ErrorCode::SUCCESS, 'data' => $domain . '/' . $ret['key']]);
        }
    }

    public function buildImage()
    {
        $file = Request::file('file');
        if (empty($file)) {
			return json(['error_code' => ErrorCode::FILE_NOT, 'error_msg' => '未获取到数据']);
        }
        $fileInfo = $file->getInfo();
        // 要上传图片的本地路径
        $filePath = $fileInfo['tmp_name'];
        if ($fileInfo['size'] > 1024 * 1024 * 6) {
            return json(['error_code' => ErrorCode::FILE_SIZE_OVER, 'error_msg' => '上传图片大小超限']);
        }
        // 上传到七牛后保存的文件名
        $key = 'build/' . date('Y/m/dHis') . substr(md5($file->getRealPath()), 0, 5) . rand(0, 9999);
        $domain = config('app.qiniu.domain');
        list($ret, $err) = YXBQiNiu::putFile($key, $filePath);
        if ($err !== null) {
            return json(['error_code' => ErrorCode::QINIU_UPTOKEN, 'error_msg' => '令牌不合法', 'data' => $err]);
        } else {
            //返回图片的完整URL
            return json(['error_code' => ErrorCode::SUCCESS, 'data' => $domain . '/' . $ret['key']]);
        }
    }

    //上传头像
    public function changeHeadImage()
    {
        $file = Request::file('__avatar1');
        if (empty($file)) {
            return json(['status' => 0, 'info' => '未获取到数据']);
        }
        $fileInfo = $file->getInfo();
        // 要上传图片的本地路径
        $filePath = $fileInfo['tmp_name'];
        if ($fileInfo['size'] > 1024 * 1024 * 6) {
            return json(['error_code' => ErrorCode::FILE_SIZE_OVER, 'error_msg' => '上传图片大小超限']);
        }
        // 上传到七牛后保存的文件名
        $key = 'headimg/' . date('Y/m/dHis') . substr(md5($file->getRealPath()), 0, 5) . rand(0, 9999);
        $domain = config('app.qiniu.domain');
        list($ret, $err) = YXBQiNiu::putFile($key, $filePath);
        if ($err !== null) {
            return json(['error_code' => ErrorCode::QINIU_UPTOKEN, 'error_msg' => '令牌不合法', 'data' => $err]);
        } else {
            //返回图片的完整URL
            return json(['error_code' => ErrorCode::SUCCESS, 'url' => $domain . '/' . $ret['key']]);
        }
	}

    public function changeHeadImageMobile()
    {
        $file = Request::file('file');
        if (empty($file)) {
            return json(['status' => 0, 'info' => '未获取到数据']);
        }
        $fileInfo = $file->getInfo();
        // 要上传图片的本地路径
        $filePath = $fileInfo['tmp_name'];
        if ($fileInfo['size'] > 1024 * 1024 * 6) {
            return json(['error_code' => ErrorCode::FILE_SIZE_OVER, 'error_msg' => '上传图片大小超限']);
        }
        // 上传到七牛后保存的文件名
        $key = 'headimg/' . date('Y/m/dHis') . substr(md5($file->getRealPath()), 0, 5) . rand(0, 9999);
        $domain = config('app.qiniu.domain');
        list($ret, $err) = YXBQiNiu::putFile($key, $filePath);
        if ($err !== null) {
            return json(['error_code' => ErrorCode::QINIU_UPTOKEN, 'error_msg' => '令牌不合法', 'data' => $err]);
        } else {
            //返回图片的完整URL
            return json(['error_code' => ErrorCode::SUCCESS, 'data' => $domain . '/' . $ret['key']]);
        }
    }

}
