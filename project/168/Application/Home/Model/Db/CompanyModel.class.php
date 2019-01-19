<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/8/22
 * Time: 13:16
 */

namespace Home\Model\Db;

use Think\Model;

class CompanyModel extends Model
{
    protected $tableName = "user";

    public function selectCompany($company_ids){
		if (empty($company_ids)) {
			return false;
		}
		$map = array(
			'u.id' => ['IN',$company_ids],
			'u.classid' => 3
		);
		//注意此处连表qz_user_company的ID问题
		return M('user')->alias('u')
			->field('u.*')
			->where($map)
			->select();
    }

	public function getCompanyListCount($where){
		if(!empty($where['jc'])){
			$map["_complex"] = array(
				"a.jc" =>  array("LIKE","%".$where['jc']."%"),
				"a.id" =>  array("EQ",$where['jc']),
				"_logic" => "OR"
			);
		}
		if(!empty($where["city"])){
			$map["a.cs"] = $where["city"];
		}
		if(!empty($where["area"])){
			$map["a.qx"] = $where["area"];
		}
		if(!empty($where["zuobiao"])){
			if($where["zuobiao"] == 1){
				$map["c.lng"]  = array("EQ",'');
				$map["c.lat"]  = array("EQ",'');
			}else{
				$map["c.lng"]  = array("NEQ",'');
				$map["c.lat"]  = array("NEQ",'');
			}
		}
		if(!empty($where['bao'])){
			$map["c.contract"]  = array("EQ",$where['bao']);
		}
		if(!empty($where['zhuang'])){
			$map["c.lx"]  = array("EQ",$where['zhuang']);
		}

		$map["c.fake"] = 0;
		$map["a.on"] = 2;
		return M('user')->where($map)->alias("a")
			->field("a.id")
			->join("join qz_user_company c on a.id = c.userid")
			->join("join qz_quyu q on q.cid = a.cs")
			->count();
	}

	public function getCompanyList($where,$pageIndex,$pageCount){
		if(!empty($where['jc'])){
			$map["_complex"] = array(
				"a.jc" =>  array("LIKE","%".$where['jc']."%"),
				"a.id" =>  array("EQ",$where['jc']),
				"_logic" => "OR"
			);
		}
		if(!empty($where["city"])){
			$map["a.cs"] = $where["city"];
		}
		if(!empty($where["area"])){
			$map["a.qx"] = $where["area"];
		}
		if(!empty($where["zuobiao"])){
			if($where["zuobiao"] == 1){
				$map["c.lng"]  = array("EQ",'');
				$map["c.lat"]  = array("EQ",'');
			}else{
				$map["c.lng"]  = array("NEQ",'');
				$map["c.lat"]  = array("NEQ",'');
			}
		}
		if(!empty($where['bao'])){
			$map["c.contract"]  = array("EQ",$where['bao']);
		}
		if(!empty($where['zhuang'])){
			$map["c.lx"]  = array("EQ",$where['zhuang']);
		}

		$map["c.fake"] = 0;
		$map["a.on"] = 2;
		return M('user')->where($map)->alias("a")
			->field("a.id,a.jc,q.cname,a.dz,c.lng,c.lat,c.contract,c.lx,c.other_id,c.saler,x.qz_area")
			->join("join qz_user_company c on a.id = c.userid")
			->join("join qz_quyu q on q.cid = a.cs")
			->join("left join qz_area x on x.qz_areaid = a.qx")
			->order("a.register_time desc")
			->limit($pageIndex . "," . $pageCount)
			->select();
	}

	public function getvipcompany($id){
		$map['a.id'] =  array("EQ",$id);
		return M('user')->where($map)->alias("a")
			->field("a.id,a.jc,q.cname,a.cs,a.dz,c.lng,c.lat,c.contract,c.lx,c.other_id,c.saler,x.qz_area,a.qx")
			->join("join qz_user_company c on a.id = c.userid")
			->join("join qz_quyu q on q.cid = a.cs")
			->join("left join qz_area x on x.qz_areaid = a.qx")
			->find();
	}

	public function getvipcompanycount($id){
		$map['a.id'] =  array("in",$id);
		$map["c.fake"] = 0;
		$map["a.on"] = 2;
		
		return M('user')->where($map)->alias("a")
			->field("a.id,a.jc,q.cname,a.cs,a.dz,c.lng,c.lat,c.contract,c.lx,c.other_id,c.saler,x.qz_area,a.qx")
			->join("join qz_user_company c on a.id = c.userid")
			->join("join qz_quyu q on q.cid = a.cs")
			->join("left join qz_area x on x.qz_areaid = a.qx")
			->count();
	}


	public function saveUser($user,$id){
		$map["id"] = array("EQ",$id);
		return M('user')->where($map)->save($user);
	}

	public function saveCompany($user,$id){
		$map["userid"] = array("EQ",$id);
		return M('user_company')->where($map)->save($user);
	}



}