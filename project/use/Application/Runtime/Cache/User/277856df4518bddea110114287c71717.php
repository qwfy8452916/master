<?php if (!defined('THINK_PATH')) exit();?><div class="col-sm-2 verify-check pull-left">
    <input name="verify" class="form-control" type="text" placeholder="验证码" />
</div>
<div class="col-sm-2 input-icon pull-left">
    <img class="verify-img" src="/verify"/>
</div>
<script type="text/javascript">
    $(".verify-img").click(function(event) {
        $(this).attr("src","/verify?rand="+Math.random());
    });
</script>