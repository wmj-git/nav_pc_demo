function internationalFn() {
    window.location.href = "international_index.html"
}
function professionalFn() {
    window.location.href = "professional_index.html"
}
function figure_bottom_Val() {
    let _height = $(".start_center").innerHeight();
    let _obj_bottom = parseInt($(".start_center").css('bottom').split('px')[0]);
    let _bottom = (_height + _obj_bottom) + 'px';
    return _bottom;
}

function mouse_enter_Fn() {
    $(".figure.left").css('opacity', 1);
    let _bototm = figure_bottom_Val();
    $(".figure_box").css('bottom', _bototm);
}

function mouse_leave_Fn() {
    $(".figure.left").css('opacity', 0);
}

function mouse_enter_right_Fn() {
    $(".figure.right").css('opacity', 1);
    let _bototm = figure_bottom_Val();
    $(".figure_box").css('bottom', _bototm);
}

function mouse_leave_right_Fn() {
    $(".figure.right").css('opacity', 0);
}


