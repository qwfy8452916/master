<?php
/**
 * 类型表  leixing
 */
namespace Common\Model;
use Think\Model;
class LeixingModel extends Model{
    // 获取类型列表
    public function getlx(){
        $map['type'] = array('eq','leixing');
        $list = M("leixing")->where($map)->order('px')->field('id,name')->select();
        return $list;
    }
}