<?php
class Page {
    public $pageIndex = 0;//开始页数
    private $pageCount = 10;//每页显示数量
    private $pageRowCount = 0;//总记录数
    private $pageTotalCount = 0;//总页数
    private $link="";//分页链接
    private $nowPage = 0;//当前页数
    private $myConfig = array();//自定义配置
    private $extra = null;//自定义额外的参数
    // 默认分页显示定制
    public $config  = array(
        'header' => '<span class="pageheader">共 %TOTAL_ROW% 条记录</span>',
        'prev'   => '<a href="%LINK%">上一页</a>',
        'next'   => '<a href="%LINK%" class="next">下一页</a>',
        'first'  => '<a href="%LINK%" class="first">首页</a>',
        'last'   => '<a href="%LINK%" class="last">末页</a>',
        'down_page' =>'<em>到第</em><input type="text" size="3" maxlength="3" class="pageInput" /><em>页</em> <a href="javascript:void(0)" id="pageSearch">确定</a>',
        'theme'  => '%PREV% %FIRST% %LINK_PAGE% %LAST% %NEXT% %DOWN_PAGE% %HEADER%'
    );

    public function __construct($pageIndex,$pageCount,$pageRowCount,$config = "",$extra){
        $this->pageIndex = intval($pageIndex)<=0?1:$pageIndex;
        $this->pageCount = $pageCount;
        $this->pageRowCount = $pageRowCount;
        $this->myConfig = $config;
        $this->extra = $extra;
    }

    public function getPageIndex(){
        if( $this->pageIndex >= $this->pageTotalCount){
            $pageIndex = $this->pageTotalCount;
        }
        return $pageIndex;
    }


    /**
     * 显示新的分页模版
     * @return [type] [description]
     */
    public function show_short($url,$count){
        $this->pageRowCount = $count;
        if($this->pageRowCount > 0){
            $http_url = $_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
            //正则判断是否包含P参数,包含则替换为空
            $reg = '/p=([0-9]*)?.\&?/i';
            $http_url = preg_replace($reg, "", $http_url);

            $parse_url = parse_url($http_url);
            $isShort = false;
            if(empty($parse_url["query"])){
                $reg  = '/list-[a-z0-9]+/i';
                preg_match_all($reg, $url["short_url"] ,$matches);
                if(count($matches[0]) > 0){
                    $url = $url["short_url"];
                    $isShort = true;
                }else{
                    //不存在get参数
                    $url = $url["url"];
                    $url .="?";
                }
            }else{

                $url = $url["url"];
                $url .="&";
            }

            $this->pageTotalCount = ceil($this->pageRowCount/$this->pageCount);
            if( $this->pageIndex >= $this->pageTotalCount){
                $this->pageIndex = $this->pageTotalCount;
            }

            $i = $this->pageIndex;
            if($this->pageIndex <=10){
                $i = 1;
            }else{
                $i = $this->pageIndex;
                if($i >= ($this->pageTotalCount - 9)){
                    $i = $this->pageTotalCount - 9;
                }
            }

            if($this->pageTotalCount > 10){
                $end = $i+10;
            }else{
                $end = $this->pageTotalCount+1;
            }

            for(;$i < $end;$i++) {
                if($i == $this->pageIndex){
                    $button = "<a href='%LINK%' class='current'>$i</a> ";
                }else{
                    $button = "<a href='%LINK%'>$i</a>";
                }
                if( $isShort){
                    $query_string = $url."p".$i;
                }else{
                    $query_string = $url."p=".$i;
                }

                $button = str_replace("%LINK%",$query_string,$button);
                $buttons .=$button;
            }

            $exp = explode(" ",$this->config["theme"]);
            $exp = array_filter($exp);
            $exp = array_flip($exp);
            if($isShort){
                $config = array(
                    "prev"=>str_replace("%LINK%",$url."p".($this->pageIndex-1),$this->config["prev"]),
                    "first"=>str_replace("%LINK%",$url."p1",$this->config["first"]),
                    "link_page"=>$buttons,
                    "last"=>str_replace("%LINK%",$url."p".$this->pageTotalCount,$this->config["last"]),
                    "next"=>str_replace("%LINK%",$url."p".($this->pageIndex+1),$this->config["next"]),
                    "down_page"=>$this->config["down_page"],
                    "header"=>str_replace("%TOTAL_ROW%", $this->pageRowCount, $this->config["header"])
                            );
            }else{
                $config = array(
                    "prev"=>str_replace("%LINK%",$url."p=".($this->pageIndex-1),$this->config["prev"]),
                    "first"=>str_replace("%LINK%",$url."p1",$this->config["first"]),
                    "link_page"=>$buttons,
                    "last"=>str_replace("%LINK%",$url."p".$this->pageTotalCount,$this->config["last"]),
                    "next"=>str_replace("%LINK%",$url."p=".($this->pageIndex+1),$this->config["next"]),
                    "down_page"=>$this->config["down_page"],
                    "header"=>str_replace("%TOTAL_ROW%", $this->pageRowCount, $this->config["header"])
                            );
            }


            $item = array(
                    "link_page"=>$config["link_page"]
                          );

            if(gettype($this->myConfig) == "array" && count($this->myConfig) > 0){
              // $myConfig = array_flip($this->myConfig);
              foreach ($this->myConfig as $key => $value) {
                  $value = strtolower($value);
                  $item[$value] = $config[$value];
              }
            }else{
                $item = $config;
            }

            if($this->pageIndex <= 10){
                if(array_key_exists("%PREV%", $exp)){
                    unset($exp["%PREV%"]);
                }
            }
            if($this->pageIndex >= $this->pageTotalCount ||  $this->pageTotalCount ==1){
                if(array_key_exists("%NEXT%", $exp)){
                    unset($exp["%NEXT%"]);
                }
            }
            $tmp = '';
            foreach ($exp as $key => $value) {
                $str = strtolower(str_replace("%", "", $key));
                if(array_key_exists($str,$item)){
                    $tmp .=$item[$str];
                }
            }
            $page ="<div class='page'>%tmp%</div>";
            if(array_key_exists("down_page", $item)){
                $script = '<script>$("#pageSearch").click(function(){
                                var p = $(".pageInput").val();
                                var reg = /^[0-9]+$/gi;
                                if(!p.match(reg)){
                                    return false;
                                }
                                window.location.href = "'.$pageLink.'p="+p;
                            });</script>';
                $page .=$script;
            }
            $page ="<div class='page'>%tmp%</div>";
            if(array_key_exists("down_page", $item)){
                $script = '<script>$("#pageSearch").click(function(){
                                var p = $(".pageInput").val();
                                var reg = /^[0-9]+$/gi;
                                if(!p.match(reg)){
                                    return false;
                                }
                                window.location.href = "'.$pageLink.'p="+p;
                            });</script>';
                $page .=$script;
            }

            if($this->pageTotalCount > 1){
                return str_replace("%tmp%", $tmp, $page);
            }

        }
    }

    /**
     * 显示分页模版
     * @return [type] [description]
     */
    public function show(){
        $url = $_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
        $parse_url = parse_url ( $url );
        if(isset($parse_url["query"])){
            $query_string = $parse_url["query"];
        }

        //正则判断是否包含P参数,包含则替换为空
        $reg = '/p=([0-9]*)?.\&?/i';
        $query_string = preg_replace($reg, "", $query_string);

        //添加额外的自定义参数
        if(gettype($this->extra) == "array"){
            foreach ($this->extra as $key => $value) {
                $reg = '/[\?|&]?%s=(.*?).[\?|&]?/i';
                $reg = sprintf($reg,$key);
                $query_string = preg_replace($reg, "", $query_string);
                $extra = $key."=".$value;
            }
        }

        if($this->pageRowCount > 0){
            $link = $parse_url["path"];
            $this->pageTotalCount = ceil($this->pageRowCount/$this->pageCount);
            if( $this->pageIndex >= $this->pageTotalCount){
                $this->pageIndex = $this->pageTotalCount;
            }
            $buttons = "" ;
            $i = $this->pageIndex;
            if($this->pageIndex <=10){
                $i = 1;
            }else{
                $i = $this->pageIndex;
                if($i >= ($this->pageTotalCount - 9)){
                    $i = $this->pageTotalCount - 9;
                }
            }

            if($this->pageTotalCount > 10){
                $end = $i+10;
            }else{
                $end = $this->pageTotalCount+1;
            }

            for(;$i < $end;$i++) {
                if($i == $this->pageIndex){
                    $button = "<a href='%LINK%' class='current'>$i</a>";
                }else{
                    $button = "<a href='%LINK%'>$i</a>";
                }
                if(!empty($query_string)){
                    $pageLink = "?".$query_string."&p=$i";
                }else{
                    $pageLink = "?p=$i";
                }
                if(!empty($extra)){
                    $pageLink .= "&".$extra;
                }
                $button = str_replace("%LINK%",$pageLink,$button);
                $buttons .=$button;
            }

            //%PREV% %FIRST% %LINK_PAGE% %LAST% %NEXT% %DOWN_PAGE% %HEADER%

            if(!empty($query_string)){
                $pageLink = "?".$query_string."&";
            }else{
                $pageLink = "?";
            }

            if(!empty($extra)){
                 $pageLink = "?".$query_string."&".$extra."&";
            }

            $exp = explode(" ",$this->config["theme"]);
            $exp = array_filter($exp);
            $exp = array_flip($exp);
            $config = array(
                    "prev"=>str_replace("%LINK%","http://".$link.$pageLink."p=".($this->pageIndex-1),$this->config["prev"]),
                    "first"=>str_replace("%LINK%","http://".$link.$pageLink."p=1",$this->config["first"]),
                    "link_page"=>$buttons,
                    "last"=>str_replace("%LINK%","http://".$link.$pageLink."p=".$this->pageTotalCount,$this->config["last"]),
                    "next"=>str_replace("%LINK%","http://".$link.$pageLink."p=".($this->pageIndex+1),$this->config["next"]),
                    "down_page"=>$this->config["down_page"],
                    "header"=>str_replace("%TOTAL_ROW%", $this->pageRowCount, $this->config["header"])
                            );

            $item = array(
                    "link_page"=>$config["link_page"]
                          );
            if(gettype($this->myConfig) == "array" && count($this->myConfig) > 0){
              // $myConfig = array_flip($this->myConfig);
              foreach ($this->myConfig as $key => $value) {
                  $value = strtolower($value);
                  $item[$value] = $config[$value];
              }
            }else{
                $item = $config;
            }

            if($this->pageIndex <= 10){
                if(array_key_exists("%PREV%", $exp)){
                    unset($exp["%PREV%"]);
                }
            }
            if($this->pageIndex >= $this->pageTotalCount ||  $this->pageTotalCount ==1){
                if(array_key_exists("%NEXT%", $exp)){
                    unset($exp["%NEXT%"]);
                }
            }
            $tmp = '';
            foreach ($exp as $key => $value) {
                $str = strtolower(str_replace("%", "", $key));
                if(array_key_exists($str,$item)){
                    $tmp .=$item[$str];
                }
            }
            $page ="<div class='page'>%tmp%</div>";
            if(array_key_exists("down_page", $item)){
                $script = '<script>$("#pageSearch").click(function(){
                                var p = $(".pageInput").val();
                                var reg = /^[0-9]+$/gi;
                                if(!p.match(reg)){
                                    return false;
                                }
                                window.location.href = "'.$pageLink.'p="+p;
                            });</script>';
                $page .=$script;
            }

            if($this->pageTotalCount > 1){
                return str_replace("%tmp%", $tmp, $page);
            }
        }
    }


}