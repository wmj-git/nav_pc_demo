$(function () {
    bannerSwiper();
    marginFn();
    $("#header").load("public/header/firstNav.html");
    $("#pcMenu").load("public/header/secondNav_pc.html");
    $("#mobileMenu").load("public/header/secondNav_mobile.html");
    $("#footer").load("public/footer/footer.html");
    (function () {
        $('loadBg').fadeOut();
        setTimeout(function () {
            $('loadIcon').hide();
            $('#loading').fadeOut();
        }, 800);
    })();
    newsSwiper_init();
});

window.onresize = function () {
    marginFn();
    newsSwiper_init();
}

function bannerSwiper() {
    let mySwiper = new Swiper('.banner_swiper', {
        pagination: {
            el: '.banner_pagination',
        },
        effect: 'fade',
        autoplay: true
    });
    mySwiper.el.onmouseover = function () {
        mySwiper.autoplay.stop();
    }

    mySwiper.el.onmouseout = function () {
        mySwiper.autoplay.start();
    }
}


function marginFn() {
    let _portrait_title_width = $(".portrait_title").innerWidth();
    $(".portrait_title").css("margin-left", (-_portrait_title_width / 2) + 'px');
    let portrait_flex_item_width = $(".flex_item").innerWidth();
    $(".flex_item").css({"height": portrait_flex_item_width, 'border-radius': portrait_flex_item_width / 2});
}


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
    autoplay: true
});

function newsSwiper_init() {
    /*swiper动态修改属性*/
    let $win = $(window).width();
    if ($win > 768) {
        news_swiper.destroy(true, true);
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
        news_swiper.destroy(true, true);
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
