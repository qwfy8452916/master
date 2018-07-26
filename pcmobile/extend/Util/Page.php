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
    public $rollPage = 7;// 分页栏每页显示的页数
    public $lastSuffix = true; // 最后一页是否显示总页数
    private $uri = ''; //当前链接uri不带分页参数
    private $query_string = ''; //当前链接参数字符串

    public $nowPage = 1;

    // 分页显示定制
    private $config = array(
        'header' => '<li><a href="javascript:void(0)">共 %TOTAL_PAGE% 页</a></li>',
        'prev' => '上一页',
        'next' => '下一页',
        'first' => '1...',
        'last' => '...%TOTAL_PAGE%',
        'theme' => '%UP_PAGE% %LINK_PAGE% %DOWN_PAGE% %HEADER%',
    );

    /**
     * 架构函数
     * @param array $totalRows 总的记录数
     * @param array $listRows 每页显示记录数
     * @param array $parameter 分页跳转的参数
     *  $request_url = $_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
     * $parse_url = parse_url ( $request_url );
     */
    public function __construct($totalRows, $listRows = 20, $parameter = array())
    {
        /* 基础设置 */
        $this->nowPage = 1;
        if (!$this->uri || !$this->query_string) {
            $this->query_string = $this->_setQueryString();
            $this->uri = trim($_SERVER['PATH_INFO'], '/');
            preg_match('/p\d+$/', $this->uri, $m);
            if ($m) {
                preg_match('/(?<=[p])\d+/', $this->uri, $mm);
                $this->nowPage = $mm[0];
                $this->uri = trim(preg_replace('/p\d+/', '', $this->uri), '/');
            }
        }
        $this->totalRows = $totalRows; //设置总记录数
        $this->listRows = $listRows;  //设置每页显示行数
        $this->firstRow = $this->listRows * ($this->nowPage - 1);

    }

    private function _setQueryString()
    {
        //注意次写法存在apache nginx 兼容性问题 修复方案如下
        //$this->query_string = empty($_SERVER['QUERY_STRING'])?'':'?'.$_SERVER['QUERY_STRING'];
        $request_url = $_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
        $parse_url = parse_url ( $request_url );
        $query_string = isset($parse_url['query'])?'?'.$parse_url['query']:'';
        return $query_string;
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
     * 设置伪静态的分页规则，不同分页类只需要改变此处
     * @param $num
     * @return string
     */
    public function getUrl($num)
    {
        return $full_url = 'http://' . $_SERVER['HTTP_HOST'] . '/' . $this->uri . '/p' . $num . $this->query_string;
    }

    public function getNowPage()
    {
        return $this->nowPage;
    }

    /**
     * 组装分页链接
     * @return string
     */
    public function show()
    {
        if (0 == $this->totalRows) return '';
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

        $up_page = $up_row > 0 ? '<li><a class="prev" href="' . $this->getUrl($up_row) . '">' . $this->config['prev'] . '</a></li>' : '';

        //下一页
        $down_row = $this->nowPage + 1;
        $down_page = ($down_row <= $this->totalPages) ? '<li><a class="next" href="' . $this->getUrl($down_row) . '">' . $this->config['next'] . '</a></li>' : '';

        //第一页
        $the_first = '';
        if ($this->totalPages > $this->rollPage && ($this->nowPage - $now_cool_page) >= 1) {
            $the_first = '<li><a class="first" href="' . $this->getUrl(1) . '">' . $this->config['first'] . '</a></li>';
        }

        //最后一页
        $the_end = '';
        if ($this->totalPages > $this->rollPage && ($this->nowPage + $now_cool_page) < $this->totalPages) {
            $the_end = '<li><a class="end" href="' . $this->getUrl($this->totalPages) . '">' . $this->config['last'] . '</a></li>';
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
                    $link_page .= '<li><a class="num" href="' . $this->getUrl($page) . '">' . $page . '</a></li>';
                } else {
                    break;
                }
            } else {
                if ($page > 0 && $this->totalPages != 1) {
                    $link_page .= '<li><a href="javascript:void(0)" class="current">' . $page . '</a></li>';
                }
            }
        }
        //分页跳转
        $skitStr = "";
        if ($this->totalPages > 1) {
            $skitStr = '&nbsp;&nbsp;到第&nbsp;<input id="skipPage" type="text" style="height: 30px;width: 50px; border: 1px solid #ccc;border-radius:4px;">&nbsp;页&nbsp;&nbsp;<button id="jump" class="btn btn-primary" type="button" data-total-page="' . $this->totalPages . '" value=' . $this->getUrl(1) . '>确定</button>';
        }
        //替换分页内容
        $page_str = str_replace(
            array('%HEADER%', '%NOW_PAGE%', '%UP_PAGE%', '%DOWN_PAGE%', '%FIRST%', '%LINK_PAGE%', '%END%', '%TOTAL_ROW%', '%TOTAL_PAGE%'),
            array($this->config['header'], $this->nowPage, $up_page, $down_page, $the_first, $link_page, $the_end, $this->totalRows, $this->totalPages),
            $this->config['theme']
        );
        $page_str = trim($page_str);
        $tmp = "";
        if (!empty($page_str)) {
            $tmp = "<div class='page'><ul class='pagination'>{$page_str}</ul><div class='turn-to'>$skitStr</div></div>";
        }
        return $tmp;
    }
}