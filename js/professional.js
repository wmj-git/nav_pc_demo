let mySwiper = new Swiper('.banner_swiper', {
    pagination: {
        el: '.banner_pagination',
    },
    effect: 'fade',
    autoplay: true,
    /* observer:true,//修改swiper自己或子元素时，自动初始化swiper
     observeParents:false,//修改swiper的父元素时，自动初始化swiper
     onSlideChangeEnd: function(swiper){
         swiper.update();
         mySwiper.startAutoplay();
         mySwiper.reLoop();
     }*/
});

//鼠标覆盖停止自动切换
mySwiper.el.onmouseover = function () {
    mySwiper.autoplay.stop();
}

//鼠标离开开始自动切换
mySwiper.el.onmouseout = function () {
    mySwiper.autoplay.start();
}


/*新闻中心-一次轮播三个*/

let news_swiper = new Swiper('.news_swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: true,
    /* observer:true,//修改swiper自己或子元素时，自动初始化swiper
     observeParents:false,//修改swiper的父元素时，自动初始化swiper
     onSlideChangeEnd: function(swiper){
         swiper.update();
         news_swiper.startAutoplay();// 重新开始自动切换；
         news_swiper.reLoop();
     }*/
});

function marginFn() {
    let _portrait_title_width = $(".portrait_title").innerWidth();
    $(".portrait_title").css("margin-left", (-_portrait_title_width / 2) + 'px');
    let portrait_flex_item_width = $(".flex_item").innerWidth();
    $(".flex_item").css({"height": portrait_flex_item_width, 'border-radius': portrait_flex_item_width / 2});
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function newsSwiper_mobile() {
    let $win = $(window).width();
    let _isPc = IsPC();
    if ($win > 1204) {
        news_swiper.params.slidesPerView = 3;
        news_swiper.params.slidesPerGroup = 3;
    } else {
        console.log('移动端');
        news_swiper.params.slidesPerView = 1;
        news_swiper.params.slidesPerGroup = 1;
    }
}

newsSwiper_mobile();
marginFn();

window.onresize = function () {
    marginFn();
    newsSwiper_mobile();
}
