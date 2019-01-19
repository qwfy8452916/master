<?php
/**
 * 移动版设计师博客页
 */

namespace Mobile\Controller;

use Mobile\Common\Controller\MobileBaseController;

class ZixunController extends MobileBaseController
{
    public function _initialize(){
        parent::_initialize();
        $uri = $_SERVER['REQUEST_URI'];
        preg_match('/html$/',$uri,$m);
        if (count($m) == 0) {
            preg_match('/\/$/',$uri,$m);
            $parse = parse_url($uri);
            if (count($m) == 0 && empty($parse["query"])) {
                header( "HTTP/1.1 301 Moved Permanently");
                header("Location: http://". C("MOBILE_DONAMES").$uri."/");
            }
        }
    }

    public function index()
    {

        //首页各个部分数据
//        //装修指南
        $data['zxzn'] = S('Cache:m:glsy:zxzl');
        if (!$data['zxzn']) {
            $data['zxzn'] = D('WwwArticle')->getArticleListByIds([0 => [121, 105, 65, 141]], 0, 3);
            S('Cache:m:glsy:zxzn', $data['zxzn'], 900);
        }


        //免费设计
        $data['mfsj'] = S('Cache:m:glsy:mfsj');
        if (!$data['mfsj']) {
            $data['mfsj'] = D('Meitu')->getMeiTuList(0, 3, '', '', '', '', '', '99');

            S('Cache:m:glsy:mfsj', $data['mfsj'], 900);
        }

        //选材导购
        $data['xcdg'] = S('Cache:m:glsy:xcdg');
        if (!$data['xcdg']) {
            $data['xcdg'] = $this->getArticleList(143, 1, 3, false);
            S('Cache:m:glsy:xcdg', $data['xcdg'], 900);
        }


        //视频学装修
        $data["spxzx"] = S('Cache:m:glsy:spxzx');
        if (!$data["spxzx"]) {
            $video = D('Video')->getlist([], $order = 'time desc', $pageIndex = 0, $pageCount = 1);
            if ($video) {
                $data['spxzx'] = $video[0];
                S("Cache:m:glsy:spxzx", $data["spxzx"], 900);
            }
        }


        //百科知识点
        $data['bkzsd'] = S('Cache:m:glsy:bkzsd');
        if (!$data['bkzsd']) {
            $data['bkzsd'] = D('Baike')->getTopBaike(3, 'post_time desc');
            S('Cache:m:glsy:bkzsd', $data["bkzsd"], 900);
        }

        //问答
        $data['wd'] = S('Cache:m:glsy:wd');
        if (!$data['wd']) {
            $where = ['a.visible' => ['EQ', 0]];
            $order_by = ['a.anwsers' => 'desc'];
            $data['wd'] = D('Ask')->getQuestionAndUserList($where, $order_by, 0, 3);
            S('Cache:m:glsy:wd', $data['wd'], 900);
        }

        //TDK
        $basic['head']['title'] = '家居百科-装修知识-齐装网';
        $basic['head']['keywords'] = '家居百科,家居装修知识';
        $basic['head']['description'] = '齐装网装修百科是一部内容开放、自由的装修百科全书，旨在创造一个涵盖所有装修领域知识、服务所有互联网用户的中文知识性装修百科全书。';

        $this->assign("basic",$basic);

//        dump($data['wd']);exit;
        $this->assign("data", $data);
        $this->display();
    }

    /**
     * 装修流程
     * @return [type] [description]
     */
    public function zxlc()
    {
        $basic["body"]["title"] = "装修流程";

        //动态获取流程的tkd
//        $basic["head"] = S('Mobile:Zixun:zxlc:basic:head');
//        if (empty($basic["head"])) {
//            $temp = D("WwwArticleClass")->getArticleClassByShortname('lc');
//            $basic["head"]["title"] = $temp['title'];
//            $basic["head"]["keywords"] = $temp['keywords'].'-齐装网';
//            $basic["head"]["description"] = $temp['description'];
//            S('Mobile:Zixun:zxlc:basic:head', $basic["head"], 300);
//        }
        $basic["head"]["title"] = "装修流程_装修步骤_装修知识-齐装网";
        $basic["head"]["keywords"] = "装修流程,装修施工,装修检测";
        $basic["head"]["description"] = "齐装网为提供全新的装修流程知识分享，装修流程包括收房验收、找装修公司、设计与预算、装修选材、拆改、水电、防水、泥瓦、木工、油漆、竣工、检测验收、后期配饰、装修保养等。";

        /*生成canonical标签属性值*/
        if (!isset($_GET['a1'])) {
            $info['canonical'] = 'http://' . C('QZ_YUMINGWWW') . '/gonglue/lc/';
        }
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('source', 325);//设置发单入口标识
        $this->assign('source', 325);//设置发单入口标识
        $this->assign("info", $info);
        $this->assign("basic", $basic);
        $this->display("step");
    }

    private function zhuangXiuLiuChengData()
    {
        $data = [
            [
                'classname' => '验房',
                'shortname' => 'shoufang',

            ],
            [
                'classname' => '选公司',
                'shortname' => 'gongsi',
            ],
            [
                'classname' => '量房',
                'shortname' => 'liangfang',
            ],
            [
                'classname' => '设计预算',
                'shortname' => 'shejiyusuan',
            ],
            [
                'classname' => '房产知识',
                'shortname' => 'fangchan',
            ],
            [
                'classname' => '选材',
                'shortname' => 'xuancai',
            ],
            [
                'classname' => '拆改',
                'shortname' => 'chagai',
            ],
            [
                'classname' => '水电',
                'shortname' => 'shuidian',
            ],
            [
                'classname' => '防水',
                'shortname' => 'fangshui',
            ],
            [
                'classname' => '泥瓦',
                'shortname' => 'niwa',
            ],
            [
                'classname' => '木工',
                'shortname' => 'mugong',
            ],
            [
                'classname' => '油漆',
                'shortname' => 'youqi',
            ],
            [
                'classname' => '验收',
                'shortname' => 'jianche',
            ],
            [
                'classname' => '保养',
                'shortname' => 'baoyang',
            ],
            [
                'classname' => '配饰',
                'shortname' => 'peishi',
            ],
            [
                'classname' => '家居',
                'shortname' => 'jjsh',
            ],

        ];
        return $data;
    }

    /**
     * 流程详细
     * @return [type] [description]
     */
    public function zxlclist()
    {
        //装修装修流程 子分类的所有子分类
        $nav = $this->zhuangXiuLiuChengData();

        $category = I("get.category");
        $keyword = remove_xss(I("get.keyword"));
        //分页参数
        $parameter = [];
        if ($keyword) {
            $parameter['keyword'] = $keyword;
        }
        $pageCount = 10;
        if (!$categoryClass = D("WwwArticleClass")->getArticleClassByShortname($category)) {
                $this->_error();
        }
        $categoryIds = [$categoryClass['id']];


        //总页数
        $count = D("WwwArticle")->getAnyTypeArticleCount($categoryIds, $keyword);
        //空数据页面
        if ($count <= 0) {
            $this->searchEmpty();
        }

        import('Library.Org.Page.AllPage');
        if ($category) {
            //设置伪静态
            $static = [
                'template' => '/gonglue/list-' . $category . '-[PAGE].html',
                'first_url' => '/gonglue/' . $category . '/'
            ];
        } else {
            //设置伪静态
            $static = [
                'template' => '/gonglue/list-[PAGE].html',
                'first_url' => '/gonglue/'
            ];
        }

        $page = new \AllPage($count, $pageCount, $static, $parameter);
        $pageTmp = $page->mGongLue();
        $this->assign("page_tmp", $pageTmp);

        $nowPage = $page -> getNowPage();
        $res = D("WwwArticle")->getAnyTypeArticleListByIds($categoryIds, ($nowPage - 1) * $pageCount, $pageCount, '', $keyword);


        $list = $this->sheZhiZxlclistShuJu($res);

        //设置搜索所需路由
        $search_url = '/gonglue/' . $category . '?keyword=';
        $this->assign('search_url', $search_url);

        //发单产品需求变动下架，暂时注释代码
//        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
//        $this->assign('source', 325);//设置发单入口标识
//        if (!cookie('zxlcfa')) {
//            //设置cookie 实现第一次访问发单弹窗
//            $this->assign("showTmp", 2);
//            cookie('zxlcfa', 'is_send');
//        }

        //Tdk canonical 以下代码属于SEO与逻辑无关
        if ($page->getNowPage() > 1) {
            $pageContent = "第" . $page->getNowPage() . "页";
        }
        $basic["body"]["title"] = "装修流程";
        $basic["head"]["title"] = $categoryClass["title"] . $pageContent;
        $basic["head"]["keywords"] = $categoryClass["keywords"];
        $basic["head"]["description"] = $categoryClass["description"];
        $info['canonical'] = '/gonglue/' . $category . '/';
        $this->assign("info", $info);
        $this->assign("basic", $basic);


        $this->assign("nav", $nav);
        $this->assign("cur_category_shortname", $category);

        $this->assign("list", $list);


        $this->display();
    }


    //将装修流程列表数据整理成前端所需格式
    private function sheZhiZxlclistShuJu($result)
    {
        foreach ($result as $key => $value) {
            $result[$key]["img_host"] = "qiniu";
            //如果是老站链接过来的文章，同一用history代替
            if (empty($value["shortname"])) {
                $result[$key]["shortname"] = "history";
                $result[$key]["title"] = str_replace("_齐装网", "", $value["title"]);
                $result[$key]["img_host"] = "";
            }
            if (!empty($value["imgs"])) {
                $exp = explode(",", $value["imgs"]);
                $exp = array_filter($exp);
                $result[$key]["imgs"] = $exp;
            }

            if (empty($value["face"])) {
                $img = str_replace("http://staticqn.qizuang.com/", "", $result[$key]["imgs"][0]);
                $img = str_replace("-s3.jpg", "", $img);
                $result[$key]["face"] = $img;
            }
            $result[$key]['jianjie'] = mbstr(strip_tags($value['content']), 0, 28);
        }
        return $result;
    }

    /**
     * 选材导购页
     * @return [type] [description]
     */
    public function xcdg()
    {
        //获取菜单栏
        $jiancai = S('Cache:m:xcdg:jiancai');
        if (!$jiancai) {
            $jiancai = $this->getJianCai();
            S('Cache:m:xcdg:jiancai', $jiancai);
        }

        $ruanzhuang = S('Cache:m:xcdg:ruanzhuang');
        if (!$ruanzhuang) {
            $ruanzhuang = $this->getRuanzhuang();
            S('Cache:m:xcdg:ruanzhuang', $ruanzhuang);
        }

        $dianqi = S('Cache:m:xcdg:dianqi');
        if (!$dianqi) {
            $dianqi = $this->getDianQi();
            S('Cache:m:xcdg:dianqi', $dianqi);
        }

        $jiaju = S('Cache:m:xcdg:jiaju');
        if (!$jiaju) {
            $jiaju = $this->getJiaju();
            S('Cache:m:xcdg:jiaju', $jiaju);
        }


        $category = I("get.category");
        //分页参数
        $keyword = remove_xss(I("get.keyword"));
        //分页参数
        $parameter = [];
        if ($keyword) {
            $parameter['keyword'] = $keyword;
        }
        $pageCount = 10;
        if ($category && $category != 'xcdg') {
            if (!$categoryClass = D("WwwArticleClass")->getArticleClassByShortname($category)) {
                $this->_error();
            }
            if($categoryClass['level']==2){
				$typeArr = D("WwwArticleClass")->getArticleClassById(143);
				$categoryIds = array_merge($typeArr['child'][$categoryClass['id']]['ids'], [$categoryClass['id']]);
			}else{
				$categoryIds = [$categoryClass['id']];
			}
		} else {
            $all = array_merge($jiancai, $ruanzhuang, $dianqi, $jiaju);
            $categoryIds = [];
            foreach ($all as $key => $v) {
                $categoryIds[] = $v['id'];
                foreach ($v['children'] as $vv) {
                    $categoryIds[] = $vv['id'];
                }
            }
        }


        //处理当前选中项
        $nav = [];
        foreach ($jiancai as $k => $v) {
            foreach ($v['children'] as $value) {
                if ($categoryClass['id'] == $value['id']) {
                    $nav['jiancai'] = $value['classname'];
                }
            }
        }

        foreach ($ruanzhuang as $k => $v) {
            foreach ($v['children'] as $value) {
                if ($categoryClass['id'] == $value['id']) {
                    $nav['ruanzhuang'] = $value['classname'];
                }
            }
        }
        foreach ($dianqi as $k => $v) {
            foreach ($v['children'] as $value) {
                if ($categoryClass['id'] == $value['id']) {
                    $nav['dianqi'] = $value['classname'];
                }
            }
        }
        foreach ($jiaju as $k => $v) {
            foreach ($v['children'] as $value) {
                if ($categoryClass['id'] == $value['id']) {
                    $nav['jiaju'] = $value['classname'];
                }
            }
        }
        $this->assign('nav', $nav);

        //总页数
        $count = D("WwwArticle")-> getAnyTypeArticleCount($categoryIds, $keyword);

        //空数据页面
        if ($count <= 0) {
            $this->searchEmpty();
        }

        import('Library.Org.Page.AllPage');
        //设置伪静态
        if ($category) {
            $static = [
                'template' => '/gonglue/list-' . $category . '-[PAGE].html',
                'first_url' => '/gonglue/' . $category . '/'
            ];
        } else {
            $static = [
                'template' => '/gonglue/list-[PAGE].html',
                'first_url' => '/gonglue/'
            ];
        }

        $page = new \AllPage($count, $pageCount, $static, $parameter);
        $pageTmp = $page->mGongLue();

        $nowPage = $page -> getNowPage();
        $res = D("WwwArticle")->getAnyTypeArticleListByIds($categoryIds, ($nowPage - 1) * $pageCount, $pageCount, '', $keyword);

        $list = $this->sheZhiZxlclistShuJu($res);
        //发单
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];

        //Tdk canonical 以下代码属于SEO与逻辑无关
        if ($page->getNowPage() > 1) {
            $pageContent = "第" . $page->getNowPage() . "页";
        }
        //页面显示内容
        $category = I("get.category");
        $categoryId = I("get.categoryId");

        //获取该类别的编号,根据ID或者shortname获得
        if (!empty($categoryId)) {
            $categoryClass = D("WwwArticleClass")->getArticleClassByCatagoryId($categoryId);
        } else {
            $categoryClass = D("WwwArticleClass")->getArticleClassByShortname($category);
        }
        //没有查询到类别的,404页面
        if(empty($categoryClass)){
            $this->_error();
            die();
        }
        //TKD
        $basic["head"]["title"] = $categoryClass["title"].$pageContent.'-齐装网';
        $basic["head"]["keywords"] = $categoryClass["keywords"];
        $basic["head"]["description"] = $categoryClass["description"];
        $basic["body"]["title"] = "选材导购";

        $info['canonical'] = '/gonglue/' . $category . '/';
        $this->assign("info", $info);
        $this->assign("basic", $basic);


        $this->assign("cur_category_id", $categoryClass['id']);
        $this->assign("jiancai", $jiancai);
        $this->assign("ruanzhuang", $ruanzhuang);
        $this->assign("dianqi", $dianqi);
        $this->assign("jiaju", $jiaju);
        $this->assign("list", $list);
        $this->assign("page_tmp", $pageTmp);
        $this->display('xcdg');
    }


    /***
     *
     */

    private function getJianCai()
    {
        $data = [
            [
                'id' => 145,
                'classname' => '地板',
                'shortname' => 'diban',
                'children' => [],

            ],
            [
                'id' => 146,
                'classname' => '油漆涂料',
                'shortname' => 'youqituliao',
                'children' => [],

            ],
            [
                'id' => 147,
                'classname' => '灯具',
                'shortname' => 'dengju',
                'children' => [],

            ],
            [
                'id' => 148,
                'classname' => '门窗',
                'shortname' => 'menchuang',
                'children' => [],
            ],
            [
                'id' => 149,
                'classname' => '瓷砖',
                'shortname' => 'cizhuan'
            ],
            [
                'id' => 150,
                'classname' => '橱柜',
                'shortname' => 'chugui',
                'children' => [],

            ],
            [
                'id' => 151,
                'classname' => '卫浴',
                'shortname' => 'weiyushebei',
                'children' => [],

            ],
            [
                'id' => 152,
                'classname' => '吊顶',
                'shortname' => 'diaoding',
                'children' => [],

            ],
            [
                'id' => 153,
                'classname' => '五金',
                'shortname' => 'wujin',
                'children' => [],

            ],
            [
                'id' => 154,
                'classname' => '暖气设备',
                'shortname' => 'nuanqi',
                'children' => [],

            ],
            [
                'id' => 155,
                'classname' => '厨房用具',
                'shortname' => 'chuju',
                'children' => [],
            ]
        ];
        $article_class = D("WwwArticleClass");
        foreach ($data as &$v) {
            $v['children'] = $article_class->getArticleClassChildrenById($v['id']);
        }
        return $data;

    }

    private function getRuanzhuang()
    {
        $data = [
            [
                'id' => 156,
                'classname' => '床上用品',
                'shortname' => 'csyp',
                'children' => [],
            ],
            [
                'id' => 245,
                'classname' => '装饰画',
                'shortname' => 'zhuangshihua',
                'children' => [],
            ],
            [
                'id' => 157,
                'classname' => '植物',
                'shortname' => 'zhiwu',
                'children' => [],
            ],
            [
                'id' => 158,
                'classname' => '十字绣',
                'shortname' => 'shizixiu',
                'children' => [],
            ],
            [
                'id' => 159,
                'classname' => '地毯',
                'shortname' => 'ditan',
                'children' => [],
            ],
            [
                'id' => 160,
                'classname' => '窗帘',
                'shortname' => 'chuanglian',
                'children' => [],
            ],
            [
                'id' => 161,
                'classname' => '墙纸',
                'shortname' => 'qiangzhi',
                'children' => [],
            ],
        ];
        $article_class = D("WwwArticleClass");
        foreach ($data as &$v) {
            $v['children'] = $article_class->getArticleClassChildrenById($v['id']);
        }
        return $data;
    }

    /**
     * @return array
     * 办公设备、家用电器、厨卫电器、数码产品
     */
    private function getDianQi()
    {
        $data = [
            [
                'id' => 162,
                'classname' => '办公设备',
                'shortname' => 'bangong',
            ],
            [
                'id' => 163,
                'classname' => '家用电器',
                'shortname' => 'jydq',
                'children' => [],

            ],
            [
                'id' => 164,
                'classname' => '厨卫电器',
                'shortname' => 'cwdq',
                'children' => [],

            ],
            [
                'id' => 165,
                'classname' => '数码产品',
                'shortname' => 'shuma',
                'children' => [],
            ],
        ];
        $article_class = D("WwwArticleClass");
        foreach ($data as &$v) {
            $v['children'] = $article_class->getArticleClassChildrenById($v['id']);
        }
        return $data;

    }

    private function getJiaju()
    {
        $data = [
            [
                'id' => 166,
                'classname' => '家具',
                'shortname' => 'jiaju',
            ],
            [
                'id' => 167,
                'classname' => '儿童家具',
                'shortname' => 'ertongjiaju',
                'children' => [],

            ],
        ];
        $article_class = D("WwwArticleClass");
        foreach ($data as &$v) {
            $v['children'] = $article_class->getArticleClassChildrenById($v['id']);
        }
        return $data;
    }


    /**
     * 资讯列表页
     * @return [type] [description]
     */
    public function zxList()
    {

        //检查是否跳转到静态URL地址
        $this->checkStaticUrl();

        $category = $_GET["category"];

        $categoryClass = D("WwwArticleClass")->getArticleClassByShortname($category);
        //没有查询到类别的,404页面
        if (empty($categoryClass)) {
            $this->_error();
            die();
        }

        $cats = array(
            '114' => '全部装修风水文章',
            '105' => '全部空间搭配文章',
            '121' => '全部装修风格文章',
            '143' => '全部选材导购文章'
        );

        if ($categoryClass["pid"] == 0) {
            $info["now"]["title"] = $cats[$categoryClass["id"]];
            $cat = D("WwwArticleClass")->getArticleClassById($categoryClass["id"]);
            if (!empty($cats[$categoryClass["id"]])) {
                $info["title"] = $cats[$categoryClass["id"]];
                $info['children'] = D("WwwArticleClass")->getArticleClassById($categoryClass["id"]);
                $info['children']['nowtitle'] = $cats[$info['children']['id']];
            }
            $result = $cat["ids"];
        } else {
            $cat = D("WwwArticleClass")->getArticleClassById($categoryClass["pid"]);
            $info["now"]["title"] = $cat["classname"] . "-" . $categoryClass["classname"];
            $result[] = $categoryClass["id"];
            $info['children'] = D("WwwArticleClass")->getArticleClassById($categoryClass["pid"]);
        }

        if (empty($result)) {
            $this->_error();
        }

        //获取资讯文章
        $articles = $this->getZxArticleList($result, $category, 10, '', true);
        $info["articles"] = $articles["articles"];
        $info["page"] = $articles["page"];
        $info["nowPage"] = $articles["nowPage"];

        if ($info["nowPage"] > 1) {
            $pageContent = "第" . $info["nowPage"] . "页";
        }

//        if ($info["nowPage"] == 1) {
        $info['canonical'] = '/gonglue/' . $category . '/';
//        }
        foreach ($info['articles'] as $k => $v) {
            $info['articles'][$k]['jianjie'] = strip_tags($v['content']);
        }
        //关键字、描述、标题
        $basic["body"]["title"] = $info['children']['classname'];
        $basic["head"]["title"] = $categoryClass["title"] . $pageContent.'-齐装网';
        $basic["head"]["keywords"] = $categoryClass["keywords"];
        $basic["head"]["description"] = $categoryClass["description"];
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("basic", $basic);
        $this->assign("info", $info);
        $this->assign('source', 322);//设置发单入口标识
        $this->display("wenz-list");
    }

    /**
     * 根据分类ID，将URL分流到选材导购/老分类
     */
    public function lclist()
    {
        $category = I("get.category");
        //脚踢线改成踢脚线,对应URL修改
        if ($_SERVER['REQUEST_URI'] == '/gonglue/jiaotixian' || $_SERVER['REQUEST_URI'] == '/gonglue/jiaotixian/') {
            header("HTTP/1.1 301 Moved Permanently");
            header("Location: http://" . C("MOBILE_DONAMES") . '/gonglue/tijiaoxian/');
            exit;
        }

        //获取该类别的编号
        $categoryClass = D("WwwArticleClass")->getArticleClassByShortname($category);

        //获取选材导购分类下的子分类
        $sonIds = D("WwwArticleClass")->getArticleClassById("143");

        $ids = $sonIds['ids'];
        $this->assign("fi", 18031209);
        if ($categoryClass['id'] == '143' || in_array($categoryClass['id'], $ids)) {
            $this->xcdg();
        } else {
            $this->zxList();
        }
    }

    /**
     * 检测并跳转到静态URL规则
     */
    private function checkStaticUrl()
    {
        $info = parse_url($_SERVER['REQUEST_URI']);
        $path = array_filter(explode('/', trim($info['path'], '/')));
        $query = array_filter(explode('&', $info['query']));
        $p = I("get.p");
        //1.只有分页参数；2.URL类似'/gonglue/lc'的
        if (count($query) == 1 && !empty($p) && count($path) == 2 && $path[0] == 'gonglue' && false === strpos($path['1'], '.html')) {
            header('HTTP/1.1 301 Moved Permanently');
            header('Location:http://m.' . C('QZ_YUMING') . '/gonglue/list-' . $path['1'] . '-' . $p . '.html');
            exit();
        }
    }

    /**
     * 获取文章分类及文章
     * @return [type] [description]
     */
    private function getArticleList($id, $pageIndex, $pageCount, $isTop)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        //根据ID查询相对应的文章类别
        $result = D("WwwArticleClass")->getArticleClassById($id);
        $ids[] = array_unique($result["ids"]);
        //根据文章类别查询出所有的文章
        $articles = D("WwwArticle")->getArticleListByIds($ids, ($pageIndex - 1) * $pageCount, $pageCount, '', $isTop);
        return $articles;
    }

    /**
     * 获取资讯列表页文章列表
     * @param  string $id [分类编号]
     * @param  integer $pageIndex [description]
     * @param  integer $pageCount [description]
     * @param  boolean $isTop [是否置顶]
     * @return [type]             [description]
     */
    private function getZxArticleList($category_ids = '', $category = '', $pageCount = 5, $keyword = "", $isTop = true)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        //获取文章的分类
        if (empty($category_ids)) {
            $result = D("WwwArticleClass")->getAllArticleClass();
        } else {
            $result = $category_ids;
        }
        $count = D("WwwArticle")->getArticleListCount($result, $keyword);
        if ($count > 0) {
            import('Library.Org.Page.SPage');
            $page = new \SPage($count, $pageCount, array(
                'templet' => '/gonglue/list-' . $category . '-[PAGE].html',
                'firstUrl' => '/gonglue/' . $category . '/'
            ));
            $page->config['theme'] = "%UP_PAGE%<span>%NOW_PAGE%/%TOTAL_PAGE%</span>%DOWN_PAGE%";
            $pageTmp = $page->show();
            $result = D("WwwArticle")->getArticleListByIds(array($result), ($page->nowPage - 1) * $pageCount, $pageCount, $keyword);
            foreach ($result as $key => $value) {
                $result[$key]["img_host"] = "qiniu";
                //如果是老站链接过来的文章，同一用history代替
                if (empty($value["shortname"])) {
                    $result[$key]["shortname"] = "history";
                    $result[$key]["title"] = str_replace("_齐装网", "", $value["title"]);
                    $result[$key]["img_host"] = "";
                }
                if (!empty($value["imgs"])) {
                    $exp = explode(",", $value["imgs"]);
                    $exp = array_filter($exp);
                    $result[$key]["imgs"] = $exp;
                }

                if (empty($value["face"])) {
                    $img = str_replace("http://staticqn.qizuang.com/", "", $result[$key]["imgs"][0]);
                    $img = str_replace("-s3.jpg", "", $img);
                    $result[$key]["face"] = $img;
                }

            }
            return array("articles" => $result, "page" => $pageTmp, "nowPage" => $page->nowPage);
        }
    }

    /**
     * 获取资讯列表页文章列表
     * @param  string $id [分类编号]
     * @param  integer $pageIndex [description]
     * @param  integer $pageCount [description]
     * @param  boolean $isTop [是否置顶]
     * @return [type]             [description]
     */
    private function getXuancaiArticleList($category_ids = '', $category = '', $pageCount = 5, $keyword = "", $isTop = true)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        //获取文章的分类
        if (empty($category_ids)) {
            $result = D("WwwArticleClass")->getAllArticleClass();
        } else {
            $result = $category_ids;
        }
        $count = D("WwwArticle")->getArticleListCount($result, $keyword);
        if ($count > 0) {
            import('Library.Org.Page.SPage');
            $page = new \SPage($count, $pageCount, array(
                'templet' => '/xuancai/list-' . $category . '-[PAGE].html',
                'firstUrl' => '/xuancai/'
            ));
            $page->config['theme'] = "%UP_PAGE%<span>%NOW_PAGE%/%TOTAL_PAGE%</span>%DOWN_PAGE%";
            $pageTmp = $page->show();
            $result = D("WwwArticle")->getArticleListByIds(array($result), ($page->nowPage - 1) * $pageCount, $pageCount, $keyword);
            foreach ($result as $key => $value) {
                $result[$key]["img_host"] = "qiniu";
                //如果是老站链接过来的文章，同一用history代替
                if (empty($value["shortname"])) {
                    $result[$key]["shortname"] = "history";
                    $result[$key]["title"] = str_replace("_齐装网", "", $value["title"]);
                    $result[$key]["img_host"] = "";
                }
                if (!empty($value["imgs"])) {
                    $exp = explode(",", $value["imgs"]);
                    $exp = array_filter($exp);
                    $result[$key]["imgs"] = $exp;
                }

                if (empty($value["face"])) {
                    $img = str_replace("http://staticqn.qizuang.com/", "", $result[$key]["imgs"][0]);
                    $img = str_replace("-s3.jpg", "", $img);
                    $result[$key]["face"] = $img;
                }

            }
            return array("articles" => $result, "page" => $pageTmp, "nowPage" => $page->nowPage);
        }
    }

    private function getSpecialModule($limit)
    {
        $result = D("ArticleSpecialModule")->getIndexSpecialModule($limit);
        return $result;
    }

    /**
     * 获取视频列表
     * @param  [type] $type  [description]
     * @param  [type] $limit [description]
     * @return [type]        [description]
     */
    public function getVieoList($type, $limit)
    {
        $list = D("ArticleVedio")->getVedioList($type, $limit);
        return $list;
    }

    public function zxzn()
    {
        //装修风格
        $fengge = S('Cache:m:zxlc:fengge');
        if (!$fengge) {
            $fengge = D("WwwArticleClass")->getArticleClassChildrenById(121);
            S('Cache:m:zxzn:fengge', $fengge, 900);
        }
        //空间搭配（局部装修）
        $kongjian = S('Cache:m:zxlc:kongjian');
        if (!$kongjian) {
            $kongjian = D("WwwArticleClass")->getArticleClassChildrenById(105);
            S('Cache:m:zxzn:kongjian', $kongjian, 900);
        }
        //家居风水
        $fengshui = S('Cache:m:zxlc:fengshui');
        if (!$fengshui) {
            $fengshui = D("WwwArticleClass")->getArticleClassChildrenById(114);
            S('Cache:m:zxzn:fengshui', $fengshui, 900);
        }
        //家居生活
        $jiajushenhuo = S('Cache:m:zxlc:jiajushenhuo');
        if (!$jiajushenhuo) {
            $jiajushenhuo = $this->getJiaJuShenHuo();
            S('Cache:m:zxzn:jiajushenhuo', $jiajushenhuo, 900);
        }


        $category = I("get.category");

        $keyword = remove_xss(I("get.keyword"));

        //分页参数
        $parameter = [];
        if ($keyword) {
            $parameter['keyword'] = $keyword;
        }
        $pageCount = 10;
        if ($category) {
            if (!$categoryClass = D("WwwArticleClass")->getArticleClassByShortname($category)) {
                $this->_error();
            }
            $categoryIds = [$categoryClass['id']];
        } else {
            $all_type = array_merge($fengge, $kongjian, $fengshui, $jiajushenhuo);
            $categoryIds = my_array_column($all_type, 'id');
        }


        //处理当前选中项
        $nav = [];
        //风格
        foreach ($fengge as $key => $value) {
            if ($categoryClass['id'] == $value['id']) {
                $nav['fg'] = $value['classname'];
            }
        }
        //空间搭配
        foreach ($kongjian as $key => $value) {
            if ($categoryClass['id'] == $value['id']) {
                $nav['kjdp'] = $value['classname'];
            }
        }
        //家居风水
        foreach ($fengshui as $key => $value) {
            if ($categoryClass['id'] == $value['id']) {
                $nav['fs'] = $value['classname'];
            }
        }
        //家居
        foreach ($jiajushenhuo as $key => $value) {
            if ($categoryClass['id'] == $value['id']) {
                $nav['jj'] = $value['classname'];
            }
        }
        $this->assign('nav', $nav);


        //总页数
        $count = D("WwwArticle")->getAnyTypeArticleCount($categoryIds, $keyword);

        //空数据页面
        if ($count <= 0) {
            $this->searchEmpty();
        }

        import('Library.Org.Page.AllPage');
        //设置伪静态
        if ($category) {
            $static = [
                'template' => '/zhinan/list-' . $category . '-[PAGE].html',
                'firstUrl' => '/zhinan/' . $category . '/'
            ];
        } else {
            $static = [
                'template' => '/zhinan/list-[PAGE].html',
                'first_url' => '/zhinan/'
            ];
        }


        $page = new \AllPage($count, $pageCount, $static, $parameter);
        $pageTmp = $page->mGongLue();

        $nowPage = $page -> getNowPage();

        $res = D("WwwArticle")->getAnyTypeArticleListByIds($categoryIds, ($nowPage - 1) * $pageCount, $pageCount, '', $keyword);

        $list = $this->sheZhiZxlclistShuJu($res);

        //设置搜索所需路由
        $search_url = '/zhinan/' . $category;
        $this->assign('search_url', $search_url);

        //发单
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];

        //Tdk canonical 以下代码属于SEO与逻辑无关
        if ($page->getNowPage() > 1) {
            $pageContent = "第" . $page->getNowPage() . "页";
        }
        $basic["body"]["title"] = "装修指南";
        $category_class_name = isset($categoryClass["title"]) ? $categoryClass["title"] : '装修指南';
        $basic["head"]["title"] = $category_class_name . $pageContent;
        $basic["head"]["keywords"] = $category_class_name;
        $basic["head"]["description"] = $category_class_name;
        $info['canonical'] = '/zhinan/' . $category;
        $this->assign("info", $info);
        $this->assign("basic", $basic);


        $this->assign("fengge", $fengge);
        $this->assign("kongjian", $kongjian);
        $this->assign("fengshui", $fengshui);
        $this->assign("jiaju", $jiajushenhuo);

        $this->assign("cur_category_id", $categoryClass['id']);
        $this->assign("list", $list);
        $this->assign("page_tmp", $pageTmp);


        $this->display('zxzhinan-list');
    }

    function getJiaJuShenHuo()
    {
        $data = [
            [
                'id' => '375',
                'classname' => '饮食资讯',
                'shortname' => 'yszx',
            ],
            [
                'id' => '377',
                'classname' => '食疗养生',
                'shortname' => 'slys',
            ],
            [
                'id' => '378',
                'classname' => '营养指南',
                'shortname' => 'yyzn',
            ],
            [
                'id' => '372',
                'classname' => '孕产指南',
                'shortname' => 'yzzn',
            ],
        ];
        return $data;
    }

    public function freesjlist()
    {

        $this->display('freesj-list');
    }

    public function freesjdetail()
    {

        $this->display('freesj-detail');
    }

    public function search()
    {
        $keyword = remove_xss(I("get.keyword"));
        if (!$keyword) {
            $this->error();
        }
        //搜索结果赋值
        $this->assign('keyword', $keyword);

        //分页参数
        $pageCount = 10;
        $parameter = ['keyword' => $keyword];
        //总页数
        $count = D("WwwArticle")->getAnyTypeArticleCount('', $keyword);
        //空数据页面
        if ($count > 0) {
            import('Library.Org.Page.AllPage');
            //设置伪静态
            $static = [
                'template' => '/search-[PAGE].html',
                'first_url' => '/search'
            ];
            $page = new \AllPage($count, $pageCount, $static, $parameter);
            $pageTmp = $page->mGongLue();

            $nowPage = $page -> getNowPage();
            $res = D("WwwArticle")->getAnyTypeArticleListByIds('', ($nowPage - 1) * $pageCount, $pageCount, '', $keyword);

            $list = $this->sheZhiZxlclistShuJu($res);
            $this->assign("list", $list);
            $this->assign("page_tmp", $pageTmp);

        } else {
            //查找推荐攻略
            $res = D("WwwArticle")->getHotArticle(4);
            $hot = $this->sheZhiZxlclistShuJu($res);
            $this->assign("hot", $hot);


        }


        $this->display();

    }

    public function searchEmpty()
    {
        //查找推荐攻略
        $res = D("WwwArticle")->getHotArticle(4);
        $hot = $this->sheZhiZxlclistShuJu($res);
        $this->assign("hot", $hot);
        $this->display('search');
        die();
    }
}