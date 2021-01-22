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
    document.documentElement.scrollTop = document.body.scrollTop = 0;
}
