
var PreView = function () {
    var canvas = document.querySelector('#main_canvas')
    var ctx = canvas.getContext('2d')
    var p = {
        sx:0,
        sy:0,
        sw:0,
        sh:0,
        dx:0,
        dy:0,
        dw:0,
        dh:0,
    }
    p.draw = function (img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, p.sx, p.sy, p.sw, p.sh, p.dx, p.dy, p.dw, p.dh)
    }
    p.setMap = function () {
        p.sx = document.getElementById('input_sx').value || 0
        p.sy = document.getElementById('input_sy').value || 0
        p.sw = document.getElementById('input_sw').value || 0
        p.sh = document.getElementById('input_sh').value || 0
        p.dx = document.getElementById('input_dx').value || 0
        p.dy = document.getElementById('input_dy').value || 0
        p.dw = document.getElementById('input_dw').value || 0
        p.dh = document.getElementById('input_dh').value || 0
    }
    p.preView = function () {
        p.setMap()
        p.draw(sourse_img)
    }
    p.register = function () {
        var btn = document.getElementById('btn_draw')
        btn.addEventListener('click', p.preView)
    }
    return p
}

var PreView1 = function () {
    var canvas = document.querySelector('#main_canvas')
    var ctx = canvas.getContext('2d')
    var p = {
        sx:0,
        sy:0,
        sw:0,
        sh:0,
        dx:0,
        dy:0,
        dw:0,
        dh:0,
    }
    p.draw = function (img) {
        ctx.drawImage(img, p.sx, p.sy, p.sw, p.sh, p.dx, p.dy, p.dw, p.dh)
    }
    p.setMap = function () {
        p.sx = document.getElementById('input_sx1').value || 0
        p.sy = document.getElementById('input_sy1').value || 0
        p.sw = document.getElementById('input_sw1').value || 0
        p.sh = document.getElementById('input_sh1').value || 0
        p.dx = document.getElementById('input_dx1').value || 0
        p.dy = document.getElementById('input_dy1').value || 0
        p.dw = document.getElementById('input_dw1').value || 0
        p.dh = document.getElementById('input_dh1').value || 0
    }
    p.preView = function () {
        p.setMap()
        p.draw(sourse_img)
    }
    p.register = function () {
        var btn = document.getElementById('btn_draw1')
        btn.addEventListener('click', p.preView)
    }
    return p
}

var PreView2 = function () {
    var canvas = document.querySelector('#main_canvas')
    var ctx = canvas.getContext('2d')
    var p = {
        sx:0,
        sy:0,
        sw:0,
        sh:0,
        dx:0,
        dy:0,
        dw:0,
        dh:0,
    }
    p.draw = function (img) {
        ctx.drawImage(img, p.sx, p.sy, p.sw, p.sh, p.dx, p.dy, p.dw, p.dh)
    }
    p.setmap = function (map) {
        p.dx = map.dx
        p.dy = map.dy
        p.dw = map.dw
        p.dh = map.dh
        p.sx = map.sx
        p.sy = map.sy
        p.sw = map.sw
        p.sh = map.sh
    }
    p.clear =function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    p.preView = function () {
        var name = document.getElementById('input_map').value
        map = window[name]
        p.setmap(map)
        p.draw(sourse_img)
        log("map:",map,"p:",p)
    }
    p.register = function () {
        var btn1 = document.getElementById('btn_drawmap')
        var btn2 = document.getElementById('btn_clear')
        btn1.addEventListener('click', p.preView)
        btn2.addEventListener('click', p.clear)
    }
    return p   
}