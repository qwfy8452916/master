<?php
/**
 * Created by PhpStorm.
 * User: jsb
 * Date: 2018/9/3
 * Time: 16:37
 */
namespace app\common\model\db;

use think\Model;
use think\Db;

class YxbAccount extends Model {
    public function _initialize(){
        parent::_initialize();
    }

    static public function getYxbAccount(){
        return Db::name('yxb_account')->paginate(10);
    }

    public function getCheckAccount($where){
        return $this -> alias('a') -> field('u.jc,a.id,a.account,a.image,a.status,a.contact_name,a.pass,a.company_id,a.account,a.class_type,b.start_time,b.end_time,b.type,p.name postname,a.is_del')
            -> where($where)
            -> leftJoin('qz_yxb_account_info i', 'a.id = i.account_id')
            -> leftJoin('qz_yxb_account_time b', 'a.company_id = b.company_id')
            -> leftJoin('qz_yxb_station p', 'i.station_id = p.id')
            -> leftJoin('qz_user u', 'u.id = a.company_id')
            -> find();
    }


    //根据公司id获取所有有效期
    public function getAllTimeReal($comid){
        $map = [];
        $map[] = ['company_id','=',$comid];
        $map[] = ['start_time','<=',time()];
        $map[] = ['end_time','>=',time()];
        $data = Db::name('yxb_account_time')->where($map)->find();
        return $data;
    }


    //更新密码
    public function updataPass($data){
        if(session('userInfo.id')){
            $data['id'] = session('userInfo.id');
        }else{
            $where['account'] = $data['account'];
            $data['id'] = Db::name('yxb_account')-> where($where) -> column('id')[0];
        }
        return self::update($data);
    }

    /**
     * 获取default_rule
     * @param  $accountid  账户id
     * @return $defaulerule   需要的default_rule值
     */
    public function getDefaultRuleByAccountId($accountid){
        $where['a.id'] = $accountid;
        $getdefaulerule = $this->where($where)->alias('a')
            ->field('s.default_rule')
            ->join('qz_yxb_account_info i', 'a.id = i.account_id')
            ->join('qz_yxb_department d', 'i.dept_id = d.id')
            ->join('qz_yxb_station s', 'i.station_id = s.id')
            ->find();
        return $getdefaulerule['default_rule']?$getdefaulerule['default_rule']:'';
    }

    /**
     * 验证账号和手机号是否匹配
     * @param $where|数组   查询条件   登陆账号和手机号
     *
     *
     */
    public function verifyAccountAndPhone($where){
        $getresult = $this -> where($where) -> find();
        if(!empty($getresult)){
            return true;
        }else{
            return false;
        }
    }


    /**
     *  验证账号是否存在
     */
    public function checkedHadAccount($where){
        $getresult = $this -> where($where) -> find();
        if(!empty($getresult)){
            return true;
        }else{
            return false;
        }
    }

}