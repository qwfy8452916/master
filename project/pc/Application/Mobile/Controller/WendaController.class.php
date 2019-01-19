<?php
/**
 * 移动版 - 问答首页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class WendaController extends MobileBaseController{

    public function index(){
        $Data = D("Common/Ask");
        $category = $Data->getCategorys();

        $cateId = I('get.id');

        //如果分类不为空
        if(!empty($cateId)){
            if(!is_numeric($cateId)){
                $this->_error();
            }
            $theCategory = $Data->getCategorys($cateId);
            $parentId = $theCategory['pid'] == '0' ? $cateId : $theCategory['pid'];
            //取所有父分类
            foreach ($category as $k => $v){
                if($v['cid'] == $parentId){
                    $info['category_name'] = $v['name'];
                }
                unset($category[$k]['sub_cate']);
            }
            $condition['cateId'] = $cateId;

            $info['canonical'] = 'ask-'.$cateId;
        }

        $pageIndex = 1;
        $pageCount = 10;
        if(!empty($_GET["p"])){
            $pageIndex = remove_xss($_GET["p"]);
            $pageContent ="第".$pageIndex."页";
        }

        //如果关键字不为空
        $keyword = I('get.keyword');
        if(!empty($keyword) || isset($url['keyword'])){
            $condition['keyword'] = $keyword;
        }

        //如果动作不为空
        $action = I('get.action');
        if(!empty($action)){
            if($action == 'dist'){
                $condition['orderBy'] = 'a.post_time DESC';
                $condition['a.is_distillate'] = array("EQ",1);
                $info['title'] = '精华问题';
            }
            if($action == 'hot'){
                $condition['orderBy'] = 'a.anwsers DESC';
                $condition['a.anwsers'] = array("GT",1);
                $info['title'] = '热门回答';
            }
            if($action == 'new'){
                $condition['orderBy'] = 'a.post_time DESC';
                $info['title'] = '新提问';
            }
            if($action == 'unanswer'){
                $condition['anwsers'] = array("EQ",0);
                $condition['orderBy'] = 'a.post_time DESC';
                $info['title'] = '等您来回答';
            }
        }
        if(empty($info['title'])){
            $info['title'] = '所有问题';
        }

        $result = $this->getAskList($condition,$pageIndex,$pageCount);

        if(I('get.act') == 'ajax'){
            $list = $result['list'];
            foreach ($list as $k => $v) {
                $html .= '<li><h1><a href="/wenda/x'.$v['id'].'.html">'.$v['title'].'</a></h1><p><span class="user-hand"><img src="'.$v['logo'].'" alt=""/></span><span class="user-name">'.$v['username'].'</span><span>'.$v['anwsers'].'个回答</span><span>'.$v['name'].'</span></p></li>';
            }
            echo $html;
            die();
        }
        $info['pageid'] = $pageIndex;


        $this->assign("category",$category);
        $this->assign("list",$result['list']);
        $this->assign("page",$result['page']);
        $this->assign("info",$info);
        $this->display();
    }

    //问题查看页
    public function show(){
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
        //dump($ask);


        //取问题图片列表
        $qImg = $Data->getQuestionImg($qid);

        //根据问题ID取所有答案图片
        $tempImgList = $Data->getAnwserImg($qid);
        foreach ($tempImgList as $k => $v) {
            $imgList[$v['fid']][] = $v;
        }
        unset($tempImgList);

        //取精选答案
        //此处不应查询数据库，应根据QID取所有答案后再处理
        if($ask['best_aid'] !== null){
            $bestAnwser = $Data->getAnwserById($ask['best_aid']);
            //如果精选答案没有被删除
            if(!empty($bestAnwser)){
                $bestAnwser['post_time'] = timeFormat($bestAnwser['post_time']);
                $bestAnwser['name'] = empty($bestAnwser['jc']) ? $bestAnwser['name'] : $bestAnwser['jc'];
                $bestAnwser['url'] = $bestAnwser['classid'] == '3' ? 'http://'.$bestAnwser['bm'].'.'. C('QZ_YUMING') .'/wenda/'.$bestAnwser['uid'] : 'javascript:;';
                //取图片列表
                $bestAnwser['img'] = $imgList[$bestAnwser['id']];
                $this->assign("bestAnwser",$bestAnwser);
            }
        }

        //取答案 - 排除精选答案
        $anwserList = $Data->getAnwserList($qid,'a.post_time DESC',$ask['best_aid']);
        foreach ($anwserList as $k => $v) {
            $anwserList[$k]['post_time'] = timeFormat($v['post_time']);
            $anwserList[$k]['img'] = $imgList[$v['id']];
            $anwserList[$k]['name'] = empty($v['jc']) ? $v['name'] : $v['jc'];
            $anwserList[$k]['url'] = $v['classid'] == '3' ? 'http://'.$v['bm'].'.'. C('QZ_YUMING') .'/wenda/'.$v['uid'] : 'javascript:;';
        }

        //总答案数
        $ask['anwsers'] = $ask['best_aid'] == null ? count($anwserList) : count($anwserList) + 1;
        $ask['description'] = mbstr($ask['content'],0,120);
        $ask['post_time'] = date('Y-m-d H:i:s',$ask['post_time']);
        $ask['anwserCount'] = count($anwserList);
        $ask['modify_time'] = empty($ask['modify_time']) ? '' : '<li>最后修改：'.date('Y-m-d H:i:s',$ask['modify_time']).'</li>';

        //相关问题
        $relatedAnwser = $this->getRelatedAnwser($ask['cid'],6);

        //增加查看数
        $Data->updateViews($qid);

        //dump($anwserList);

        $this->assign("category",$category);
        $this->assign("ask",$ask);
        $this->assign("anwserList",$anwserList);
        $this->assign("related",$relatedAnwser);
        $this->display();
    }



    //取问答列表
    private function getAskList($condition,$pageIndex = 1,$pageCount = 10)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        import('Library.Org.Page.Page');
        $result = D("Common/Ask")->getQUCList($condition,($pageIndex-1) * $pageCount,$pageCount);
        $count = $result['count'];
        $list = $result['result'];
        $config  = array("prev","first","last","next");
        $page = new \Page($pageIndex,$pageCount,$count,$config);
        $pageTmp =  $page->show();
        return array("list"=>$list,"page"=>$pageTmp,"num"=>$count);
    }

    //获取相关问题，按分类ID缓存15分钟
    private function getRelatedAnwser($cid,$num){
        $result = S('Cache:Ask:related:cate'.$cid);
        if(empty($result)){
            S('Cache:Ask:related:cate'.$cid,null);
            $condition['orderBy'] = 'a.post_time DESC';
            $condition['cateId'] = $cid;
            $relatedAnwser = D("Common/Ask")->getQListByCategory($condition,0,40);
            $result =$relatedAnwser['result'];
            unset($relatedAnwser);
            S('Cache:Ask:related:cate'.$cid,$result,900);
        }
        //如果当前结果小于要取的结果
        if(count($result) <= $num){
            foreach($result as $k->$v){
                $result[$k]['post_time'] = date('Y-m-d H:i:s',$v['post_time']);
            }
            return $result;
        }
        $s = array_rand($result,$num);
        foreach($s as $val){
            $val['post_time'] = date('Y-m-d H:i:s',$val['post_time']);
            $newResult[] = $result[$val];
        }
        return $newResult;
    }

}