<?php

namespace app\jiajum\controller;

use app\common\controller\JiajumBase;

class Upload extends JiajumBase
{

    public function index()
    {
        die();
    }

    public function ueditor()
    {
        $action = $_GET['action'];
        $path = EXTEND_PATH . 'Ueditor/';

        $configPath = $path . "config.json";
        $opts = array(
            'http' => array(
                'method' => "GET",
                'timeout' => 60,
            )
        );
        $context = stream_context_create($opts);
        $CONFIG = json_decode(preg_replace("/\/\*[\s\S]+?\*\//", "", file_get_contents($configPath, false, $context)), true);

        if ($action == 'config') {
            echo json_encode($CONFIG);
            die;
        }

        if ($action == 'uploadimage') {
            $result = $this->ueditorUpload();
        }else{
            $result = json(["err" => 1, "msg" => '上传方式错误', "data" => ""]);
        }
        return $result;
    }

    /**
     * Ueditor 图片上传（上传到七牛服务器）
     * @return String 图片的完整URL
     */
    public function ueditorUpload()
    {
        if (request()->isPost()) {
            $file = request()->file('upfile');
            $fileInfo = $file->getInfo();
            // 要上传图片的本地路径
            $filePath = $file->getInfo('tmp_name');
            $ext = pathinfo($file->getInfo('name'), PATHINFO_EXTENSION);  //后缀
            // 上传到七牛后保存的文件名
            $key = 'jjdg/' . date('Y/m/dHis') . substr(md5($file->getRealPath()), 0, 5) . rand(0, 9999);

            require_once EXTEND_PATH . 'Qiniu/autoload.php';

            $accessKey = config('qiniu.ak');
            $secretKey = config('qiniu.ck');
            $bucket = config('qiniu.bucket');
            $domain = config('qiniu.domain');

            $auth = new \Qiniu\Auth($accessKey, $secretKey);
            $token = $auth->uploadToken($bucket);
            // 初始化 UploadManager 对象并进行文件的上传
            $uploadMgr = new \Qiniu\Storage\UploadManager();
            // 调用 UploadManager 的 putFile 方法进行文件的上传
            list($ret, $err) = $uploadMgr->putFile($token, $key, $filePath);

            if ($err !== null) {
                return json(["err" => 1, "msg" => $err, "data" => ""]);
            } else {
                $result = array(
                    "state" => "SUCCESS",
                    "url" => 'http://' . $domain . '/' . $ret['key'],
                    "title" => false,
                    "original" => $fileInfo['name'],
                    "type" => '.' . $ext,
                    "size" => $fileInfo['size'],
                );

                //判断是不是头像上传操作
                if (input('method','') == 'headimg'){
                    //更新用户头像
                    $res = model('User')->isUpdate(true)->save(['logo'=>$result['url']],['id'=>session('u_userInfo.id')]);
                    if ($res !==false){
                        cache('Cache:User:ID'.session('u_userInfo.id'),null);
                    }
                }
                return json($result);
            }
        }else{
            return json(["err" => 1, "msg" => '没有图片上传', "data" => ""]);
        }
    }


    /**
     * 图片上传（上传到七牛服务器）
     * @return String 图片的完整URL
     */
    public function uploadToQiniu()
    {
        if (request()->isPost()) {
            $file = request()->file('file_data');
            if (empty($file)) {
                header("Content-type:text/html;charset=utf-8");
                header("HTTP/1.1 405 Picture not uploaded");
                die();
            }

            // 要上传图片的本地路径
            $filePath = $file->getInfo('tmp_name');
            // 上传到七牛后保存的文件名
            $key = 'jjdg/' . date('Y/m/dHis') . substr(md5($file->getRealPath()), 0, 5) . rand(0, 9999);
            require_once EXTEND_PATH . 'Qiniu/autoload.php';

            $accessKey = config('qiniu.ak');
            $secretKey = config('qiniu.ck');
            $bucket = config('qiniu.bucket');
            $domain = config('qiniu.domain');

            $auth = new \Qiniu\Auth($accessKey, $secretKey);
            $token = $auth->uploadToken($bucket);
            // 初始化 UploadManager 对象并进行文件的上传
            $uploadMgr = new \Qiniu\Storage\UploadManager();
            // 调用 UploadManager 的 putFile 方法进行文件的上传
            list($ret, $err) = $uploadMgr->putFile($token, $key, $filePath);
            if ($err !== null) {
                return json(["status" => 0, "msg" => $err, "data" => '']);
            } else {
                //返回图片的完整URL
                return json(["status" => 1, "msg" => "上传完成", "data" => 'http://' . $domain . '/' . $ret['key']]);
            }
        }else{
            header("Content-type:text/html;charset=utf-8");
            header("HTTP/1.1 405 Picture not uploaded");
            die();
        }
    }
}