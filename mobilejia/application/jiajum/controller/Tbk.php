<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/5
 * Time: 15:33
 */

namespace app\jiajum\controller;

use TbkDgNewuserOrderGetRequest;
use TbkItemConvertRequest;
use TbkItemInfoGetRequest;
use TbkItemRecommendGetRequest;
use TbkItemsConvertRequest;
use TbkJuTqgGetRequest;
use TbkShopGetRequest;
use TbkShopRecommendGetRequest;
use TbkSpreadGetRequest;
use TbkSpreadRequest;
use TbkUatmEventItemGetRequest;
use TbkUatmFavoritesGetRequest;
use TbkUatmFavoritesItemGetRequest;
use think\Controller;
use think\Loader;
use think\Request;
use TopClient;

class Tbk extends Controller
{
    public function _initialize()
    {
        parent::_initialize();
        Loader::import('Tbk.TopSdk');
    }

    public function uatmFavoritesGet()
    {
        $c = new TopClient;
        $c->appkey = '24911974';
        $c->secretKey = 'cfe9cd104bc18f8b97e99052686a7222';

        $req = new TbkUatmFavoritesGetRequest;
        $req->setPageNo("1");
        $req->setPageSize("20");
        $req->setFields("favorites_title,favorites_id,type");
        $req->setType("1");
        var_dump($c->execute($req));
    }

    public function uatmFavoritesItemGet()
    {
        $c = new TopClient;
        $c->appkey = '24911974';
        $c->secretKey = 'cfe9cd104bc18f8b97e99052686a7222';
        $req = new TbkUatmFavoritesItemGetRequest;
        $req->setPlatform("1");
        $req->setPageSize("20");
        $req->setAdzoneId("682534737");
        $req->setFavoritesId("17602518");
        $req->setFields("num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick,shop_title,zk_final_price_wap,event_start_time,event_end_time,tk_rate,status,type");
        foreach ($c->execute($req) as $value) {
            var_dump($value);
        }
    }

    public function ItemConvert()
    {
        $c = new TopClient;
        $c->appkey = '24911974';
        $c->secretKey = 'cfe9cd104bc18f8b97e99052686a7222';

        $req = new TbkItemConvertRequest;
        $req->setFields("num_iid,click_url");
        $req->setNumIids("570358773668,568644036533");
        $req->setAdzoneId("682534737");
        $req->setPlatform("1");
        $req->setUnid("demo");
        $req->setDx("1");
        $resp = $c->execute($req);
        var_dump($resp);
    }

    public function itemRecommendGet()
    {
        $c = new TopClient;
        $c->appkey = '24911974';
        $c->secretKey = 'cfe9cd104bc18f8b97e99052686a7222';
        $req = new TbkItemRecommendGetRequest;
        $req->setFields("num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url");
        $req->setNumIid("570358773668");
        $req->setCount("20");
        $req->setPlatform("1");
        $resp = $c->execute($req);
        foreach ($resp as $value) {
            var_dump($value);
        }
    }

    public function itemInfoGet()
    {
        $c = new TopClient;
        $c->appkey = '24911974';
        $c->secretKey = 'cfe9cd104bc18f8b97e99052686a7222';
        $req = new TbkItemInfoGetRequest;
        $req->setNumIids("556041494716");
        $req->setPlatform("1");
        $req->setIp("11.22.33.43");
        $resp = $c->execute($req);
        var_dump($resp);
        foreach ($resp as $value) {

            var_dump($value);
        }
    }

    public function rebateOrderGet()
    {
        $c = new TopClient;
        $c->appkey = '24911974';
        $c->secretKey = 'cfe9cd104bc18f8b97e99052686a7222';
        $req = new TbkRebateOrderGetRequest;
        $req->setFields("tb_trade_parent_id,tb_trade_id,num_iid,item_title,item_num,price,pay_price,seller_nick,seller_shop_title,commission,commission_rate,unid,create_time,earning_time");
        $req->setStartTime("2015-03-05 13:52:08");
        $req->setSpan("600");
        $req->setPageNo("1");
        $req->setPageSize("20");
        $resp = $c->execute($req);
        var_dump($resp);
    }
    public function taobaoItemcatsGet(){
        $req = new TbkDgNewuserOrderGetRequest();


    }

    public function test()
    {
        $url = 'https://s.click.taobao.com/t?e=m%3D2%26s%3Dd6ei9%2FbzlLwcQipKwQzePOeEDrYVVa64LKpWJ%2Bin0XLjf2vlNIV67j%2BR3H8vKHNp6EFRCN7EKmz7bGWc96AASHfYIjVx2d0nCtpmHlJRU4tMPetHPPXjgbxsuHNaB5Rk04uqtMZ%2Badko%2BxoHiLH8MVHV2NwZwHDhcSpj5qSCmbA%3D&pvid=12_223.112.69.58_569_1528254005345';

        $oCurl = curl_init();
// 设置请求头, 有时候需要,有时候不用,看请求网址是否有对应的要求
        $header[] = "Content-type: application/x-www-form-urlencoded";
        $user_agent = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.146 Safari/537.36";
        curl_setopt($oCurl, CURLOPT_URL, $url);
        curl_setopt($oCurl, CURLOPT_HTTPHEADER,$header);
// 返回 response_header, 该选项非常重要,如果不为 true, 只会获得响应的正文
        curl_setopt($oCurl, CURLOPT_HEADER, true);
// 是否不需要响应的正文,为了节省带宽及时间,在只需要响应头的情况下可以不要正文
        curl_setopt($oCurl, CURLOPT_NOBODY, true);
// 使用上面定义的 ua
        curl_setopt($oCurl, CURLOPT_USERAGENT,$user_agent);
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, false);
// 不用 POST 方式请求, 意思就是通过 GET 请求
        curl_setopt($oCurl, CURLOPT_POST, false);

        $sContent = curl_exec($oCurl);
//        dump($sContent);exit;
// 获得响应结果里的：头大小
        $headerSize = curl_getinfo($oCurl);

// 根据头大小去获取头信息内容
//        $header = substr($sContent, 0, $headerSize);
        dump($headerSize);exit;
        curl_close($oCurl);






        $url = 'https://s.click.taobao.com/t?e=m%3D2%26s%3Dd6ei9%2FbzlLwcQipKwQzePOeEDrYVVa64LKpWJ%2Bin0XLjf2vlNIV67j%2BR3H8vKHNp6EFRCN7EKmz7bGWc96AASHfYIjVx2d0nCtpmHlJRU4tMPetHPPXjgbxsuHNaB5Rk04uqtMZ%2Badko%2BxoHiLH8MVHV2NwZwHDhcSpj5qSCmbA%3D&pvid=12_223.112.69.58_569_1528254005345';
//        $url = 'http://m.qizuang.com/video/jiangtang';

//        var_dump( get_headers($url));
//        exit;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//若给定url自动跳转到新的url,有了下面参数可自动获取新url内容：302跳转
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
//设置cURL允许执行的最长秒数。
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0');
        curl_setopt($ch, CURLOPT_REFERER, $url);
        curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate');
        $content = curl_exec($ch);

        //获取请求返回码，请求成功返回200
//        $code = curl_getinfo($ch,CURLINFO_HTTP_CODE);
        $code = curl_getinfo($ch,CURLINFO_HEADER_SIZE);

//        echo($content);
        echo $code . "\n\n";
//获取一个cURL连接资源句柄的信息。
//$headers 中包含跳转的url路径
        $headers = curl_getinfo($ch);
        var_dump($headers);
        exit;











        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        curl_setopt($ch, CURLOPT_AUTOREFERER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); // https请求 不验证证书和hosts
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        $ret = curl_exec($ch);
        echo($ret);exit;

        $info = curl_getinfo($ch);
        curl_close($ch);



        file_get_contents($url);
        $responseInfo = $http_response_header;

        dump($responseInfo);

//        $res = $this->curl_get_file_contents($url);
//        dump($res);
        exit;
//        $headers = get_headers($url);
//        dump($headers[6]);
//exit;


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        curl_setopt($ch, CURLOPT_AUTOREFERER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
// 下面两行为不验证证书和 HOST，建议在此前判断 URL 是否是 HTTPS
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
// $ret 返回跳转信息
        $ret = curl_exec($ch);
// $info 以 array 形式返回跳转信息
        $info = curl_getinfo($ch);
// 跳转后的 URL 信息
        $retURL = $info['url'];
// 记得关闭curl
        curl_close($ch);
        echo($retURL);
        exit;


    }
    function curl($cookie,$user_agent,$destURL, $paramStr='',$flag='get',$ip='10.57.22.151',$fromurl='http://www.baidu.com'){
        $curl = curl_init();
        if($flag=='post'){//post传递
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $paramStr);
        }
        curl_setopt($curl, CURLOPT_URL, $destURL);//地址

        curl_setopt($curl, CURLOPT_HTTPHEADER, array('X-FORWARDED-FOR:'.$ip, 'CLIENT-IP:'.$ip));  //构造IP


        curl_setopt($curl, CURLOPT_REFERER, $fromurl);
        curl_setopt($curl, CURLOPT_TIMEOUT, 10);#10s超时时间

        curl_setopt ($curl, CURLOPT_USERAGENT, $user_agent);
        //curl_setopt ($curl, CURLOPT_COOKIEJAR, $cookie);
        curl_setopt ($curl, CURLOPT_COOKIEFILE, $cookie);

        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $str = curl_exec($curl);
        curl_close($curl);
        return $str;
    }

    function get($durl, $data=array()) {
        $cookiejar = realpath('cookie.txt');
        $t = parse_url($durl);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$durl);
        curl_setopt($ch, CURLOPT_TIMEOUT,5);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
        curl_setopt($ch, CURLOPT_REFERER, "https://$t[host]/");
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookiejar);
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookiejar);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_ENCODING, 1); //gzip 解码
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        if($data) {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }
        $r = curl_exec($ch);
        curl_close($ch);
        return $r;
    }

    function curl_get_file_contents($url, $referer = '')
    {

        global $curl_loops, $curl_max_loops;

        $useragent = "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)";

        if ($curl_loops++ >= $curl_max_loops) {

            $curl_loops = 0;

            return false;

        }

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, true);

        curl_setopt($ch, CURLOPT_USERAGENT, $useragent);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_REFERER, $referer);

        $data = curl_exec($ch);

        $ret = $data;

        list($header, $data) = explode("\r\n\r\n", $data, 2);

        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        $last_url = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);

        curl_close($ch);

        if ($http_code == 301 || $http_code == 302) {

            $matches = array();

            preg_match('/Location:(.*?)\n/', $header, $matches);

            $url = @parse_url(trim(array_pop($matches)));

            if (!$url) {
                $curl_loops = 0;
                return $data;

            }

            $new_url = $url['scheme'] . '://' . $url['host'] . $url['path']

                . (isset($url['query']) ? '?' . $url['query'] : '');

            $new_url = stripslashes($new_url);

            return curl_get_file_contents($new_url, $last_url);
        } else {

            $curl_loops = 0;

            list($header, $data) = explode("\r\n\r\n", $ret, 2);

            return $data;

        }

    }

}