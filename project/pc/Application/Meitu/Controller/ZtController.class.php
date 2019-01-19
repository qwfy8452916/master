<?php

namespace Meitu\Controller;
use Meitu\Common\Controller\MeituBaseController;

//美图专题列表页

class ZtController extends MeituBaseController {
    public function _initialize()
    {
        parent::_initialize();
        if (IS_GET) {
            $uri = $_SERVER['REQUEST_URI'];
            preg_match('/html$/', $uri, $m);
            if (count($m) == 0) {
                preg_match('/\/$/', $uri, $m);
                $parse = parse_url($uri);
                if (count($m) == 0 && empty($parse["query"])) {
                    header("HTTP/1.1 301 Moved Permanently");
                    if (isSsl()) {
                        $http = "https://";
                    } else {
                        $http = "http://";
                    }
                    header("Location: " . $http . $_SERVER["HTTP_HOST"] . $uri . "/");
                    die();
                }
            }
        }
    }

    //首页
    public function index() {
        $pageCount = 12;
        $pageIndex = I('get.page');
        $pageIndex = empty($pageIndex) ? 1 : $pageIndex;
        $map['status'] = 1;

        //获取结果
        $result = D("Special")->getList($map,($pageIndex-1) * $pageCount,$pageCount);

        import('Library.Org.Page.SPage');
        $page = new \SPage($result['count'], $pageCount, array(
            'templet' => '/zt-p[PAGE].html',
            'firstUrl' => '/zt/'
        ));
        $pageTmp =  $page->show();


        $banner = D('Special')->getBannerList(array('status'=>'1','type'=>2));
        $banner = multi_array_sort($banner, 'order_id',SORT_DESC);
        $this->assign('banner',$banner);
        $this->assign("list",$result['result']);
        $this->assign('page',$page->show());
        $this->display();
    }


    //美图专题详情页
    public function detail() {
        $id = I('get.id');
        if (empty($id)) {
            $this->_error('数据错误！');
        }

        $info = D('Special')->getSpecial($id);

        $result = D('Special')->getSpecialItem(array('zid'=>$id));
        foreach ($result as $key => $value) {
            $itemList[$value['type']][] = $value['item_id'];
        }

        //获取美图列表
        if(!empty($itemList['1'])){
            $this->assign('meituList',D('Special')->getMeituList($itemList['1']));
        }

        //获取案例列表
        if(!empty($itemList['2'])){
            $caseList = D('Special')->getCaseList($itemList['2']);
            $this->assign('caseList',$caseList);
        }

        //获取攻略列表
        if(!empty($itemList['3'])){
            $this->assign('articleList',D('Special')->getArticleList($itemList['3']));
        }

        //获取最新专题
        $map['status'] = 1;
        $result = D("Special")->getList($map,0,4);
        $this->assign('ztList',$result['result']);

        $this->assign('info',$info);
        $this->display();
    }
}