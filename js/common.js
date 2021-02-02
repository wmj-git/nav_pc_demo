/*页面刷新导航高亮不变*/
function navHighLight(obj) {
    obj.each(function () {
        let _winHref = String(window.location);
        if ($(this)[0].href == _winHref) {
            $(this).addClass("active").parent('li').siblings().find('a').removeClass("active");
            $(this).closest('ul').parent("li").addClass("active").siblings().removeClass("active");
        }
    });
}

function toTop() {
    let timer = null;
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn() {
        let oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
            scrollBy(0, -100);
            timer = requestAnimationFrame(fn);
            closeFloat();
        } else {
            cancelAnimationFrame(timer);
        }
    });
}

function askQQfn() {
    let qq_list = new Array('649877013', '1739130102');
    let qq_i = Math.floor(Math.random() * qq_list.length);
    let src = "tencent://message/?uin=" + qq_list[qq_i] + "&Site=&menu=yes";
    $('.qq_iframe').attr('src', src);
    closeFloat();
}

function closeFloat() {
    let _obj = $(".float_shortcuts .plug-menu").find("span");
    _obj.removeClass('open');
    _obj.addClass('close');
    $(".plug-btn").removeClass("open");
    $(".plug-btn").addClass("close");
}

function float_Mobile() {
    let span = $(".float_shortcuts .plug-menu").find("span");
    if (span.attr("class") == "open") {
        span.removeClass("open");
        span.addClass("close");
        $(".plug-btn").removeClass("open");
        $(".plug-btn").addClass("close");
    } else {
        span.removeClass("close");
        span.addClass("open");
        $(".plug-btn").removeClass("close");
        $(".plug-btn").addClass("open");
    }
    $(".float_shortcuts .plug-menu").on('touchmove', function (event) {
        event.preventDefault();
    });
}
