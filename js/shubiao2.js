// var c = document.getElementById("world");
// var canvas = c.getContext("2d");
// var img = new Image();
// img.src = "../images/bg08.jpg";
// img.onload = imgfn; //图片加载完在执行
// function imgfn() {
//     var bg = canvas.createPattern(img, "no-repeat"); //createPattern() 方法在指定的方向内重复指定的元素。
//     canvas.fillStyle = bg; //fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式。
//     canvas.fillRect(0, 0, c.width, c.height); //绘制已填充矩形fillRect(左上角x坐标, 左上角y坐标, 宽, 高)
// }



var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var RADIUS = 70;

var RADIUS_SCALE = 1;
var RADIUS_SCALE_MIN = 1;
var RADIUS_SCALE_MAX = 1.5;

var QUANTITY = 25;

var canvas;
var context;
var particles;

var mouseX = SCREEN_WIDTH * 0.5;
var mouseY = SCREEN_HEIGHT * 0.5;
var mouseIsDown = false;

function init() {

    canvas = document.getElementById('world');

    if (canvas && canvas.getContext) {
        context = canvas.getContext('2d');

        // Register event listeners
        window.addEventListener('mousemove', documentMouseMoveHandler, false);
        window.addEventListener('mousedown', documentMouseDownHandler, false);
        window.addEventListener('mouseup', documentMouseUpHandler, false);
        document.addEventListener('touchstart', documentTouchStartHandler, false);
        document.addEventListener('touchmove', documentTouchMoveHandler, false);
        window.addEventListener('resize', windowResizeHandler, false);

        createParticles();

        windowResizeHandler();

        setInterval(loop, 1000 / 60);
    }
}

function createParticles() {
    particles = [];

    for (var i = 0; i < QUANTITY; i++) {
        var particle = {
            size: 1,
            position: {
                x: mouseX,
                y: mouseY
            },
            offset: {
                x: 0,
                y: 0
            },
            shift: {
                x: mouseX,
                y: mouseY
            },
            speed: 0.01 + Math.random() * 0.04,
            targetSize: 1,
            fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
            orbit: RADIUS * .5 + (RADIUS * .5 * Math.random())
        };

        particles.push(particle);
    }
}

function documentMouseMoveHandler(event) {
    mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5 + 70;
    mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5 - 20;
}

function documentMouseDownHandler(event) {
    mouseIsDown = true;
}

function documentMouseUpHandler(event) {
    mouseIsDown = false;
}

function documentTouchStartHandler(event) {
    if (event.touches.length == 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;;
        mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
    }
}

function documentTouchMoveHandler(event) {
    if (event.touches.length == 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;;
        mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
    }
}

function windowResizeHandler() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;

    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
}

function loop() {

    if (mouseIsDown) {
        RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * (0.02);
    } else {
        RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * (0.02);
    }

    RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);

    context.fillStyle = 'rgba(241,236,225,0.01)';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    for (i = 0, len = particles.length; i < len; i++) {
        var particle = particles[i];

        var lp = {
            x: particle.position.x,
            y: particle.position.y
        };

        // Rotation
        particle.offset.x += particle.speed;
        particle.offset.y += particle.speed;

        // Follow mouse with some lag
        particle.shift.x += (mouseX - particle.shift.x) * (particle.speed);
        particle.shift.y += (mouseY - particle.shift.y) * (particle.speed);

        // Apply position
        particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * (particle.orbit * RADIUS_SCALE);
        particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * (particle.orbit * RADIUS_SCALE);

        // Limit to screen bounds
        particle.position.x = Math.max(Math.min(particle.position.x, SCREEN_WIDTH), 0);
        particle.position.y = Math.max(Math.min(particle.position.y, SCREEN_HEIGHT), 0);

        particle.size += (particle.targetSize - particle.size) * 0.05;

        if (Math.round(particle.size) == Math.round(particle.targetSize)) {
            particle.targetSize = 1 + Math.random() * 7;
        }

        context.beginPath();
        context.fillStyle = particle.fillColor;
        context.strokeStyle = particle.fillColor;
        context.lineWidth = particle.size;
        context.moveTo(lp.x, lp.y);
        context.lineTo(particle.position.x, particle.position.y);
        context.stroke();
        context.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2, true);
        context.fill();
    }
}

window.onload = init;