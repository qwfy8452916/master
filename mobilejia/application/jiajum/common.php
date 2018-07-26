<?php

/**
 * 增加操作日志
 * @param $uid 用户
 * @param $uname 用户名
 * @param $olddata 原始数据
 * @param $newdata 修改后数据
 */
function save_log($uid, $uname, $olddata = '', $newdata = '')
{
    $data = [
        'controller' => request()->controller(),
        'action' => request()->action(),
        'ip' => get_client_ip(),
        'user_agent' => $_SERVER["HTTP_USER_AGENT"],
        'method' => request()->method(),
    ];
    $data['uid'] = $uid;
    $data['uname'] = $uname;
    $data['old_data'] = $olddata;
    $data['new_data'] = $newdata;
    model('JjdgOpreateLog')->save($data);
}

/**
 * 获取客户端IP地址
 * @param integer $type 返回类型 0 返回IP地址 1 返回IPV4地址数字
 * @param boolean $custom 是否使用进行自定义,使用取值自定义配置的方式否则为直接取REMOTE_ADDR
 * @return mixed
 */
function get_client_ip($type = 0, $custom = true)
{
    $type = $type ? 1 : 0;
    static $ip = NULL;
    if ($ip !== NULL) return $ip[$type];
    if ($custom) {
        //IP获取函数get_client_ip()取值顺序自定义配置 从配置文件读取
        //样例 HTTP_CF_CONNECTING_IP,HTTP_X_REAL_IP,HTTP_X_FORWARDED_FOR,HTTP_CLIENT_IP,REMOTE_ADDR
        $GET_IP_VARS_ORDER_ARR = explode(',', config('GET_IP_VARS_ORDER'));
        $GET_IP_VARS_ORDER_ARR = array_filter($GET_IP_VARS_ORDER_ARR);
        if (empty($GET_IP_VARS_ORDER_ARR)) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        foreach ($GET_IP_VARS_ORDER_ARR as $ik => $iv) {
            if (isset($_SERVER[$iv])) {
                $ip = $_SERVER[$iv];
                //HTTP_X_FORWARDED_FOR包含多个IP需要单独处理
                if ('HTTP_X_FORWARDED_FOR' == $iv) {
                    $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
                    $pos = array_search('unknown', $arr);
                    if (false !== $pos) unset($arr[$pos]);
                    $ip = trim($arr[0]);
                }
                break;
            }
        }
    } elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    $long = sprintf("%u", ip2long($ip));
    $ip = $long ? array($ip, $long) : array('0.0.0.0', 0);
    return $ip[$type];
}

function convertUrlQuery($query)
{
    $query = htmlspecialchars_decode($query);
    $queryParts = explode('&', $query);
    $params = array();
    foreach ($queryParts as $param) {
        $item = explode('=', $param);
        if (isset($item[1])&&$item[0]!='s'){
            $params[$item[0]] = $item[1];
        }
    }
    return $params;
}

function getUrlQuery($array_query,$key='',$value='')
{
    $tmp = array();
    if (is_null($value)){
        unset($array_query[$key]);
    }elseif(!empty($key)){
        $array_query[$key] = $value;
    }
    foreach($array_query as $k=>$param) {
        $tmp[] = $k.'='.$param;
    }
    $params = implode('&',$tmp);
    return $params;
}

