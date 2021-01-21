function askQQfn() {
    let qq_list = new Array('649877013', '1739130102');
    let qq_i = Math.floor(Math.random()*qq_list.length);
    let src = "tencent://message/?uin="+qq_list[qq_i]+"&Site=&menu=yes";
    $('.qq_iframe').attr('src', src);
}
