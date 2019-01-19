<?php

namespace Mip\Controller;

use Mip\Common\Controller\MipBaseController;

class WendaController extends MipBaseController
{
    public function _initialize(){
        parent::_initialize();
        $uri = $_SERVER['REQUEST_URI'];
        $parse = parse_url("http://". C("MOBILE_DONAMES").$uri);
        if (empty($parse["query"])) {
            preg_match('/html$/',$uri,$m);
            if (count($m) == 0) {
                preg_match('/\/$/',$uri,$m);
                if (count($m) == 0) {
                    header( "HTTP/1.1 301 Moved Permanently");
                    header("Location: http://". C("MIP_DONAMES").$uri."/");
                }
            }
        }
    }

    public function index()
    {
        $pageIndex = I('get.p');
        $pageCount = I('get.count');
        $cateId = I('get.id');
        $this->assign('is_search', 0);//设置是否为搜索页面

        //取所有分类
        $Data = D("Common/Ask");
        $category = $Data->getCategorys();

        //如果分类不为空
        if (!empty($cateId)) {

            if (!is_numeric($cateId)) {
                $this->_error();
            }

            //取当前分类信息
            $theCategory = $Data->getCategorys($cateId);
            //取当前分类的父分类,如果父分类是0，说明本身就是父分类
            $parentId = $theCategory['pid'] == '0' ? $cateId : $theCategory['pid'];
            //根据父分类取子分类并高亮显示
            $subCategory = $category[$parentId]['sub_cate'];
            foreach ($subCategory as $k => $v) {
                if ($v['cid'] == $cateId) {
                    $subCategory[$k]['cls'] = ' class="active-menu"';
                }
            }

            //取所有父分类
            foreach ($category as $k => $v) {
                if ($v['cid'] == $parentId) {
                    $info['category_name'] = $v['name'];
                    $category[$k]['cls'] = ' class="active-menu"';
                }
                unset($category[$k]['sub_cate']);
            }
            $info['category_id'] = $theCategory['pid'];
            $info['sub_category_name'] = $theCategory['name'];
            $info['sub_category_id'] = $theCategory['cid'];

            if (empty($info['category_name'])) {
                $this->_error();
            }

            $info['title'] = $theCategory['title'];
            $info['keywords'] = $theCategory['keywords'];
            $info['description'] = $theCategory['description'];

            $condition['cateId'] = $cateId;
            $this->assign("subCategory", $subCategory);
        }

        //如果关键字不为空
        $keyword = I('get.keyword');
        if (!empty($keyword) || isset($url['keyword'])) {
            if (!checkKeyword($keyword)) {
                $this->_error();
            }
            $condition['keyword'] = $keyword;
        }

        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);
        $pageCount = 10;

        if (!empty($keyword) || isset($url['keyword'])) {
            if (!checkKeyword($keyword)) {
                $this->_error();
            }
            $condition['keyword'] = $keyword;
            $template = 'searchresult';
            $info['keyword'] = $keyword;
        }


        $condition['orderBy'] = 'a.anwsers DESC';

        //如果分类不为空
        if (!empty($cateId)) {
            if (is_numeric($cateId)) {
                $condition['cateId'] = $cateId;
                $condition['orderBy'] = 'a.post_time DESC';
            }
        }
        if (empty($info['SEO_title'])) {
            $info['title'] = '齐装网装修问答平台 - 中国领先的装修问答网';
            $info['keywords'] = '装修问答,装修问答网,装修问题';
            $info['description'] = '齐装网装修问答平台为业主提供家庭室内装修以及公共装修过程中遇到的各种问题及解决办法。为业主提供即时便捷及专业的装修问题解决方法。';
        }
        $this->assign('head', $info);
        $result = $this->getAskList($condition, $pageIndex, $pageCount);

        //没有搜索结果，跳转相应页面
        if(empty($result['list'])){
            $map['orderBy'] = 'a.views DESC';
            $hotAsk = D('Ask')->getCategoryAsk($map,4);
            $this->assign("hotAsk",$hotAsk);
            $this->display("Wenda/searchno");die;
        }

        $this->assign("category", $category);
        $this->assign('cateId', $cateId);
        $this->assign('list', $result['list']);
        $this->assign('page', $result['page']);
        $this->display();
    }

    public function content(){
        $qid = I('get.id');
        if(empty($qid) || !is_numeric($qid)){
            $this->_error();
        }

        $Data = D("Common/Ask");
        $ask = $Data->getAskById($qid);

        if(empty($ask)){
            $this->_error();
        }


        $ask['name'] = empty($ask['jc']) ? $ask['name'] : $ask['jc'];

        //取一级和二级分类
        $categorys = $Data->getCategorys();
        $category = $categorys[$ask['cid']];
        unset($categorys);
        $ask['category_name'] = $category['name'];
        foreach ($category['sub_cate'] as $key => $value) {
            if($value['cid'] == $ask['sub_category']){
                $ask['sub_category_name'] = $value['name'];
                break;
            }
        }


        //取问题图片列表
        $ask['img'] = $Data->getQuestionImg($qid);

        //根据问题ID取所有答案图片
        $tempImgList = $Data->getAnwserImg($qid);
        foreach ($tempImgList as $k => $v) {
            $imgList[$v['fid']][] = $v;
        }
        unset($tempImgList);

        //取最佳答案
        //此处不应查询数据库，应根据QID取所有答案后再处理
        if($ask['best_aid'] !== null){
            $bestAnwser = $Data->getAnwserById($ask['best_aid']);
            //如果最佳答案没有被删除
            if(!empty($bestAnwser)){
                $bestAnwser['post_time'] = timeFormat($bestAnwser['post_time']);
                $bestAnwser['name'] = empty($bestAnwser['jc']) ? $bestAnwser['name'] : $bestAnwser['jc'];
                $bestAnwser['url'] = $bestAnwser['classid'] == '3' ? 'http://'.$bestAnwser['bm'].'.'. C('QZ_YUMING') .'/wenda/'.$bestAnwser['uid'] : 'javascript:;';
                //取图片列表
                $bestAnwser['img'] = $imgList[$bestAnwser['id']];
                $this->assign("bestAnwser",$bestAnwser);
            }
        }

        //取答案 - 排除最佳答案
        $anwserList = $Data->getAnwserList($qid,'a.post_time DESC',$ask['best_aid']);
        foreach ($anwserList as $k => $v) {
            $anwserList[$k]['post_time'] = timeFormat($v['post_time']);
            $anwserList[$k]['img'] = $imgList[$v['id']];
            $anwserList[$k]['name'] = empty($v['jc']) ? $v['name'] : $v['jc'];
            $anwserList[$k]['url'] = $v['classid'] == '3' ? 'http://'.$v['bm'].'.'. C('QZ_YUMING') .'/wenda/'.$v['uid'] : 'javascript:;';
        }


        //总答案数
        $ask['anwsers'] = $ask['best_aid'] == null ? count($anwserList) : count($anwserList) + 1;
        if(empty($ask['description'])){
            $ask['description'] = mbstr($ask['content'],0,120);
        }
        $ask['post_time'] = date('Y-m-d H:i:s',$ask['post_time']);
        $ask['anwserCount'] = count($anwserList);
        $ask['modify_time'] = empty($ask['modify_time']) ? '' : '<li>最后修改：'.date('Y-m-d H:i:s',$ask['modify_time']).'</li>';

        //相关问题
        //$relatedAnwser = $this->getRelatedAnwser($ask['cid'],6);
        $relatedAnwser = D('Ask')->getRelationQuestion($ask['tags'],$ask['keywords'],$ask['sub_category'],$ask['cid'],6,$ask['id']);

        //为您推荐
        //调取新内容管理-视频管理里面的最新推荐视频
        $video = D('Ask')->getNewVideo();

        //增加查看数
        $Data->updateViews($qid);

        $key = [
            'title'=>$ask['title'],
            'keywords'=>$ask['keywords'],
            'description'=>'齐装网装修问答平台为网友提供各种' . $ask['title'] . '问题解答。齐装网装修问答汇集众多业主的装修经验，迅速解决您的装修困惑。',
        ];

        $info['header']['canonical'] = 'http://'.C('MOBILE_DONAMES').'/wenda/x'.$qid.'.html';

        //给前台content模板id为showmore重新分配id
        if(empty($anwserList)){
            $anwserList[0]['id'] = '01';
        }

        //分配canonical标签
        $canonical = "http://" . C("MIP_DONAMES") . $_SERVER['REQUEST_URI'];

        //熊掌号
        $baidu['optime'] = date("Y-m-d",strtotime($ask['post_time']))."T".date("H:i:s",strtotime($ask['post_time']));
        $this->assign('baidu',$baidu);

        $this->assign("canonical", $canonical);
        $this->assign("head", $key);
        $this->assign("info", $info);
        $this->assign("category",$category);
        $this->assign("ask",$ask);
        $this->assign("video",$video);
        $this->assign("anwserList",$anwserList);
        $this->assign("related",$relatedAnwser);
        $this->display('content');
    }
    public function searchresult(){
        $this->display();
    }

    public function searchno(){
        $this->display();
    }
    //取问答列表
    private function getAskList($condition, $pageIndex = 1, $pageCount = 10)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        import('Library.Org.Page.Page');
        $result = D("Common/Ask")->getQUCList($condition, ($pageIndex - 1) * $pageCount, $pageCount);
        $count = $result['count'];
        $list = $result['result'];
        $config = array("prev", "first", "last", "next");
        $page = new \Page($pageIndex, $pageCount, $count, $config);
        $pageTmp = $page->show3();
        return array("list" => $list, "page" => $pageTmp, "num" => $count);
    }
}