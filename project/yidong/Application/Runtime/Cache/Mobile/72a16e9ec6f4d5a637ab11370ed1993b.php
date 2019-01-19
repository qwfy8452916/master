<?php if (!defined('THINK_PATH')) exit(); if(is_array($com_list)): $i = 0; $__LIST__ = $com_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['hadcard'] == 1): ?><div class="contentone">
            <div class="dianpudizwk">
                <div class="companylogo">
                    <?php if($vo['logo'] != ''): ?><img src="<?php echo ($vo["logo"]); ?>" />
                        <?php else: ?>
                        <img src="http://<?php echo C('QINIU_DOMAIN');?>/Public/default/images/default_logo.png" /><?php endif; ?>
                </div>
                <?php if($vo['liangfang'] == 2 or $vo['liangfang'] == 3 ): ?><div class="companyname weiliangf">
                        <div class="companyname-title"><?php echo ($vo["jc"]); ?></div>
                        <div class="noliangf">未量房</div>
                    </div>
                    <div class="sureliagnfwk">
                        <span class="sureniu" data-orderid="<?php echo ($vo["orderid"]); ?>" data-comid="<?php echo ($vo["comid"]); ?>">确认已量房</span>
                    </div>
                <?php else: ?>
                    <div class="companyname">
                        <div class="companyname-title"><?php echo ($vo["jc"]); ?></div>
                        <div class="noliangf lfcolor">已量房<span class="liangftime"><?php echo (date("Y-m-d H:i:s",$vo["yz_lf_time"])); ?></span></div>
                    </div><?php endif; ?>
            </div>
            <!-- 未量房领取 -->
            <?php if($vo['hadcard'] == 1): if(is_array($vo["cardlist"])): $i = 0; $__LIST__ = $vo["cardlist"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$kk): $mod = ($i % 2 );++$i; if($kk['active_type'] == 2): ?><div class="youhuiqwk youhuiqwk2">
                    <?php else: ?>
                        <div class="youhuiqwk"><?php endif; ?>
                        <?php if($vo['liangfang'] == 2 or $vo['liangfang'] == 3 ): ?><div class="takeendyy">
                                <div class="nolftake"></div>
                            </div><?php endif; ?>
                        <div class="youhqneir" data-cardid="<?php echo ($kk["record_id"]); ?>" data-orderid="<?php echo ($vo["orderid"]); ?>">
                            <div class="quanzhiwk">
                                <?php if($kk['active_type'] == 2): ?><div class="pricewk"><?php echo ($kk["gift"]); ?></div>
                                    <div class="pricems">
                                        <div>满<?php echo ($kk["money3"]); ?>元可领</div>
                                    </div>
                                <?php else: ?>
                                    <div class="pricewk"><span class="pricewk-danwei">￥</span><?php echo ($kk["money2"]); ?></div>
                                    <?php if($kk['money1'] > 0): ?><div class="pricems">
                                            <div>满<?php echo ($kk["money1"]); ?>元可用</div>
                                        </div>
                                        <?php else: ?>
                                        <div class="pricems">
                                            <div>立减<?php echo ($kk["money2"]); ?>元</div>
                                        </div><?php endif; endif; ?>
                            </div>
                            <div class="youohuiqtime">使用时间：<span><?php echo (date("Y.m.d",$kk["start"])); ?></span>~<span><?php echo (date("Y.m.d",$kk["end"])); ?></span></div>
                        </div>
                        <?php if($kk['tel'] != ''): ?><div class="youhuiqrightwk"><span class="pleaseuse">去使用</span></div>
                        <?php else: ?>
                            <?php if($kk['amount'] == $kk['usenum'] and $kk['tel'] == ''): ?><div class="youhuiqrightwk"><span class="takeendniu">已领完</span></div>
                                <?php else: ?>
                                <div class="youhuiqrightwk cantake" data-orderid="<?php echo ($vo["orderid"]); ?>" data-cardid="<?php echo ($kk["record_id"]); ?>" data-comid="<?php echo ($vo["comid"]); ?>"><span>立即领取</span></div><?php endif; endif; ?>

                    </div><?php endforeach; endif; else: echo "" ;endif; endif; ?>
        </div><?php endif; endforeach; endif; else: echo "" ;endif; ?>