<?php
namespace User\Controller;
use User\Common\Controller\UserBaseController;
class BaikeController extends UserBaseController{

    public function _initialize(){
        if(!isset($_SESSION["u_userInfo"])){
           header("LOCATION:http://u.qizuang.com");
           die();
        }


        //如果城市字段为空，则先选择所在城市
        if(empty($_SESSION["u_userInfo"]["cs"])){

            $citytmp = $this->fetch("Home/citytmp");
            $this->assign("citytmp",$citytmp);
        }
        $this->baseInfo = $this->getUserInfo($_SESSION["u_userInfo"]["id"]);
        $this->baseInfo["unreadsystem"] = $this->getUnSystemNoticeCount($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"]);
        $classid =  $this->baseInfo['classid'];
        $info["user"] = $this->baseInfo;
        $bm = $this->getQuyuByCid($info["user"]['cs']);
        $info["user"]['bm'] = $bm['bm'];
        $this->userInfo = $info;

        if($classid == 1){
            $this->assign("nav",10);
        }
        if($classid == 2){
            $this->assign("nav",10);
        }
        if($classid == 3){
            $this->assign("nav",9);
        }
        $this->assign("title","齐装网");
    }

    //首页
    public function index(){
        $info = $this->userInfo;

        $isVisible = I('get.visible');
        if(!empty($isVisible)){
            $info['hidden_style'] = 'class="active" ';

            $condition['visible'] = array("EQ",'1');
        }else{
            $info['visible_style'] = 'class="active" ';
            $condition['visible'] = array("NEQ",'5');
        }

        $pageIndex = 1;
        $pageCount = 15;
        if(!empty($_GET["p"])){
            $pageIndex = remove_xss($_GET["p"]);
        }

        $condition['orderBy'] = 'a.post_time DESC';
        $condition['uid'] = array("EQ",$info["user"]['id']);

        $result = $this->getList($condition,$pageIndex,$pageCount);

        $this->assign("list",$result['list']);
        $this->assign('page',$result['page']);
        $this->assign("info",$info);
        $this->display();
    }

    //新增百科
    public function add(){
        $info = $this->userInfo;

        //Action
        $pid = I('get.pid');
        if(!empty($pid)){
            $map['pid'] = $pid;
            $category = D('Baike')->getCategory($map);
            if(!empty($category)){
                $rt = '';
                foreach ($category as $k => $v) {
                    $rt .= '<option value="'.$v["cid"].'">'.$v["name"].'</option>';
                }
                exit($rt);
            }
            die();
        }

        $baike['title'] = '新增';

        //提交了表单
        if(IS_POST){
            $tmpPost = I('post.');
            //只取需要的，避免POST其它数据会出错
            $data['uid'] = $_SESSION["u_userInfo"]['id'];
            $data['item'] = $tmpPost['item'];
            $data['title'] = $tmpPost['item'];
            $data['tags_name'] = $tmpPost['tags'];
            $data['cid'] = $tmpPost['bigcate'];
            $data['sub_category'] = $tmpPost['subcate'];
            $data['description'] = $tmpPost['description'];
            $data['content'] = nl2br($_POST['editorValue']);

            $data['visible'] = '1';
            $data['post_time'] = time();
            $data['source'] = '1';

            if(!empty($tmpPost['area_id'])){
                $data['area_id'] = $tmpPost['area_id'];
            }
            if(!empty($tmpPost['city_id'])){
                $data['city_id'] = $tmpPost['city_id'];
            }

            //如果是装修公司
            if($info['user']['classid'] == '3' && $data['cid'] == '35'){
                $data['description'] = $tmpPost['description_1'];
                $data['content'] = $tmpPost['description_1'].'<p><strong>服务及专长</strong></p>'.$tmpPost['description_2'].'<p><strong>团队及资质</strong></p>'.$tmpPost['description_3'];
                $data['content'] = nl2br($data['content']);
                $data['sub_category'] = '107';
            }

            empty($data['cid']) && $this->ajaxReturn(array("data"=>"","info"=>"分类不能为空！","status"=>0));
            empty($data['sub_category']) && $this->ajaxReturn(array("data"=>"","info"=>"子分类不能为空！","status"=>0));
            empty($data['item']) && $this->ajaxReturn(array("data"=>"","info"=>"条目不能为空！","status"=>0));
            empty($data['content']) && $this->ajaxReturn(array("data"=>"","info"=>"内容不能为空！","status"=>0));

            $images = $_POST['imgId'];
            if(count($images) > 1 ){
                $this->ajaxReturn(array("data"=>"","info"=>"图片最多只能上传1张","status"=>0));
                die();
            }

            if(!empty($images)){
                $data['thumb'] = $images;
            }

            if(mb_strlen($data['content'],'utf-8') > 50000){
                $this->ajaxReturn(array("data"=>"","info"=>"内容最多输入5000个字","status"=>0));
                die();
            }

            //Tags处理：新标签，旧标签，类型
            $data["tags"] = $this->getTags($data['tags_name'],'','6');

            if(!empty($data['description'])){
                $data['description'] = mbstr(htmlspecialchars(strip_tags($data['description'])),0,200);
            }


            $id = M("baike")->add($data);
            $this->ajaxReturn(array("data"=>"$id","info"=>"发布成功","status"=>1));
            die();
        }


        //根据 province ID 输出城市列表 Select # from GET request url
        $cityid = intval(I('get.getcity'));
        if(!empty($cityid)){
            $cityList = D("Common/Ask")->getCityList();
            $theCity = $cityList[$cityid];
            unset($cityList);
            if(!empty($theCity)){
                $rt = '';
                foreach ($theCity as $k => $v) {
                    $rt .= '<option value="'.$v["cityid"].'">'.$v["city"].'</option>';
                }
                exit($rt);
            }
            exit();
        }


        //取用户城市和区域
        $userCityId = $_SESSION["u_userInfo"]['cs'];
        $Db = D("Common/Ask");
        $provinceList = $Db->getAreaList();
        $myProvinceId = $Db->getProvinceIdByCityId($userCityId);
        foreach ($provinceList as $k => $v) {
            if($v['qz_provinceid'] == $myProvinceId){
                $provinceList[$k]['selected'] = 'selected';
                break;
            }
        }
        $allCityList = $Db->getCityList();
        $cityList = $allCityList[$myProvinceId];
        unset($allCityList);
        foreach ($cityList as $k => $v) {
            if($v['cityid'] == $userCityId){
                 $cityList[$k]['selected'] = 'selected';
            }
        }

        $info['user_classid'] = $info['user']['classid'];

        $map['pid'] = '0';
        $category = D('Baike')->getCategory($map);

        $this->assign("provinces",$provinceList);
        $this->assign("citys",$cityList);
        $this->assign("baike",$baike);
        $this->assign("category",$category);
        $this->assign("info",$info);
        $this->display();
    }

    //编辑百科
    public function edit(){
        $info = $this->userInfo;
        $id = I('get.id');
        if(empty($id) OR !is_numeric($id)){
            $this->_error();
        }

        $baike = D('Baike')->getBaike($id,false);
        if(empty($baike)){
            $this->_error();
        }

        if($baike['uid'] != $_SESSION["u_userInfo"]['id']){
            $this->_error();
        }

        //提交了表单
        if(IS_POST){
            $tmpPost = I('post.');
            //只取需要的，避免POST其它数据会出错
            $data['uid'] = $_SESSION["u_userInfo"]['id'];
            $data['item'] = $tmpPost['item'];
            $data['tags_name'] = $tmpPost['tags'];
            $data['cid'] = $tmpPost['bigcate'];
            $data['sub_category'] = $tmpPost['subcate'];
            $data['description'] = $tmpPost['description'];
            $data['content'] = nl2br($_POST['editorValue']);
            if(empty($tmpPost['area_id'])){
                $data['area_id'] = $tmpPost['area_id'];
            }
            if(empty($tmpPost['city_id'])){
                $data['city_id'] = $tmpPost['city_id'];
            }
            $data['visible'] = '1';
            $data['modify_time'] = time();

            empty($data['cid']) && $this->ajaxReturn(array("data"=>"","info"=>"分类不能为空！","status"=>0));
            empty($data['sub_category']) && $this->ajaxReturn(array("data"=>"","info"=>"子分类不能为空！","status"=>0));
            empty($data['item']) && $this->ajaxReturn(array("data"=>"","info"=>"条目不能为空！","status"=>0));
            empty($data['description']) && $this->ajaxReturn(array("data"=>"","info"=>"描述不能为空！","status"=>0));
            empty($data['content']) && $this->ajaxReturn(array("data"=>"","info"=>"内容不能为空！","status"=>0));

            $images = $_POST['imgId'];
            if(count($images) > 1 ){
                $this->ajaxReturn(array("data"=>"","info"=>"图片最多只能上传1张","status"=>0));
                die();
            }

            if(!empty($images)){
                $data['thumb'] = $images['0'];
            }

            if(mb_strlen($data['content'],'utf-8') > 5000){
                $this->ajaxReturn(array("data"=>"","info"=>"内容最多输入5000个字","status"=>0));
                die();
            }

            //Tags处理：新标签，旧标签，类型
            $data["tags"] = $this->getTags($data['tags_name'],$baike['tags'],'6');

            if(!empty($data['description'])){
                $data['description'] = mbstr(htmlspecialchars(strip_tags($data['description'])),0,200);
            }

            $map = array(
                "id" => $id,
                "uid" => $data['uid']
            );
            $s = M("baike")->where($map)->save($data);
            $this->ajaxReturn(array("data"=>"$id","info"=>"发布成功","status"=>1));
            die();
        }

        //dump($baike['area_id']);

        //取用户城市和区域
        $userCityId = $_SESSION["u_userInfo"]['cs'];
        $Db = D("Common/Ask");
        $provinceList = $Db->getAreaList();
        $myProvinceId = $Db->getProvinceIdByCityId($userCityId);
        foreach ($provinceList as $k => $v) {
            if($v['qz_provinceid'] == $myProvinceId){
                $provinceList[$k]['selected'] = 'selected';
                break;
            }
        }
        $allCityList = $Db->getCityList();
        $cityList = $allCityList[$baike['area_id']];
        unset($allCityList);
        foreach ($cityList as $k => $v) {
            if($v['cityid'] == $userCityId){
                 $cityList[$k]['selected'] = 'selected';
            }
        }

        if($info['user']['classid'] == '3' && $baike['cid'] == '35'){
            $temp = str_replace(array('<strong>服务及专长</strong><br />','<strong>团队及资质</strong><br />'),'@-@-@',$baike['content']);
            $temp = strip_tags($temp);
            $temp = explode('@-@-@', $temp);
            $baike['desc_1'] = $temp['0'];
            $baike['desc_2'] = $temp['1'];
            $baike['desc_3'] = $temp['2'];
        }

        $map['pid'] = '0';
        $category = D('Baike')->getCategory($map);

        $map['pid'] = $baike['cid'];
        $subCate = D('Baike')->getCategory($map);

        //$baike['content'] = htmlspecialchars($baike['content']);
        $baike['act'] = '编辑';

        $info['user_classid'] = $info['user']['classid'];
        $this->assign("category",$category);
        $this->assign("provinces",$provinceList);
        $this->assign("citys",$cityList);
        $this->assign("subCate",$subCate);
        $this->assign("info",$info);
        $this->assign("baike",$baike);
        $this->display();
    }

    //删除百科
    public function remove(){
        $info = $this->userInfo;
        $id = I('get.id');
        if(empty($id) OR !is_numeric($id)){
            $this->_error();
        }

        $baike = D('Baike')->getBaike($id,false);
        if(empty($baike)){
            $this->_error();
        }

        if($baike['uid'] != $_SESSION["u_userInfo"]['id']){
            $this->_error();
        }

        $i = D("Baike")->remove($id,$_SESSION["u_userInfo"]["id"]);
        if($i !== false){
            $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
        }
        $this->ajaxReturn(array("data"=>"","info"=>"操作失败,请刷新重新！","status"=>0));
    }

    //上传图片
    public function upload(){
        //判断是否登录
        if(!isset($_SESSION["u_userInfo"])){
           exit('Need Login');
        }
        //上传图片
        if(!empty($_FILES["file"])){
            $file = $_FILES["file"];
            $fileExt = pathinfo($_FILES["file"]['name'], PATHINFO_EXTENSION);
            $result = $this->uploadToQiNiu($file["tmp_name"],$fileExt,'baike');
            if(gettype($result) != "object"){
                echo json_encode(array("error"=>0,"pic"=>$result["key"],"name"=>$result["key"]));
            }else{
                echo json_encode(array("error"=>"图片上传失败,请联系技术部门！"));
            }
        }
        die();
    }


    //上传到七牛服务器
    private function uploadToQiNiu($file,$fileExt,$module){
        import("Library.Org.Qiniu.io",'','.php');
        import("Library.Org.Qiniu.rs",'','.php');
        $bucket = OP('QINIU_BUCKET');
        $accessKey = OP('QINIU_AK');
        $secretKey = OP('QINIU_CK');
        Qiniu_SetKeys($accessKey, $secretKey);
        $putPolicy = new \Qiniu_RS_PutPolicy($bucket);

        $putPolicy->MimeLimit = 'image/jpeg;image/png;image/gif';
        $putPolicy->SaveKey = $module.'/$(year)$(mon)$(day)/$(etag)'.'.'.$fileExt;
        $upToken = $putPolicy->Token(null);
        $putExtra = new \Qiniu_PutExtra();
        $putExtra->Crc32 = 1;
        list($ret, $err) = Qiniu_PutFile($upToken, null, $file, $putExtra);
        if($err == null){
            $result = array(
                    "hash"=>$ret["hash"],
                    "key"=> $ret["key"]
                            );
            return $result;
        }
        return $err;
    }

    //Tags处理：新标签，旧标签，类型
    private function getTags($tagsName,$oldTags,$type){
        //规定字段
        $countField = array('1'=>'article_count','2'=>'meitu_count','3'=>'diary_count','4'=>'ask_count','5'=>'subarticle_count','6'=>'baike_count');
        $countField = $countField[$type];

        //如果新标签和旧标签都为空直接返回 - 没有标签
        if(empty($tagsName) && empty($oldTags)){
            return '';
        }

        //如果新标签为空，旧标签不为空，可以理解为删除标签
        if(empty($tagsName) && !empty($oldTags)){
            foreach ($oldTags as $k => $v) {
                $v = trim($v);
                if(!empty($v)){
                    D("Tags")->setTagsNum($v,'Dec',$type);
                }
            }
        }

        //分割，合并，清理标签
        $tagsName = str_replace(array(' ','，',',','?','？','!','！','~','-','@'),',',$tagsName);
        $tag_arr = array_unique(array_filter(explode(",",$tagsName))); //数组形式
        $tagsName = implode($tag_arr,",");//字符串形式

        //查询标签是否已存在数据库 （数据库中不应有重复标签）
        $isInTags = D("Tags")->findTagsByName($tagsName);

        //重组数据 $newTags 为 数据库中存在的Tags
        foreach ($isInTags as $k => $v){
            $newTags[$v['name']] = $v;
        }

        //原来的Tags
        $oldTags = array_filter(explode(",",$oldTags));

        //循环输入的Tags
        foreach ($tag_arr as $k => $v){
            $v = trim($v);
            //如果值不为空
            if(!empty($v)){
                //如果数据库中已存在此Tags
                if(!empty($newTags[$v])){
                    //记录此Tag的ID
                    $tagsId .= $newTags[$v]['id'].',';
                    //如果本次Tag不存在于之前的Tags
                    if(!in_array($newTags[$v]['id'],$oldTags)){
                        //数据库中加 1
                        D("Tags")->setTagsNum($newTags[$v]['id'],'Inc',$type);
                    }
                }else{
                    //不存在，增加l
                    $tagData = array("name" => $v,"type" => $type,"time" => time(),$countField => '1',);
                    $i = D("Tags")->addTags($tagData);
                    $tagsId .= $i.",";
                }
            }
        }

        //取最新Tags的ID数组
        $newTagsArray = array_unique(array_filter(explode(",",$tagsId)));
        $tags = implode($newTagsArray,",").',';

        //开始删除Tags统计处理
        foreach ($oldTags as $k => $v) {
            if(!in_array($v,$newTagsArray)){
                //从数据库中减1
                D("Tags")->setTagsNum($v,'Dec',$type);
            }
        }
        return $tags;
    }

    //根据条件获取列表并分页
    private function getList($condition,$pageIndex = 1,$pageCount = 10){
        $pageIndex = intval($pageIndex)<=0?1:intval($pageIndex);
        import('Library.Org.Page.Page');
        $result = D("Common/Baike")->getListByCategory($condition,($pageIndex-1) * $pageCount,$pageCount);
        $count = $result['count'];
        $qList = $result['result'];
        $config  = array("prev","first","last","next");
        $page = new \Page($pageIndex,$pageCount,$count,$config);
        $pageTmp =  $page->show();
        return array("list"=>$qList,"page"=>$pageTmp);
    }

    //获取用户基本信息
    private function getUserInfo($uid){
        return M('user')->field('*')->where(array('id' => $uid))->find();
    }

    //获取用户 BM 值
    private function getQuyuByCid($cityid){
        return M('quyu')->field('bm')->where(array('cid' => $cityid))->find();
    }

    //获取用户的未读信息
    private function getUnSystemNoticeCount($id,$cs){
        $count = D("Usersystemnotice")->getUnSystemNoticeCount($id,$cs,1);
        if(count($count)> 0){
            return $count["unreadsystem"];
        }
        return 0;
    }

}