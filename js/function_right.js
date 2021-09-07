// 上传图片js 
{/* <script> */}
    //上传图片js 头部
    var tupian = document.getElementById('cropedBigImg');
    console.log(tupian.src);
    console.log(window.location.href);
    $('#chooseImage').on('change', function () {
        var filePath = $(this).val(), //获取到input的value，里面是文件的路径

            fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),

            src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
        // 检查是否是图片

        if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
            error_prompt_alert('上传错误,文件格式必须为：png/jpg/jpeg');

            return;
        }
        $('#cropedBigImg').attr('src', src);
        var tupian = document.getElementById('cropedBigImg');
        var anniu = document.getElementById('chooseImage');
        var yemian_01 = document.querySelector('.quan');
        var yemian_02 = document.querySelector('.zheng');
        console.log(tupian.src);
        console.log(window.location.href);
        console.log(tupian.alt);
        setTimeout(function () {
            if (tupian.src == window.location.href) {

                yemian_01.style.display = 'block';
                yemian_02.style.display = 'none';
                console.log(2);

            } else {
                yemian_01.style.display = 'none';
                yemian_02.style.display = 'block';
                console.log(1);
                alert('使用说明：点击左下角的按钮可以放出贴图，\n贴图可以按自己的喜欢进行移动，可按w键放大，按s键缩小，\n当缩小到一定程度时，图像翻转')

            }
            console.log(tupian.src);
            console.log(window.location.href);
        }, 2000)
    });
//上传图片js尾部



// </script>
// <!-- 贴图js -->
{/* <script> */}

    window.addEventListener('load', function () {

        //贴纸移动功能
        var tiezhi = document.querySelector('.tiezhi');
        var lis = tiezhi.querySelectorAll('li');

        for (var i = 0; i <= 32; i++) {
            lis[i].style.display = 'none';
        }
        for (var i = 0; i <= 32; i++) {

            var j = lis[i];

            (
                function (j) {
                    // 开始拖拽
                    // (1) 当我们鼠标按下， 就获得鼠标在盒子内的坐标
                    j.addEventListener('mousedown', function (e) {
                        var x = e.pageX - j.offsetLeft;
                        var y = e.pageY - j.offsetTop;
                        // (2) 鼠标移动的时候，把鼠标在页面中的坐标，减去 鼠标在盒子内的坐标就是模态框的left和top值
                        j.addEventListener('mousemove', move)

                        function move(e) {
                            j.style.left = e.pageX - x + 'px';
                            j.style.top = e.pageY - y + 'px';
                                    // 贴纸放大缩小功能 头部
                            let sa=1;
                            function keyDown(e) {
                                var keycode = e.which;

                                // j.addEventListener('mouseup', lock1());
                                if(keycode==87){
                                    // alert('变大');
                                    sa=sa+0.1;
                                    console.log(j);
                                    j.style.transform = "scale("+ sa +")";
                                    // return 1;
                                }
                                else if(keycode==83){
                                    // alert('变小');
                                    sa=sa-0.1;
                                    j.style.transform = "scale("+ sa +")";
                                    // return 2;
                                }
                            }
                            document.onkeydown = keyDown;
                        }
                        //贴纸放大缩小功能尾部
                        // (3) 鼠标弹起，就让鼠标移动事件移除
                        j.addEventListener('mouseup', function () {
                            j.removeEventListener('mousemove', move);
                        })
                    })
                }
            )(j)
        }

    })

    var tietu_anniu = document.querySelector('.tietu_anniu');
    var tiezhilis = tietu_anniu.querySelectorAll('li');
    for (var i = 0; i <= 32; i++) {
        var b = tiezhilis[i];

        (function (b) {
            var tiezhi = document.querySelector('.tiezhi');
            var lis = tiezhi.querySelectorAll('li');
            var j = lis[i];

            b.addEventListener('click', function () {
                if (b.style.backgroundColor === 'bisque') {
                    b.style.backgroundColor = '#c7c7c7';
                    b.style.borderRadius = '50%';
                    j.style.display = 'none';
                } else {
                    b.style.backgroundColor = 'bisque';
                    b.style.borderRadius = '10%';
                    j.style.top = '0';
                    j.style.left = '0';
                    j.style.display = 'block';
                }

            })
        })(b)
    }
// </script>


{/* <script> */}
    var right02 = document.querySelector('.right02');
    var btn02 = right02.querySelector('.btn02');

    btn02.addEventListener('click', function () {
        location.href = "../html/function_Home.html";
    })
// </script>