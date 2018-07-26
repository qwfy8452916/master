<?php
// 应用公共文件
function array_only($array, $keys)
{
    return array_intersect_key($array, array_flip((array)$keys));
}

/**
 * xss安全过滤
 * @param  [type] $val [description]
 * @return [type]      [description]
 */
function remove_xss($val)
{
    // remove all non-printable characters. CR(0a) and LF(0b) and TAB(9) are allowed
    // this prevents some character re-spacing such as <java\0script>
    // note that you have to handle splits with \n, \r, and \t later since they *are* allowed in some inputs
    $val = preg_replace('/([\x00-\x08,\x0b-\x0c,\x0e-\x19])/', '', $val);

    // straight replacements, the user should never need these since they're normal characters
    // this prevents like <IMG SRC=@avascript:alert('XSS')>
    $search = 'abcdefghijklmnopqrstuvwxyz';
    $search .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $search .= '1234567890!@#$%^&*()';
    $search .= '~`";:?+/={}[]-_|\'\\';
    for ($i = 0; $i < strlen($search); $i++) {
        // ;? matches the ;, which is optional
        // 0{0,7} matches any padded zeros, which are optional and go up to 8 chars

        // @ @ search for the hex values
        $val = preg_replace('/(&#[xX]0{0,8}' . dechex(ord($search[$i])) . ';?)/i', $search[$i], $val); // with a ;
        // @ @ 0{0,7} matches '0' zero to seven times
        $val = preg_replace('/(&#0{0,8}' . ord($search[$i]) . ';?)/', $search[$i], $val); // with a ;
    }

    // now the only remaining whitespace attacks are \t, \n, and \r
    $ra1 = array('javascript', 'vbscript', 'expression', 'applet', 'meta', 'xml', 'blink', 'link', 'style', 'script', 'embed', 'object', 'iframe', 'frame', 'frameset', 'ilayer', 'layer', 'bgsound', 'title', 'base');
    $ra2 = array('onabort', 'onactivate', 'onafterprint', 'onafterupdate', 'onbeforeactivate', 'onbeforecopy', 'onbeforecut', 'onbeforedeactivate', 'onbeforeeditfocus', 'onbeforepaste', 'onbeforeprint', 'onbeforeunload', 'onbeforeupdate', 'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick', 'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavailable', 'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'onerror', 'onerrorupdate', 'onfilterchange', 'onfinish', 'onfocus', 'onfocusin', 'onfocusout', 'onhelp', 'onkeydown', 'onkeypress', 'onkeyup', 'onlayoutcomplete', 'onload', 'onlosecapture', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onmove', 'onmoveend', 'onmovestart', 'onpaste', 'onpropertychange', 'onreadystatechange', 'onreset', 'onresize', 'onresizeend', 'onresizestart', 'onrowenter', 'onrowexit', 'onrowsdelete', 'onrowsinserted', 'onscroll', 'onselect', 'onselectionchange', 'onselectstart', 'onstart', 'onstop', 'onsubmit', 'onunload');
    $ra = array_merge($ra1, $ra2);

    $found = true; // keep replacing as long as the previous round replaced something
    while ($found == true) {
        $val_before = $val;
        for ($i = 0; $i < sizeof($ra); $i++) {
            $pattern = '/';
            for ($j = 0; $j < strlen($ra[$i]); $j++) {
                if ($j > 0) {
                    $pattern .= '(';
                    $pattern .= '(&#[xX]0{0,8}([9ab]);)';
                    $pattern .= '|';
                    $pattern .= '|(&#0{0,8}([9|10|13]);)';
                    $pattern .= ')*';
                }
                $pattern .= $ra[$i][$j];
            }
            $pattern .= '/i';
            $replacement = substr($ra[$i], 0, 2) . '<x>' . substr($ra[$i], 2); // add in <> to nerf the tag
            $val = preg_replace($pattern, $replacement, $val); // filter out the hex tags
            if ($val_before == $val) {
                // no replacements were made, so exit the loop
                $found = false;
            }
        }
    }
    return $val;
}

//全局加载配置
function OP($key, $status = 'yes')
{
    if (empty($key)) {
        return false;
    }
    static $OPKeysList = array();
    if (isset($OPKeysList[$key])) {
        return $OPKeysList[$key];
    } else {
        $value = model('Options')->getOptionName($key, $status);
        $OPKeysList[$key] = $value['option_value'];
        return $OPKeysList[$key];
    }
}

/**
 * 加密解密函数
 * @return [type] [description]
 */
function authcode($str, $operation = "DECODE")
{
    $auth = new \Util\Authcode();
    $code = $auth->DEcode($str, strtoupper($operation));
    return $code;
}

/**
 *  转换xml到数组 利用转换成json做中间环节
 * @param  xml文档 $xml
 * @return bool false or array
 */
function xmltoarray($xml)
{
    if (empty($xml)) {
        return false;
    }
    return json_decode(json_encode((array)simplexml_load_string($xml)), true);
}

//校验验证码
function checkSafeCode($data)
{
    if (!empty($data["code"])) {
        $safecode = session('safecode');
        if (!empty($safecode)) {
            $tel = $data["tel"];
            //是否需要解密电话号码/邮箱
            if (isset($data["authcode"]) && $data["authcode"] == 1) {
                $tel = authcode($data["tel"], "DECODE");
            }
            if ($tel != $safecode["tel"]) {
                //清除验证session
                return ["data" => "", "info" => '发送验证码手机号错误', "status" => 0];
            }
            if (strtolower($data["code"]) != authcode($safecode["code"])) {
                //清除验证session
                return ["data" => "", "info" => '验证码错误', "status" => 0];
            }
            //清除验证session
            session('safecode', null);
            return ["data" => "", "info" => '亲,验证码输对了！', "status" => 1];
        } else {
            return ["data" => "", "info" => '验证码错误', "status" => 0];
        }
    } else {
        //清除验证session
        session('safecode', null);
        return ["data" => "", "info" => '验证码错误', "status" => 0];
    }
}

//校验验证码
function checkOneStepSafeCode($data)
{
    if (!empty($data["code"])) {
        $safecode = session('safecode');
        if (!empty($safecode)) {
            $tel = $data["tel"];
            //是否需要解密电话号码/邮箱
            if (isset($data["authcode"]) && $data["authcode"] == 1) {
                $tel = authcode($data["tel"], "DECODE");
            }
            if ($tel != $safecode["tel"]) {
                //清除验证session
                return ["data" => "", "info" => '发送验证码手机号错误', "status" => 0];
            }
            if (strtolower($data["code"]) != authcode($safecode["code"])) {
                //清除验证session
                return ["data" => "", "info" => '验证码错误', "status" => 0];
            }
            return ["data" => "", "info" => '亲,验证码输对了！', "status" => 1];
        } else {
            return ["data" => "", "info" => '验证码错误', "status" => 0];
        }
    } else {
        //清除验证session
        session('safecode', null);
        return ["data" => "", "info" => '验证码错误', "status" => 0];
    }
}

if (!function_exists('array_column')) {
    function array_column(array $array, $column_key, $index_key = null)
    {
        $result = [];
        foreach ($array as $arr) {
            if (!is_array($arr)) continue;

            if (is_null($column_key)) {
                $value = $arr;
            } else {
                $value = $arr[$column_key];
            }

            if (!is_null($index_key)) {
                $key = $arr[$index_key];
                $result[$key] = $value;
            } else {
                $result[] = $value;
            }
        }
        return $result;
    }
}
if (!function_exists('setUrlOver')) {
    function setUrlOver()
    {
        $uri = $_SERVER['REQUEST_URI'];
        preg_match('/html$/', $uri, $m);
        if (count($m) == 0) {
            preg_match('/\/$/', $uri, $m);
            $parse = parse_url($uri);
            if (count($m) == 0 && empty($parse["query"])) {
                header("HTTP/1.1 301 Moved Permanently");

                header("Location: " . request()->domain() . $uri . "/");
                die();
            }
        }
        return true;
    }
}

if (!function_exists('Qiniu_SetKeys')) {

    function Qiniu_SetKeys($accessKey, $secretKey)
    {
        global $QINIU_ACCESS_KEY;
        global $QINIU_SECRET_KEY;

        $QINIU_ACCESS_KEY = $accessKey;
        $QINIU_SECRET_KEY = $secretKey;
    }

}
/**
 * 中文字符串截取
 * @param  [type]  $str     [description]
 * @param  integer $start [description]
 * @param  [type]  $length  [description]
 * @param  string $charset [description]
 * @param  boolean $suffix [description]
 * @return [type]           [description]
 */
function mbstr($str, $start = 0, $length, $charset = "utf-8", $suffix = true)
{
    if (function_exists("mb_substr"))
        $slice = mb_substr($str, $start, $length, $charset);
    elseif (function_exists('iconv_substr')) {
        $slice = iconv_substr($str, $start, $length, $charset);
        if (false === $slice) {
            $slice = '';
        }
    } else {
        $re['utf-8'] = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
        $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
        $re['gbk'] = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
        $re['big5'] = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
        preg_match_all($re[$charset], $str, $match);
        $slice = join("", array_slice($match[0], $start, $length));
    }
    $fix = '';
    if (strlen($slice) < strlen($str)) {
        $fix = '...';
    }
    return $suffix ? $slice . $fix : $slice;
}

/**
 * 多维数组排序author mcj
 */
if (!function_exists('sort_arr_by_many_field')) {
    function sort_arr_by_many_field()
    {
        $args = func_get_args();
        if (empty($args)) {
            return null;
        }
        $arr = array_shift($args);
        if (!is_array($arr)) {
            throw new Exception("第一个参数不为数组");
        }
        foreach ($args as $key => $field) {
            if (is_string($field)) {
                $temp = array();
                foreach ($arr as $index => $val) {
                    $temp[$index] = $val[$field];
                }
                $args[$key] = $temp;
            }
        }
        $args[] = &$arr;//引用值
        call_user_func_array('array_multisort', $args);
        return array_pop($args);
    }
}

/**
 * 判断是否是json，返回转化后的数组
 * @param $value
 * @return mixed
 */
function jsonToArray($value)
{
    //判断是不是字符串
    if (!is_string($value)) {
        return $value;
    }
    $jsonData = json_decode($value, true);
    // 检测是否为JSON数据 true 返回JSON解析数组, false返回源数据
    return (null === $jsonData) ? $value : $jsonData;
}

/**
 * 判断是否是数组或者对象，转化成json字符串
 * @param $value
 * @return mixed
 */
function ToJsonString($value)
{
    //对数组/对象数据进行缓存处理，保证数据完整性
    return $value = (is_object($value) || is_array($value)) ? json_encode($value) : $value;
}

if (!function_exists('dstrpos')) {
    function dstrpos($string, $arr, $returnvalue = false)
    {
        if (empty($string)) return false;
        foreach ((array)$arr as $v) {
            if (strpos($string, $v) !== false) {
                $return = $returnvalue ? $v : true;
                return $return;
            }
        }
        return false;
    }
}

//判断是否是蜘蛛、机器人
if (!function_exists('is_robot')) {
    function is_robot()
    {
        static $_robot = null;
        if (is_null($_robot)) {
            $kw_spiders = array('bot', 'crawl', 'spider', 'slurp', 'sohu-search', 'lycos', 'robozilla');
            $kw_browsers = array('msie', 'netscape', 'opera', 'konqueror', 'mozilla');
            $useragent = strtolower($_SERVER['HTTP_USER_AGENT']);
            if (strpos($useragent, 'http://') === false && dstrpos($useragent, $kw_browsers)) {
                $_robot = false;
            };
            if (dstrpos($useragent, $kw_spiders)) {
                $_robot = true;
            };
        }
        return $_robot;
    }
}
/**
 * 获取客户端IP地址
 * @param integer $type 返回类型 0 返回IP地址 1 返回IPV4地址数字
 * @param boolean $custom 是否使用进行自定义,使用取值自定义配置的方式否则为直接取REMOTE_ADDR
 * @return mixed
 */
if (!function_exists('get_client_ip')) {
    function get_client_ip($type = 0, $custom = true)
    {
        $type = $type ? 1 : 0;
        static $ip = NULL;
        if ($ip !== NULL) return $ip[$type];
        if ($custom) {
            //IP获取函数get_client_ip()取值顺序自定义配置 从配置文件读取
            //样例 HTTP_CF_CONNECTING_IP,HTTP_X_REAL_IP,HTTP_X_FORWARDED_FOR,HTTP_CLIENT_IP,REMOTE_ADDR
            $GET_IP_VARS_ORDER_ARR = explode(',', config('get_ip_vars_order'));
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
}


