// "use strict";

let SVG_NS = "http://www.w3.org/2000/svg";
let MAX_FLOWER_AGE = 50;
let MAX_GROWTH_TICKS = 15;
// let BRANCH_COLOR = "rgb(101, 67, 33)";
let BRANCH_COLOR = "rgb(35, 134, 47)";


// from http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeRGBColor(color, percent) {
    let f = color.split(","),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = parseInt(f[0].slice(4)),
        G = parseInt(f[1]),
        B = parseInt(f[2]);
    return "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
}

let maxDepth = 10,
    trunkWidth = 14;
let branchShrinkage = 0.85;
let maxAngleDelta = Math.PI / 2;
let delay = 100;
let svg = document.getElementById("svg");

let scaleIncrement = 0.1;
let flowerSize = 10.0;
let dropIncrement = 2.0;
let rotateIncrement = Math.PI * 2;

let wind = 0;
let windIncrement = 1;
let maxWind = 3.0;

let createFlower = function createFlower(_ref) {
    let x = _ref.x;
    let y = _ref.y;
    let idx = _ref.idx;

    let telomeres = MAX_FLOWER_AGE;
    let growthPhase = 0;
    let attached = true;
    let hangPhase = 1;
    let scale = 0.5;
    // let scale = 2;
    let rotation = 0;
    let element = document.createElementNS(SVG_NS, "use");
    element.setAttribute("href", "#flower");
    element.setAttribute("style", "z-index: -1");

    let flower = {
        idx: idx,

        grow: function grow() {
            growthPhase += 1;
            scale += scaleIncrement * Math.random();
        },
        drop: function drop() {
            y += dropIncrement * Math.random();
            x += dropIncrement * (Math.random() - 0.5) + wind;
            rotation += rotateIncrement * (Math.random() - 0.5);
        },
        transform: function transform() {
            let radius = scale * flowerSize / 2;
            element.setAttribute("transform", "translate(" + (x - radius) + "," + (y - radius) + ") scale(" + scale + ") rotate(" + rotation + ")");
        },
        step: function step() {
            if (y >= window.innerHeight - 2 * flowerSize) {
                telomeres -= 1;
            } else if (growthPhase >= MAX_GROWTH_TICKS) {
                if (attached) {
                    attached = Math.random() < Math.pow(0.9999, hangPhase);
                    hangPhase += 0.00001;
                } else {
                    this.drop();
                }
            } else {
                this.grow();
            }

            this.transform();

            return telomeres;
        },
        delete: function _delete() {
            svg.removeChild(element);
        }
    };

    flower.transform();

    // pick a random branch so it looks like the flowers are falling through them
    let childNodes = svg.childNodes;

    let randomBranch = childNodes[Math.floor(Math.random() * childNodes.length)];
    svg.insertBefore(element, randomBranch);

    return flower;
};

let animateFlowers = function animateFlowers(branchEndings) {
    let branchesInUse = {};
    let flowers = [];

    let findFreeBranchIdx = function findFreeBranchIdx() {
        for (let i = 0; i < branchEndings.length; i++) {
            let idx = Math.floor(Math.random() * branchEndings.length);
            if (!branchesInUse[idx]) {
                branchesInUse[idx] = true;
                return idx;
            }
        }

        return -1;
    };

    let attachFlower = function attachFlower() {
        let idx = findFreeBranchIdx();
        if (idx >= 0) {
            let branch = branchEndings[idx];
            flowers.push(createFlower(Object.assign({}, branch, {
                idx: idx
            })));
        }
    };

    let tick = function tick() {
        flowers = flowers.reduce(function (acc, flower) {
            if (flower.step() > 0) {
                return acc.concat([flower]);
            } else {
                console.log("deleting flower", flower.idx);
                flower.delete();
                delete branchesInUse[flower.idx];
                return acc;
            }
        }, []);

        Array(5).fill().forEach(function () {
            if (Math.random() < 0.2) {
                attachFlower();
            }
        });

        if (Math.random() < 0.2) {
            wind = Math.min(maxWind, wind + (Math.random() * 2 - 1) * windIncrement);
            wind = Math.max(-maxWind, wind);
        }

        requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
};

let wrap = function wrap(a) {
    return Array.isArray(a) ? a : [a];
};
let flatten = function flatten(a) {
    if (!Array.isArray(a)) {
        return a;
    }

    let left = a[0];
    let right = a[1];

    // return wrap(left).concat(wrap(right));
    return wrap(left).push(wrap(right));
};

let drawBranch = function drawBranch(x1, y1, length, angle, depth, branchWidth, branchColor) {
    let x2 = x1 + length * Math.cos(angle);
    let y2 = y1 + length * Math.sin(angle);

    let line = document.createElementNS(SVG_NS, "line");
    let style = "stroke:" + branchColor + ";stroke-width:" + branchWidth + ";z-index:1;";

    line.setAttribute("x1", x1);
    line.setAttribute("x2", x2);
    line.setAttribute("y1", y1);
    line.setAttribute("y2", y2);
    line.setAttribute("style", style);

    svg.appendChild(line);

    let newDepth = depth - 1;
    if (newDepth <= 0) {
        return Promise.resolve({
            x: x2,
            y: y2
        });
    }

    let newBranchWidth = branchWidth * branchShrinkage;
    let newBranchColor = shadeRGBColor(branchColor, 0.1);

    return Promise.map([-1, 1], function (direction) {
        let newAngle = angle + maxAngleDelta * (Math.random() * 0.5 * direction);
        let newLength = length * (branchShrinkage + Math.random() * (1.0 - branchShrinkage));

        return new Promise(function (resolve) {
            setTimeout(function () {
                return resolve(drawBranch(x2, y2, newLength, newAngle, newDepth, newBranchWidth, newBranchColor));
            }, delay);
        });
    }).then(flatten);
};

// returns a promise that resolves to an array of the positions of the branches
let drawTree = function drawTree(maxDepth, trunkWidth) {
    return drawBranch(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 1.02), 60, -Math.PI / 2, maxDepth, trunkWidth, BRANCH_COLOR);
};

let test = null;
let initer = function () {
    svg.setAttribute("width", (window.innerWidth) / 15);
    svg.setAttribute("height", (window.innerHeight) / 15);
    test = drawTree(maxDepth, trunkWidth).then(animateFlowers);
};
function mouse_enter_right_Fn() {
    let _bototm = figure_bottom_Val();
    $(".start_body .start_page").append("<span class='bg_hover'></span>");
    $(".bg_hover").css('opacity', 0);
    $(".bg_hover").stop().animate({opacity: '0.8'},1000);
    $("#svg").css({'opacity': "1", 'left': "26%", "height": "100%", "bottom":_bototm});
    SVG_NS = "http://www.w3.org/2000/svg";
    document.getElementById("svg").innerHTML = "";
    initer();
}
function mouse_leave_right_Fn() {
    $("#svg").css({'opacity': "0", "height": "0"});
    $(".bg_hover").stop().animate({opacity: '0'},1000);
    $(".bg_hover").remove();
    setTimeout(function () {
        SVG_NS = "";
        document.getElementById("svg").innerHTML = "";
    }, 400);
}

function mouse_enter_Fn() {
    let _bototm = figure_bottom_Val();
    $(".start_body .start_page").append("<span class='bg_hover'></span>");
    $(".bg_hover").css('opacity', 0);
    $(".bg_hover").stop().animate({opacity: '0.8'},1000);
    $("#svg").css({'opacity': "1", 'left': "-26%", "height": "100%", "bottom":_bototm});
    SVG_NS = "http://www.w3.org/2000/svg";
    document.getElementById("svg").innerHTML = "";
    initer();
}

function mouse_leave_Fn() {
    $(".bg_hover").stop().animate({opacity: '0'},1000);
    $(".bg_hover").remove();
    $("#svg").css({'opacity': "0", "height": "0"});
    setTimeout(function () {
        SVG_NS = "";
        document.getElementById("svg").innerHTML = "";
    }, 1600);
}

