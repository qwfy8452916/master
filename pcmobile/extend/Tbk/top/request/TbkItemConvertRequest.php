<?php
/**
 * TOP API: taobao.taobaoke.items.convert request
 *官方SDK未知原因缺少改类，自己补充
 * @author mcj
 * @since 1.0, 2012-08-08 16:40:51
 */
class TbkItemConvertRequest
{
    private $adzoneId;

    /**
     * 链接形式：1：PC，2：无线，默认：１
     **/
    private $platform;

    /**
     * 自定义输入串，英文和数字组成，长度不能大于12个字符，区分不同的推广渠道
     **/
    private $unid;

    private $dx;
    /**
     * 闇€杩斿洖鐨勫瓧娈靛垪琛?鍙€夊€?num_iid,title,nick,pic_url,price,click_url,commission,commission_rate,commission_num,commission_volume,shop_click_url,seller_credit_score,item_location,volume
    ;瀛楁涔嬮棿鐢?,"鍒嗛殧.
     **/
    private $fields;
    /**
     * 鏍囪瘑涓€涓簲鐢ㄦ槸鍚︽潵鍦ㄦ棤绾挎垨鑰呮墜鏈哄簲鐢?濡傛灉鏄痶rue鍒欎細浣跨敤鍏朵粬瑙勫垯鍔犲瘑鐐瑰嚮涓?濡傛灉涓嶇┛鍊?鍒欓粯璁ゆ槸false.
     **/
    private $isMobile;
    /**
     * 鎺ㄥ箍鑰呯殑娣樺疂浼氬憳鏄电О.娉細鎸囩殑鏄窐瀹濈殑浼氬憳鐧诲綍鍚?
     **/
    private $nick;
    /**
     * 娣樺疂瀹㈠晢鍝佹暟瀛梚d涓?鏈€澶ц緭鍏?0涓?鏍煎紡濡?"value1,value2,value3" 鐢? , "鍙峰垎闅斿晢鍝佹暟瀛梚d
     **/
    private $numIids;
    /**
     * 鑷畾涔夎緭鍏ヤ覆.鏍煎紡:鑻辨枃鍜屾暟瀛楃粍鎴?闀垮害涓嶈兘澶т簬12涓瓧绗?鍖哄垎涓嶅悓鐨勬帹骞挎笭閬?濡?bbs,琛ㄧずbbs涓烘帹骞挎笭閬?blog,琛ㄧずblog涓烘帹骞挎笭閬?
     **/
    private $outerCode;
    /**
     * 鐢ㄦ埛鐨刾id,蹇呴』鏄痬m_xxxx_0_0杩欑鏍煎紡涓棿鐨?xxxx". 娉ㄦ剰nick鍜宲id鑷冲皯闇€瑕佷紶閫掍竴涓?濡傛灉2涓兘浼犱簡,灏嗕互pid涓哄噯,涓攑id鐨勬渶澶ч暱搴︽槸20
     **/
    private $pid;
    /**
     * 鍟嗗搧track_iid涓诧紙甯︽湁杩借釜鏁堟灉鐨勫晢鍝乮d),鏈€澶ц緭鍏?0涓?涓巒um_iids蹇呭～鍏朵竴
     **/
    private $trackIids;
    private $apiParas = array();

    public function getApiMethodName()
    {
        return "taobao.tbk.item.convert";
    }

    public function setAdzoneId($adzoneId)
    {
        $this->adzoneId = $adzoneId;
        $this->apiParas["adzone_id"] = $adzoneId;
    }

    public function getAdzoneId()
    {
        return $this->adzoneId;
    }

    public function setPlatform($platform)
    {
        $this->platform = $platform;
        $this->apiParas["platform"] = $platform;
    }

    public function getPlatform()
    {
        return $this->platform;
    }
    public function setUnid($unid)
    {
        $this->unid = $unid;
        $this->apiParas["unid"] = $unid;
    }

    public function getUnid()
    {
        return $this->unid;
    }

    public function setDx($dx)
    {
        $this->dx = $dx;
        $this->apiParas["dx"] = $dx;
    }

    public function getDx()
    {
        return $this->dx;
    }

        public function setFields($fields)
    {
        $this->fields = $fields;
        $this->apiParas["fields"] = $fields;
    }
    public function getFields()
    {
        return $this->fields;
    }
    public function setIsMobile($isMobile)
    {
        $this->isMobile = $isMobile;
        $this->apiParas["is_mobile"] = $isMobile;
    }
    public function getIsMobile()
    {
        return $this->isMobile;
    }
    public function setNick($nick)
    {
        $this->nick = $nick;
        $this->apiParas["nick"] = $nick;
    }
    public function getNick()
    {
        return $this->nick;
    }
    public function setNumIids($numIids)
    {
        $this->numIids = $numIids;
        $this->apiParas["num_iids"] = $numIids;
    }
    public function getNumIids()
    {
        return $this->numIids;
    }
    public function setOuterCode($outerCode)
    {
        $this->outerCode = $outerCode;
        $this->apiParas["outer_code"] = $outerCode;
    }
    public function getOuterCode()
    {
        return $this->outerCode;
    }
    public function setPid($pid)
    {
        $this->pid = $pid;
        $this->apiParas["pid"] = $pid;
    }
    public function getPid()
    {
        return $this->pid;
    }
    public function setTrackIids($trackIids)
    {
        $this->trackIids = $trackIids;
        $this->apiParas["track_iids"] = $trackIids;
    }
    public function getTrackIids()
    {
        return $this->trackIids;
    }

    public function getApiParas()
    {
        return $this->apiParas;
    }
    public function check()
    {
        RequestCheckUtil::checkNotNull($this->fields,"fields");
        RequestCheckUtil::checkMaxListSize($this->numIids,50,"numIids");
        RequestCheckUtil::checkMaxListSize($this->trackIids,50,"trackIids");
    }
}