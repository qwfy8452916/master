<?php
namespace Mip\Controller;
use Mip\Common\Controller\MipBaseController;

class ZixunController extends MipBaseController
{
    public function index()
    {
        $category = I('get.category');
        $pageIndex = I('get.page');

        $pageCount =10;

        if(empty($category)){
            $category = 'bendi';
        }

        if(empty($pageIndex)){
            $pageIndex = 1;
        }


        //添加canonical标签
        $url_arr = explode("/", $_SERVER['REQUEST_URI']);
        $info['header']['canonical'] = 'http://' . $url_arr[1] . '.' . C('QZ_YUMING') . '/' . $url_arr[2] . '/' . $category;

        $categoryInfo = D("Infotype")->getTypeInfoByshortname($category);
        if(count($category) == 0 || !$categoryInfo["enabled"]){
            $this->_error();
        }
        $keys = $this->getSEOMeta($category,$categoryInfo);

        $articles = $this->getZxArticleList($categoryInfo["id"],$this->cityInfo['id'],$pageIndex,$pageCount,$keyword);
        $info['list'] = $articles['articles'];
        $info['pageCount'] = ceil($articles['count'] / $pageCount);
        $info['page'] = $pageIndex;

        //dump($info['pageCount']);

        if($pageIndex > '1'){
            $info['prevUrl'] = '/'.$this->cityInfo['bm'].'/zxinfo/list-'.$category.'-'.($pageIndex - 1) .'.html';
        }
        if($pageIndex < $info['pageCount']){
            $info['nextUrl'] = '/'.$this->cityInfo['bm'].'/zxinfo/list-'.$category.'-'.($pageIndex + 1) .'.html';
        }

        //菜单栏分配样式
        if(strpos($_SERVER['REQUEST_URI'], 'bendi')){
            $bendi = "active-menu";
        }elseif(strpos($_SERVER['REQUEST_URI'], 'jingyan')){
            $jingyan = "active-menu";
        }elseif(strpos($_SERVER['REQUEST_URI'], 'daogou')){
            $daogou = "active-menu";
        }elseif(strpos($_SERVER['REQUEST_URI'], 'gongsi')){
            $gongsi = "active-menu";
        }

        $this->assign("canonical", $_SERVER['REQUEST_URI']);
        $this->assign("bendi", $bendi);
        $this->assign("jingyan", $jingyan);
        $this->assign("daogou", $daogou);
        $this->assign("gongsi", $gongsi);
        $this->assign("head", $keys);
        $this->assign("info",$info);
        $this->assign("keys",$keys);
        $this->assign("category",$categoryInfo["name"]);
        $this->display();
    }

    public function content(){
        $qid = I("get.id");
        $cityInfo = $this->cityInfo;
        $id = I('get.id');

        empty($id) && $this->_error();

        $article = $this->getArticleInfo($id,$cityInfo["id"]);


        if(count($article) > 0){
            empty($article["now"]) && $this->_error();
            $articleInfo["article"] = $article;


            //  //处理文章中所有的style标签
            $pattern ='/style\=["|\'].*?["|\']/is';
            $articleInfo["article"]["now"]["content"] =   preg_replace_callback($pattern, function(){
                    return "";
                }, $articleInfo["article"]["now"]["content"]);

            //去除宽宽属性
            $pattern = '/width\=["|\'].*?["|\']/is';
            $articleInfo["article"]["now"]["content"] =   preg_replace_callback($pattern, function(){
                    return "";
                }, $articleInfo["article"]["now"]["content"]);


            //去除宽高属性
            $pattern = '/height\=["|\'].*?["|\']/is';
            $articleInfo["article"]["now"]["content"] =   preg_replace_callback($pattern, function(){
                    return "";
                }, $articleInfo["article"]["now"]["content"]);


            //替换IMG为mip-img
            $pattern ='/<img(.*?)[\/]?>/is';
            preg_match_all($pattern,$articleInfo["article"]["now"]["content"],$matches);

            if (count($matches) > 0) {
                foreach ($matches[0] as $key => $value) {
                    $articleInfo["article"]["now"]["content"] = str_replace($value,"<mip-img".$matches[1][$key]."></mip-img>",$articleInfo["article"]["now"]["content"]);


                    $articleInfo["article"]["now"]["content"] = str_replace($value,"<mip-img".$matches[1][$key]."></mip-img>",$articleInfo["article"]["now"]["content"]);
                }
            }

            //添加所有的a便签data-type='mip'属性
            $pattern ='/<a(.*?)>/is';
            preg_match_all($pattern,$articleInfo["article"],$matches);

            if (count($matches) > 0) {
                foreach ($matches[0] as $key => $value) {
                    $articleInfo["article"]["now"]["content"] = str_replace($value,"<a ".$matches[1][$key]." data-type='mip'",$articleInfo["article"]["now"]["content"]);
                }
            }

            //精彩推荐
            $classid = $article['now']['classid'];
            $topArticle = $this->getTopArticleInfo($id,$classid,$cityInfo["id"]);
            $articleInfo["topArticle"] = $topArticle;

            //获取看过本文的还看过的文章
            $recommendArticles = $this->getRecommendArticles($articleInfo["article"]["now"]['classid'],12,$cityInfo["id"]);
            $articleInfo["recommendArticles"] = $recommendArticles;
        }

        //判断该文章是否是该城市的文章
        if ($articleInfo['article']['now']['cs'] != $this->cityInfo['id']) {
            $this->_error();
        }

        //计算真实浏览量
        //导入扩展文件
        //判断是否是搜索引擎蜘蛛
        $robotIsTrue = B("Common\Behavior\RobotCheck");
        if($robotIsTrue === false){
            $ips = OP("ignore_ips");
            $iparr = explode(',', $ips);
            foreach ($iparr as $k => $v) {
                $iparr[$k] = ip2long($v);
            }
            import('Library.Org.Util.App');
            $app = new \App();
            $ip = $app->get_client_ip();
            //本地IP  223.112.69.58 屏蔽掉，不统计
            $ip1 = ip2long($ip);
            //$ip2 = ip2long("223.112.69.58");
            if(!in_array($ip1, $iparr)){
                $visitid = I("get.id");
                $today = date("Y-m-d",time());
                $timeend = strtotime(($today.' 23:59:59'));
                $timelong = $timeend - time();
                //S('Cache:gonglue:'.$_SERVER['REMOTE_ADDR'].$id,'1',900);
                $status = S('Cache:SubArticle:'.$ip.$visitid);
                if($status != 1){
                    //没有访问记录，浏览量+1，生成新缓存（根据ip.文章ID）
                    D("Littlearticle")->updateRealView($visitid);
                    S('Cache:SubArticle:'.$ip.$visitid,1,$timelong);
                }
            }
        }

        //百度官方号需求
        $baidu['url'] = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        $articleInfo['article']['now']['content'] = str_replace(array("&nbsp;","&amp;nbsp;","\t","\r\n","\r","\n"),array("","","","","",""), $articleInfo['article']['now']['content']);
        $baidu['str'] = mb_substr(strip_tags($articleInfo['article']['now']['content']), 0, 100, 'utf-8');
        $optimee =date("Y-m-d",$articleInfo['article']["now"]['addtime']);
        $optimes =date("H:i:s",$articleInfo['article']["now"]['addtime']);
        $baidu['optime'] = $optimee."T".$optimes;
//        $baidu['optime'] = date("Y-m-d H:i:s", $articleInfo['article']['now']['addtime']);
        $images =explode(",",$articleInfo['article']["now"]['img']);
        $baidu_title = $articleInfo["article"]["now"]["title"];
        $this->assign("baidu_title", $baidu_title);
        $this->assign("images", $images);
        $this->assign("baidu",$baidu);

        $cityInfo = $this->cityInfo;

        //获取该分类的分类信息
        $keys["title"] = $articleInfo["article"]["now"]["title"] . '-' . $cityInfo['name'] . '齐装网';
        $keys["keywords"] =$articleInfo["article"]["now"]["keywords"];
        $keys["description"] = $articleInfo["article"]["now"]["description"];

        //添加canonical标签
        $info['header']['canonical'] = 'http://' . $cityInfo['bm'] .'.'. C('QZ_YUMING') . '/zxinfo/'. $qid . '.html';


        //百度官方号需求
        $baidu['url'] = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        $optimee =date("Y-m-d",$articleInfo['article']["now"]['addtime']);
        $optimes =date("H:i:s",$articleInfo['article']["now"]['addtime']);
        $baidu['optime'] = $optimee."T".$optimes;
//        $baidu['optime'] = date("Y-m-d H:i:s", $articleInfo['article']['now']['addtime']);
        $images =explode(",",$articleInfo['article']["now"]['img']);
        $this->assign("images", $images);
        $this->assign("baidu",$baidu);

        //更新阅读量
        D("Littlearticle")->updatePv(I("get.id"));

        //流量部推广统计
        $this->promoStats($id);
        $this->assign("canonical", $_SERVER['REQUEST_URI']);
        $this->assign("info", $info);
        $this->assign("head", $keys);
        $this->assign("keys",$keys);
        $this->assign("articleInfo",$articleInfo);
        $this->display();
    }




    /**
     * Gets the seo meta.
     *
     * @param      string  $category  The category
     *
     * @return     array  The seo meta.
     */
    public function getSEOMeta($category,$categoryInfo){
        if($category == 'bendi'){
            $keys["title"] = sprintf($categoryInfo["title"],$this->cityInfo["name"],$this->cityInfo["name"],$this->cityInfo["name"],$this->cityInfo["name"]);
            $keys["description"] =sprintf($categoryInfo["description"],$this->cityInfo["name"]);
            $keys["keywords"] = sprintf($categoryInfo["keywords"],$this->cityInfo["name"],$this->cityInfo["name"],$this->cityInfo["name"]);
            $keys['bendi'] = ' class="ask-active"';
        }elseif($category == 'jingyan'){
            $keys["title"] = sprintf($categoryInfo["title"],$this->cityInfo["name"],$this->cityInfo["name"],$this->cityInfo["name"]);
            $keys["description"] =sprintf($categoryInfo["description"],$this->cityInfo["name"]);
            $keys["keywords"] = $categoryInfo["keywords"];
            $keys['jingyan'] = ' class="ask-active"';
        }elseif($category == 'daogou'){
            $keys["title"] = sprintf($categoryInfo["title"],$this->cityInfo["name"],$this->cityInfo["name"],$this->cityInfo["name"]);
            $keys["description"] = $categoryInfo["description"];
            $keys["keywords"] = sprintf($categoryInfo["keywords"],$this->cityInfo["name"],$this->cityInfo["name"],$this->cityInfo["name"]);
            $keys['daogou'] = ' class="ask-active"';
        }elseif($category == 'gongsi'){
            $keys["title"] = sprintf($categoryInfo["title"],$this->cityInfo["name"],$this->cityInfo["name"],$this->cityInfo["name"]);
            $keys["description"] = sprintf($categoryInfo["description"],$this->cityInfo["name"],$this->cityInfo["name"]);
            $keys["keywords"] = sprintf($categoryInfo["keywords"],$this->cityInfo["name"],$this->cityInfo["name"]);
            $keys['gongsi'] = ' class="ask-active"';
        }

        return $keys;
    }



    /**
     * 获取资讯列表页文章列表
     * @param  string  $id        [分类编号]
     * @param  integer $pageIndex [description]
     * @param  integer $pageCount [description]
     * @param  boolean $isTop     [是否置顶]
     * @return [type]             [description]
     */
    private function getZxArticleList($category='',$cs,$pageIndex=1,$pageCount=5,$keyword ="",$isTop=true){
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Littlearticle")->getArticleListCount($category,$cs);


        if($count > 0){
            $result = D("Littlearticle")->getArticleList($category,$cs,($pageIndex-1)*$pageCount,$pageCount);
            foreach ($result as $key => $value) {
                $title = strstr($value["title"],"_",true);
                if($title !== false){
                    $result[$key]["title"] = $title;
                }
                $result[$key]["img_host"] = "qiniu";
                if(!empty($value["img"])){
                    $exp = explode(",", $value["img"]);
                    $exp = array_filter($exp);
                    foreach ($exp as $k => $val) {
                        if(!strpos($val,C('QINIU_DOMAIN'))){
                            $path ="http://".C('STATIC_HOST1')."/".$val;
                            $exp[$k]  = $path;
                        }
                    }
                    $result[$key]["img"] = $exp;
                }
            }
            return array("articles"=>$result,"count"=>$count);
        }
    }



    /**
     * 获取文章信息
     * @param  [type] $id       [文章编号]
     * @param  [type] $category [文章类别]
     * @return [type]           [description]
     */
    private function getArticleInfo($id,$cs){
        $result =  D("Littlearticle")->getLittleArticleInfo($id,$cs);
        foreach ($result as $key => $value) {
            if(!array_key_exists($value["action"], $articleInfo)){
                $title = strstr($value["title"],"_",true);
                if($title !== false){
                    $value["title"] = $title;
                }
                $articleInfo[$value["action"]] = $value;
            }
        }


        return $articleInfo;
    }

    /**
     * 获取推荐的文章列表
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    private function getTopArticleInfo($id,$category,$cs){
        $result = D("Littlearticle")->getTopArticleInfo(8,$id,$category,$cs);
        foreach ($result as $key => $value) {
            $title = strstr($value["title"],"_",true);
            if($title !== false){
                $result[$key]["title"] = $title;
            }
        }
        return $result;
    }

    /**
     * 获取推荐的文章
     * @param  [type] $classid [description]
     * @param  [type] $limit   [description]
     * @return [type]          [description]
     */
    private function getRecommendArticles($classid,$limit,$cs){
        //获取相同分类的点击量最高的文章
        $recommendArticles = D("Littlearticle")->getRecommendArticles("",100,$cs);

        if(count($recommendArticles) > 0){
            shuffle($recommendArticles);
            $recommendArticles = array_slice($recommendArticles,0,$limit);
        }
        foreach ($recommendArticles as $key => $value) {
            $title = strstr($value["title"],"_",true);
            if($title !== false){
                $recommendArticles[$key]["title"] = $title;
            }
        }
        return $recommendArticles;
    }



    //流量部推广统计
    public function promoStats($id){
        //获取Cookie
        $isMark = cookie('contentPromoMark');

        //如果Cookie不存在
        if(empty($isMark['module'])){
            //过期时间 = 今天最后一秒时间戳 - 当前时间戳
            $expireTime = strtotime(date('Y-m-d').' 23:59:59') - time();
            $cookieVar = array('module' => 'subarticle','id' => $id);
            //指定cookie保存时间
            cookie('contentPromoMark',$cookieVar, array('expire' => $expireTime,'domain' => '.'.C('QZ_YUMING')));
        }
    }


}