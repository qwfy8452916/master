<?php if (!defined('THINK_PATH')) exit();?><div class="tk-rel tk-top">
    <div class="rel-top">
        <div class="rel_topic clearfix">
            <p class="h1">发表评论</p><span>已有<strong class="redcolor" style="font-size: 18px; font-style:italic;"><?php echo ((isset($rel_number) && ($rel_number !== ""))?($rel_number):0); ?></strong>人参与评论</span>
        </div>
        <div class="rel_text">
            <textarea placeholder="说点什么吧！" maxlength="200" class="area_text"></textarea>
        </div>
        <div class="rel_note clearfix">
            <span class="word_left">评论仅供其表达个人看法，并不表明齐装网立场。</span><span class="word">0/200</span>
        </div>
        <div class="rel_login">
            <?php if(!session('u_userInfo')): ?><input type="text" name="name" placeholder="账号">
            <input type="password" name="password" placeholder="密码">
            <span class="login_k_acc redcolor">账号不能为空</span>
            <span class="login_k_pass redcolor">密码不能为空</span>
            <div class="login_pass">
                <a rel="nofollow" href="http://u.qizuang.com/getpassword/" target="_blank">忘记密码</a>
                <a rel="nofollow" href="http://u.qizuang.com/reg/" target="_blank">注册</a>
            </div>
            <ul class="login_hezuo">
                <li>使用合作账号登录</li>
                <li><a class="hezuo_QQ" rel="nofollow" href="http://oauthtmp.qizuang.com/loginfromqq" target="_blank"></a></li>
                <li><a class="hezuo_xinlang" rel="nofollow" href="http://oauthtmp.qizuang.com/loginfromsina" target="_blank"></a></li>
                <li><a class="hezuo_weixin" rel="nofollow" href="http://oauthtmp.qizuang.com/loginfromwechat" target="_blank"></a></li>
            </ul><?php endif; ?>
            <div id="btnReplay" data-module="<?php echo ($module); ?>" class="login_btn bgcolor" data-rel="<?php echo ($rel_id); ?>">发表评论</div>
        </div>
    </div>
</div>