<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>

<head>
    <title>错误</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <style>
    .tit {
        height: 100px;
        width: 480px;
        margin: 0 auto;
        line-height: 100px;
        font-size: 24px;
        font-weight: bold;
        color: #F43C00;
        position: relative;
        text-align: center;
        vertical-align: middle;
    }

    .soc {
        font-size: 12px;
        color: #888;
        width: 300px;
        margin: 0 auto;
        line-height: 30px;
    }

    .soc #cannel {
        display: inline-block;
        padding: 0 20px;
        color: #fff;
        background: #528AED;
        border-radius: 50px;
        text-decoration: none;
        margin-left: 20px
    }

    .soc #ss {
        font-weight: bold;
        font-size: 20px;
        margin-right: 10px
    }

    .tit .fa-meh-o{
        position: absolute;
        left: -100px;
        top:20px;
        display: block;
        width: 100px;
        height: 100px;
        font-size: 80px;
        color: #888;
    }
    </style>
</head>

<body>
    <div>
      <div class="tit">
      <i class="fa fa-meh-o"></i>
        <?php echo $error ?>
      </div>
    </div>
    <div class="soc"><span id="ss">3</span>秒后回到主页<a href="javascript:" id="cannel">返回</a></div>
    <script type="text/javascript">
    var ss = 3;
    var canc = document.getElementById("cannel")
    var i = setInterval(function() {
        document.getElementById("ss").innerHTML = ss;
        ss--;
        if (ss > 0) {
            canc.onclick = function() {
                window.history.go(-1);
            }
        } else if (ss < 0) {
            window.location.href = "<?php echo($jumpUrl); ?>";
        }
    }, 1000);
    </script>
</body>
</html>