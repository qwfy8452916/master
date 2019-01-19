<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------
namespace Util;

class Page
{
    public $firstRow; // 起始行数
    public $listRows; // 列表每页显示行数
    public $parameter; // 分页跳转时要带的参数
    public $totalRows; // 总行数
    public $totalPages; // 分页总页面数
    public $rollPage = 11;// 分页栏每页显示的页数
    public $lastSuffix = true; // 最后一页是否显示总页数

    private $p = 'p'; //分页参数名
    private $url = ''; //当前链接URL
    public $nowPage = 1;

    // 分页显示定制
    private $config = array(
        'header' => '<div class="total">共搜索到<span class="p-total-num"> %TOTAL_ROW% </span>条数据</div>',
        'prev' => '<',
        'next' => '>',
        'first' => '1...',
        'last' => '...%TOTAL_PAGE%',
        'total_title' => '%HEADER%',
        'theme' => '%FIRST% %UP_PAGE% %LINK_PAGE% %DOWN_PAGE% %END% ',
    );

    /**
     * 架构函数
     * @param array $totalRows 总的记录数
     * @param array $listRows 每页显示记录数
     * @param array $parameter 分页跳转的参数
     */
    public function __construct($totalRows, $listRows = 20, $parameter = array())
    {
        /* 基础设置 */
        $this->totalRows = $totalRows; //设置总记录数
        $this->listRows = $listRows;  //设置每页显示行数
        $this->parameter = empty($parameter) ? $_GET : $parameter;
        $this->nowPage = empty($_GET[$this->p]) ? 1 : intval($_GET[$this->p]);
        $this->nowPage = $this->nowPage > 0 ? $this->nowPage : 1;
        $this->firstRow = $this->listRows * ($this->nowPage - 1);
    }

    /**
     * 定制分页链接设置
     * @param string $name 设置名称
     * @param string $value 设置值
     */
    public function setConfig($name, $value)
    {
        if (isset($this->config[$name])) {
            $this->config[$name] = $value;
        }
    }

    /**
     * 生成链接URL
     * @param  integer $page 页码
     * @return string
     */
    private function url($page)
    {
        return str_replace(urlencode('[PAGE]'), $page, $this->url);
    }

    /**
     * 组装分页链接
     * @return string
     */
    public function show()
    {
        if (0 == $this->totalRows) return '';
        // /* 生成URL */
        $p = $this->p;
        $this->url = $_SERVER['REQUEST_URI'] . (strpos($_SERVER['REQUEST_URI'], '?') ? '' : "?");
        $parse = parse_url($this->url);
        if (isset($parse['query'])) {
            parse_str($parse['query'], $params);
            unset($params[$p]);
            foreach ($params as $key => $value) {
                $params[$key] = remove_xss($value);
            }
            $this->url = $parse['path'] . '?' . http_build_query($params);
        }
        //如果是？结尾，去掉？
        $reg = '/\?$/';
        preg_match($reg, $this->url, $m);
        if (empty($m[0])) {
            $this->url = $this->url . "&";
        }

        /* 计算分页信息 */
        $this->totalPages = ceil($this->totalRows / $this->listRows); //总页数
        if (!empty($this->totalPages) && $this->nowPage > $this->totalPages) {
            $this->nowPage = $this->totalPages;
        }

        /* 计算分页临时变量 */
        $now_cool_page = $this->rollPage / 2;
        $now_cool_page_ceil = ceil($now_cool_page);
        $this->lastSuffix && $this->config['last'] = $this->totalPages;

        //上一页
        $up_row = $this->nowPage - 1;

        $up_page = $up_row > 0 ? '<li><a class="p-prev" href="' . $this->url . $p . "=" . $up_row . '">' . $this->config['prev'] . '</a></li>' : '';

        //下一页
        $down_row = $this->nowPage + 1;
        $down_page = ($down_row <= $this->totalPages) ? '<li><a class="p-next" href="' . $this->url . $p . "=" . $down_row . '">' . $this->config['next'] . '</a></li>' : '';

        //第一页
        $the_first = '';
        if ($this->totalPages > $this->rollPage && ($this->nowPage - $now_cool_page) >= 1) {
            $the_first = '<li><a class="p-first" href="' . $this->url . $p . "=1" . '">' . $this->config['first'] . '</a></li>';
        }

        //最后一页
        $the_end = '';
        if ($this->totalPages > $this->rollPage && ($this->nowPage + $now_cool_page) < $this->totalPages) {
            $the_end = '<li><a class="p-end" href="' . $this->url . $p . "=" . $this->totalPages . '">' . $this->config['last'] . '</a></li>';
        }

        //数字连接
        $link_page = "";
        for ($i = 1; $i <= $this->rollPage; $i++) {
            if (($this->nowPage - $now_cool_page) <= 0) {
                $page = $i;
            } elseif (($this->nowPage + $now_cool_page - 1) >= $this->totalPages) {
                $page = $this->totalPages - $this->rollPage + $i;
            } else {
                $page = $this->nowPage - $now_cool_page_ceil + $i;
            }
            if ($page > 0 && $page != $this->nowPage) {

                if ($page <= $this->totalPages) {
                    $link_page .= '<li><a class="num" href="' . $this->url . $p . "=" . $page . '">' . $page . '</a></li>';
                } else {
                    break;
                }
            } else {
                if ($page > 0 && $this->totalPages != 1) {
                    $link_page .= '<li class="p-current"><a href="javascript:void(0)" >' . $page . '</a></li>';
                }
            }

        }

        //分页跳转
        $skitStr = "";
        if ($this->totalPages > 1) {
            $skitStr = '&nbsp;&nbsp;到第&nbsp;<input data-size="'.$this->totalPages.'" id="skipPage" type="text" style="height: 30px;width: 50px;text-align:center; border: 1px solid #ccc;border-radius:4px;">&nbsp;页&nbsp;&nbsp;<button id="jump" class="p-jump" type="button" value='.$this->url.'>跳</button>';
        }

        //替换分页内容
        //%HEADER%
        //'%HEADER%', '%TOTAL_ROW%',
        //$this->config['header'],$this->totalRows,
        $page_title = str_replace(
            array('%HEADER%', '%TOTAL_ROW%'),
            array($this->config['header'],$this->totalRows),
            $this->config['total_title']
        );
        $page_str = str_replace(
            array('%NOW_PAGE%', '%UP_PAGE%', '%DOWN_PAGE%', '%FIRST%', '%LINK_PAGE%', '%END%', '%TOTAL_PAGE%'),
            array( $this->nowPage, $up_page, $down_page, $the_first, $link_page, $the_end,  $this->totalPages),
            $this->config['theme']);
        $page_str = trim($page_str);
        $tmp = "";
        if (!empty($page_str)) {
            $tmp = "<div class='b-owf p-page-container'><div class='p-page-title'>{$page_title}</div><div class='page-box'><div class='p-page'><ul class='p-pagination'>{$page_str}</ul><div class='turn-to'>$skitStr</div></div></div></div>";
        }else{
            $tmp = "<div class='b-owf p-page-container'><div class='p-page-title'>{$page_title}</div></div>";
        }
        return $tmp;
    }

    /**
     * 下一页地址
     * @return string
     */
    public function getPage()
    {
        /* 计算分页信息 */
        $this->totalPages = ceil($this->totalRows / $this->listRows); //总页数
        if (!empty($this->totalPages) && $this->nowPage > $this->totalPages) {
            $this->nowPage = $this->totalPages;
        }

        //下一页
        $down_row = $this->nowPage + 1;
        if($down_row >  $this->totalPages){
            $down_row = 0;
        }
        return $down_row;

    }
}