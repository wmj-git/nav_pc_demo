// JavaScript Document
var init = {
    load: function() {
        $('[set-lan]').each(function(){
            let me = $(this);
            let a = me.attr('set-lan').split(':');
            let p = a[0];   //文字放置位置
            // let m = a[1];   //文字的标识
            var _obj = a[1].split('.');   //文字的标识
            var n = _obj[0];
            var m = _obj[1];
            //用户选择语言后保存在cookie中，这里读取cookie中的语言版本
            let lan = getCookie('lan');
            //选取语言文字
            switch(lan){
                case 'cn':
                    var t = zh[n][m];  //这里cn[m]中的cn是上面定义的json字符串的变量名，m是json中的键，用此方式读取到json中的值
                    break;
                case 'en':
                    var t = en[n][m];
                    break;
                default:
                    var t = zh[n][m];
            }
            //如果所选语言的json中没有此内容就选取其他语言显示
            if(t==undefined) t = zh[n][m];
            if(t==undefined) t = en[n][m];
            if(t==undefined) return true;   //如果还是没有就跳出

            //文字放置位置有（html,val等，可以自己添加）
            switch(p){
                case 'html':
                    me.html(t);
                    break;
                case 'value':
                    me.val(t);
                    break;
                default:
                    me.html(t);
            }

        });
    }
}
init.load(1);
