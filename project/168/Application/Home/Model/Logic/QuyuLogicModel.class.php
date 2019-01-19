<?php

namespace Home\Model\Logic;

class QuyuLogicModel
{
    private $little = array(
        0=>"A类",
        1=>"B类",
        2=>"C类",
        3=>"D类"
    );

    //获取级别
    public function getlittle(){
        return $this->little;
    }

   

    public function addQuyu($data){
        /*S—获取该城市坐标属性*/
        $options = array(
            'http' => array('timeout' => 3)
        );
        $context = stream_context_create($options);
        //百度地图AK,目前未做成配置项
        $api = 'http://api.map.baidu.com/geocoder/v2/?address='.$data['cname'].'&output=json&ak=8Ee3c4jzYCv3djogwCBqaD48';
        $content  = file_get_contents($api,false,$context);
        $res = json_decode($content,true);
        $data['lng'] = $res['result']['location']['lng'];
        $data['lat'] = $res['result']['location']['lat'];
        /*E—获取该城市坐标属性*/
        $temp  = D('Home/Db/Adminquyu')->getQuyu('','xh DESC');
        $data['xh'] = $temp['0']['xh'] + 1;
        $data['time_add']     = time();
        //添加城市信息
        return D('Home/Db/Adminquyu')->addQuyu($data);
    }

    public function editProvince($province, $uid){
        return  D('Home/db/Adminquyu')->editProvince($province,$uid);
    }
    

}
