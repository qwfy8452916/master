<?php
/**
 * 七牛云项目级类库
 * author: mcj
 */

namespace Util;

use Qiniu\Auth;
use Qiniu\Storage\UploadManager;
use think\facade\Cache;

class YXBQiNiu
{
    public static function getToken()
    {
        $token = Cache::get('yxb_qiniu_token');
        if ($token === false) {
            $accessKey = config('app.qiniu.ak');
            $secretKey = config('app.qiniu.ck');
            $bucket = config('app.qiniu.bucket');
            $auth = new Auth($accessKey, $secretKey);
            $token = $auth->uploadToken($bucket);
            //七牛云令牌默认缓存时间是1小时，减少不必要请求
            Cache::set('yxb_qiniu_token', $token, 60 * 55);
        }
        return $token;
    }

    public static function putFile($key, $filePath)
    {
        $uploadMgr = new UploadManager();
        $token = self::getToken();
        return $uploadMgr->putFile($token, $key, $filePath);
    }


}