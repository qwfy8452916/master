<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/7/13
 * Time: 17:11
 */

namespace app\common\logic;

use DateTime;
use think\Cache;
use think\Model;

class SecurityLogic extends Model
{

    /**
     * 检查是否为有效访问
     * @param string $type
     * @param int $id
     * @return bool
     */
    public function isNormalView($type = 'goods', $id = 0)
    {
        $ips = OP("ignore_ips");
        $iparr = explode(',', $ips);

        foreach ($iparr as $k => $v) {
            $iparr[$k] = ip2long($v);
        }
        $ip = get_client_ip();
        //本地IP  223.112.69.58 屏蔽掉，不统计
        $ip1 = ip2long($ip);
        if (!in_array($ip1, $iparr)) {
            $today = date("Y-m-d", time());
            $timeend = ($today . ' 23:59:59');
            $key = $type . '-' . '-' . $ip . '-' . $id;
            $status = Cache::get($key);
            if ($status != 1) {
                //没有访问记录，算中有效访问，生成新缓存（根据ip.对于ID）
                Cache::set($key, 1, new DateTime($timeend));
                return true;
            }
        }
        return false;
    }

}