<?php

namespace Home\Controller;
use Home\Common\Controller\HomeBaseController;

/**
*  文章专题
*/
class SpecialarticleController extends HomeBaseController
{

    public function index()
    {
        if (I("get.title") !== "") {
            $title = I("get.title");
            $this->assign('title',$title);
        }

        //获取专题模块列表
        $result = $this->getSpeciAlarticleModuleList($title);
        $this->assign("list",$result["list"]);
        $this->assign("page",$result["page"]);
        $this->display();
    }

    /**
     * 设置专题
     * @return [type] [description]
     */
    public function specialup()
    {
        if ($_POST) {
            $id = I("post.id");
            $status = 0;
            $model = D("ArticleSpecialModule");

            //添加新的专题信息
            $data = array(
                "id" => I("post.id"),
                "title" => I("post.title"),
                "description" => I("post.description"),
                "type" => I("post.type"),
                "istop" => I("post.istop"),
                "isbanner" => I("post.isbanner"),
                "cover_img" => I("post.img"),
                "cover_bigimg" => I("post.bigImg"),
                "uid" => $this->User["id"],
                "uname" => $this->User["name"]
            );

            if ($model->create($data,1)) {
                if (!empty($id)) {
                    //修改专题
                    $model->editModule($id,$data);
                } else {
                    //新增专题
                    $data["time"] = time();
                    $id = $i = $model->addModule($data);
                }

                if ($i !== false) {
                    //删除原有的专题信息
                    $model->delModuleClass($id);
                    $status = 1;

                    //添加美图模块
                    $meitu = json_decode(htmlspecialchars_decode(I("post.meitu")),true);
                    if (!empty($meitu)) {
                        //如果没有填写模块标题，不做任何操作
                        if (!empty($meitu["title"])) {
                            if (count($meitu["child"]) > 0) {
                                foreach ($meitu["child"] as $key => $value) {
                                    $all[] = array(
                                        "module" => $id,
                                        "type" => $meitu["type"],
                                        "title" => $meitu["title"],
                                        "subtitle" => $value["title"],
                                        "article_id" => $value["id"],
                                        "sort" => $value["sort"],
                                        "uid" => $this->User["id"],
                                        "uname" => $this->User["name"],
                                        "time" => time()
                                    );
                                }
                                $model->addModuleClass($all);
                                unset($all);
                            }
                        }
                    }

                    //添加文章
                    $artile = json_decode(htmlspecialchars_decode(I("post.article")),true);
                    if (!empty($artile)) {
                        //添加文章模块1
                        //如果没有填写模块标题，不做任何操作
                        if (!empty($artile[1]["title"])) {
                            if (count($artile[1]["child"]) > 0) {
                                foreach ($artile[1]["child"] as $key => $value) {
                                    $all[] = array(
                                        "module" => $id,
                                        "type" => $artile[1]["type"],
                                        "title" => $artile[1]["title"],
                                        "subtitle" => $value["title"],
                                        "article_id" => $value["id"],
                                        "sort" => $value["sort"],
                                        "uid" => $this->User["id"],
                                        "uname" => $this->User["name"],
                                        "time" => time()
                                    );
                                }
                            }
                        }

                        //添加文章模块2
                        //如果没有填写模块标题，不做任何操作
                        if (!empty($artile[2]["title"])) {
                            if (count($artile[2]["child"]) > 0) {
                                foreach ($artile[2]["child"] as $key => $value) {
                                    $all[] = array(
                                        "module" => $id,
                                        "type" => $artile[2]["type"],
                                        "title" => $artile[2]["title"],
                                        "subtitle" => $value["title"],
                                        "article_id" => $value["id"],
                                        "sort" => $value["sort"],
                                        "uid" => $this->User["id"],
                                        "uname" => $this->User["name"],
                                        "time" => time()
                                    );
                                }
                            }
                        }

                        //添加文章模块3
                        //如果没有填写模块标题，不做任何操作
                        if (!empty($artile[3]["title"])) {
                            if (count($artile[3]["child"]) > 0) {
                                foreach ($artile[3]["child"] as $key => $value) {
                                    $all[] = array(
                                        "module" => $id,
                                        "type" => $artile[3]["type"],
                                        "title" => $artile[3]["title"],
                                        "subtitle" => $value["title"],
                                        "article_id" => $value["id"],
                                        "sort" => $value["sort"],
                                        "uid" => $this->User["id"],
                                        "uname" => $this->User["name"],
                                        "time" => time()
                                    );
                                }
                            }
                        }

                        if (count($all) > 0) {
                            $model->addModuleClass($all);
                            unset($all);
                        }
                    }

                    //添加问答模块
                    $ask = json_decode(htmlspecialchars_decode(I("post.ask")),true);
                    if (!empty($ask)) {
                        //添加问答模块
                        //如果没有填写模块标题，不做任何操作
                        if (!empty($ask["title"])) {
                            if (count($ask["child"]) > 0) {
                                foreach ($ask["child"] as $key => $value) {
                                    $all[] = array(
                                        "module" => $id,
                                        "type" => $ask["type"],
                                        "title" => $ask["title"],
                                        "subtitle" => $value["title"],
                                        "article_id" => $value["id"],
                                        "sort" => $value["sort"],
                                        "uid" => $this->User["id"],
                                        "uname" => $this->User["name"],
                                        "time" => time()
                                    );
                                }
                                $model->addModuleClass($all);
                                unset($all);
                            }
                        }
                    }

                    //添加视频模块
                    $video = json_decode(htmlspecialchars_decode(I("post.video")),true);
                    if (!empty($video)) {
                        //添加问答模块
                        //如果没有填写模块标题，不做任何操作
                        if (!empty($video["title"])) {
                            if (count($video["child"]) > 0) {
                                foreach ($video["child"] as $key => $value) {
                                    $all[] = array(
                                        "module" => $id,
                                        "type" => $video["type"],
                                        "title" => $video["title"],
                                        "subtitle" => $value["title"],
                                        "article_id" => $value["id"],
                                        "sort" => $value["sort"],
                                        "uid" => $this->User["id"],
                                        "uname" => $this->User["name"],
                                        "time" => time()
                                    );
                                }
                                $model->addModuleClass($all);
                                unset($all);
                            }
                        }
                    }
                }
            } else {
                $msg = $model->getError();
            }
            $this->ajaxReturn(array("info"=>$msg,"status"=>$status));
        } else {
            if (I("get.id") !== "") {
                $result = D("ArticleSpecialModule")->findArticleModuleInfo(I("get.id"));
                foreach ($result as $key => $value) {
                    if (!isset($info)) {
                        $info["id"] = $value["id"];
                        $info["title"] = $value["title"];
                        $info["description"] = $value["description"];
                        $info["type"] = $value["type"];
                        $info["istop"] = $value["istop"];
                        $info["isbanner"] = $value["isbanner"];
                        $info["cover_img"] = $value["cover_img"];
                        $info["cover_bigimg"] = $value["cover_bigimg"];
                        if (!empty($value["cover_img"])) {
                            $imgs = array('<img src="http://'.OP("QINIU_DOMAIN")."/".$value["cover_img"].'"/>');
                            $info["img"] = $imgs;
                        }

                        if (!empty($value["cover_bigimg"])) {
                            $imgs = array('<img src="http://'.OP("QINIU_DOMAIN")."/".$value["cover_bigimg"].'"/>');
                            $info["bigImg"] =  $imgs;
                        }
                    }
                    switch ($value["subtype"]) {
                        case 'meitu':
                            if (!isset($info["meitu"])) {
                                $info["meitu"]["title"] = $value["subtitle"];
                            }
                            $info["meitu"]["child"][] = array(
                                "id" => $value["article_id"],
                                "title" => $value["article_title"],
                                "url" => "http://meitu.".C("QZ_YUMING")."/p".$value["article_id"].".html"
                            );
                            break;
                        case 'article_1':
                            if (!isset($info["article_1"])) {
                                $info["article_1"]["title"] = $value["subtitle"];
                            }
                            $info["article_1"]["child"][] = array(
                                "id" => $value["article_id"],
                                "title" => $value["article_title"]
                            );
                            break;
                        case 'article_2':
                            if (!isset($info["article_2"])) {
                                $info["article_2"]["title"] = $value["subtitle"];
                            }
                            $info["article_2"]["child"][] = array(
                                "id" => $value["article_id"],
                                "title" => $value["article_title"]
                            );
                            break;
                        case 'article_3':
                            if (!isset($info["article_3"])) {
                                $info["article_3"]["title"] = $value["subtitle"];
                            }
                            $info["article_3"]["child"][] = array(
                                "id" => $value["article_id"],
                                "title" => $value["article_title"]
                            );
                            break;
                        case 'ask':
                            if (!isset($info["ask"])) {
                                $info["ask"]["title"] = $value["subtitle"];
                            }
                            $info["ask"]["child"][] = array(
                                "id" => $value["article_id"],
                                "title" => $value["article_title"]
                            );
                            break;
                        case 'video':
                            if (!isset($info["video"])) {
                                $info["video"]["title"] = $value["subtitle"];
                            }
                            $info["video"]["child"][] = array(
                                "id" => $value["article_id"],
                                "title" => $value["article_title"],
                                "url" => "http://www.qizuang.com/video/v".$value["article_id"].".html"
                            );
                            break;
                    }
                }
                $this->assign("info",$info);
            }

            //获取专题分类
            $class = D("ArticleSpecialClass")->getAtricleClassList();
            $this->assign("class",$class);
            $this->display();
        }
    }


    public function delspecialmodule()
    {
        if ($_POST) {
            $id = I("post.id");
            $data = array(
                "isdelete" => I("post.val")
            );
            $i = D("ArticleSpecialModule")->editModule($id,$data);
            if ($i !== false) {
                $this->ajaxReturn(array("status"=>1));
            }
            $this->ajaxReturn(array("info"=>'操作失败,请联系技术部！',"status"=>0));
        }
    }

    /**
     * 专题文章的分类
     * @return [type] [description]
     */
    public function specialarticleclass()
    {
        //获取所有的专题文章分类
        $list = $this->getAtricleClassList();
        $this->assign("list",$list);
        $this->display();
    }

    /**
     * 获取分类编辑模板
     * @return [type] [description]
     */
    public function classinfo()
    {
        if ($_POST) {
            $id = I("post.id");
            $data = array(
                "classname" => I("post.name"),
                "shortname" => I("post.shortname"),
                "title" => I("post.title"),
                "description" => I("post.description"),
                "keywords" => I("post.keywords"),
                "px" => I("post.px"),
                "uid" =>  $this->User["id"] ,
                "uname" =>  $this->User["name"],
                "time" => time()
            );
            $model = D("ArticleSpecialClass");
            $status = 0;
            if ($model->create($data,1)) {
                if (!empty($id)) {
                    $i = $model->editClass($id,$data);
                } else {
                    $data["level"] = I("post.level")+1;
                    $data["parentid"] = I("post.parentid");
                    $i = $model->addClass($data);
                }

                if ($i !== false) {
                    $status = 1;
                }
            }else{
                $msg = $model->getError();
            }
            $this->ajaxReturn(array("info"=>$msg, "status"=>$status));
        } else {
            if (I("get.id") !== "") {
                $info = D("ArticleSpecialClass")->findClassInfo(I("get.id"));
                $this->assign("info",$info);
            }

            if (I("get.level") !== "") {
                $this->assign("level",I("get.level"));
            }

            if (I("get.parentid") !== "") {
                $this->assign("parentid",I("get.parentid"));
            }

            $tmp = $this->fetch("specialclasstmp");
            $this->ajaxReturn(array("data" => $tmp,"status" => 1));
        }
    }

    /**
     * 专题文章列表
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function articles()
    {
        if (I("get.title") !== "") {
            $title = I("get.title");
            $this->assign("title",$title);
        }

        if (I("get.status") !== "") {
            $status = I("get.status");
            $this->assign("status",$status);
        }

        $list = $this->getArticleList($title,$status);
        $this->assign("list",$list);
        $this->display();
    }

    /**
     * 添加/维护 文章
     * @return [type] [description]
     */
    public function articleup()
    {
        if ($_POST) {
            $id = I("post.id");
            $keywords = str_replace(array("、",""),",",I("post.keywords"));
            $data = array(
                "title" => I("post.title"),
                "content" => htmlspecialchars_decode(I("post.content")),
                "type" => I("post.type"),
                "keywords" => $keywords,
                "description" => I("post.description"),
                "cover_img" => I("post.img"),
                "uid" => $this->User["id"],
                "uname" => $this->User["name"]
            );

            $model = D("ArticleSpecial");
            $status = 0;
            if ($model->create($data,1)) {
                if (!empty($id)) {
                    $i = $model->editArticle($id,$data);
                } else {
                    $data["time"] = time();
                    $id = $i = $model->addArticle($data);
                    //添加内链
                    //抽出所有的图片
                    $pattern ='/<img.*?\/>/i';
                    preg_match_all($pattern, $data['content'], $matches);
                    if(count($matches[0]) > 0){
                        foreach ($matches[0] as $key => $value) {
                            //将图片替换成变量占位符
                            $data['content'] = str_replace($value, "%s", $data['content']);
                            $replaceImg[] = $value;
                        }
                    }

                    $keywords = D("WwwArticleKeywords")->getAllKeywords(1);
                    shuffle($keywords);
                    foreach ($keywords as $key => $value) {
                        $arr[] = "/".trim($value["name"])."/";
                    }
                    $i = 0;
                    foreach ($arr as $key => $value) {
                        if($i == 8){
                            break;
                        }
                        preg_match_all($value,$data['content'],$matches);
                        if(count($matches[0]) > 0){
                            $keywordsList[] = $keywords[$key]["id"];
                            $i ++;
                        }
                    }
                }

                if ($i !== false) {
                    $status = 1;
                    $tags = I("post.tags");
                    //删除原有的标签
                    $model->delTag($id);

                    //添加标签
                    foreach ($tags as $key => $value) {
                        $subData[] = array(
                            "article_id" => $id,
                            "tag_id" => $value
                        );
                    }

                    if (count($subData) > 0) {
                        $model->addAllTag($subData);
                    }

                    //添加关键字到关联表中
                    if (count($keywordsList) > 0) {
                        foreach ($keywordsList as $key => $value) {
                            $relateData[] = array(
                                "article_id" => $id,
                                "keyword_id" => $value,
                                "module" => "special"
                            );
                        }
                        D("WwwArticleKeywords")->addRelateAll($relateData);
                    }
                }
            } else {
                $msg = $model->getError();
            }
            $this->ajaxReturn(array("info"=>$msg, "status"=>$status));
        } else {
            if (I("get.id") !== "") {
                $info = D("ArticleSpecial")->findArticleInfo(I("get.id"));
                if (count($info) == 0) {
                    $this->_error("该文章不存在");
                }
                $imgs = array('<img src="'.$info["cover_img"].'"/>');
                $json = json_encode($imgs);
                $info["img"] =  $json;

                $tags = array_filter(explode(",", $info["tags"]));
                $tagnames = array_filter(explode(",", $info["tagnames"]));
                foreach ($tags as $key => $value) {
                    $info["child"][] = array(
                            "id" => $value,
                            "text" => $tagnames[$key]
                    );
                }
                $this->assign("info",$info);
            }

            //获取专题分类
            $class = D("ArticleSpecialClass")->getAtricleClassList();
            $this->assign("class",$class);
            $this->display();
        }
    }


    /**
     * 文章审核
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function audit()
    {
        if ($_POST) {
            $id = I("post.id");
            $data = array(
                "status" => I("post.val")
            );
            $i = D("ArticleSpecial")->editArticle($id,$data);
            if ($i !== false) {
                $this->ajaxReturn(array("status" => 1));
            }
            $this->ajaxReturn(array("info" => '操作失败,请联系技术部！',"status" => 0));
        }
    }

    /**
     * 获取文章信息
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function getarticle($value='')
    {
        if ($_POST) {
            $type = I("post.type");
            $query = I("post.condition");
            $list = D("WwwArticle")->getArticleListByTitle($query,$type,10);
            $this->ajaxReturn(array("data" => $list,"status" => 1));
        }
    }

    /**
     * 获取美图列表
     * @return [type] [description]
     */
    public function getmeitu()
    {
        if ($_POST) {
            $query = I("post.condition");
            $list = D("Meitu")->getMeituByTitle($query);
            foreach ($list as $key => $value) {
                $list[$key]["url"] = "http://meitu.".C("QZ_YUMING")."/p".$value["id"].".html";
            }
            $this->ajaxReturn(array("data" => $list,"status" => 1));
        }
    }

    /**
     * 获取问答列表
     * @return [type] [description]
     */
    public function getask()
    {
        if ($_POST) {
            $query = I("post.condition");
            $list = D("Adminask")->getAskByTitle($query);
            $this->ajaxReturn(array("data" => $list,"status" => 1));
        }
    }

    /**
     * 获取视频列表
     * @return [type] [description]
     */
    public function getvideo()
    {
        if ($_POST) {
            $query = I("post.condition");
            $list = D("ArticleVedio")->getVideoByTitle($query);
            foreach ($list as $key => $value) {
                $list[$key]["url"] = "http://www.qizuang.com/video/v".$value["id"].".html";
            }
            $this->ajaxReturn(array("data" => $list,"status" => 1));
        }
    }

    public function findtags()
    {
        if ($_POST) {
            $query = I("post.query");
            $result = D("Tags")->getTagsByName($query);
            return $this->ajaxReturn(array("data"=>$result,"status"=>1));
        }
    }

    /**
     * 详情底部标签管理
     * @return array
     */
    public function basetags(){
        $where = [];//列表查询条件
        $get = I('get.');
        //标签组数据
        $module = 0;
        //设置默认类型
        $get['style'] = empty($get['style']) ? 0 : $get['style'];
        switch ($get['style']) {
            case '0':
                //装修攻略
                $p_data = D('www_article_tags')->getPData(['p_id' => 0,'style'=>0]);
                $where['a.style'] = 0;
                $where['a.p_id'] = ['neq',0];
                break;
            case '1':
                $module = 1;
                $p_data = D('www_article_tags')->getPData(['p_id' => 0,'style'=>1]);
                $where['a.style'] = 1;
                $where['a.p_id'] = ['neq',0];
                break;
            case '2':
                $module = 2;
                $p_data = D('www_article_tags')->getPData(['p_id' => 0,'style'=>2]);
                $where['a.style'] = 2;
                break;
        }
        if ($get['search_name']) {
            $where['_complex'] = array(
                '_logic' => 'OR',
                'a.name' => array('LIKE', "%" . $get['search_name'] . "%"),
                'a.url' => array('LIKE', "%" . $get['search_name'] . "%")
            );
        }
        if ($get['search_pid']) {
            $where['a.p_id'] = ['eq', $get['search_pid']];
        }
        //标签数据
        $c_data = $this->getArticleTagsList($where,'a.order asc,a.addtime desc');

        $this->assign('module',$module);
        $this->assign('pdata',$p_data);
        $this->assign('cdata',$c_data['list']);
        $this->assign("page",$c_data["page"]);
        $this->display();
    }

    /**
     * 详情底部标签添加验证
     * @return array
     */
    public function checkname()
    {
        $post = I('post.');
        if ($post['tag_name']) {
            $data = D('www_article_tags')->getInfoBtId(['a.name' => $post['tag_name'],'a.style'=> $post['style']], 'a.id');
            if ($data) {
                $this->ajaxReturn(['status' => 0, 'info' => '名称已经存在']);
            } else {
                $this->ajaxReturn(['status' => 1, 'info' => '']);
            }
        }
    }

    /**
     * 详情底部标签编辑
     * @return array
     */
    public function basetagsedit(){
        if ($_POST) {
            $post = I('post.');
            if (!$post['tag_name']) {
                $this->ajaxReturn(['status' => 0, 'info' => '标签名称不能为空! ']);
            }
            if (!$post['tag_order']) {
                $this->ajaxReturn(['status' => 0, 'info' => '排序请输入大于0的整数! ']);
            }
            //type 区分点击标签组 和 标签
            if ($post['type'] == 2) {
                if (mb_strlen($post['tag_name'],"utf-8") >10 || mb_strlen($post['tag_name'],"utf-8")< 2) {
                    $this->ajaxReturn(['status' => 0, 'info' => '标签名请输入2到10个汉字! ']);
                }
                //装修公司不需要验证标签组
                if($post['style'] != 2){
                    if (!$post['pid']) {
                        $this->ajaxReturn(['status' => 0, 'info' => '请选择标签组! ']);
                    }
                }
                if (!$post['tag_url']) {
                    $this->ajaxReturn(['status' => 0, 'info' => '链接不能为空! ']);
                }
            }
            if (!$post['tag_order'] && $post['tag_order'] != 0) {
                $this->ajaxReturn(['status' => 0, 'info' => '排序不能为空! ']);
            }
            //保存数据
            if (!$post['pid']) {
                $post['pid'] = 0;
                //装修公司添加写死pid ,防止被认为 标签组
                if($post['style'] == 2){
                    $post['pid'] = 1;
                }
            }
            $post['style'] = empty($post['style']) ? 0 : $post['style'];
            $save = [
                'name' => trim(remove_xss($post['tag_name'])),
                'url' => trim(remove_xss($post['tag_url'])),
                'p_id' => $post['pid'],
                'opid' => session("uc_userinfo.id"),
                'order' => trim(remove_xss($post['tag_order'])),
                'style'=>$post['style'],
                'on'=>$post['on']
            ];
            if ($post['edit_id']) {
                $save['optime'] = time();
                //判断是否存在数据
                $d = D('www_article_tags')->getInfoBtId(['a.id' => $post['edit_id']], 'a.id');
                if ($d) {
                    //判断新名称是否有重复值
                    $repeatdata = [];
                    $repeatdata['a.id'] = array('NEQ',$post['edit_id']);
                    $repeatdata['a.style'] = array('EQ',$post['style']);
                    $repeatdata['a.name'] = array('EQ',$post['tag_name']);
                    $hadrepeat = D('www_article_tags')->getInfoBtId($repeatdata,'a.id');
                    if($hadrepeat){
                        $this->ajaxReturn(['status' => 0, 'info' => '名称已存在! ']);
                    }
                    $state = D('www_article_tags')->update(['id' => $post['edit_id']], $save);
                    if ($state) {
                        $this->ajaxReturn(['status' => 1, 'info' => '']);
                    } else {
                        $this->ajaxReturn(['status' => 0, 'info' => '更新失败! ']);
                    }
                } else {
                    $this->ajaxReturn(['status' => 0, 'info' => '数据不存在! ']);
                }
            } else {
                $save['addtime'] = time();
                $state = M('www_article_tags')->add($save);
                if ($state) {
                    $this->ajaxReturn(['status' => 1, 'info' => '']);
                } else {
                    $this->ajaxReturn(['status' => 0, 'info' => '添加失败! ']);
                }
            }
        }
        //操作状态 1.组添加 /组编辑 2.标签添加 /标签编辑
        $type = I('get.type');
        $id = I('get.id');
        if (!$type) {
            header( "HTTP/1.1 301 Moved Permanently");
            header("Location: " . C('168NEW_URL') . "/specialarticle/basetags");
        }
        if($id){
            $data = D('www_article_tags')->getInfoBtId(['a.id' => $id],'a.id,a.`name`,a.`order`,a.url,a.on,b.name pname,b.id pid');
//            print_r($data);exit;
            $this->assign('data',$data);
        }
        if ($type == 2) {
            $style = I('get.style');
            $style = empty($style) ? 0 : $style;
            $p_data = D('www_article_tags')->getPData(['p_id' => 0, 'style' => $style]);    //获取标签组
            $this->assign('pdata', $p_data);
        }

        $this->assign('type',$type);
        $this->assign('style',I('get.style'));
        $this->display();
    }

    /**
     * 详情底部标签删除
     * @return array
     */
    public function deltags(){
        if ($_POST) {
            $post = I('post.');
            $state = D('www_article_tags')->delTags($post['del_id']);
            if ($state) {
                $this->ajaxReturn(['status' => 1, 'info' => '']);
            } else {
                $this->ajaxReturn(['status' => 0, 'info' => '删除失败! ']);
            }
        }
    }
    private function getAtricleClassList()
    {
        $result = D("ArticleSpecialClass")->getAtricleClassList();
        foreach ($result as $key => $value) {
            if ($value["level"] == 1) {
                $value["child"] = $this->getChild($value["id"],$result);
                $list[] = $value;
            }
        }
        return $list;
    }

    private function getChild($parentid, $node)
    {
        foreach ($node as $key => $value) {
            if ($value["parentid"] == $parentid) {
                $value["child"] = $this->getChild($value["id"],$node);
                $list[] = $value;
            }
        }
        return $list;
    }

    private function getArticleList($content, $status)
    {
        $count = D("ArticleSpecial")->getArticleListCount($content, $status);
        if(count($count) > 0){
            import('Library.Org.Util.Page');
            $p = new \Page($count,10);
            $p->setConfig('header','个申请');
            $p->setConfig('prev', "上一页");
            $p->setConfig('next', '下一页');
            $p->setConfig('theme','%UP_PAGE% %LINK_PAGE% %DOWN_PAGE%');
            $show = $p->show();
            $list = D("ArticleSpecial")->getArticleList($p->firstRow,$p->listRows,$content, $status);
            return array("page"=>$show,"list"=>$list);
        }
    }

    /**
     * 获取专题模块列表
     * @param  [type] $title [description]
     * @return [type]        [description]
     */
    private function getSpeciAlarticleModuleList($title)
    {
        $count = D("ArticleSpecialModule")->getSpeciAlarticleModuleCount($title);

        if(count($count) > 0){
            import('Library.Org.Util.Page');
            $p = new \Page($count,10);
            $p->setConfig('header','个申请');
            $p->setConfig('prev', "上一页");
            $p->setConfig('next', '下一页');
            $p->setConfig('theme','%UP_PAGE% %LINK_PAGE% %DOWN_PAGE%');
            $show = $p->show();
            $list = D("ArticleSpecialModule")->getSpeciAlarticleModuleList($p->firstRow,$p->listRows,$title);
            return array("page"=>$show,"list"=>$list);
        }
    }

    private function getArticleTagsList($where,$order)
    {
        $count = D('www_article_tags')->getDataCount($where);
        if(count($count) > 0){
            import('Library.Org.Util.Page');
            $p = new \Page($count,10);
            $p->setConfig('header','个申请');
            $p->setConfig('prev', "上一页");
            $p->setConfig('next', '下一页');
            $p->setConfig('theme','%UP_PAGE% %LINK_PAGE% %DOWN_PAGE%');
            $show = $p->show();
            $list = D("www_article_tags")->getData($where,'a.*,b.name as pname',$p->firstRow,$p->listRows,$order);
            return array("page"=>$show,"list"=>$list);
        }
    }
}