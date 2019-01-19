<?php

namespace Home\Model;

use Think\Model;

class QiniuModel extends Model{
    protected $autoCheckFields = false;

    /**
     * 删除七牛图片
     * @param  string $key 路径
     * @return bool
     */
    public function deleteQiniuImg($key = ''){
        import("Library.Org.Qiniu.rs",'','.php');
        $bucket =OP('QINIU_BUCKET');
        Qiniu_SetKeys(OP('QINIU_AK'),OP('QINIU_CK'));
        $client = new \Qiniu_MacHttpClient(null);
        $err = Qiniu_RS_Delete($client, $bucket, $key);
        if ($err !== null) {
            return false;
        } else {
           return true;
        }
    }
}
