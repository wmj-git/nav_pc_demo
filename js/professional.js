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
    loop: false,
    observer: true,
    observeSlideChildren: true,
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

function newsSwiper_mobile() {
    let $win = $(window).width();
    if ($win > 768) {
        news_swiper.destroy(true,true);
        news_swiper = new Swiper('.news_swiper', {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
            loop: false,
            loopFillGroupWithBlank: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: true,
        });
    } else {
        news_swiper.destroy(true,true);
        news_swiper = new Swiper('.news_swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: false,
            loopFillGroupWithBlank: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: true,
        });
    }
}


$(function () {
    newsSwiper_mobile();
    marginFn();
});

window.onresize = function () {
    marginFn();
    newsSwiper_mobile();
}
