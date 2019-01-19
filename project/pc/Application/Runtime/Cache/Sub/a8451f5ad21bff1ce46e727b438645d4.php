<?php if (!defined('THINK_PATH')) exit(); if($comments): if(is_array($comments)): $i = 0; $__LIST__ = $comments;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="plold">
        <div class="userhead">
            <img src="http://<?php echo C('STATIC_HOST1'); echo ($vo["img"]); ?>" width="100" height="100">
        </div>
        <div class="usersend">
            <p class="name"><?php echo ($vo["name"]); ?></p>
            <p><?php echo ($vo["text"]); ?></p>
            <p class="timer"><?php echo (date("Y-m-d H:i:s",$vo["time"])); ?></p>
        </div>
    </div><?php endforeach; endif; else: echo "" ;endif; ?>
<?php else: ?>
<div class="plold uplold" >
    <i style="">
        <i ></i>
        <em >暂时还没有评论!</em>
    </i>
</div><?php endif; ?>