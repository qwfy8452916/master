document.write("<script language=javascript src='/vpp/js/config.js'><\/script>");
$(function () {
    isLogin();
    attrGo();
});

//全局添加TOKEN
$(document).ajaxSend(function (event, xhr, options) {
    var token = '';
    if (getData('TOKEN')) {
        token = getData('TOKEN');
    }
    if (token != '') {
        if (options.url.indexOf("?") != -1) {
            options.url = options.url + '&token=' + token;
        } else {
            options.url = options.url + '?token=' + token;
        }
    }
});

function ajaxPost(url, data, callBack) {
    $.post(url, data, callBack, 'json');
}

function ajaxGet(url, data, callBack) {
    $.getJSON(url, data, callBack);
}

/**
 * 是否收藏（加载显示按钮）
 * @param product_id
 * @param assoc_table
 * @returns {*}
 */
function is_collect(product_id, assoc_table) {
    $.ajax({
        type: "POST",
        url: window.globalResURL + "/favorite/isCollect",
        data: {
            assoc_table: assoc_table,
            product_id: product_id
        },
        dataType: 'json',
        async: false,
        success: function (data) {
            res = data;
        }
    });
    return res;
}


/**
 * 添加或取消收藏
 * @param id
 * @param table
 * @returns {*}
 */
function collect(id, table) {
    $.ajax({
        type: "POST",
        url: window.globalResURL + "/favorite/add_favorites_log",
        data: {
            'id': id,
            'table': table,
        },
        dataType: 'json',
        async: false,
        success: function (data) {
            res = data;
        }
    });
    return res;
}


// 底部导航
Vue.component('footer-nav', {
    name: 'footer-nav-component',
    props: {
        footerNavList: {
            type: Array,
            default: function () {
                return [{
                    icon: 'icon-zhuye',
                    name: '首页',
                    isActive: true,
                    url: 'index.html'
                },
                    {
                        icon: 'icon-dingdan1',
                        name: '订单',
                        isActive: false,
                        url: 'order.html'
                    },
                    {
                        icon: 'icon-gouwuche1',
                        name: '购物车',
                        isActive: false,
                        url: 'shopcar.html'
                    },
                    {
                        icon: 'icon-wode',
                        name: '我的',
                        isActive: false,
                        url: 'my.html'
                    }
                ]
            }
        }
    },
    methods: {
        // 跳转  .ajax仅用于本地测试
        go(url) {
            var cacheToken = getData('TOKEN');
            if (isUrlWenHao(url)) {
                var location = url + "&token=" + cacheToken;
            } else {
                var location = url + "?token=" + cacheToken;
            }
            window.location.href = location;
        },
        getData(key) {
            return localStorage.getItem(key);
        },
        /**
         * 判斷字符串中是否包含问号
         * @param str
         * @returns {boolean}
         */
        isUrlWenHao(str) {
            return (str.indexOf("?") != -1);
        }
    },
    template: `
        <!--底部固定导航-->
        <div class="nav">
            <div class="navBox"
                :class={active:item.isActive}
                v-for="(item, index) in footerNavList" 
                :key="index"
                @click="go(item.url)">
                <i class="lele" :class="item.icon"></i>
                <p>{{ item.name }}</p>
            </div>
        </div>`
})

//绑定跳转
function attrGo() {
    var links = $("[go]");
    links.on('click', function () {
        window.location.href = $(this).attr("go");
    })
}

// 加载字体图标css
var loadCss = function (url) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    head.appendChild(link);
};
loadCss('http://at.alicdn.com/t/font_999391_sjmttmdtrem.css');
loadCss('http://at.alicdn.com/t/font_763110_kzynxm5sv1.css');

// 跳转  .ajax仅用于本地测试
function go(url) {
    var cacheToken = getData('TOKEN');

    if (isUrlWenHao(url)) {
        var location = url + "&token=" + cacheToken;
    } else {
        var location = url + "?token=" + cacheToken;
    }
    window.location.href = location;
}

/**
 * 判斷字符串中是否包含问号
 * @param str
 * @returns {boolean}
 */
function isUrlWenHao(str) {
    return (str.indexOf("?") != -1);
}

// 获取地址栏参数
function getParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var search = decodeURIComponent(window.location.search);
    var r = search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 选项卡切换高亮，参数：father:对象，切换对象的父级， son：对象，要切换的对象
function tab(father, son) {
    var tabs = father.find(son);
    tabs.on('click', function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');
        }
    })
}

/**
 * 登录
 */
function login() {

    setData('BACK_URL', encodeURIComponent(window.location.href));
    getCode();
    /*//保存请求的url，登录成功后跳转
	var REDIRECT_URI = window.globalResURL+'/login/aouth_login';
	var url  = window.globalResURL+'/vpp/view/login.html';;
    window.location.href = REDIRECT_URI+'?back_url='+encodeURIComponent(url);*/
}

function getCode() {
    var backulr = encodeURIComponent(window.globalResURL + '/vpp/view/login.html');
    var appId = window.wxAppId;
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appId+'&redirect_uri=' + backulr +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    window.location.href = url;
}

/**
 * 判断登录
 */
function isLogin() {
    var token = GetQueryString("token");
    var cacheToken = getData('TOKEN');
    if (!cacheToken) { //没有缓存区登录
        login();
    }
    //地址栏包含token
    if (token != null) {
        //缓存里的token和新token不匹配》》 去登录
        if (cacheToken != token) {
            login();
        }
    }
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function setData(key, value) {
    localStorage.setItem(key, value);
}

function getData(key) {
    return localStorage.getItem(key);
}

/**
 * 替换参数值
 * @param url
 * @param arg
 * @param val
 * @returns {string}
 */
function changeUrlArg(url, arg, val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + val;
    return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
}

/**
 * 判斷字符串中是否包某个字符
 * @param str
 * @returns {boolean}
 */
function isStrStr(str, arg) {
    return (str.indexOf(arg) != -1);
}


// 苹果手机弹框去掉域名网址
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}
