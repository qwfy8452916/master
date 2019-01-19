<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------
use think\facade\Session;

// 应用公共文件


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
        $value = model('model/db/Options')->getOptionName($key, $status);
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

/**
 * author: mcj
 * 生成erp订单号
 * $source 2齐装自动给的单，3营销宝系统自主录入
 * A(auto)开头为齐装自动派单生成的订单号
 * M(M)开头为装修公司自己活得的订单，生成的单号
 */
if (!function_exists('getOrderNo')) {
    function getOrderNo($source = 2)
    {
        $prefix = 'A';
        if ($source === 3) {
            $prefix = 'M';
        }
        $order_no = $prefix . date('Ymd') . sprintf("%05d%03d", time() % 86400, mt_rand(1, 1000));
        return $order_no;
    }
}
/**
 * author: mcj
 * 获取以为数组中的key
 */
if (!function_exists('array_only')) {

    function array_only($array, $keys)
    {
        return array_intersect_key($array, array_flip((array)$keys));
    }
}


/**
 * 获取数组中需要的字段(原array_column()函数 , 因为现数据库查询出数据为对象,无法使用)
 * @param $data
 * @param $field
 * @return array
 */
if (!function_exists('getArrayFList')) {
    function getArrayFList($data, $field)
    {
        $returnData = [];
        foreach ($data as $k => $v) {
            if (isset($v[$field]) && $v[$field]) {
                $returnData[] = $v[$field];
            } elseif (isset($data[$field]) && $data[$field]) {
                $returnData[] = $data[$field];
            }
        }
        return $returnData;
    }
}

/**
 * [build_tree 递归获取多级分类树形结构]
 * @param $root [根节点ID]
 * @param $results [需要获取的全部结果集]
 * @param string $node [父节点ID的字段名]
 * @param string $children
 * @param int $level
 * @return array|null
 */
function build_tree($root, $results, $node = 'parent', $children = 'children', $level = 1)
{
    $childs = array();
    foreach ($results as $k => $v) {
        if ($v[$node] == $root) {
            $v['level'] = $level;
            $childs[] = $v;
        }
    }

    if (empty($childs)) {
        return null;
    }

    foreach ($childs as $k => $v) {
        $rescurTree = build_tree($v["id"], $results, $node, $children, $level + 1);
        if (null != $rescurTree) {
            $childs[$k][$children] = $rescurTree;
        }
    }

    return $childs;
}

/**
 * 获取按钮权限是否显示
 * @param string $path
 * @return bool
 */
function btnRule($path = '')
{
    //只有是用户,才需要判断权限
    if (session('userInfo.class_type') == 2) {
        $menuLogic = new \app\common\model\logic\MenuLogic();
        if (isset($path) && !empty($path)) {
            $menu = $menuLogic->getRbacMenuList();
            if (substr($path, -1) != '/') {
                $path = $path . '/';
            }
            $status = $menuLogic->checkMenu($path, $menu);
            if ($status) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    return true;
}
