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
    timer = requestAnimationFrame(function fn(){
        let oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(oTop > 0){
            scrollBy(0,-200);
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }
    });
}
