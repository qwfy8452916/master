<?php if (!defined('THINK_PATH')) exit(); if(is_array($info)): $i = 0; $__LIST__ = $info;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li>
       <a href="/baike/<?php echo ($v["id"]); ?>.html">
           <div class="img-box">
                <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($v["thumb"]); ?>" alt="<?php echo ($v["title"]); ?>" title="<?php echo ($v["title"]); ?>">
            </div>
            <div class="baike-list-content">
                <div class="list-content-title">
                    <?php echo ($v["title"]); ?>
                </div>
                <div class="list-content-body">
                    <?php echo (mbstr($v["description"],0,44)); ?>
                </div>
                <div class="list-content-foot">
                    <span class="foot-date"><?php echo (date("Y-m-d",$v["post_time"])); ?></span>
                    <span class="foot-zan"><i class="fa fa fa-thumbs-up"></i> <span class="zan-num"><?php echo ($v["views"]); ?></span> </span>
                </div>
            </div>
        </a>
    </li><?php endforeach; endif; else: echo "" ;endif; ?>