<?php
/**
 * 岗位状态
 */
namespace app\common\enums;

class StationStatus
{
    const DEFAULT_RULE_SJS = 1;//设计师
    const DEFAULT_RULE_XMJL = 2;//项目经理
    const DEFAULT_RULE_JDKF = 3;//接待客服
    const DEFAULT_RULE_GR = 4;//工人

    const DEL_STATUS_TRUE = 1;//未删除
    const DEL_STATUS_FALSE = 2;//已删除

    const DATA_STATUS_TRUE = 1;//启用状态
    const DATA_STATUS_FALSE = 2;//未启用状态
}