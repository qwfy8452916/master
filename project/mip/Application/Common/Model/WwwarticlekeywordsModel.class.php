<?php
/**
 *  内链关键字
 */
namespace Common\Model;
use Think\Model;
class WwwarticlekeywordsModel extends Model{
    protected $tableName = 'www_article_keywords';

    /**
     * 获取所有的关键字
     * @param  integer $keyword_module 关键字模块
     * @return array
     */
    public function getAllKeywords($keyword_module = 0){
        $keywords = S("Cache:linkKeywords:" . $keyword_module);
        if(empty($keywords)){
            if (!empty($keyword_module)) {
                $map['keyword_module'] = $keyword_module;
            }
            //查询所有的关键字
            $keywords = M("www_article_keywords")->where($map)->select();
            S("Cache:linkKeywords:" . $keyword_module, $keywords);
        }
        return $keywords;
    }
}