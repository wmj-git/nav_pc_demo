var mySwiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
    },
    autoplay : false
});

/*//鼠标覆盖停止自动切换
mySwiper.el.onmouseover = function(){
    mySwiper.autoplay.stop();
}

//鼠标离开开始自动切换
mySwiper.el.onmouseout = function(){
    mySwiper.autoplay.start();
}*/

marginFn();

function marginFn() {
    let _portrait_title_width = $(".portrait_title").innerWidth();
    $(".portrait_title").css("margin-left", ( - _portrait_title_width / 2) + 'px');
    let portrait_flex_item_width = $(".flex_item").innerWidth();
    $(".flex_item").css({"height":portrait_flex_item_width, 'border-radius': portrait_flex_item_width / 2});
}

window.onresize = function () {
    marginFn();
}
