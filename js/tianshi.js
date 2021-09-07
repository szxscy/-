var tianshi =document.querySelector('.tianshi')
document.addEventListener('mousemove',function(e){
    // console.log(1);

    var x =e.pageX;
    var y =e.pageY;
    // console.log(x);
    // console.log(y);
    tianshi.style.left=x+5+'px';
    tianshi.style.top=y-70+'px';
})
document.addEventListener('selectstart',function(e){
    e.preventDefault();
})