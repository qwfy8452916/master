<?php
namespace Mip\Controller;
use Mip\Common\Controller\MipBaseController;

class VideoController extends MipBaseController
{

    private $category = array(
        array(
            'name' => '设计',
            'char' => 'sheji',
            'code' => '1',
            'tkd'  => array(
                'title' => '【装修设计视频】空间利用,动线设计,案例分享_齐装网装修讲堂',
                'keywords' => '装修设计视频',
                'description' => '齐装网装修讲堂为您提供专业的空间利用、动线设计等相关装修设计教学视频,让您了解并规避装修常见的问题。'
            ),
            'children' => array(
                array(
                    'name' => '空间利用',
                    'char' => 'kongjian',
                    'code' => '1',
                    'tkd'  => array(
                        'title' => '【装修视频】装修空间利用在线教学视频_齐装网装修讲堂',
                        'keywords' => '装修空间利用教学视频',
                        'description' => '齐装网装修讲堂为你提供装修过程中空间利用的各类教学视频。'
                    ),
                ),
                array(
                    'name' => '动线设计',
                    'char' => 'dongxian',
                    'code' => '2',
                    'tkd'  => array(
                        'title' => '【装修视频】装修动线设计在线教学视频_齐装网装修讲堂',
                        'keywords' => '装修动线设计教学视频',
                        'description' => '齐装网装修讲堂为你提供装修过程中动线设计的各类教学视频。'
                    ),
                ),
                array(
                    'name' => '案例分享',
                    'char' => 'anli',
                    'code' => '3',
                    'tkd'  => array(
                        'title' => '【装修视频】装修案例分享在线教学视频_齐装网装修讲堂',
                        'keywords' => '装修案例分享教学视频',
                        'description' => '齐装网装修讲堂为你提供装修过程中各类装修案例视频。'
                    ),
                ),
            )
        ),
        array(
            'name' => '局部装修',
            'char' => 'jubu',
            'code' => '2',
            'tkd'  => array(
                'title' => '【局部装修视频】客厅,卫生间,厨房,阳台,卧室装修视频_齐装网装修讲堂',
                'keywords' => '客厅装修视频,卫生间装修视频,厨房装修视频,卧室装修视频',
                'description' => '齐装网装修讲堂为您提供专业的客厅、卫生间、厨房、阳台、卧室等局部装修相关教学视频,让您了解并规避装修常见的问题。'
            ),
            'children' => array(
                array(
                    'name' => '客厅',
                    'char' => 'keting',
                    'code' => '4',
                    'tkd'  => array(
                        'title' => '【装修视频】客厅装修在线教学视频_齐装网装修讲堂',
                        'keywords' => '客厅装修教学视频',
                        'description' => '齐装网装修讲堂为你提供客厅装修过程中各类教学视频。'
                    ),
                ),
                array(
                    'name' => '卫生间',
                    'char' => 'weishengjian',
                    'code' => '5',
                    'tkd'  => array(
                        'title' => '【装修视频】卫生间装修在线教学视频_齐装网装修讲堂',
                        'keywords' => '卫生间装修教学视频',
                        'description' => '齐装网装修讲堂为你提供卫生间装修过程中各类教学视频。'
                    ),
                ),
                array(
                    'name' => '厨房',
                    'char' => 'chufang',
                    'code' => '6',
                    'tkd'  => array(
                        'title' => '【装修视频】厨房装修在线教学视频_齐装网装修讲堂',
                        'keywords' => '厨房装修教学视频',
                        'description' => '齐装网装修讲堂为你提供厨房装修过程中各类教学视频。'
                    ),
                ),
                array(
                    'name' => '阳台',
                    'char' => 'yangtai',
                    'code' => '7',
                    'tkd'  => array(
                        'title' => '【装修视频】阳台装修在线教学视频_齐装网装修讲堂',
                        'keywords' => '阳台装修教学视频',
                        'description' => '齐装网装修讲堂为你提供阳台装修过程中各类教学视频。'
                    ),
                ),
                array(
                    'name' => '卧室',
                    'char' => 'woshi',
                    'code' => '8',
                    'tkd'  => array(
                        'title' => '【装修视频】卧室装修在线教学视频_齐装网装修讲堂',
                        'keywords' => '卧室装修教学视频',
                        'description' => '齐装网装修讲堂为你提供卧室装修过程中各类教学视频。'
                    ),
                ),
                array(
                    'name' => '其他',
                    'char' => 'jubuqita',
                    'code' => '9',
                    'tkd'  => array(
                        'title' => '【其他局部装修视频】书房阳台等局部装修在线教学视频_齐装网装修讲堂',
                        'keywords' => '书房装修教学视频，阳台装修教学视频，其他局部装修视频',
                        'description' => '齐装网装修讲堂为你提供书房、阳台、走廊等局部装修过程中各类教学视频。'
                    ),
                ),
            )
        ),
        array(
            'name' => '装修扫盲',
            'char' => 'daogou',
            'code' => '3',
            'tkd'  => array(
                'title' => '【装修扫盲视频】合同签订、装修增减项、装修猫腻、常见问题_齐装网装修讲堂',
                'keywords' => '装修导购视频,装修猫腻视频,装修常见问题',
                'description' => '齐装网装修讲堂为您提供专业的合同签订、装修增减项、装修猫腻、常见问题等装修扫盲相关教学视频,让您了解并规避装修常见的问题。'
            ),
            'children' => array(
                array(
                    'name' => '合同签订',
                    'char' => 'hetong',
                    'code' => '10',
                    'tkd'  => array(
                        'title' => '【装修视频】装修合同签订-装修施工合同签订细节-齐装网装修讲堂',
                        'keywords' => '装修合同签订,装修施工合同,装修合同细节讲解',
                        'description' => '齐装网装修讲堂为大家讲解装修合同签订流程，施工合同签订细节及注意事项，让您了解装修合同签订过程中的常见问题，房子装修更放心。'
                    ),
                ),
                array(
                    'name' => '装修增减项',
                    'char' => 'zengjian',
                    'code' => '11',
                    'tkd'  => array(
                        'title' => '【装修视频】装修增减项-装修增减项知识详解-齐装网装修讲堂',
                        'keywords' => '装修增减项,装修增减项对策，水电路改造',
                        'description' => '齐装网装修讲堂为大家详细讲解装修过程中增减项相关事宜，包括水电路改造，木工项目增减等装修增减项知识，并为您提出有效的装修增减项对策，让你装修不花冤枉钱。'
                    ),
                ),
                array(
                    'name' => '装修猫腻',
                    'char' => 'maoni',
                    'code' => '12',
                    'tkd'  => array(
                        'title' => '【装修视频】装修猫腻-装修猫腻大盘点-齐装网装修讲堂',
                        'keywords' => '装修猫腻,装修报价猫腻，装修施工猫腻',
                        'description' => '齐装网装修讲堂为大家详细讲解装修过程中存在的猫腻，包括装修合同猫腻，装修报价猫腻，装修施工猫腻等，让您了解到装修过程中那些不为人知的猫腻，装修更轻松。'
                    ),
                ),
                array(
                    'name' => '常见问题',
                    'char' => 'changjian',
                    'code' => '13',
                    'tkd'  => array(
                        'title' => '【装修视频】装修常见问题-装修常见问题解决办法-齐装网装修讲堂',
                        'keywords' => '装修常见问题,装修问题集锦，装修常见问题怎么解决',
                        'description' => '齐装网装修讲堂为大家讲解装修过程中的常见问题，包括装修质量问题，装修工期问题，装修报价问题等装修问题集锦，并给您针对这些装修常见问题解决办法的合理建议。'
                    ),
                ),
            )
        ),
        array(
            'name' => '选材导购',
            'char' => 'xuancai',
            'code' => '4',
            'tkd'  => array(
                'title' => '【选材导购视频】装修选材,软装搭配视频教程_齐装网装修讲堂',
                'keywords' => '装修选材视频教程,软装搭配视频教程',
                'description' => '齐装网装修讲堂为您提供专业的装修选材、软装搭配等选材导购相关教学视频,让您了解并规避装修常见的问题。'
            ),
            'children' => array(
                array(
                    'name' => '装修材料',
                    'char' => 'cailiao',
                    'code' => '14',
                    'tkd'  => array(
                        'title' => '【装修视频】装修材料-家居装修建材-装修材料品牌价格-齐装网装修讲堂',
                        'keywords' => '装修材料,装修材料品牌,装修材料价格',
                        'description' => '齐装网装修讲堂为大家介绍装修相关材料知识，包括装修材料品牌，装修材料报价，五金建材等，让大家对装修建材有更深入的了解，更好的了解装修材料清单价格表等相关装修知识。'
                    ),
                ),
                array(
                    'name' => '软装搭配',
                    'char' => 'ruanzhuang',
                    'code' => '15',
                    'tkd'  => array(
                        'title' => '【装修视频】软装搭配-软装搭配技巧-齐装网装修讲堂',
                        'keywords' => '软装搭配,软装色彩搭配,软装搭配技巧',
                        'description' => '齐装网装修讲堂为大家介绍软装搭配及相关技巧，并给大家推荐实用的软装搭配方案，让你的房间装修看起来更潮流，更和谐，当然也更省钱。'
                    ),
                ),
            )
        ),
        array(
            'name' => '其他',
            'char' => 'qita',
            'code' => '5',
            'tkd'  => array(
                'title' => '【常见装修视频】海量装修教学视频_齐装网装修讲堂',
                'keywords' => '各类装修视频,装修视频教学',
                'description' => '上齐装网装修视频频道可在线看装修视频。看视频学装修。了解并规避装修常见的问题。'
            ),
            'children' => array()
        ),
    );



    public function index()
    {

        //设置默认值(修改默认值的话需要修改下面的tkd)
        //$bigCategory = $this->category['0'];
        $subCategory = array();

        //获取分类
        $category = I('get.category');
        if (!empty($category)) {
            foreach ($this->category as $key => $value) {
                if ($category == $value['char']) {
                    $bigCategory = $value;
                    $subCategory = array();
                    break;
                }
                foreach ($value['children'] as $k => $v) {
                    if ($category == $v['char']) {
                        $bigCategory = $value;
                        $subCategory = $v;
                        break;
                    }
                }
            }

            if(empty($bigCategory['code'])){
                $this->_error();
            }
        }else{
            $bigCategory = $this->category['0'];
        }
        $start = 1;
        $each = 10;
        if(!empty($_GET["p"])){
            $start = I('get.p');
        }

        //获取列表
//        $result = D('ArticleVedio')->getArticleVedioListByCategoryForIndex($bigCategory['code'], $subCategory['code'], ($start - 1) * $each, $each);
        $info = $this->getVideoList($bigCategory['code'], $subCategory['code'], $start, $each);

        //下拉刷新请求
        /*if (IS_AJAX) {
            if (!empty($result)) {
                $this->ajaxReturn(array('status' => 1, 'data' => $result));
            }
            $this->ajaxReturn(array('status' => 0));
            exit();
        }*/

        //tkd与canonical
        if (!empty($subCategory)) {
            $basic['head']['title'] = $subCategory['tkd']['title'];
            $basic['head']['keywords'] = $subCategory['tkd']['keywords'];
            $basic['head']['description'] = $subCategory['tkd']['description'];
        } else {
            $basic['head']['title'] = $bigCategory['tkd']['title'];
            $basic['head']['keywords'] = $bigCategory['tkd']['keywords'];
            $basic['head']['description'] = $bigCategory['tkd']['description'];
        }

        $basic['body']['title'] = '装修视频';

//        $info['info'] = $result;

        if(empty($basic['head']['title'])){
            $basic['head']['title'] = "mip.qizuang.com/video";
        }

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];


        /*E-底部设计浮动框*/
        $this->assign("canonical", $canonical);
        $this->assign('info',$info);
        $this->assign('basic',$basic);
        $this->assign("head", $basic['head']);
        $this->assign('allCategory',$this->category);
        $this->assign('bigCategory',$bigCategory);
        $this->assign('subCategory',$subCategory);
        $this->display();
    }



    /**
     * [terminal 视频终端页]
     * @return [type] [description]
     */
    public function video(){

        $id = I('get.id');
        if(empty($id)){
            $this->_error();
        }
        $info['info'] = D('ArticleVedio')->getArticleVedioById($id);
        if(empty($info['info'])){
            $this->_error();
        }

        //设置浏览量
        D('ArticleVedio')->addArticleVedioPvById($id);

        $info['type'] = $info['info']['type'] == 1 ? '装修讲堂' : '装修头条';
        $info['link'] = $info['info']['type'] == 1 ? 'jiangtang' : 'toutiao';

        //TDK
        $basic['head']['title'] = $info['info']['title'].'-'.$info['type'].'-齐装网';
        $basic['head']['keywords'] = $info['info']['title'];
        $basic['head']['description'] = $info['info']['description'];
        $basic['body']['title'] = $info['type'];

        //获取推荐视频
        $info['recommend'] = S('C:M:Video:'.$info['info']['type'].':3');
        if(empty($info['recommend'])){
            $info['recommend'] = D('ArticleVedio')->getRecommendArticleVedio($info['info']['type'],0,3,'','rand()');
            S('C:M:Video:'.$info['info']['type'].':3',$info['recommend'],3600);
        }
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];
        //熊掌号
        $baidu['optime'] = date("Y-m-d",$info['info']['time'])."T".date("H:i:s",$info['info']['time']);
        $this->assign('baidu',$baidu);

        $this->assign("canonical", $canonical);
        $this->assign("head", $basic['head']);
        $this->assign('info',$info);
        $this->assign('basic',$basic);
        $this->display();
    }


    /**
     * 获取视频列表
     * @param  int    $type    视频类型
     * @param  int    $start   开始页
     * @param  int    $each    每页显示
     * @param  string $keyword 搜素关键词
     * @return array           返回结果数组
     */
    public function getArticleVedioList($type,$start,$each,$keyword)
    {
        $start = ($start - 1 < 0) ? 0 : ($start - 1);
        import('Library.Org.Page.MobilePage');
        $result = D('ArticleVedio')->getArticleVedioList($type,$start*$each,$each,$keyword);
        $config  = array("prev","next");
        $page = new \MobilePage($start,$each,$result['count'],$config);
        $show =  $page->show();
        return array("list"=>$result['list'],"show"=>$show);
    }

    //视频首页mip分页
    public function getVideoList($bigCategory, $subCategory, $start, $each){
        $result = D('ArticleVedio')->getArticleVedioListByCategoryForIndex($bigCategory, $subCategory, ($start - 1) * $each, $each);
        $count = D("ArticleVedio")->getCount($bigCategory, $subCategory);
        import('Library.Org.Page.Page');
        $config  = array("prev","next");
        //调用mip分页方法
        $page = new \Page($start, $each, (int)$count, $config, 'html');
        $pageMipTmp = $page->show3();
        return array("info"=>$result, "page"=>$pageMipTmp);
    }

}