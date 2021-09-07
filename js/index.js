(function () {
    var route=window.globalConfig.api;
    var zuzi = document.getElementById('zuzi');
    var enter = document.getElementById('enter');
    var ceb1 = document.getElementById('ceb1');
    var ceb2 = document.getElementById('ceb2');
    var cchara4 = document.getElementById('cchara4');
    var but2 = document.getElementById('but2');
    var nh = document.getElementById('nh');
    var yh = document.getElementById('yh');
    enter.onclick = function () {
        // yh.style.display='block';
        zuzi.style.display = 'none';
        ceb1.style.display = 'block';
        nh.style.overflow = 'hidden';
        yh.style.height = "51px";
    }
    //页面加载时，生成随机验证码
    window.onload = function () {
        createCode(4);
    }
    // validateCode()
    //生成验证码的方法
    function createCode(length) {
        var code = "";
        var codeLength = parseInt(length); //验证码的长度
        var checkCode = document.getElementById("checkCode");
        ////所有候选组成验证码的字符，当然也可以用中文的
        var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        //循环组成验证码的字符串
        for (var i = 0; i < codeLength; i++) {
            //获取随机验证码下标
            var charNum = Math.floor(Math.random() * 62);
            //组合成指定字符验证码
            code += codeChars[charNum];
        }
        if (checkCode) {
            //为验证码区域添加样式名
            checkCode.className = "code";
            //将生成验证码赋值到显示区
            checkCode.innerHTML = code;
        }
    }
    but2.addEventListener('click', function () {
        var username = document.querySelector(".user2").value;
        var mima1 = document.querySelector(".pass2").value;
        var mima2 = document.querySelector(".qpass2").value;
        var password = mima1;
        console.log(mima1.length);
        if (validateCode() == 1) {
            console.log(1);
        } else {
            return 1;
        }
        if (mima1 === mima2) {
            if (mima1 === '' || mima2 === '' || username === '') {
                alert('账号或密码为空，请输入完成后再点击注册')
            } else if (username.length < 3 || username.length > 9) {
                alert('用户名不得小于3位或大于9位');
            } else if (mima1.length < 6 || mima1.length > 18) {
                alert("密码不得小于6位或大于18位");
            } else {
                alert("注册成功");
                path = route + "user/reg?username=" + username + "&password=" + password;
                var xhr = new XMLHttpRequest();
                xhr.open("get", path)

                xhr.onreadystatechange = function () {
                    //
                    if (xhr.readyState == 4) {
                        // 这个是转化为字符串的形式
                        // let data=JSON.parse(xhr.responseText);
                        // console.log('22')
                        console.log(xhr.responseText)
                    }
                }
                xhr.send()
                ceb2.style.display = 'none';
                ceb1.style.display = 'block';
            }
        } else {
            alert("注册失败，两次输入的密码不相同！");
        }
        //检查验证码是否正确
        function validateCode() {
            //获取显示区生成的验证码
            var checkCode = document.getElementById("checkCode").innerHTML;
            //获取输入的验证码
            var inputCode = document.getElementById("inputCode").value;
            console.log(checkCode);
            console.log(inputCode);
            if (inputCode.length <= 0) {
                alert("请输入验证码！");
            } else if (inputCode.toUpperCase() != checkCode.toUpperCase()) {
                alert("验证码输入有误！");
                createCode(4);
            } else {
                // alert("验证码正确！");
                return 1;
            }
        }
    })
    cchara4.onclick = function () {
        ceb1.style.display = 'none';
        ceb2.style.display = 'block';
    }
    //登录
    var denglu = document.getElementById("denglu");
    denglu.addEventListener('click', function () {
        // 获取输入框值
        var username = document.getElementById("user").value;
        var password = document.getElementById("pass").value;
        path = route + "user/login?username=" + username + "&password=" + password;
        var xhr = new XMLHttpRequest();
        xhr.open("get", path)

        xhr.onreadystatechange = function () {
            //
            if (xhr.readyState == 4) {
                // 这个是转化为字符串的形式
                // let data=JSON.parse(xhr.responseText);
                // console.log('22')
                console.log(xhr.responseText)
                // var str=xhr.responseText;
                // var num = parseInt(str);
                // console.log(str[8]);
                console.log(xhr.responseText[8]);
                if (xhr.responseText[8] == 0) {
                    alert('登录成功');
                    location.href = '../html/guanggao.html';
                } else {
                    alert('登录失败')
                    console.log(route);
                    console.log(window.route);

                }
            }

        }
        xhr.send();
    });
})();