// JavaScript Document
// jquery.cookie.js
// 检测浏览器语言
var baseLang ="zh";
$(function(){
    var str="zh,en";
    /* get browser default lang */
    if (navigator.userLanguage) {
        baseLang = navigator.userLanguage.substring(0,2).toLowerCase();
    } else {
        baseLang = navigator.language.substring(0,2).toLowerCase();
    }
    var sear=new RegExp(baseLang);
    if(sear.test(str)){
        setCookie("lan",baseLang);
    }else{
        setCookie("lan","zh");    //默认中文
    }
    var tpl ="";
    $("#languageID").html("");
    if(baseLang == 'en'){
        tpl += '<option value="zh">CN</option>';
        tpl += '<option selected="selected" value="en">EN</option>';
    }else{
        tpl += '<option selected="selected" value="zh">CN</option>';
        tpl += '<option value="en">EN</option>';
        $("body").find(".letter_font").removeClass('letter_font');
    }
    $("#languageID").html(tpl);
});

//写入cookie函数
function html2Cookie(){
    var value = $("#languageID").val();
    if(value ==null || value == ''){return;}
    setCookie("lan",value);
    init.load(1);

}
function setCookie(name,value){
    $.cookie(name, null, { path: '/' });
    $.cookie(name,value,{expires:7, path: '/'});
}
//获取cookie
function getCookie(name){
    return $.cookie(name);
}
//移除cookie
function removeCookie(name){
    return $.removeCookie(name,{expires:-1, path: '/'});
}
//
// var zh = {
//     "btn_name" : "国际教育部",
//     "sub_title" : "天赋教育，培养未来创造者",
//     "bottom" : "Copyright ©行知教育 2019-2025. All Rights Reserved. 网站备案号 : 渝ICP备19",
// };
// var en = {
//     "btn_name" : "International Department of Education",
//     "sub_title" : "Talent education, training future creators",
//     "bottom" : "Copyright © Xingzhi Education 2019-2025. All Rights Reserved. Website record number: Chongqing ICP prepared 19",
// };

//
var zh = {
    international: {
        "btn_name": "国际教育部",
        "sub_title": "天赋教育，培养未来创造者",
    },
    professional:{
        "btn_name": "职业教育部",
        "sub_title": "天赋教育，培养未来创造者",
    }

};
var en = {
    international: {
        "btn_name": "International Department of Education",
        "sub_title": "Talent education, training future creators",
    },
    professional: {
        "btn_name": "Vocational education department",
        "sub_title": "Talent education, training future creators",
    }

};
