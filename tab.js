// //设定尺寸
// var sc = window.screen;
// function first() {
//     var canvas = document.getElementById("myCanvas");
//     var width = canvas.width = sc.width;
//     var height = canvas.height = sc.height;
//     var content = canvas.getContext("2d");

//     //定义字符，坐标数组
//     var letters = new Array(256);
//     var xx = new Array(256);
//     var yy = new Array(256);

//     //初始化
//     for (var i = 0; i < 256; i++) {
//         //随机生成字符
//         letters[i] = String.fromCharCode(3e4 + Math.random() * 33);
//         xx[i] = i * 30;
//         yy[i] = 0;
//     }

//     var draw = function () {
//         content.fillStyle = "rgb(0,0,0)";
//         content.fillRect(0, 0, width, height);

//         for (var i = 0; i < 256; i++) {
//             for (var z = 0; z < 20; z++) {
//                 content.fillStyle = "rgba(45,251,9" + "," + (1 - 0.05 * z) + ")";
//                 content.fillText(letters[i], xx[i], yy[i] - z * 10);
//             }

//             if (yy[i] >= height) {
//                 yy[i] = 0 - Math.random() * 500;
//             }
//             else {
//                 yy[i] += 10;
//             }
//         }
//     };
//     setInterval(draw, 20);


//     //键盘监听
//     function keyDown(e) {
//         //浏览器兼容
//         e = e || window.event;

//         var keycode = e.which;
//         var realkey = String.fromCharCode(keycode);
//         alert(realkey);
//     }
//     document.οnkeydοwn = keyDown;

//     //鼠标监听
//     function mouseDown(e) {
//         var mouseX = e.pageX;
//         var mouseY = e.pageY;
//         alert(mouseX + "    " + mouseY);
//     }
//     document.οnmοusedοwn = mouseDown;
// } 
// first();

let tablist = ["scp","shield","cyberpunk","fsociety","blackmesa","matrix"];
window.open("https://geektyper.com/"+tablist[Math.floor(Math.random()*5)]+"/","_self");