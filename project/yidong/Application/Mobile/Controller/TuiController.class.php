<?php

namespace Mobile\Controller;

use Mobile\Common\Controller\MobileBaseController;

class TuiController extends MobileBaseController
{

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * 推广页面动态生成
     * 根据数据库配置OrderSourceManage表中动态读取参数，拼接成完整页面
     */
    public function index()
    {
        $templeteArray = explode('/', ltrim($_SERVER['REQUEST_URI'], '/'));
        if (empty($templeteArray)) {
            $this->_empty();
            die();
        }
        if (empty($templeteArray[0]) || empty($templeteArray[1])) {
            $this->_empty();
            die();
        }
        $templete = $templeteArray[0];
        if (stripos($templeteArray[1], '?') === false) {
            $path = $templeteArray[1];
        } else {
            $path = explode('?', $templeteArray[1])[0];
        }
        $src = I('get.src', '');
        $map['type'] = 2; //类型 1为PC 2为M端
        $map['templete'] = $templete; //模板
        $map['path'] = $path; //路径
        //$map['src'] = $src;
        $map['status'] = 1; //选择已经启用的
        $sourceInfoCK = 'C:M:tui:dt:'.md5(json_encode($map));
        $sourceInfo = S($sourceInfoCK);
        if (empty($sourceInfo)) {
            $sourceInfo = D('OrderSourceManage')->getInfoByMap($map);
            S($sourceInfoCK, $sourceInfo, 60 * 5);
        }
        if (empty($sourceInfo)) {
            $this->_empty();
            die();
        }
        //获取代码赋值给前端
        $this->assign('base_code', $sourceInfo['base_code']);
        $this->assign('js_code', $sourceInfo['js_code']);
        $this->assign("src", $src);

        switch ($templete) {
            case 'sheji':
                session("m_redirect", 'http://m.' . C('QZ_YUMING') . '/shejidone/');
                session("m_wanshan_tmp", null);
                //传入source，没有传入则默认为302(即本页)
                $laiyuan = $_GET['fi'];
                if (empty($laiyuan)) {
                    $source['top'] = 302;
                    $source['bottom'] = 301;
                } else {
                    $source['top'] = $laiyuan;
                    $source['bottom'] = $laiyuan;
                }
                $this->assign('source', $source);

                //SEO标题关键字描述
                $basic["head"]["title"] = "户型设计_装修招标_免费装修设计与报价-齐装网";
                $basic["head"]["keywords"] = "装修设计,户型设计,室内装修设计,装修报价,装修报价单";
                $basic["head"]["description"] = "齐装网是国内领先的专业的家装、公装项目招标平台,业主可以在齐装网免费发布装修招标,提供装修招标、免费装修设计与报价,免费为业主提供4份室内装修设计方案与报价,并免费获得多套装修设计与报价方案,让您装修省钱省力更省心！";
                break;
            case 'baojia':
                session("m_redirect", 'http://m.' . C('QZ_YUMING') . '/details/');
                session("m_wanshan_tmp", 'wanshan');
                //传入source，没有传入则默认为311(即本页)
                $source = $_GET['fi'];
                if (empty($source)) {
                    $source = 311;
                }
                $this->assign('source', $source);

                //seo 标题/描述/关键字
                $basic["head"]["title"] = "装修报价";
                $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
                $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";

                break;
            case 'zhaobiao':
                session("m_wanshan_tmp", 'wanshan');
                session("m_redirect", 'http://m.' . C('QZ_YUMING') . '/shejidone/');
                $safe = getSafeCode();
                $this->assign("safecode", $safe["safecode"]);
                $this->assign("safekey", $safe["safekey"]);
                $this->assign("ssid", $safe["ssid"]);
                //如果有城市
                $cityInfo = $this->cityInfo;
                if ($cityInfo) {
                    $this->assign('cid', $cityInfo['id']); //城市id
                }
                //SEO标题关键字描述
                $basic["head"]["title"] = "装修招标_免费装修设计与报价-齐装网";
                $basic["head"]["keywords"] = "装修设计,室内装修设计,装修报价,装修报价单";
                $basic["head"]["description"] = "齐装网是国内领先的专业的家装、公装项目招标平台,业主可以在齐装网免费发布装修招标,提供装修招标、免费装修设计与报价,免费为业主提供4份室内装修设计方案与报价,并免费获得多套装修设计与报价方案,让您装修省钱省力更省心！";
                //获取该城市第一个区，用于显示默认城市
                $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
                break;
            case 'liangfang':
                //seo 标题/描述/关键字
                $basic["head"]["title"] = "装修免费量房_免费量房设计_免费量房报价-齐装网";
                $basic["head"]["keywords"] = "免费量房,免费量房设计,免费量房报价";
                $basic["head"]["description"] = "齐装网开启“安心量房”工程，每天提供300个免费量房设计报价名额，拒绝量房猫腻和量房陷阱，抵制隐形消费，让业主不花冤枉钱。齐装网服务1500万业主，轻松装修乐无忧从免费量房开始。";
                break;
            case 'newbaojia':
                //seo 标题/描述/关键字
                $basic["head"]["title"] = "装修报价";
                $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
                $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";
                break;
            case 'baojia1':
                //seo 标题/描述/关键字
                $basic["head"]["title"] = "装修报价";
                $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
                $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";
                break;
            case 'baojia1-jzrk':
                //seo 标题/描述/关键字
                $basic["head"]["title"] = "装修报价";
                $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
                $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";
                break;
            case 'baojia-zst':
                //seo 标题/描述/关键字
                $basic["head"]["title"] = "装修报价";
                $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
                $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";
                break;
            case 'sheji-jzrk':
                //seo 标题/描述/关键字
                $basic["head"]["title"] = "户型设计_装修招标_免费装修设计与报价-齐装网";
                $basic["head"]["keywords"] = "装修设计,户型设计,室内装修设计,装修报价,装修报价单";
                $basic["head"]["description"] = "齐装网是国内领先的专业的家装、公装项目招标平台,业主可以在齐装网免费发布装修招标,提供装修招标、免费装修设计与报价,免费为业主提供4份室内装修设计方案与报价,并免费获得多套装修设计与报价方案,让您装修省钱省力更省心！";
                break;
            case 'sheji-dyqd':
                //seo 标题/描述/关键字
                $basic["head"]["title"] = "户型设计_装修招标_免费装修设计与报价-齐装网";
                $basic["head"]["keywords"] = "装修设计,户型设计,室内装修设计,装修报价,装修报价单";
                $basic["head"]["description"] = "齐装网是国内领先的专业的家装、公装项目招标平台,业主可以在齐装网免费发布装修招标,提供装修招标、免费装修设计与报价,免费为业主提供4份室内装修设计方案与报价,并免费获得多套装修设计与报价方案,让您装修省钱省力更省心！";
                break;
            case 'sheji-dyqd-2':
                //seo 标题/描述/关键字
                $basic["head"]["title"] = "户型设计_装修招标_免费装修设计与报价-齐装网";
                $basic["head"]["keywords"] = "装修设计,户型设计,室内装修设计,装修报价,装修报价单";
                $basic["head"]["description"] = "齐装网是国内领先的专业的家装、公装项目招标平台,业主可以在齐装网免费发布装修招标,提供装修招标、免费装修设计与报价,免费为业主提供4份室内装修设计方案与报价,并免费获得多套装修设计与报价方案,让您装修省钱省力更省心！";
                break;
            case 'baojia-jzrk':
                //seo 标题/描述/关键字
                $basic["head"]["title"] = "装修报价";
                $basic["head"]["keywords"] = "装修公司,装修网,齐装网";
                $basic["head"]["description"] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比较高的家居装修装饰公司，为您提供专业的装修服务以及全新的装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";
                break;
            default:
                $this->_empty();
                die();
                break;
        }
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign('cityInfo', session('m_cityInfo'));

        $city = session('m_cityInfo');
        if (empty($city['name'])) {
            $city['name'] = '';
        }
        $this->assign('basic', $basic);
        $this->display($templete);
    }
}
