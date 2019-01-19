<?php

namespace Mip\Controller;

use Mip\Common\Controller\MipBaseController;

class CaseController extends MipBaseController
{
    public function index()
    {
        $get = I('get.');
        $pageIndex = max(1, $get['p']);
        $pageCount = ($get['count'] != '') && ($get['count'] != null) ? (int)$get['count'] : 10;
        $keyword = trim(I('get.keyword'));
        $search['p'] = $get['p'];
        //获取风格
        $fg = D("Common/Fengge")->getfg();
        $top = array(
            "id" => "",
            "type" => "fengge",
            "name" => "不限"
        );
        array_unshift($fg, $top);
        unset($fg[count($fg) - 1]);
        $info["fg"] = $fg;
        if (I("get.fengge") !== "") {
            $search['fengge'] = I("get.fengge");
            $fengge = I("get.fengge");
            $info["fengge"] = I("get.fengge");
            $flag = false;
            foreach ($fg as $key => $value) {
                if ($fengge == $value['id']) {
                    $flag = true;
                    $info['selected']['fengge'] = $value;
                }
            }
            if ($flag == false) {
                $this->_error();
            }
        }
        //获取户型
        $hx = D("Common/Huxing")->gethx();
        $top = array(
            "id" => "",
            "type" => "hx",
            "name" => "不限"
        );
        array_unshift($hx, $top);
        unset($hx[count($hx) - 1]);
        $info["hx"] = $hx;

        if (I("get.hx") !== "") {
            $search['hx'] = I("get.hx");
            $huxing = I("get.hx");
            $info["huxing"] = I("get.hx");
            $flag = false;
            foreach ($hx as $key => $value) {
                if ($huxing == $value['id']) {
                    $flag = true;
                    $info['selected']['huxing'] = $value;
                }
            }
            if ($flag == false) {
                $this->_error();
            }
        }

        //获取价格
        $jg = D("Common/Jiage")->getJiage();
        $top = array(
            "id" => "",
            "type" => "jg",
            "name" => "不限"
        );
        array_unshift($jg, $top);
        unset($jg[count($jg) - 1]);
        $info["jg"] = $jg;
        if (I("get.jg") !== "") {
            $search['jg'] = I("get.jg");
            $jiage = I("get.jg");
            $info["jiage"] = I("get.jg");
            $flag = false;
            foreach ($jg as $key => $value) {
                if ($jiage == $value['id']) {
                    $flag = true;
                    $info['selected']['jiage'] = $value;
                }
            }
            if ($flag == false) {
                $this->_error();
            }
        }
        //案列
        $result = $this->getCaseImagesList($pageIndex, $pageCount, "", $huxing, $fengge, $jiage, "", "", $keyword, '', false);
        $info["cases"] = $result["images"];
        $info["page"] = $result["page"];

        //关键字、描述、标题
        //$basic["head"]["title"] = $result['images'][0]['zcost']."装修案例_".$result['images'][0]['zcost']."装修设计效果图片第".$pageIndex."页-齐装网";
        $basic["head"]["title"] = "装修案例_"."装修设计效果图片"."-齐装网";
        $basic["head"]["keywords"] = "装修案例,装修效果图,装修设计";
        $basic["head"]["description"] = "齐装网为您提供".date("Y")."年全新流行的装修案例设计效果图片,以及装修样板房图片！找装修案例设计效果图片就上齐装网！";

        //携带原有参数
        $oldUrl = $this->getJumpUrl($search);
        $this->assign('head', $basic["head"]);
        $this->assign('oldUrl', $oldUrl);
        $this->assign('info', $info);
        $this->display();
    }

    public function caseinfo()
    {
        $id = I('get.id');
        $info = [];//S("Cache:".I("get.bm").I("get.id"));
        if (!$info) {
            //查询案例的详细信息
            $case = $this->getCaseInfo(I("get.id"), '');
            if (!empty($case)) {
                if (!empty($case['qc']) || empty($case['jc'])) {
                    if (!empty($case['jc'])) {
                        $case['comapny'] = $case['jc'];
                    } else {
                        $case['comapny'] = $case['qc'];
                    }
                }
                $info["case"] = $case;
                $info["title"] = "装修案例";
                S("Cache:" . I("get.bm") . I("get.id"), $info, 900);
            } else {
                //根据编号再查询一次，防止SESSION丢失后的404
                $case = $this->getCaseInfo(I("get.id"));
                if (count($case) > 0) {
                    if (!empty($case["cs"])) {
                        $cs = $case["cs"];
                        //根据城市编号查询城市信息
                        $area = D("Area")->getCityById($cs);
                        $url = "http://m." . C("QZ_YUMING") . "/" . $area[0]["bm"] . "/caseinfo/" . I("get.id") . ".shtml";
                        header("HTTP/1.1 301 Moved Permanently");
                        header("Location:" . $url);
                        die();
                    }
                }
                $this->_error();
                die();
            }
        }
        //seo 标题/描述/关键字
        $basic["head"]["title"] = $info["case"]["title"].$info["case"]["mianji"]."平米".$info["case"]["dname"].$info["case"]["fengge"]."家装装修图片设计";
        $basic["head"]["keywords"] = $info["case"]["title"].",".$info["case"]["fengge"].$info["case"]["dname"]
            .",".$info["case"]["fengge"].$info["case"]["dname"]
            ."设计,".$info["case"]["fengge"].$info["case"]["dname"]
            ."装修图片,".$info["case"]["mianji"]."平米".$info["case"]["now"]["dname"]."装修图片";
        $basic["head"]["description"] ="齐装网装修效果图频道为您提供".$info["case"]["title"].$info["case"]["mianji"]."平米".$info["case"]["dname"].$info["case"]["fengge"].
            "家装装修图片设计，以及".date("Y")."年国内外最流行的装修效果图大全，".$info["case"]["text"];

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];

        $this->assign("canonical", $canonical);
        $this->assign('head',$basic["head"]);
        $this->assign("info", $info);
        $this->display();
    }

    /**
     * 获取装修案例效果图
     * @return [type] [description]
     */
    private function getCaseImagesList($pageIndex = 1, $pageCount = 10, $classid = 1, $huxing = "", $fengge = "", $jiage, $ys, $sm, $keyword, $cs)
    {
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);
        $count = D("Common/Cases")->getCaseImagesListCount($classid, $huxing, $fengge, $jiage, $ys, $sm, $keyword, $cs);
        if ($count > 0) {
            import('Library.Org.Page.MobilePage');
            //自定义配置项
            $config = array("prev", "next");
            $page = new \MobilePage($pageIndex, $pageCount, (int)$count, $config, "html");
            $pageTmp = $page->show3();
            $result = D("Common/Cases")->getCaseImagesList(($page->pageIndex - 1) * $pageCount, $pageCount, $classid, $huxing, $fengge, $jiage, $ys, $sm, $keyword, $cs);

            return array("images" => $result, "page" => $pageTmp, "totalpage" => $page->pageTotalCount);
        }
        return null;
    }

    /**
     * 获取案例信息
     * @param  string $id [案例编号]
     * @param  string $cs [所在城市]
     * @return [type]     [description]
     */
    private function getCaseInfo($id = '', $cs = '')
    {
        $caseInfo = D("Common/Cases")->getMobileCaseInfo($id, $cs);
        $returnData = [];
        if (count($caseInfo) > 0) {
            foreach ($caseInfo as $key => $value) {
                if ($key == 0) {
                    $returnData['id'] = $value['id'];
                    $returnData['title'] = $value['title'];
                    $returnData['mianji'] = $value['mianji'];
                    $returnData['qc'] = $value['qc'];
                    $returnData['jc'] = $value['jc'];
                    $returnData['fengge'] = $value['fengge'];
                    $returnData['dname'] = $value['dname'];
                }
                $returnData["imgs"][$key]['img_host'] = $value['img_host'];
                $returnData["imgs"][$key]['img_path'] = $value['img_path'];
                $returnData["imgs"][$key]['title'] = $value['title'];
            }
            return $returnData;
        }
        return null;
    }

    private function getJumpUrl($data)
    {
        $class = ['fengge','hx','jg'];
        $returnData = [];
        //去掉对应的参数,只保留其他参数

//            $returnData[$c] = preg_replace('/[&]?' . $c . '\=[0-9]?/i', "", $url);
        foreach ($data as $k => $v) {
            foreach ($class as $kk => $c) {
                if ($k != $c) {
                    $returnData[$c] .= '&' . $k . '=' . $v;
                }
            }
        }
        return $returnData;
    }
}