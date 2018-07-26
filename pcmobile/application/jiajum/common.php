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

