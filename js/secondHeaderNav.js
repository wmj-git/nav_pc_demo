// 自动滚动一屏
function scrollBanner() {
    var p = 0,
        t = 0,
        c = 0;
    return function () {
        p = $('html').scrollTop();
        if (t <= p) { //向下滚
            var height = $(window).height();
            if (t < 10 && p < height) {
                if (!c) {
                    c++;
                    $('html').animate({
                        scrollTop: height
                    }, 1000, function () {
                        c = 0;
                    })
                }
            }
            // $(window).outerHeight()

        } else { //向上滚

        }
        setTimeout(function () {
            t = p;
        }, 0);
    }

}

//二级菜单logo的颜色
var pathName = window.location.pathname;
var logoColor = "rgb(2, 88, 191)";
if (pathName.indexOf("primary") !== -1) {
    logoColor = "rgb(63,176,199)";
} else if (pathName.indexOf("middle") !== -1) {
    logoColor = "rgb(65,146,222)";
} else if (pathName.indexOf("kindergarten") !== -1) {
    logoColor = "rgb(101,169,8)";
}

var scrollBannerProto = scrollBanner(),
    //监测导航是否到达顶部
    timer = null,
    binded = false,
    toUp = 0,
    toDown = 0;

$(window).scroll(function () {
    // 中间菜单控制
    if ($(".menu-wrapper").length) {

        var topInstance = $(".menu-wrapper").offset().top;
        var topInstanceMobile = $(".mobile-menu-wrapper").offset().top;

        var scrollInstance = $(document).scrollTop();
        var top = topInstance - scrollInstance;
        // var mobileTop = topInstance - scrollInstance;
        var mobileTop = topInstanceMobile - scrollInstance;

        toDown = $('html').scrollTop();
        if ((top <= 0 && $(window).width() > '1024') || (mobileTop <= 0 && $(window).width() <= '1024')) {
            $('.menu-wrapper .menu-list-wrapper .nav-wrapper .first-menu .first-menu-left').css('height', '0');
            $(".menu-wrapper .menu-list-wrapper").slideDown('fast')
            $(".menu-wrapper .menu-list-wrapper").addClass("menu-list-fixed");
            $(".menu-wrapper .menu-wrapper-logo").css({
                'transform': 'translateY(0)',
                '-webkit-transform': 'translateY(0)',
                '-moz-transform': 'translateY(0)',
                'transition': 'transform .25s'
            })
            if (toUp < toDown) { // 向下
                $('.menu-wrapper .menu-list-wrapper .nav-wrapper .first-menu .first-menu-left').css('height', '0');
                setTimeout(function () {
                    $(".menu-wrapper .menu-wrapper-logo").css({
                        'transform': 'translateY(0)',
                        '-webkit-transform': 'translateY(0)',
                        '-moz-transform': 'translateY(0)',
                        'transition': 'transform .25s'
                    })

                    $(".menu-wrapper  .logo-a .icon-logo").css({
                        color: logoColor,
                        'transition': 'color .6s'
                    })
                }, 200);
            } else { // 向上
                $('.menu-wrapper .menu-list-wrapper .nav-wrapper .first-menu .first-menu-left').css('height', '64px');

                $(".menu-wrapper .menu-wrapper-logo").css({
                    'transform': 'translateY(-56px)',
                    '-webkit-transform': 'translateY(-56px)',
                    '-moz-transform': 'translateY(-56px)',
                    'transition': 'transform .25s'
                })
                $(".menu-wrapper  .icon-logo").css({
                    color: "#fff",
                    'transition': 'color .6s'
                })
            }
            setTimeout(function () {
                toUp = toDown;
            }, 0);
        } else {
            $(".menu-wrapper .menu-list-wrapper").fadeOut('fast');
            $(".menu-wrapper .menu-list-wrapper").removeClass("menu-list-fixed");
        }
    }

    // 二级导航滚动锚点高亮
    scrollNav(scrollInstance)


});

// 二级导航滚动锚点高亮
function scrollNav(scrollInstance) {
    var container = $('.allModules').children();
    var menuNav = $('.menu-wrapper .nav-detail-wrapper .second-menu-left>li');
    container.each(function () {
        var _this = $(this);
        menuNav.each(function () {
            var navThis = $(this);
            if (_this.offset().top < scrollInstance + 60 && _this.attr('data-component') == navThis.attr('id')) {
                navThis.find('a').css('color', logoColor);
                navThis.siblings().find('a').css('color', '#999');
            }
        });
    });
}


//二级菜单锚点跳转
function hashFun(ele) {
    var domEle = '[data-component="' + ele + '"]';
    var page = document.querySelector(domEle);
    page && page.scrollIntoView({
        behavior: "smooth"
    });
}

function chromePage() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf("Firefox") > -1) {
        window.location.href = '/prompt'
    }

}


$(function () {
    var pathName = window.location.pathname;
    var liList = $(".first-menu-left li");
    for (var i = 0; i < liList.length; i++) {
        if ($(liList[i]).attr("data-url") == pathName) {
            $(liList[i]).addClass("active");
            $(liList[i]).siblings().removeClass("active");
        }
    }

    // 鼠标hover变主题色
    $(".navMenu .header-menu li").on('mouseover', function () {

        var attr = $(this).find('a').attr('key');

        // hoverColor = '#0258bf'
        // if (attr == '/kindergarten') {
        //     hoverColor = '#6cc542'
        // }else if (attr == '/primary') {
        //     hoverColor = '#00cbf4'
        // }else if (attr == '/middle') {
        //     hoverColor = '#3b97ec'
        // }else if (attr == '/senior') {
        //     hoverColor = '#2458ec'
        // }else{
        //     hoverColor = '#0258bf'
        // }

        $(this).find('a').css('color', '#fff');
        if (attr == pathName) {
            $(this).find('a').css({'color': '#fff'});
        }
    });
    $(".navMenu .header-menu li").on('mouseout', function () {
        var attr = $(this).find('a').attr('key')
        $(this).find('a').css('color', 'rgba(255,255,255,0.7)')
        if (attr == pathName) {
            $(this).find('a').css({'color': '#fff'});
        }
    });

    // 中间菜单 二级导航 hover
    $('.menu-list-wrapper .second-menu-left li').on('mouseover', function () {
        if ($(this).find('a').css('color') !== logoColor) {
            $(this).find('a').css('color', '#666');
        }
    });
    $('.menu-list-wrapper .second-menu-left li').on('mouseout', function () {
        if ($(this).find('a').css('color') !== logoColor) {
            $(this).find('a').css('color', '#999');
        }
    });



    //根据不同的学段显示不同的二级菜单颜色
    if (pathName.indexOf("primary") != -1) {//小学
        $('body').removeClass('').addClass('primaryCommon')
        $(".navMenu .navHeader .navLogo .icon-logo").html("&#xe653;");
    } else if (pathName.indexOf("middle") != -1) {//中学
        $('body').removeClass('').addClass('middleCommon')
        $(".navMenu .navHeader .navLogo .icon-logo").html("&#xe653;");
    } else if (pathName.indexOf("kindergarten") != -1) {//幼儿园
        $('body').removeClass('').addClass('kindGarten')
        $(".navMenu .navHeader .navLogo .icon-logo").html("&#xe637;");
        $(".menu-wrapper .menu-wrapper-logo .icon-logo").html("&#xe637;");
        $('#mobile-news-menu .logo i').html('&#xe637;')
        $('#second-mobile-news-menu .logo i').html('&#xe637;')

        // 幼儿园页面字号调整
        // $('.navMenu .header-menu > li > a , .first-menu .first-menu-left>li>a , .menu-list-wrapper .second-menu-left>li>a').css('font-size', '18px')
        // $('.navMenu .menu-list > li').css('margin-left', '0')
        // $('#mobile-news-menu .userMsg .userImg').css('margin-top', '-8px')

    } else if (pathName.indexOf("senior") != -1) {
        $('body').removeClass('').addClass('seniorCommon')
    } else {
        //默认
        $('body').removeClass('').addClass('commonColor')
        $(".navMenu .navHeader .navLogo .icon-logo").html("&#xe653;");
        $(".menu-wrapper .menu-list-transform .logo-a .icon-logo").css({
            color: '#0258bf'
        });
    }
});
