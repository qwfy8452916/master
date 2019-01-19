<?php
/**
 * 分站文章逻辑层
 */
namespace Common\Model\Logic;

class LittlearticleLogicModel
{
    /**
     * 获取分站装修公司列表页的文章
     * @param  string $cs [文章类别]
     * @param  int $page [页码]
     * @param  int $pageCount [每页数量]
     * @return array
     */
    public function getRecomArticleList($cs, $pageIndex, $pageCount)
    {
        $map = array(
            "a.state" => array("EQ", 2),
            "a.is_to_subcompany" => array("EQ", 1)
        );
        if (!empty($cs)) {
            $map["a.cs"] = array("EQ", $cs);
        }
        $buildSql = M("little_article")->where($map)->alias("a")
            ->join("INNER JOIN qz_infotype as b on b.id = a.classid")
            ->field("a.id,a.cs,a.state,a.authid,a.classid,a.title,a.description,a.keywords,a.content,a.face,a.addtime")
            ->order("addtime desc")
            ->page($pageIndex . "," . $pageCount)
            ->buildSql();
        return M("little_article")->table($buildSql)->alias("a")
            ->join("INNER JOIN qz_quyu as b on a.cs = b.cid")
            ->field("a.*,b.bm")->select();
    }
}