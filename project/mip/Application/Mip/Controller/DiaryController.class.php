<?php

namespace Mip\Controller;

use Mip\Common\Controller\MipBaseController;

class DiaryController extends MipBaseController
{
    public function index()
    {
        $Data = D("Common/Diary");

        $cid = I('get.category');

        //获取日记列表信息
        $diaryList = $Data->get_all_diary_list_api('0,8', $cid);
        foreach ($diaryList['list'] as $k => $v) {
            $imgNum = count($v['img_list']);
            if ($imgNum > 4) {
                $diaryList['list'][$k]['img_list'] = array_slice($v['img_list'], 0, 4);
            }
        }
        $category = $Data->get_diary_type();
        foreach ($category as $k => $v) {
            $category[$k]['px'] = 'px' . $v['id'];
        }
        $info['title'] = '全部';
        $info['px'] = 'px0';
        if (!empty($cid)) {
            foreach ($category as $k => $v) {
                if ($v['id'] == $cid) {
                    $info['title'] = $v['type_name'];
                    $info['px'] = 'px' . $v['id'];
                }
            }

        }

        $pageIndex = max(1, I('get.p'));

        $info['pageid'] = $pageIndex;

        if ($_SERVER['REQUEST_URI'] == '/riji/' || $_SERVER['REQUEST_URI'] == '/riji') {
            $info['canonical'] = '1';
        }
        $keys["title"] = $info["title"] . " - 装修日记";
        $keys["keywords"] = $info["title"] . "装修问答";
        $keys["description"] = "齐装网装修问答平台为业主提供室内装修中的" . $info["title"] . "装修遇到的问题及答案；帮助业主解决" . $info["title"] . "装修问题。";
        $this->assign('head',$keys);
        $this->assign("category", $category);
        $this->assign("cid", $cid);
        $this->assign("list", $diaryList['list']);
        $this->assign("page", $diaryList['pageTmp']);
        $this->assign("info", $info);
        $this->assign("pageid", $pageIndex);
        $this->assign("totalpage", $diaryList['totalpage']);
        $this->display();
    }

    public function content()
    {
        $id = I('get.id');
        $Data = D("Common/Diary");

        $info = $Data->get_one_diary_info($id);

        $info = $info[0];

        //根据风格查询美图最新
        $fengge = $info['fengge'];
        $meitu = D("Meitu")->getOneMeituByFengGe($fengge);
        $info['meitu'] = $meitu[0];


        //查询装修公司
        if (!empty($info['company_name'])) {
            $company = $Data->getDiaryCompanyByName($info['company_name']);
            $info['company'] = $company[0];
        }

        //查询相关日记,同parent_id
        $p_map['id'] = array('NEQ', $info['id']);
        $p_map['parent_id'] = array('EQ', $info['parent_id']);
        $other_diary = $Data->get_diarys_by_parent_id($p_map);

        if (empty($info) || $info["parent_id"] == 0) {
            $this->_error();
            die();
        }

        $info['img_list'] = $Data->get_diary_img_by_id($id);


        $info['user_info'] = M('user')->find($info['user_id']);

        $keys["title"] = $info["title"] . " - 齐装网装修日记 - 齐装网装修";
        $keys["keywords"] = $info["title"];
        $keys["description"] = mb_substr($info["content"], 0, 50, "utf-8");
        //日记访问量加1

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];

        //百度官方熊掌号
        $baidu['url'] = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        $baidu['title'] = mb_substr($info['title'], 0, 20, "utf-8");
        foreach($info['img_list'] as $key => $value){
            if($key < 3){
                $baidu['img'][] = "http://staticqn.qizuang.com/" . $value['img_path'];
            }
        }
        $baidu['pubDate'] = date("Y-m-d H:i:s", $info['add_time']);
        $baidu['pubDate'] = substr($baidu['pubDate'], 0, 10) . "T" . substr($baidu['pubDate'], 11);
        $this->assign("baidu", $baidu);

        $Data->diary_page_view_add($id);

        $this->assign("canonical", $canonical);
        $this->assign('info', $info);
        $this->assign('otherdiary', $other_diary);
        $this->assign("head", $keys);
        $this->display();
    }
}