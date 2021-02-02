// 移动端头部一级菜单显示隐藏
$(function () {
    var mo = function (e) {
        e.preventDefault()
    };
    $('#mobile-news-menu .list').on('click', function () {
        console.log('点击list');
        $('#mobile-news-menu .sliderMenu').css({
            'left': '0',
        });
        $('#mobile-news-menu .opacity').css('display', 'block');
        document.body.style.overflow = 'hidden';
        document.addEventListener("touchmove", mo, false); //禁止页面滑动
    });
    $('#mobile-news-menu .opacity').on('click', function () {
        $('#mobile-news-menu .sliderMenu').css('left', '-75%')
        $('#mobile-news-menu .opacity').css('display', 'none')
        document.body.style.overflow = ''; //出现滚动条
        document.removeEventListener("touchmove", mo, false);
    });

    // 移动端中间一级菜单显示隐藏
    $('#second-mobile-news-menu .list').on('click', function () {
        $('#second-mobile-news-menu .sliderMenu').css({
            'left': '0',
        });
        $('#second-mobile-news-menu .opacity').css('display', 'block');
        document.body.style.overflow = 'hidden';
        document.addEventListener("touchmove", mo, false); //禁止页面滑动
    });
    $('#second-mobile-news-menu .opacity').on('click', function () {
        $('#second-mobile-news-menu .sliderMenu').css('left', '-75%');
        $('#second-mobile-news-menu .opacity').css('display', 'none');
        document.body.style.overflow = ''; //出现滚动条
        document.removeEventListener("touchmove", mo, false);
    });

    // 移动端二级导航锚点跳转显示隐藏
    $('.mobile-menu-wrapper .nav-detail-wrapper .second-menu-mobile').on('click', function (event) {
        event.stopPropagation();
        // $('.mobile-menu-wrapper .nav-detail-wrapper .secondSlideMenu').show()
        var display = $('.mobile-menu-wrapper .nav-detail-wrapper .secondSlideMenu').css('display');
        if (display == 'none') {
            display = 'block';
        } else {
            display = 'none';
        }
        $('.mobile-menu-wrapper .nav-detail-wrapper .secondSlideMenu').css('display', display);

    });

    $(document).click(function () {
        $(".mobile-menu-wrapper .nav-detail-wrapper .secondSlideMenu").hide();
    });

    //  当前菜单页面变蓝色
    $('.mobile-news-menu .sliderMenu .menuType').on('click', function () {
        $(this).find('.aLink').css('color', '#0258bf');
        $(this).siblings('li').find('.aLink').css('color', '#999');
    });

    let menuType = $('.mobile-news-menu .sliderMenu .menuType a');
    let navList = $(".header-menu.menu-list li a");
    navList.each(function () {
        let _winHref = String(window.location); // 监听url变化
        if ($(this)[0].href == _winHref) { //$(this[0].href):当前url
            $(this).addClass("active").parent('li').siblings().find('a').removeClass("active");
            $(this).closest('ul').parent("li").addClass("active").siblings().removeClass("active");
        }
    });
    menuType.each(function () {
        /*if ($(this).find('.aLink').attr('key') == window.location.pathname) {
            $(this).find('.aLink').css('color', '#0258bf');
        }*/

        let _winHref = String(window.location); // 监听url变化
        if ($(this)[0].href == _winHref) { //$(this[0].href):当前url
            $(this).addClass("active").parent('li').siblings().find('a').removeClass("active");
            $(this).closest('ul').parent("li").addClass("active").siblings().removeClass("active");
        }
    });
    navHighLight($("ul li a"));
    // navHighLight($(".mobile-news-menu .sliderMenu .menuType a"));
    // navHighLight($(".header-menu.menu-list li a"));

});
