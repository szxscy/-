// var route='http://10.20.252.169:5000/';
var route=window.globalConfig.api;
//访问用户媒体设备的兼容方法
function getUserMedia(constraints, success, error) {
  if (navigator.mediaDevices.getUserMedia) {
    //最新的标准API
    navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
  } else if (navigator.webkitGetUserMedia) {
    //webkit核心浏览器
    navigator.webkitGetUserMedia(constraints, success, error)
  } else if (navigator.mozGetUserMedia) {
    //firfox浏览器
    navigator.mozGetUserMedia(constraints, success, error);
  } else if (navigator.getUserMedia) {
    //旧版API
    navigator.getUserMedia(constraints, success, error);
  }
}
let xiangji = document.getElementById('canvas');
var video = document.getElementById("video");
var context = xiangji.getContext("2d");
var errocb = function () {
  console.log("sth srong");
}

function success(stream) {
  //兼容webkit核心浏览器
  let CompatibleURL = window.URL || window.webkitURL;
  //将视频流设置为video元素的源
  console.log(stream);

  //video.src = CompatibleURL.createObjectURL(stream);
  video.srcObject = stream;
  video.play();
}

function error(error) {
  console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
}

if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
  //调用用户媒体设备, 访问摄像头
  getUserMedia({
    video: {
      width: 500,
      height: 600
    }
  }, success, error);
} else {
  alert('不支持访问用户媒体');
}

document.getElementById('capture').addEventListener('click', function () {
  context.drawImage(video, 0, 0, 500, 600);
  xiangji.style.zIndex=110;
})


//图片传输
var capture = document.getElementById('capture');

$(document).ready(function () {
  $("#capture").click(function () {

    // xiangji ===》二进制string
    base64Data = xiangji.toDataURL('image/jpg');

    // 二进制stringbase64 转 blob
    const base64ToBlob = function (base64Data) {

      let arr = base64Data.split(','),
        fileType = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        l = bstr.length,
        u8Arr = new Uint8Array(l);

      while (l--) {
        u8Arr[l] = bstr.charCodeAt(l);
      }
      return new Blob([u8Arr], {
        type: fileType
      });

    };
    // 调用
    const blob = base64ToBlob(base64Data);
    // 构造文件
    const file = new File([blob], 'tmp.jpg', {
      type: 'image/jpg'
    })
    var formData = new FormData()
    formData.append("img", file);

    console.log('----------------------------------------------------------')
    console.log(formData.get('img'))

    $.ajax({
      url: route+"user/upload",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (data) {
        console.log(data);
        var biaoqing = data.label;
        console.log(biaoqing);
        window.globalConfig = {
          // biaoqing:data.label
          biaoqing:'2'
          
        }
        window.setTimeout(function(){
          location.href="../html/function_left02.html"+"?biaoqing="+data.label
        },1000);
      }
    })
  });
});

