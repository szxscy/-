
//实现保存图片功能
var middle02 = document.querySelector('.middle02');
var route = window.globalConfig.api;

function downloadImage(imgsrc, name) {
    const image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        const event = new MouseEvent('click');
        a.download = name || 'photo';
        a.href = url;
        a.dispatchEvent(event);
    };
    image.src = imgsrc;
}

// 绑定点击事件
var btn02 = document.querySelector('.btn02');
btn02.onclick = function () {
    mgsrc = route + 'static/tmp1.png';
    name = 'enjoy';
    downloadImage(mgsrc, name);
}


//实现左侧文案根据反馈回来的表情识别而变化
function getUrlParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//调用方法。。。。
var bq = getUrlParams("biaoqing");
var happy=document.querySelector('.happy');
var angry=document.querySelector('.angry');
var upset=document.querySelector('.upset');
var shocked=document.querySelector('.shocked');
console.log(bq);
if (bq == 0) {
    console.log(0);
    alert('你有点高兴');
    happy.style.display='block';
    angry.style.display='none';
    upset.style.display='none';
    shocked.style.display='none';
} else if (bq == 1) {
    console.log(1);
    alert('你有点生气');
    happy.style.display='none';
    angry.style.display='block';
    upset.style.display='none';
    shocked.style.display='none';
} else if (bq == 2) {
    console.log(2);
    alert('你有点难过');
    happy.style.display='none';
    angry.style.display='none';
    upset.style.display='block';
    shocked.style.display='none';
} else if (bq == 3) {
    console.log(3);
    alert('你有点惊恐');
    happy.style.display='none';
    angry.style.display='none';
    upset.style.display='none';
    shocked.style.display='block';
}else{
    alert('识别失败,请重新拍一张');
}

