<?php

//区域

namespace Common\Model;
use Think\Model;

class QuyuModel extends Model{

    protected $autoCheckFields = false;

    //根据BM头获取城市ID
    public function getCityIdByBm($bm){
        $thisCity = S("Cache:Quyu:".$bm);
        if(empty($thisCity)){
            $thisCity =  $this->getCityInfoByBm($bm);
        }
        return $thisCity['cid'];
    }

    /**
     * 通过城市名称获取城市信息
     * @param  [type] $name [description]
     * @return [type]       [description]
     */
    public function getCityInfoByName($name)
    {
        $cityInfo = S("Cache:M:Q:".$name);
        if (!$cityInfo) {
            $map = array(
                 "a.cname" => array("LIKE","%$name%")
            );
            $cityInfo = M("quyu")->where($map)->alias("a")
                                 ->join("join qz_province b on a.uid = b.qz_provinceid")
                                 ->field("a.*,b.qz_province as province")
                                 ->find();
            S("Cache:M:Q:".$name,$cityInfo,3600);
        }
        return $cityInfo;
    }

    public function getCityInfoById($cid)
    {
         $map = array(
             "a.cid" => array("EQ",$cid)
        );
        return M("quyu")->where($map)->alias("a")
                             ->join("join qz_province b on a.uid = b.qz_provinceid")
                             ->field("a.*,b.qz_province as province")
                             ->find();
    }

    //根据BM头获取城市ID及相邻城市
    public function getCityInfoByBm($bm){
        //先取单个城市的缓存
        $city = S("Cache:Quyu:".$bm);
        if(empty($city)){
            $map['a.bm'] = $bm;
            $map['b.type'] = array("EQ",1);

            $result = M("quyu")->alias("a")->where($map)
               ->join("inner join qz_area as b on a.cid = b.fatherid and b.type = 1")
               ->join("inner join qz_province as c on c.qz_provinceid = a.uid")
               ->field("a.cid as cid,a.cname,a.uid,a.type,a.bm,a.px,a.px_abc,a.parent_city,a.parent_city1,a.parent_city2,a.parent_city3,a.parent_city4,a.other_city,b.qz_areaid,b.qz_area,b.orders,c.qz_province,c.qz_bigpart,c.qz_bigpart_name,a.lng,a.lat")
               ->order("a.bm,qz_area DESC")->select();

            //导入扩展文件
            import('Library.Org.Util.App');
            $app = new \App();

            $areaKey = $app->getFirstCharter($result['0']['cname']);
            $city = array();
            $city = array(
                'cid' => $result['0']['cid'],
                'usercount' => '',
                'key' => $areaKey,
                'bm' => $result['0']['bm'],
                'uid' => $result['0']['uid'],
                'cname' => $areaKey.' '.$result['0']['cname'],
                'oldName' => $result['0']['cname'],
                'province' => $result['0']['qz_province'],
                'bigpart' => $result['0']['qz_bigpart'],
                'bigpart_name' => $result['0']['qz_bigpart_name'],
                'px' => $result['0']['px'],
                'type' => $result['0']['type'],
                'lng' => $result['0']['lng'],
                'lat' => $result['0']['lat'],
                'parent_city' => $result['0']['parent_city'],
                'parent_city1' => $result['0']['parent_city1'],
                'parent_city2' => $result['0']['parent_city2'],
                'parent_city3' => $result['0']['parent_city3'],
                'parent_city4' => $result['0']['parent_city4']
            );

            foreach ($result as $key => $value) {
                $tempKey = $app->getFirstCharter($value["qz_area"]);
                $tempCity = array(
                    'key' => $tempKey,
                    'oldName' => $value['qz_area'],
                    'qz_areaid' => $value['qz_areaid'],
                    'qz_area' => $tempKey.' '.$value['qz_area'],
                    'orders' => $value['orders'],
                );

                $city['child'][] = $tempCity;
            }

            $str = multi_array_sort($city['child'],'key');
            unset($city['child']);
            $city['child'] = $str;

            //取相邻城市数据
            $cids = array();
            if(!empty($city['parent_city'])){
                $cids[] = $city['parent_city'];
            }
            if(!empty($city['parent_city1'])){
                $cids[] = $city['parent_city1'];
            }
            if(!empty($city['parent_city2'])){
                $cids[] = $city['parent_city2'];
            }
            if(!empty($city['parent_city3'])){
                $cids[] = $city['parent_city3'];
            }
            if(!empty($city['parent_city4'])){
                $cids[] = $city['parent_city4'];
            }
            $cids = implode(',', $cids);
            if(!empty($cids)){
                $adjMap['cid'] = array('IN',$cids);
                $city['adj_city'] = M("quyu")->where($adjMap)->field("bm,cname name,cid")->order("field(cid,$cids)")->select();
            }else{
                $city['adj_city'] = '';
            }
            S("Cache:Quyu:".$bm,$city,15 * 60);
        }
        return $city;
    }

    /**
     * [getHotCity 获取热门城市]
     * @return [type] [description]
     */
    public function getHotCity()
    {
        $result = M("quyu")->field('cid,uid,cname,bm')->where(array('hot'=>array('EQ',1)))->select();
        return $result;
    }

    /**
     * [getProvinceCityByCid 根据城市ID获取相同省份的城市友情链接]
     * @param  [type] $cid [description]
     * @return [type]      [description]
     */
    public function getProvinceCityLinkByCid($cid)
    {
        if(empty($cid)){
            return false;
        }
        $info = M('quyu')->field('uid')->where(array('cid' => $cid))->find();
        $result = M("quyu")->field('cid,uid,cname,bm')->where(array('uid' => $info['uid'],'little'=> '0'))->select();
        return $result;
    }

    /**
     * 获取城市的vip数量
     * @param  $cs  城市id
     * @return 会员数量
     */
    public function getCityVipCount($cs){
        $CityVipCount = S("C:CS:VIPNUM:".$cs);
        if (empty($CityVipCount)) {
            $map = array(
                "a.classid" =>array("EQ",3),
                "b.fake" => array("EQ",0),
                "a.on" => '2',
                "a.cs" => $cs
            );
            $CityVipCount = M("user")->where($map)->alias("a")
                     ->join("inner join qz_user_company b on a.id = b.userid")
                     ->field("count(if(a.on = 2,a.id,null)) as vipnum")
                     ->order("cs desc")
                     ->find();
            S("C:CS:VIPNUM:".$cs, $CityVipCount, 15*60);
        }
        return $CityVipCount;
    }

    /**
     * 根据父级城市ID获取区域列表
     * @param   $fatherid  城市id
     * @return  城市区域列表
     */
    public function getAreaByFatherId($fatherid=''){
        if(empty($fatherid)){
            return false;
        }
        $AreaByFatherId = S("C:CS:A1:".$fatherid);
        if (empty($AreaByFatherId)) {
            $AreaByFatherId = M('area')->field('qz_areaid AS id,qz_area AS name')
                                       ->where(array('fatherid' => $fatherid))
                                       ->order('orders')->select();
            S("C:CS:A1:".$fatherid, $AreaByFatherId, 15*60);
        }
        return $AreaByFatherId;
    }

    /*
    *   根据qz_areaid获取区域的详细信息
    *   @param  [string] $cid       [城市编号]
    *   @return [array]  $result    [区域信息数组]
    */
    public function getAreaInfos($cid)
    {
        $map['a.qz_areaid'] = $cid;
        $result = M("area")->alias("a")->where($map)
                           ->join("left join qz_quyu q on q.cid = a.fatherid")
                           ->field("a.*,q.bm")
                           ->find();
        return $result;
    }

    /**
     * 获取首页的热门城市信息（后台设置的）
     * @return [type]      [description]
     */
    public function getHotCityList($limit){
        $where = 'ishotcity = 1 and hotorder > 0';
        $city = M("quyu")->where($where)->field("cid,cname,bm,ishotcity,hotorder")->order("hotorder asc")->limit($limit)->select();
        return $city;
    }

    /**
     * 根据城市ID获取城市信息
     * @param  [type] $cid [description]
     * @return [type]      [description]
     */
    public function getCityBmById($cid)
    {
        $map = array(
            "cid" => array("EQ",$cid)
        );
        return M("Quyu")->where($map)->field("bm,cname")->find();
    }

    /**
     * 获取首页热门地区
     * @return [type] [description]
     */
    public function getHotCitys($limit){
        return M("quyu")->alias("qy")
                        ->join("inner join (SELECT cs,SUM(case_count) as cc
                                FROM qz_user GROUP BY cs ORDER BY cc DESC LIMIT "
                                . $limit . ") as cscc on qy.cid = cscc.cs")
                        ->field("cscc.cc as count,qy.cname,qy.cid,qy.bm")
                        ->select();
    }


    /**
     * 获取所有省份及城市
     * @flag bool 是否按省份划分
     * @return [type] [description]
     */
    public function getAllProvinceAndCitys($flag = false){
        import('Library.Org.Util.App');
        $app = new \App();
        $map = array(
                "b.cid"          => array("NEQ","000001"), //排除主站
                "b.type"         => array("EQ","1"),
                "b.is_open_city" => array("EQ","1") //开通运营的
                     );
        $result = M("province")->alias("a")
                            ->join("inner join qz_quyu as b on a.qz_provinceid = b.uid")
                            ->join("INNER JOIN  (select count(*) as count,uid from qz_quyu GROUP BY uid ) as c on c.uid = a.qz_provinceid")
                            ->field("a.*,b.cname,b.cid,b.bm,b.px,b.px_abc,b.mark_red,c.count")
                            ->where($map)
                            ->order("count desc,b.px")
                            ->select();
        $citys = array();
        if(count($result)>0){
            if($flag){
                foreach ($result as $key => $value) {
                    $str = $app->getFirstCharter($value["cname"]);
                    if(!array_key_exists($str, $citys)){
                        $citys[$str]["pname"] = $str;
                        $citys[$str]["child"] = array();
                    }
                    $citys[$str]["child"][] = $value;
                }
                ksort($citys);
                foreach($citys as $keyc => &$valuec) { //最外层字母层
                    $px_abc = array();
                    foreach($valuec['child'] as $keycs => $valuecs) { //城市层
                        $px_abc[] =  $valuecs['px_abc'];
                    }
                    //sort($px_abc);
                    array_multisort($px_abc, SORT_ASC, $valuec['child']); //按照 px_abc升序排列
                }
            }else{
                foreach ($result as $key => $value) {
                    if(!array_key_exists($value["qz_provinceid"], $citys)){
                        $citys[$value["qz_provinceid"]]["pid"] = $value["qz_provinceid"];
                        $citys[$value["qz_provinceid"]]["pname"] = $value["qz_province"];
                        $citys[$value["qz_provinceid"]]["count"] = $value["count"];
                        if($value["qz_province"] == '重庆市'){
                            $value["qz_province"] = '重庆';
                        }
                        $citys[$value["qz_provinceid"]]["abc"] = $app->getFirstCharter($value["qz_province"]);
                        $citys[$value["qz_provinceid"]]["child"] = array();
                    }
                    $citys[$value["qz_provinceid"]]["child"][] = $value;
                }
            }
            return $citys;
        }
        return null;
    }

    //获取城市 根据指定的城市名
    public function getCityByName($citys){
        $map = array("cname" => array("IN",$citys));
        return M("quyu")->field("cname,bm,cid")
                        ->where($map)
                        ->limit($limit)
                        ->select();
    }

}