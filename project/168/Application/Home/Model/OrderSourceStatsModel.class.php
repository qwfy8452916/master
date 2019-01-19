<?php

namespace Home\Model;
Use Think\Model;

/**
* 渠道来源 和 订单推广 统计
*/
class OrderSourceStatsModel extends Model
{
    protected $autoCheckFields = false;

    //取单个
    public function getById($id){
        $map = array(
            'id' => array("EQ",$id)
        );
        return M('order_source')->field('*')->where($map)->find();
    }

    //按时间获取列表
    public function getOrderLocationList($condition){
        $buildSql = M('orders')->field('FROM_UNIXTIME(time_real,"%Y-%m-%d") AS days,`on`,source,type_fw,count(*) AS num')
                            ->where($condition)
                            ->group('days,source,`on`,type_fw')
                            ->order('days')
                            ->buildSql();

        return M("orders")->table($buildSql)->alias("t1")
                            ->field("t1.*,s.name as sourcename,s.groupid,g.name as group_name")
                            ->join("left join qz_order_source as s on s.src = t1.source and s.type = '2' ")
                            ->join("left join qz_order_source_group as g on  g.id = s.groupid ")
                            ->order('t1.days')
                            ->select();
    }

    //获取分组列表
    public function getOrderLocationGroupList($condition){
        $buildSql = M('orders')->field('`on`,source,type_fw,count(*) AS num')
                            ->where($condition)
                            ->group('source,`on`,type_fw')
                            ->order('source')
                            ->buildSql();

        return M("orders")->table($buildSql)->alias("t1")
                            ->field("t1.*,s.name as sourcename,s.groupid,g.name as group_name")
                            ->join("left join qz_order_source as s on s.src = t1.source and s.type = '2' ")
                            ->join("left join qz_order_source_group as g on  g.id = s.groupid ")
                            ->order('t1.source')
                            ->select();
    }

    //取当前时段总数据
    public function getOrderLoactionsByDay($condition){
        return M("orders")->field('FROM_UNIXTIME(time_real,"%Y-%m-%d") AS days,source,count(*) AS num')
                            ->where($condition)
                            ->group('days,source')
                            ->order('days')
                            ->select();
    }

    //取当前时段总数据 有分组数据
    public function getOrderLoactionsAllByDay($condition){
        $buildSql = M('orders')->field('FROM_UNIXTIME(time_real,"%Y-%m-%d") AS days,source,count(*) AS num')
                            ->where($condition)
                            ->group('days,source')
                            ->order('days DESC')
                            ->buildSql();

        return M("orders")->table($buildSql)->alias("t1")
                            ->field("t1.*,s.name as sourcename,s.groupid,g.name as group_name")
                            ->join("left join qz_order_source as s on s.src = t1.source and s.type = '2' ")
                            ->join("left join qz_order_source_group as g on  g.id = s.groupid ")
                            ->order('t1.days')
                            ->select();
    }

    //获取推广来源组
    public function getSourceGroup($type){
        $map['type'] = $type;
        return M('order_source_group')->alias("c")->where($map)->order('addtime desc')->select();
    }

    //获取渠道来源描述信息
    public function getOrderSrcDesc(){
        $map['type'] = '1';
        return M('order_source')->field('id,src,name,description as descs')->where($map)->order('addtime desc')->select();
    }


    ///////////////////////////// 下面是推广来源 /////////////////////////////////////////

    //按时间获取列表
    /**
     * 获取订单src列表
     * @param  string $start   [开始时间]
     * @param  string $end     [结束时间]
     * @param  [type] $depts   [部门ID]
     * @param  [type] $natural [是否包含自然流量]
     * @return [type]          [description]
     */
    public function getOrderSrcList($start = '', $end = '',$depts,$charge,$natural){
        $map = [];
        if (!empty($start) && !empty($end)) {
            $map['o.time_real'] = array('between',array($start,$end));
        } else {
            return false;
        }


        $buildSql = M('orders')->alias("o")
                               ->join("left join qz_log_telcenter_ordercall tel on tel.orderid = o.id")
                               ->where($map)
                               ->field("o.id,o.time_real,o.on,o.type_fw,tel.orderid,remarks")
                               ->group("o.id")
                               ->buildSql();

        $buildSql = M("orders")->table($buildSql)->alias("t")
                               ->field('FROM_UNIXTIME(t.time_real,"%Y-%m-%d") AS days,t.`on`,s.source_src_id as source,t.type_fw,count(*) AS num,count(IF(v.lasttime BETWEEN '.$start.' AND '.$end.' ,1,null)) AS current_num,count(if(t.orderid is not null or t.on = 4,1,null)) as tel_count,count(if(t.orderid is null and t.on <> 4,1,null)) as un_tel_count,count(if(t.remarks in ("订单备注空号","关机","开场挂","否认发单","拒绝服务的订单"),1,null)) as exception_count')
                                ->join("LEFT JOIN qz_orders_source as s on s.orderid = t.id  ")
                                ->join("LEFT JOIN qz_order_csos_new AS v ON v.order_id = t.id")
                                ->group('days,s.source_src_id,`on`,type_fw')
                                ->order('days')
                                ->buildSql();

        $buildSql = M("orders")->table($buildSql)->alias("t1")
                            ->field("t1.*,s.src,s.name as sourcename,s.groupid,s.dept,s.charge,g.name as group_name,h.id as parentid,h.name as parent_name")
                            ->join("left join qz_order_source as s on s.id = t1.source and s.type = '1' ")
                            ->join("left join qz_order_source_group as g on g.id = s.groupid ")
                            ->join("left join qz_order_source_group as h on h.id = g.parentid")
                            ->order('t1.days')
                            ->buildSql();

        if (count($depts) > 0) {
            $map1["t.dept"] = array("IN",$depts);

            if ($natural) {
                $map1["t.dept"] = array(
                    array("IN",$depts),
                    array("EXP","IS NULL"),
                    "OR"
                );
            }
        }

        if (!empty($charge)) {
            if ($charge == 1) {
                $map1["t.charge"] = array(
                    array("EQ",$charge),
                    array("EXP","IS NULL"),
                        "OR"
                );
            } else {
                 $map1["t.charge"] = array("EQ",$charge);
            }
        }

        return  M("orders")->table($buildSql)->where($map1)->alias("t")
                           ->select();
    }

    /**
     * 获取实际分单数据
     * @param  string $start   [开始时间]
     * @param  string $end     [结束时间]
     * @param  [type] $dept    [部门ID]
     * @param  [type] $natural [是否包含自然流量]
     * @return [type]          [description]
     */
    public function getOrderStatFromOrderCsosNew($start='',$end='',$dept,$charge,$natural = fasle){
        $map = [];
        if (!empty($start) && !empty($end)) {
            $map['z.lasttime'] = array('between',array($start,$end));
        } else {
            return false;
        }

        $map['o.source'] = array('neq',999);

        $field = 'FROM_UNIXTIME(z.lasttime,"%Y-%m-%d") AS days,o.`on`,s.source_src_id as source,o.type_fw,count(*) AS real_num,y.src,y.name as sourcename,y.groupid,y.dept,y.charge,g.name as group_name';

        $buildSql = M('order_csos_new')->alias('z')
                                    ->field($field)
                                    ->join('qz_orders AS o ON o.id = z.order_id')
                                    ->join("LEFT JOIN qz_orders_source as s on s.orderid = o.id")
                                    ->join("left join qz_order_source as y on y.id = s.source_src_id and y.type = '1'")
                                    ->join("left join qz_order_source_group as g on g.id = y.groupid ")
                                    ->where($map)
                                    ->group('days,source,`on`,type_fw')
                                    ->order('days')
                                    ->buildSql();
        if (count($dept) > 0) {
            $map1["t.dept"] = array("IN",$dept);
            if ($natural) {
               $map1["t.dept"] = array(
                    array("IN",$dept),
                    array("EXP","IS NULL"),
                    "OR"
               );
            }
        }

        if (!empty($charge)) {
            if ($charge == 1) {
                $map1["t.charge"] = array(
                    array("EQ",$charge),
                    array("EXP","IS NULL"),
                        "OR"
                );
            } else {
                 $map1["t.charge"] = array("EQ",$charge);
            }

        }
        $result = M('order_csos_new')->table($buildSql)->where($map1)->alias("t")
                                     ->select();

        return $result;
    }

    public function getOrderStatFromOrderCsosNewWithBack($start = '', $end = ''){
        $map = [];
        if (!empty($start) && !empty($end)) {
            $map['z.lasttime'] = array('between',array($start,$end));
        } else {
            return false;
        }

        $map['o.source'] = array('eq',999);

        $field = 'FROM_UNIXTIME(z.lasttime,"%Y-%m-%d") AS days,o.`on`,s.source_src_id as source,o.type_fw,count(*) AS real_num,y.src,y.name as sourcename,y.groupid,y.dept,y.charge,g.name as group_name,o.source as laiyuan';

        $result = M('order_csos_new')->alias('z')
                                    ->field($field)
                                    ->join('qz_orders AS o ON o.id = z.order_id')
                                    ->join("LEFT JOIN qz_orders_source as s on s.orderid = o.id")
                                    ->join("left join qz_order_source as y on y.id = s.source_src_id and y.type = '1' ")
                                    ->join("left join qz_order_source_group as g on g.id = y.groupid ")
                                    ->where($map)
                                    ->group('days,source,`on`,type_fw')
                                    ->order('days')
                                    ->select();
        return $result;
    }

    //取当前时段总数据
    public function getOrderSrcByDay($condition){
        return M("orders")->alias("o")
                        ->field('FROM_UNIXTIME(time_real,"%Y-%m-%d") AS days,s.source_src_id as source,count(*) AS num')
                        ->join("left JOIN qz_orders_source as s on s.orderid = o.id ")
                        ->where($condition)
                        ->group('days,source')
                        ->order('days')
                        ->select();
    }

    //取当前时段总数据 有分组数据
    public function getOrderSrcAllByDay($condition){
        $buildSql = M('orders')->alias("o")
                            ->field('FROM_UNIXTIME(time_real,"%Y-%m-%d") AS days,s.source_src_id as source,count(*) AS num')
                            ->join("INNER JOIN qz_orders_source as s on s.orderid = o.id  ")
                            ->where($condition)
                            ->group('days,source')
                            ->order('days DESC')
                            ->buildSql();

        return M("orders")->table($buildSql)->alias("t1")
                            ->field("t1.*,s.name as sourcename,s.groupid,g.name as group_name")
                            ->join("left join qz_order_source as s on s.id = t1.source and s.type = '1' ")
                            ->join("left join qz_order_source_group as g on  g.id = s.groupid ")
                            ->order('t1.days')
                            ->select();
    }

    //获取时间段内所有 Source 列表
    public function getAllSrcByTime($condition){

        $start_time = $condition['o.time_real']['1']['0'];
        $end_time = $condition['o.time_real']['1']['1'];

        if(!empty($start_time)){
            $map['dates'][] = array("EGT",date('Ymd',$start_time));
        }
        if(!empty($end_time)){
            $map['dates'][] = array("ELT",date('Ymd',$end_time));
        }
        if (count($dept) > 0) {
            $map['s.dept'] = array("IN",$dept);
        }

        return M('url_stats_count')->alias("a")
                                   ->join("join qz_order_source s on s.src = a.src")
                                   ->field('a.src,sum(num) AS num,sum(ip_num) AS ip_num')->where($map)->group('src')->select();
    }

    //取当前时段总UV数据 有来源分组数据
    public function getAllUVByDay($condition){

        $start_time = $condition['time_real']['1']['0'];
        $end_time = $condition['time_real']['1']['1'];

        if(!empty($start_time)){
            $map['dates'][] = array("EGT",date('Ymd',$start_time));
        }
        if(!empty($end_time)){
            $map['dates'][] = array("ELT",date('Ymd',$end_time));
        }

        $buildSql = M('url_stats_count')
                            ->field("CONCAT_WS('-',`year`,LPAD(`month`,2,'0'),LPAD(`days`,2,'0')) AS days,`src`,sum(num) AS num,sum(ip_num) AS ip_num")
                            ->where($map)
                            ->group('days,src')
                            ->order('days')
                            ->buildSql();

        return M("orders")->table($buildSql)->alias("t1")
                            ->field("t1.*,s.name as sourcename,s.groupid,g.name as group_name")
                            ->join("left join qz_order_source as s on s.src = t1.src and s.type = '1' ")
                            ->join("left join qz_order_source_group as g on  g.id = s.groupid ")
                            ->order('t1.days')
                            ->select();
    }

    /**
     * Gets the order source by city.
     *
     * @param      integer  $start  The start time
     * @param      integer  $end    The end time
     *
     * @return     array  The order source by city.
     */
    public function getOrderSrcByCity($start,$end,$sourceid){

        $map['s.source_src_id'] = $sourceid;
        $map['o.time_real'] = array('between',array($start,$end));

        return M('orders')->alias('o')
                ->field("o.cs,q.cname,count(*) AS num,SUM(IF(o.`on` = 4 AND o.type_fw = 1||o.type_fw = 2,1, 0)) AS youxiao,SUM(IF(o.`on` = 4 AND o.type_fw = 1,1, 0)) AS fendan")
                ->join('JOIN qz_orders_source as s on s.orderid = o.id')
                ->join('JOIN qz_quyu as q on q.cid = o.cs')
                ->where($map)
                ->group('o.cs')
                ->select();
    }

    /**
     * Gets the real order source by city.
     *
     * @param      string  $start  The start time
     * @param      string  $end    The end time
     *
     * @return     array  The real order source by city.
     */
    public function getRealOrderSrcByCity($start,$end,$sourceid){

        $map['s.source_src_id'] = $sourceid;
        $map['ocn.lasttime'] = array('between',array($start,$end));

        return M('order_csos_new')->alias('ocn')
                ->field("o.cs,SUM(IF( o.`on` = 4 AND o.type_fw = 1||o.type_fw = 2,1, 0)) AS real_youxiao,SUM(IF( o.`on` = 4 AND o.type_fw = 1,1, 0)) AS real_fendan")
                ->join('INNER JOIN qz_orders AS o ON o.id = ocn.order_id')
                ->join('LEFT JOIN qz_orders_source as s on s.orderid = o.id')
                ->where($map)
                ->group('o.cs')
                ->select();
    }

    /**
     * Gets all quyu list.
     *
     * @return     array  All quyu list.
     */
    public function getAllQuyu(){
        return M('quyu')->field('cid,cname,bm')->select();
    }

    /**
     * Gets the order source by identifier.
     *
     * @param      int  $id     The identifier
     *
     * @return     array  The order source by identifier.
     */
    public function getOrderSrcById($id){
        $map['id'] = $id;
        return M('order_source')->field('*')->where($map)->find();
    }

   /**
    * 获取全部订单
    * @param  [type] $begin   [开始时间]
    * @param  [type] $end     [结束时间]
    * @param  [type] $dept    [部门ID]
    * @param  [type] $natural [description]
    * @return [type]          [description]
    */
    public function getAllRealOrderCount($begin,$end,$dept,$natural)
    {
        $map = array(
            "new.lasttime" => array(
                array("EGT",$begin),
                array("ELT",$end)
            ),
            "o.source" => array("NEQ",999),
            "o.on" => array("EQ",4),
            "o.type_fw" => array("EQ",1)
        );

        if (count($dept) > 0) {
            $map["y.dept"] = array("IN",$dept);
        }

        if ($natural) {
            $map["y.dept"] = array(
                array("IN",$dept),
                array("EXP","IS NULL"),
                "OR"
            );
        }

        $buildSql = M('order_csos_new')->where($map)->alias("new")
                                     ->join("join qz_orders o on o.id = new.order_id")
                                     ->join("LEFT JOIN qz_orders_source AS s ON s.orderid = o.id")
                                     ->join("LEFT JOIN qz_order_source AS y ON y.id = s.source_src_id AND y.type = '1'")
                                     ->field("new.order_id")
                                     ->buildSql();

        return M('order_csos_new')->table($buildSql)->alias("t")->count();
    }

     /**
     * 获取渠道订单信息
     * @param  [type] $src   [渠道标识]
     * @param  [type] $begin [开始时间]
     * @param  [type] $end   [结束时间]
     * @return [type]        [description]
     */
    public function getSrcOrderDetailsListCount($src,$begin,$end,$state)
    {
        $map = array(
            "a.source_src" => array("EQ",$src),
            "o.time_real" => array(
                array("EGT",$begin),
                array("LT",$end)
            )
        );

        if (!empty($state)) {
            switch ($state) {
                case '1':
                    $map["_complex"] = array(
                        "o.on" => array("EQ",4),
                        "o.type_fw" => array("EQ",1),
                    );
                    break;
                case '2':
                    $map["_complex"] = array(
                        "o.on" => array("EQ",4),
                        "o.type_fw" => array("EQ",2),
                    );
                    break;
                case '3':
                    $map["_complex"] = array(
                        "o.on" => array("EQ",4),
                        "o.type_fw" => array("EQ",3),
                    );
                    break;
                case '4':
                    $map["_complex"] = array(
                        "o.on" => array("EQ",4),
                        "o.type_fw" => array("EQ",4),
                    );
                    break;
                case '5':
                    $map["o.type_fw"] = array("NOT IN",array(1,2,3,4));
                    break;
            }
        }

        return M('orders_source')->where($map)->alias("a")
                                 ->join("left join qz_orders o on o.id = a.orderid")
                                 ->count();
    }

    /**
     * 获取渠道订单信息
     * @param  [type] $src   [渠道标识]
     * @param  [type] $begin [开始时间]
     * @param  [type] $end   [结束时间]
     * @return [type]        [description]
     */
    public function getSrcOrderDetailsList($src,$begin,$end,$state,$pageIndex,$pageCount)
    {
        $map = array(
            "a.source_src" => array("EQ",$src),
            "o.time_real" => array(
                array("EGT",$begin),
                array("LT",$end)
            )
        );

        if (!empty($state)) {
            switch ($state) {
                case '1':
                    $map["_complex"] = array(
                        "o.on" => array("EQ",4),
                        "o.type_fw" => array("EQ",1),
                    );
                    break;
                case '2':
                    $map["_complex"] = array(
                        "o.on" => array("EQ",4),
                        "o.type_fw" => array("EQ",2),
                    );
                    break;
                case '3':
                    $map["_complex"] = array(
                        "o.on" => array("EQ",4),
                        "o.type_fw" => array("EQ",3),
                    );
                    break;
                case '4':
                    $map["_complex"] = array(
                        "o.on" => array("EQ",4),
                        "o.type_fw" => array("EQ",4),
                    );
                    break;
                case '5':
                    $map["o.type_fw"] = array("NOT IN",array(1,2,3,4));
                    break;
            }
        }
        $buildSql = M('orders_source')->where($map)->alias("a")
                                 ->join("left join qz_order_source s on s.id = a.source_src_id")
                                 ->join("left join qz_orders o on o.id = a.orderid")
                                 ->field("o.id,a.source_src_id,o.remarks,o.ip,o.on,o.type_fw,s.name as source_name,s.groupid,o.cs,o.qx,a.source_src,o.tel,o.time_real")
                                 ->limit($pageIndex.",".$pageCount)
                                 ->buildSql();

        return M('orders_source')->table($buildSql)->alias("t")
                                 ->join("left join qz_order_source_group g on g.id = t.groupid")
                                 ->join("left join qz_quyu q on q.cid = t.cs")
                                 ->join("join safe_order_tel8 tel on tel.orderid = t.id")
                                 ->join("left join qz_area area on area.qz_areaid = t.qx")
                                 ->field("t.id,t.remarks,t.ip,t.on,t.type_fw,t.source_src,g.name as source_group_name,q.cname,area.qz_area,t.tel,t.time_real,tel.tel8")
                                 ->select();
    }
}