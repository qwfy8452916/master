<?php
class MobilePage {
    public $pageIndex = 0;//开始页数
    private $pageCount = 10;//每页显示数量
    private $pageRowCount = 0;//总记录数
    public $pageTotalCount = 0;//总页数
    private $link="";//分页链接
    private $nowPage = 0;//当前页数
    private $myConfig = array();//自定义配置
    private $extra = null;//自定义额外的参数
    private $prefix = "";//自定义后缀

    // 默认分页显示定制
    public $config  = array(
        'header' => '<span class="pageheader">共 %TOTAL_ROW% 条记录</span>',
        'prev'   => '<div id="prev-page" ><a href="%LINK%" class="page-change">上一页</a></div>',
        'next'   => '<div id="next-page" class="red-active"><a href="%LINK%" class="page-change">下一页</a></div>',
        'theme'  => '%PREV% %FIRST% %LINK_PAGE% %LAST% %NEXT% %DOWN_PAGE% %HEADER%'
    );

    public function __construct($pageIndex,$pageCount,$pageRowCount,$config = "",$prefix,$extra){
        $this->pageIndex = intval($pageIndex)<=0?1:intval($pageIndex);
        $this->pageCount = $pageCount;
        $this->pageRowCount = $pageRowCount;
        $this->myConfig = $config;
        $this->extra = $extra;
        $this->prefix = $prefix;
    }

     /**
     * 移动版分页
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
        $pageLink = $parse_url["path"];
        if($this->pageRowCount > 0){
            //如果是斜杠结尾，去掉斜杠
            if(substr($parse_url["path"],strlen($parse_url["path"])-1) == "/"){
                $parse_url["path"] = substr($parse_url["path"], 0,-1);
            }
            $this->pageTotalCount = ceil($this->pageRowCount/$this->pageCount);
            if( $this->pageIndex >= $this->pageTotalCount){
                $this->pageIndex = $this->pageTotalCount;
            }
            $buttons = "<span>".$this->pageIndex."/".$this->pageTotalCount."</span>";

            if(!empty($query_string)){
                $pageLink .= "?".$query_string."&";
            }else{
                $pageLink .= "?";
            }

            if(!empty($extra)){
                 $pageLink .= "?".$query_string."&".$extra."&";
            }

            $config = array(
                "link_page"=>$buttons,
                "header"=>str_replace("%TOTAL_ROW%", $this->pageRowCount, $this->config["header"])
                        );
            //处理上一页，下一页是否能点击
            if($this->pageIndex <= 1){
                $config['prev'] = str_replace("%LINK%",'javascript:void(0)',$this->config["prev"]);
            }else{
                $config['prev'] = str_replace("%LINK%",("http://".$pageLink."p=".($this->pageIndex-1)).(empty($query_string)?"":"?".$query_string),$this->config["prev"]);
            }
            if($this->pageIndex >= $this->pageTotalCount){
                $config['next'] = str_replace("%LINK%",'javascript:void(0)',$this->config["next"]);
            }else{
                $config['next'] = str_replace("%LINK%",("http://".$pageLink."p=".($this->pageIndex+1)),$this->config["next"]);
            }

            //当第二页的时候，第一页不使用页码参数
            if($this->pageIndex == 2){
                $config['prev'] = str_replace("%LINK%",("http://".rtrim($pageLink,'?')),$this->config["prev"]);
            }

            $exp = explode(" ",$this->config["theme"]);
            $exp = array_filter($exp);
            $exp = array_flip($exp);

            $item = array(
                    "link_page"=>$config["link_page"]
                          );
            if(gettype($this->myConfig) == "array" && count($this->myConfig) > 0){
                foreach ($this->myConfig as $key => $value) {
                  $value = strtolower($value);
                  $item[$value] = $config[$value];
                }
            }else{
                $item = $config;
            }

            $tmp = '';
            foreach ($exp as $key => $value) {
                $str = strtolower(str_replace("%", "", $key));
                if(array_key_exists($str,$item)){
                    $tmp .=$item[$str];
                }
            }

            $page ="<div class='page' id='page'>%tmp%</div>";
            if($this->pageTotalCount > 1){
                return str_replace("%tmp%", $tmp, $page);
            }
        }
    }

    /**
     * 移动版分页(带弹层)
     * @return [type] [description]
     */
    public function show2(){
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
        $pageLink = "http://".$parse_url["path"];

        if($this->pageRowCount > 0){
            // //如果是斜杠结尾，去掉斜杠
            // if(substr($parse_url["path"],strlen($parse_url["path"])-1) == "/"){
            //     $parse_url["path"] = substr($parse_url["path"], 0,-1);
            // }
            $this->pageTotalCount = ceil($this->pageRowCount/$this->pageCount);
            if( $this->pageIndex >= $this->pageTotalCount){
                $this->pageIndex = $this->pageTotalCount;
            }
            // $buttons = "<span>".$this->pageIndex."/".$this->pageTotalCount."</span>";
            $buttons = '<div id="page-count"><span id="current-page">'.$this->pageIndex.'</span>/<span id="page-num">'.$this->pageTotalCount.' <i class="fa fa-caret-down" id="goto-page"></i></span></div>';

            if(!empty($query_string)){
                $pageLink .= "?".$query_string."&";
            }else{
                $pageLink .= "?";
            }

            if(!empty($extra)){
                 $pageLink .= "?".$query_string."&".$extra."&";
            }

            $config = array(
                "link_page"=>$buttons,
                "header"=>str_replace("%TOTAL_ROW%", $this->pageRowCount, $this->config["header"])
            );

            //处理上一页，下一页是否能点击
            if($this->pageIndex <= 1){
                $config['prev'] = str_replace("%LINK%",'javascript:void(0)',$this->config["prev"]);
            }else{
                $config['prev'] = str_replace("%LINK%",($pageLink."p=".($this->pageIndex-1)).(empty($query_string)?"":"?".$query_string),$this->config["prev"]);
            }

            if($this->pageIndex >= $this->pageTotalCount){
                $config['next'] = str_replace("%LINK%",'javascript:void(0)',$this->config["next"]);
            }else{
                $config['next'] = str_replace("%LINK%",($pageLink."p=".($this->pageIndex+1)),$this->config["next"]);
            }

            //当第二页的时候，第一页不使用页码参数
            if($this->pageIndex == 2){
                $config['prev'] = str_replace("%LINK%",(rtrim($pageLink,'?')),$this->config["prev"]);
            }

            $exp = explode(" ",$this->config["theme"]);
            $exp = array_filter($exp);
            $exp = array_flip($exp);

            $item = array(
                    "link_page"=>$config["link_page"]
                          );
            if(gettype($this->myConfig) == "array" && count($this->myConfig) > 0){
                foreach ($this->myConfig as $key => $value) {
                  $value = strtolower($value);
                  $item[$value] = $config[$value];
                }
            }else{
                $item = $config;
            }

            $tmp = '<div class="page-box-container">';
            foreach ($exp as $key => $value) {
                $str = strtolower(str_replace("%", "", $key));
                if(array_key_exists($str,$item)){
                    $tmp .=$item[$str];
                }
            }
            $tmp .= "</div>";

            //添加弹出层
            $tmp .= '<div id="mask1"><div id="jump-num-box"><div class="fenye-title">分页</div><ul>';
            for ($i=1; $i <= $this->pageTotalCount ; $i++) {
                $link = $pageLink."p=".$i;
                $tmp .= '<li><a href="'.$link.'">第<span>'.$i.'</span>页</a></li>';
            }
            $tmp .= '</ul></div></div>';
            //添加弹层JS代码
            $tmp .= '<script type="text/javascript">
                        var script = document.createElement("script");
                        script.src = "http://'.C('MOBILE_DONAMES').'/assets/common/js/m-page.js";
                        var s = document.getElementsByTagName("script")[0];
                        s.parentNode.insertBefore(script, s);
                     </script>';
            $page ="<div class='page-box'>%tmp%</div>";
            if($this->pageTotalCount > 1){
                return str_replace("%tmp%", $tmp, $page);
            }
        }
    }

    //mip分页
    public function show3()
    {
        $url = $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
        $parse_url = parse_url($url);
        if (isset($parse_url["query"])) {
            $query_string = $parse_url["query"];
        }
        //正则判断是否包含P参数,包含则替换为空
        $reg = '/[\&|?]?p=([0-9]*)?.\&?/i';
        $query_string = preg_replace($reg, "", $query_string);
        //添加额外的自定义参数
        if (gettype($this->extra) == "array") {
            foreach ($this->extra as $key => $value) {
                $reg = '/[\?|&]?%s=(.*?).[\?|&]?/i';
                $reg = sprintf($reg, $key);
                $query_string = preg_replace($reg, "", $query_string);
                $extra = $key . "=" . $value;
            }
        }
        $pageLink = $parse_url["path"];
        //上一页 /下一页 链接
        if ($query_string) {
            //判断是否是第一页和最后一页
            $leftUrl = 'http://' . $pageLink . '?' . $query_string . '&p=' . $this->pageIndex;
            if ($this->pageIndex != 1) {
                $leftUrl = 'http://' . $pageLink . '?' . $query_string . '&p=' . ($this->pageIndex - 1);
            }
            $rightUrl = 'http://' . $pageLink . '?' . $query_string . '&p=' . ($this->pageIndex + 1);
            if (ceil($this->pageRowCount / $this->pageCount) == $this->pageIndex) {
                $rightUrl = 'http://' . $pageLink . '?' . $query_string . '&p=' . $this->pageIndex;
            }
            //直接选择页数 url
            $chooseUrl = 'http://' . $pageLink . '?' . $query_string . '&p=%LINK%';
        } else {
            //判断是否是第一页和最后一页
            $leftUrl = 'http://' . $pageLink . '?p=' . $this->pageIndex;
            if ($this->pageIndex != 1) {
                $leftUrl = 'http://' . $pageLink . '?p=' . ($this->pageIndex - 1);
            }
            $rightUrl = 'http://' . $pageLink . '?p=' . ($this->pageIndex + 1);
            if (ceil($this->pageRowCount / $this->pageCount) == $this->pageIndex) {
                $rightUrl = 'http://' . $pageLink . '?p=' . $this->pageIndex;
            }
            //直接选择页数 url
            $chooseUrl = 'http://' . $pageLink . '?p=%LINK%';
        }
        //上一页/下一页
        $htmlLR = '<div class="page-box">
                        <div class="page-box-container">
                            <div id="prev-page">
                                <a data-type="mip" href="' . $leftUrl . '" class="page-change">上一页</a>
                            </div>
                            <div id="next-page" class="red-active"><a data-type="mip" href="' . $rightUrl . '" class="page-change">下一页</a>
                            </div>
                        </div>
                    </div>';
//        $choosePage = '';
//        for ($i = 1; $i < (ceil($this->pageRowCount / $this->pageCount) + 1); $i++) {
//            $choosePage .= '<li>
//                                <a data-type="mip" href="' . str_replace('%LINK%', $i, $chooseUrl) . '">第<span>' . $i . '</span>页</a>
//                            </li>';
//        }
//        $chooseHTML = '<mip-lightbox id="tab-5" layout="nodisplay" class="mip-hidden">
//        <div class="fenye_list">
//            <div class="fenye-title">第' . $this->pageIndex . '页</div>
//            <ul>' . $choosePage . '</ul>
//        </div>
//    </mip-lightbox>';
//        return $htmlLR . $chooseHTML;
        return $htmlLR;
    }
}