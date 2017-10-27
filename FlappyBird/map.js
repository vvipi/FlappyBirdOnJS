var imgFromPath = function (path){
    var i = new Image()
    i.src = path
    return i
}

var sourse_img = imgFromPath('image/all_in_1.png')

var bgd = {
    name: "Background_Day",
    sx: 0,
    sy: 0,
    sw: 144,
    sh: 256,
    dx: 0,
    dy: 0,
    dw: 288,
    dh: 512,
}

var bgn = {
    name: "Background_Night",
    sx: 146,
    sy: 0,
    sw: 144,
    sh: 256,
    dx: 0,
    dy: 0,
    dw: 288,
    dh: 512,
}
    
var floor1 = {
    name: "floor",
    sx: 293,
    sy: 0,
    sw: 167,
    sh: 56,
    dx: 0,
    dy: 460,
    dw: 334,
    dh: 112,
}
var _ready = {
    name: "ready",
    sx: 292,
    sy: 57,
    sw: 100,
    sh: 28,
    dx: 205,
    dy: 150,
    dw: 150,
    dh: 44,
}
var _over = {
    name: "over",
    sx: 392,
    sy: 57,
    sw: 100,
    sh: 28,
    dx: 205,
    dy: 150,
    dw: 150,
    dh: 44,
}
var _start = {
    name: "start",
    sx: 292,
    sy: 85,
    sw: 56,
    sh: 56,
    dx: 234,
    dy: 330,
    dw: 84,
    dh: 84,
}
var _title = {
    name: "title",
    sx: 350,
    sy: 88,
    sw: 90,
    sh: 28,
    dx: 3,
    dy: 3,
    dw: 90,
    dh: 28,
}
var bird1 = {
    name: "bird1",
    sx: 0,
    sy: 490,
    sw: 20,
    sh: 15,
    dx: 120,
    dy: 250,
    dw: 30,
    dh: 23,
}
var bird2 = {
    name: "bird2",
    sx: 28,
    sy: 490,
    sw: 20,
    sh: 15,
    dx: 120,
    dy: 250,
    dw: 30,
    dh: 23,
}
var bird3 = {
    name: "bird3",
    sx: 56,
    sy: 490,
    sw: 20,
    sh: 15,
    dx: 120,
    dy: 250,
    dw: 30,
    dh: 23,
}
var bird4 = {
    name: "bird4",
    sx: 84,
    sy: 490,
    sw: 20,
    sh: 15,
    dx: 120,
    dy: 250,
    dw: 30,
    dh: 23,
}
var bird5 = {
    name: "bird5",
    sx: 112,
    sy: 328,
    sw: 20,
    sh: 15,
    dx: 120,
    dy: 250,
    dw: 30,
    dh: 23,
}
var bird6 = {
    name: "bird6",
    sx: 112,
    sy: 354,
    sw: 20,
    sh: 15,
    dx: 120,
    dy: 250,
    dw: 30,
    dh: 23,
}
var bird7 = {
    name: "bird7",
    sx: 112,
    sy: 378,
    sw: 20,
    sh: 15,
    dx: 120,
    dy: 250,
    dw: 30,
    dh: 23,
}
var bird8 = {
    name: "bird8",
    sx: 112,
    sy: 404,
    sw: 20,
    sh: 15,
    dx: 120,
    dy: 250,
    dw: 30,
    dh: 23,
}
var bird9 = {
    name: "bird9",
    sx: 112,
    sy: 430,
    sw: 20,
    sh: 15,
    dx: 120,
    dy: 250,
    dw: 30,
    dh: 23,
}

var silvercoin = {
    name: "silvercoin",
    sx: 111,
    sy: 452,
    sw: 24,
    sh: 24,
    dx: 0,
    dy: 0,
    dw: 40,
    dh: 40,
}
var goldcoin = {
    name: "goldcoin",
    sx: 111,
    sy: 476,
    sw: 24,
    sh: 24,
    dx: 0,
    dy: 0,
    dw: 40,
    dh: 40,
}
var pipe1 = {
    name:"pipe1",
    sx: 0,
    sy: 322,
    sw: 28,
    sh: 165,
    dx: 55,
    dy: 250,
    dw: 44,
    dh: 247,
}
var pipe2 = {
    name:"pipe2",
    sx: 55,
    sy: 322,
    sw: 28,
    sh: 165,
    dx: 0,
    dy: 0,
    dw: 44,
    dh: 247,
}
var pipe3 = {
    name:"pipe3",
    sx: 84,
    sy: 322,
    sw: 28,
    sh: 165,
    dx: 0,
    dy: 0,
    dw: 44,
    dh: 247,
}
var startbtn = {
    name:"start_btn",
    sx: 354,
    sy: 118,
    sw: 53,
    sh: 30,
    dx: 120,
    dy: 256,
    dw: 53,
    dh: 30,
}
var rankbtn = {
    name:"rank_btn",
    sx: 414,
    sy: 118,
    sw: 53,
    sh: 30,
    dx: 120,
    dy: 256,
    dw: 53,
    dh: 30,
}
var num1 = {
    name:"num1",
    sx: 135,
    sy: 455,
    sw: 10,
    sh: 19,
    dx:66,    
    dy: 256,
    dw: 15,
    dh: 29,
}
var num2 = {
    name:"num2",
    sx: 292,
    sy: 160,
    sw: 13,
    sh: 19,
    dx: 66,
    dy: 256,
    dw: 20,
    dh: 29,
}
var num3 = {
    name:"num3",
    sx: 305,
    sy: 160,
    sw: 13,
    sh: 19,
    dx: 66,
    dy: 256,
    dw: 20,
    dh: 29,
}
var num4 = {
    name:"num4",
    sx: 319,
    sy: 160,
    sw: 13,
    sh: 19,
    dx: 66,
    dy: 256,
    dw: 20,
    dh: 29,
}
var num5 = {
    name:"num5",
    sx: 333,
    sy: 160,
    sw: 13,
    sh: 19,
    dx: 45,
    dy: 256,
    dw: 20,
    dh: 29,
}
var num6 = {
    name:"num6",
    sx: 292,
    sy: 184,
    sw: 13,
    sh: 19,
    dx: 66,
    dy: 256,
    dw: 20,
    dh: 29,
}
var num7 = {
    name:"num7",
    sx: 306,
    sy: 184,
    sw: 13,
    sh: 19,
    dx: 66,
    dy: 256,
    dw: 20,
    dh: 29,
}
var num8 = {
    name:"num8",
    sx: 320,
    sy: 184,
    sw: 13,
    sh: 19,
    dx: 66,
    dy: 256,
    dw: 20,
    dh: 29,
}
var num9 = {
    name:"num9",
    sx: 334,
    sy: 184,
    sw: 13,
    sh: 19,
    dx: 66,
    dy: 256,
    dw: 20,
    dh: 29,
}
var num0 = {
    name:"num0",
    sx: 496,
    sy: 60,
    sw: 13,
    sh: 19,
    dx: 66,
    dy: 256,
    dw: 20,
    dh: 29,
}

var longPipe1 = {
    name:"pipe1",
    sx: 162,
    sy: 268,
    sw: 28,
    sh: 220,
    dx: 0,
    dy: 0,
    dw: 44,
    dh: 330,
}
var longPipe2 = {
    name:"pipe2",
    sx: 195,
    sy: 267,
    sw: 28,
    sh: 220,
    dx: 0,
    dy: 0,
    dw: 44,
    dh: 330,
}