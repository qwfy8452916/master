<?php
/**
 * 移动版 - 日记首页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class RijiController extends MobileBaseController{

    public function index(){
        $Data = D("Common/Diary");

        $cid = I('get.category');

        //获取日记列表信息
        $diaryList = $Data->get_all_diary_list_api('0,8',$cid);
        //dump($diaryList['list']);

        $category = $Data->get_diary_type();

        $info['title'] = '全部';
        if(!empty($cid)){
            foreach ($category as $k => $v) {
                if($v['id'] == $cid){
                    $info['title'] = $v['type_name'];
                }
            }
        }

        $p = intval(I("get.p"));
        $pageIndex = $p>=1 ? $p : 1;

        if(I('get.act') == 'ajax'){

            foreach ($diaryList['list'] as $k => $v) {
                $img = '';
                foreach ($v['img_list'] as $ko => $vo) {
                    $img .= '<img src="http://staticqn.qizuang.com/'.$vo['img_path'].'" alt=""/>';
                }
                if($v['stage'] == '1'){
                    $diary_type = '<div class="diary-t1">准备阶段</div>';
                }elseif($v['stage'] == '2'){
                    $diary_type = '<div class="diary-t2">施工阶段</div>';
                }else{
                    $diary_type = '<div class="diary-t3">入住阶段</div>';
                }
                $html .= '<li>'.$diary_type.'<h1><a href="/riji/d'.$v['id'].'.html">'.$v['title'].'</a></h1>
                    <div class="user-info"><img src="'.$v['user_info']['logo'].'-w240.jpg" alt=""/><span>'.$v['user_info']['name'].'</span><span>'.$v['pcount'].' 篇</span><span>'.timeFormat($v['diary_time']).' 更新</span></div>
                    <div class="diary-list-main">'.$v['content'].'</div>
                    <div class="diary-list-img">'.$img.'</div>
                    </li>
                ';
            }
            echo $html;
            die();
        }

        $info['pageid'] = $pageIndex;

        if($_SERVER['REQUEST_URI'] == '/riji/'||$_SERVER['REQUEST_URI'] == '/riji'){
            $info['canonical'] = '1';
        }
        $this->assign("category",$category);
        $this->assign("list",$diaryList['list']);
        $this->assign("category",$category);
        $this->assign("info",$info);
        $this->display();
    }

    //日记查看页
    public function show(){
        $id = I('get.id');
        if(empty($id) || !is_numeric($id)){
            $this->_error();
        }

        $Data = D("Common/Diary");

        $info = $Data->get_one_diary_info($id);
        $info = $info[0];


        if(empty($info) || $info["parent_id"] == 0){
            $this->_error();
            die();
        }

        $info['img_list'] = $Data->get_diary_img_by_id($id);
        //$info['diary_type_name'] = $Data->get_diary_type_name_by_id($info['second_type']);

        $info['user_info'] = M('user')->find($info['user_id']);

        //获取回复
        $diary_comment=$Data->get_one_diary_comment($info['id']);

        //日记访问量加1
        $Data->diary_page_view_add($id);

        //获取热门日记推荐日记
        $result = $Data->getOtherDiary($diary_detail_info['parent_id'],$id,6);
        if(count($result) > 0){
            foreach ($result as $key => $value) {
                $value['content'] = strip_tags($content);
                if(!array_key_exists($value["parent_id"], $other_diary_list)){
                    $other_diary_list[$value["parent_id"]] = $value;
                }
                $other_diary_list[$value["parent_id"]]["child"][] = $value;
            }
        }
        //如果其它日记为空
        if(empty($other_diary_list)){
            $other_diary_list = $Data->getMRandDiary($id,6);
        }
        //dump($other_diary_list);
        $this->assign("otherDiary",$other_diary_list);

        $keys["title"] = $info["title"]." - 齐装网装修日记";
        $keys["keywords"] = $info["title"];
        $keys["description"] =mb_substr($info["content"], 0,50,"utf-8");

        //dump($info);

        $this->assign('info',$info);
        $this->assign('user_info',$user_info);
        $this->assign('diary_comment',$diary_comment);
        $this->assign("keys",$keys);
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