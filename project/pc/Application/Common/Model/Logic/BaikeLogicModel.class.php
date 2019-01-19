<?php
/**
 *  百科逻辑
 */

namespace Common\Model\Logic;

class BaikeLogicModel
{
    public function replaseKeywords($id, $content)
    {
        //查询文章关键字，替换成内链
        $keywords = D("Wwwarticlekeywords")->getKeywordsRelate($id, "baike");
        foreach ($keywords as $key => $value) {
            $list[] = "/" . trim($value["name"]) . "/";
        }

        //抽出文章中的所有链接，避免替换链接出现重叠现象(链接套链接)
        $linkPattern = '/<a.*?>.*?<\/a>/i';
        preg_match_all($linkPattern, $content, $linkMatches);
        if (count($linkMatches[0]) > 0) {
            foreach ($linkMatches[0] as $key => $value) {
                //将图片替换成变量占位符
                $content = str_replace($value, "#&!&#", $content);
                $replaceLink[] = $value;
            }
        }

        //抽出文章中的图片
        $pattern = '/<img.*?\/>/i';
        preg_match_all($pattern, $content, $matches);
        if (count($matches[0]) > 0) {
            foreach ($matches[0] as $key => $value) {
                //将图片替换成变量占位符
                $content = str_replace($value, "%s", $content);
                $replaceImg[] = $value;
            }
        }
        foreach ($list as $key => $value) {
            preg_match_all($value, $content, $matches);
            if (count($matches[0]) > 0) {
                $link = "<a href='" . $keywords[$key]["href"] . "' target='_blank' class='inlink-word-color'>" . $keywords[$key]["name"] . "</a>";
                $content = preg_replace($value, $link, $content, 1);
            }
        }
        //将所有的图片依次填充到原来位置
        foreach ($replaceImg as $key => $value) {
            $content = preg_replace("/\%s/", $value, $content, 1);
        }

        //将所有的链接依次填充到原来位置
        foreach ($replaceLink as $key => $value) {
            $content = preg_replace("/#&!&#/", $value, $content, 1);
        }
        return $content;
    }
}