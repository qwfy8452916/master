<?php
// +----------------------------------------------------------------------
// | CateLogic
// +----------------------------------------------------------------------
// | Author: 2851986856@qq.com
// +----------------------------------------------------------------------

namespace app\common\logic;

use think\Model;

class CateLogic  extends Model
{
    /**
     * 分析参数返回新的TDK和修改后的参数和规格
     * @param [string] $param额外参数
     * @param [array] $spec 规格参数结果数组
     * @param [object] $subObj  所属子分类对象
     * return array
     */
    public function analysisParam($param,$spec,$subObj)
    {
        $reg = '/[a-z]+\d+/';
        preg_match_all($reg, $param, $matches);
        $canshuIds = ltrim(str_replace(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],',',$param),',');
        $canshuArray = explode(',',$canshuIds);
        $spec_values = model('JjdgGoodsSpecificationsValue')->getParentAndSelfByIds($canshuIds);
        $str = '';
        foreach ($spec_values as $ke =>$vo){
            $str .= $vo['name'];
        }
        $str .= $subObj['name'];
        $title = "{$str}品牌_{$str}价格_{$str}尺寸图片大全_齐装家具网上商城";
        $keyword = "$str,{$str}品牌,{$str}价格,{$str}尺寸,{$str}图片";
        $description = "齐装家具网上商城为顾客提供完美的{$str}购买体验。选择{$str}品牌，了解{$str}价格行情、尺寸及图片，欢迎您来齐装家具网上商城。";
        foreach ($spec as $key=>$v1){
            if (!empty($matches[0])){
                foreach ($matches[0] as $v2){
                    if (strpos($v2,$v1['sign'])!==false){
                        $spec[$key]['param'] = $v2;
                    }
                }
            }
        }
        return ['title'=>$title,'keyword'=>$keyword,'description'=>$description,'spec'=>$spec,'canshuArray'=>$canshuArray];
    }

    /**
     * 根据子分类短名称获取子分类的TDK和修改后的参数和规格
     * @param $catePinYin
     * @return array|null
     */
    public function getSubcate($catePinYin,$param)
    {
        $subCate = model('JjdgGoodsSubCate')->getInfoByWhere(['short_name'=>$catePinYin]);
        if (empty($subCate)){
            //分类不存在返回404页面
            return null;
        }
        //TDK
        $title = $subCate['name'].'品牌_'.$subCate['name'].'价格_'.$subCate['name'].'尺寸图片大全_齐装家具网上商城';
        $keyword = $subCate['name'].'品牌,'.$subCate['name'].'价格,'.$subCate['name'].'尺寸,'.$subCate['name'].'图片';
        $description = $subCate['description'];
        //子分类下的规格及参数
        $spec = model('JjdgGoodsSpecifications')->getChildByPid($subCate['id']);
        //(此处获取用户选中的参数，可以得到筛选项目)
        $canshuArray = [];
        if (!empty($param)){
            //分析参数返回新的TDK和修改后的参数和规格
            $result = $this->analysisParam($param,$spec,$subCate);
            $spec = $result['spec'];
            $canshuArray = $result['canshuArray'];
            $title = $result['title'];
            $keyword = $result['keyword'];
            $description = $result['description'];
        }
        return ['title'=>$title,'keyword'=>$keyword,'description'=>$description,'spec'=>$spec,'canshuarray'=>$canshuArray,'subcate'=>$subCate];
    }
}