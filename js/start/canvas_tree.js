let _depth = 10;
let drawtree;
drawtree = function (ctx, startx, starty, length, angle, depth, branchWidth) {
    let rand = Math.random,
        n_length, n_angle, n_depth, maxbranch = 3,
        endx, endy, maxangle = 2 * Math.PI / 4;
    let subbranch;
    ctx.beginPath();
    ctx.moveTo(startx, starty);
    endx = startx + length * Math.cos(angle);
    endy = starty + length * Math.sin(angle);
    ctx.lineCap = 'round';
    ctx.lineWidth = branchWidth;
    ctx.lineTo(endx, endy);
    if (depth <= 2) {
        //树的枝干
        // ctx.strokeStyle = 'rgb(0,' + (((rand() * 64) + 128) >> 0) + ',0)';
        ctx.strokeStyle = 'rgb(255,255,255)';

    }
    else {
        //树的叶子
        // ctx.strokeStyle = 'rgb(0,' + (((rand() * 64) + 64) >> 0) + ',50,25)';
        ctx.strokeStyle = 'rgb(189,189,189)';
    }
    ctx.stroke();
    n_depth = depth - 1;
    //判断树是否结束
    if (!n_depth) {
        return;
    }
    subbranch = (rand() * (maxbranch - 1)) + 1;
    branchWidth *= 0.7;
    for (var i = 0; i < subbranch; i++) {
        if (_depth - 1 < depth) {
            n_angle = angle
        } else {
            n_angle = angle + rand() * maxangle - maxangle * 0.5;
        }
        n_length = length * (0.7 + rand() * 0.3);
        setTimeout(function () {
            drawtree(ctx, endx, endy, n_length, n_angle, n_depth, branchWidth);
            return;
        }, 10);
    }
};
let button_width = 0;

//初始化的树
function initTree() {
    let $width = $(window).width();
    let $height = $(window).height();
    $("#canvas").attr({'height': $height, 'width': $width});
    $(".center_item").eq(0).find(".center_btn").addClass('center_btn_left');
    $(".center_item").eq(1).find(".center_btn").addClass('center_btn_right');
    button_width = $(".center_btn").innerWidth();
}

initTree();


function delete_tree() {
    let canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.remove();
    }
}

function mouse_leave_Fn() {
    setTimeout(function () {
        delete_tree();
        $(".bg_hover").stop().animate({opacity: '0'}, 1000);
        $(".bg_hover").remove();
    }, 100);
}


function mouse_enter_Fn() {
    $(".start_body .start_page").append("<span class='bg_hover'></span>");
    $(".bg_hover").css('opacity', 0);
    $(".bg_hover").stop().animate({opacity: '0.9'}, 1000);
    let canvas = document.getElementById('canvas');
    if (!canvas) {
        $(".figure_tree").append("<canvas id='canvas'></canvas>");
        canvas = document.getElementById('canvas');
        initTree();
    }
    let ctx = canvas.getContext('2d');

    let _obj_top = $('.center_btn_left').offset().top;
    let _obj_left = $('.center_btn_left').offset().left;
    let _left_startx = _obj_left + button_width / 2;
    let _left_starty = _obj_top;

    drawtree(ctx, _left_startx, _left_starty, 120, -Math.PI / 2, _depth, 15);
}


function mouse_leave_right_Fn() {
    setTimeout(function () {
        delete_tree();
        $(".bg_hover").stop().animate({opacity: '0'}, 1000);
        $(".bg_hover").remove();
    }, 30);
}


function mouse_enter_right_Fn() {
    $(".start_body .start_page").append("<span class='bg_hover'></span>");
    $(".bg_hover").css('opacity', 0);
    $(".bg_hover").stop().animate({opacity: '0.9'}, 1000);
    let canvas = document.getElementById('canvas');
    if (!canvas) {
        $(".figure_tree").append("<canvas id='canvas'></canvas>");
        canvas = document.getElementById('canvas');
        initTree();
    }
    let ctx = canvas.getContext('2d');
    let _obj_top = $('.center_btn_right').offset().top;
    let _obj_left = $('.center_btn_right').offset().left;
    let _right_startx = _obj_left + button_width / 2;
    let _right_starty = _obj_top;

    drawtree(ctx, _right_startx, _right_starty, 120, -Math.PI / 2, _depth, 15);
}

