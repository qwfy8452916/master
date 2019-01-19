<?php

//详情页面底部标签组

namespace Common\Model;

use Think\Model;

class WwwArticleTagsModel extends Model
{

    protected $autoCheckFields = false;

    public function getData($where, $order = '')
    {
        return M('www_article_tags')
            ->where($where)
            ->order($order)
            ->select();
    }

}

