<?php

namespace Home\Model\Logic;
class AdminuserLogicModel
{
    public function getKfList()
    {
        $result = D("Adminuser")->getKfList();
        foreach ($result as $key => $value) {
            $kfList[] = array(
                "name" => $value["name"],
                "id" => $value["id"]
            );
        }
        return $kfList;
    }
}