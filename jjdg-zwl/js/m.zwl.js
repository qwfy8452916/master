/*
 * 首页样式，商品详情页，专题列表页，专题详情页
 * 赵文林
*/

setTimeout(showPage, 450);

// 这里要增加一个loading.gif的图标，表示正在加载
function showPage() {
    var body = document.getElementsByTagName('body')[0];
    body.style.display = "block";
    body.style.visibility = "visible";
}

// 点击搜索框跳转到搜索页面
+function ($) {
	var $search = $("input[data-type='index-search']");
	$search.on('click',function(event) {
		event.preventDefault();
		location.href="search.html";
	});
}(jQuery)

// 商品详情页轮播图
+function ($) {
	var mySwiper = new Swiper('.good-pics', {
        //移动端轮播
        autoplay: 3000,//可选选项，自动滑动
        initialSlide: 0,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        paginationType: 'custom',
        paginationCustomRender: function (swiper, current, total) {
            switchTab(current);
            return current + ' of ' + total;
        }
    });
}(jQuery)