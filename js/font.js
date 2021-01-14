(function (doc, win) {
    var docEle = doc.documentElement,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalCulate = function () {
        var width = docEle.clientWidth;
        docEle.style.fontSize = 7 * (width / 1080) + 'px';
    };
    recalCulate();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvent, recalCulate, false);
})(document, window);
