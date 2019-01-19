<?php

namespace Home\Model\Logic;

class CompanyLogicModel
{
    //获取公司真会员列表
    public function getTrueCompany($where){
        $count =  D('Home/Db/Company')->getCompanyListCount($where);
        if($count>0){
            import('Library.Org.Util.Page');
            $p = new \Page($count,20);
            $show = $p->show();
            $list = D('Home/Db/Company')->getCompanyList($where,$p->firstRow, $p->listRows);
            //处理续费数据
            return ['list' => $list, 'page' => $show];
        }
    }

    public function getvipcompany($id){
        $result =  D('Home/Db/Company')->getvipcompany($id);
        if(!empty(floatval($result["lng"]))&&!empty(floatval($result["lat"]))){
            $result["zuobiao"] = $result["lng"].",".$result["lat"];
        }
        return $result;
    }


    public function savevipcompany($user,$company,$id){
        $user["time"] = time();
        $company["time"] = time();
        $userResult = D('Home/Db/Company')->saveUser($user,$id);
        $companyResult = D('Home/Db/Company')->saveCompany($company,$id);
        if($userResult && $companyResult){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 下载Excel
     *
     * @param      array  $title     The title
     * @param      array  $column    The column
     * @param      array  $list      The list
     * @param      string  $filename  The filename
     *
     * @return     mixed
     */
    public function downExcel($title,$filename){
        import('Library.Org.Phpexcel.PHPExcel',"",".php");
        import('Library.Org.Phpexcel.PHPExcel.Writer.Excel2007',"",".php");
        $cacheMethod = \PHPExcel_CachedObjectStorageFactory::cache_in_memory_gzip;
        $cacheSettings = array ( 'cacheTime' => 300 );
        \PHPExcel_Settings::setCacheStorageMethod ( $cacheMethod, $cacheSettings );
        $phpExcel = new \PHPExcel();
        $i = 0;
        foreach ($title as $key => $value) {
            $num = \PHPExcel_Cell::stringFromColumnIndex($i++) . '' . 1;
            $phpExcel->getActiveSheet()->setCellValue($num,(string)$value);
        }
        ob_end_clean();
        header("Pragma: public");
        header("Expires: 0");
        header("Cache-Control:must-revalidate, post-check=0, pre-check=0");
        header("Content-Type:application/force-download");
        header("Content-Type:application/vnd.ms-execl");
        header("Content-Type:application/octet-stream");
        header("Content-Type:application/download");
        header('Content-Disposition:attachment;filename="'.$filename.'.xlsx"');
        header("Content-Transfer-Encoding:binary");
        $writer = new \PHPExcel_Writer_Excel2007($phpExcel);
        $writer->save('php://output');
        exit();
    }
}