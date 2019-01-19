<?php
/**
 * 移动版文章页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class ArticleController extends MobileBaseController{
    public function index(){
        $category =  I("get.category");
        $id = I("get.id");
        if(!empty($id) && preg_match('/\d+/i', I("get.id"))){
            $articleInfo = S('Cache:Mobile:ArticleInfo:'.$id);
            if(!$articleInfo){
                //获取分类
                if(!empty($category) && strtolower($category) != "history"){
                    //新分类
                    $category = D("WwwArticleClass")->getArticleClassByShortname($category);
                }else{
                    //老版文章
                    //获取根据文章的编号获取老版的分类
                    $category = D("WwwArticleClass")->getArticleClassByArticleId($id,'old');
                }

                if(empty($category)){
                    $this->_error();
                    die();
                }

                //文章内容
                $article = $this->getArticleInfo($id,$category["id"]);

                $articleInfo["article"] = $article;
                //精彩推荐
                $topArticle = $this->getTopArticleInfo($id);
                $articleInfo["topArticle"] = $topArticle;
                S('Cache:Mobile:ArticleInfo:'.$id,$articleInfo,3600);
            }

            if(empty($articleInfo["article"])){
                $this->_error();
            }

            //获取精彩推荐的案例
            //判断用户是否登录，登录则去用户注册城市的推荐案例
            if(isset($_SESSION["u_userInfo"])){
                //根据城市ID获取城市的BM
                $city =  D("Area")->getCityById($_SESSION["u_userInfo"]["cs"]);
                $cityInfo = array(
                            "bm"=>$city[0]["bm"]
                                  );
                $city = $_SESSION["u_userInfo"]["cs"];
            }else{
                //如果城市BM存在则取城市
                if(!empty($_COOKIE["w_cityid"])){
                    $bm = $_COOKIE["w_cityid"];
                    $city = D("Common/Quyu")->getCityIdByBm($bm);
                }
                $cityInfo = array(
                            "bm"=>$bm
                                  );

            }
            $articleInfo["title"] = "装修攻略";
            $this->assign("w_cityInfo",$cityInfo);

            $articleInfo["collect"] = false;
            //查询用户是否关注过该文章
            if(isset($_SESSION["u_userInfo"])){
                $count =  D("Usercollect")->getCollectCount(I("get.id"),$_SESSION['u_userInfo']['id'],1);
                if($count > 0){
                    $articleInfo["collect"] = true;
                }
            }

            //获取该分类的分类信息
            $keys["title"] = $articleInfo["article"]["title"];
            $keys["keywords"] =$articleInfo["article"]["keywords"];
            $keys["description"] = $articleInfo["article"]["subtitle"];

            $this->assign("keys",$keys);
            $this->assign("info",$articleInfo);
            //安全验证码
            $safe = getSafeCode();
            $this->assign("safecode",$safe["safecode"]);
            $this->assign("safekey",$safe["safekey"]);
            $this->assign("ssid",$safe["ssid"]);
            //更新文章阅读量
            D("WwwArticle")->updatePv($id);
            $this->display();
        }else{
            $this->_error();
        }
    }

     /**
     * 获取文章信息
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    private function getArticleInfo($id,$category){
        $result = D("WwwArticle")->getMobileArticleInfoById($id,$category);

        $article = array();
        foreach ($result as $key => $value) {
            if(empty($value["shortname"])){
                $value["shortname"] = "history";
                $value["classname"] ="历史资讯";
                $value["title"] = str_replace("_齐装网", "", $value["title"]);
            }
            //处理文章中的图片
            $pattern ='/<img.*?\/>/is';
            preg_match_all($pattern,$value["content"], $matches);
            if(count($matches[0]) > 0){
                foreach ($matches[0] as $k => $val) {
                    $pattern ='/src=[\"|\'](.*?)[\"|\']/is';
                    preg_match_all($pattern,$val, $m);
                    foreach ($m[1] as $j => $v) {
                        if(!strpos($v,C('QINIU_DOMAIN'))){
                            $path ="http://".C('STATIC_HOST1').$v;
                            $value["content"]  = str_replace($v,$path,$value["content"]);
                        }
                        //去水印
                        if(strpos($v, '-s3.')) {
                            $path = str_replace('-s3.', '-s5.', $v);
                            $value["content"] = str_replace($v, $path, $value["content"]);
                        }
                    }
                }
            }
            $article = $value;
        }
        return $article;
    }

    /**
     * 获取推荐的文章列表
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    private function getTopArticleInfo($id){
        $result = D("WwwArticle")->getTopArticleInfo(5,$id);
        return $result;
    }

}