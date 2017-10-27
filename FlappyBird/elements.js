class Element {
    constructor(game, name) {
        this.g = game
        this.name = name
    }
    setmap(target, map, offsetx=0, offsety=0) {
        target.dx = map.dx + offsetx
        target.dy = map.dy + offsety
        target.dw = map.dw
        target.dh = map.dh
        target.sx = map.sx
        target.sy = map.sy
        target.sw = map.sw
        target.sh = map.sh
    }
    drawRotate(angle) {
        let o = this
        let g = this.g
        g.ctx.translate(o.dx + o.dw / 2, o.dy + o.dh /2)
        g.ctx.rotate(angle*Math.PI/180)
        g.drawSlice(sourse_img, o.sx, o.sy, o.sw, o.sh, -o.dw / 2, -o.dh / 2, o.dw, o.dh)
        g.ctx.rotate(-angle*Math.PI/180)
        g.ctx.translate(-(o.dx + o.dw / 2), -(o.dy + o.dh /2))
    }
    init() {
        this.setmap(this, this.name,)
        this.g.elements.push(this)
    }
    update() {

    }
    draw() {
        this.g.drawSlice(sourse_img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh)
    }
}
class Background extends Element {
    constructor(game, name) {
        super(game, name)
        this.onWellcome = false
        this.onGameover = false
        this.chgImgCount = 0
        this.chgImgTime = 3
        this.elements = []
        this.dob = 140
    }
    init () {
        var o = this
        o.setmap(o, bgd, 0, 0)
        o.g.addElement(o)
        if (o.onWellcome) {
            var p1 = {map:["bird1", "bird2", "bird3"]}
            var p2 = {map:["bird4", "bird5", "bird6"]}
            var p3 = {map:["bird7", "bird8", "bird9"]}
            o.elements.push(p1)
            o.elements.push(p2)
            o.elements.push(p3)
            o.elements.forEach(function(element, index){
                let map = window[element.map[0]]
                let offsetx = index * o.dob
                o.setmap(element, map, offsetx, 0)
            })
        }
    }
    changeImg () {
        var o = this
        o.chgImgCount += 1
        var c = o.chgImgCount
        var t = o.chgImgTime
        if (c > t * 3) {
            o.elements.forEach(function(element, index){
                let map = window[element.map[2]]
                let offsetx = index * o.dob
                o.setmap(element, map, offsetx, 0)
            })
            o.chgImgCount = 0
        }else if (c > t * 2) {
            o.elements.forEach(function(element, index){
                let map = window[element.map[1]]
                let offsetx = index * o.dob
                o.setmap(element, map, offsetx, 0)
            })
        }else if (c > t) {
            o.elements.forEach(function(element, index){
                let map = window[element.map[0]]
                let offsetx = index * o.dob
                o.setmap(element, map, offsetx, 0)
            })
        }
    }
    drawScore () {
        var o = this
        var g = this.g
        if (o.score < 1) {
            return
        }
        var s = g.score.toString()
        var l = s.length
        var x = g.canvas.width  / 2 + l * 10
        var y = 300
        for (let i = 0;i < l; i++) {
            let key = s[i]
            key = "num" + key
            let map = window[key]
            let offsetx = x - (l - i) * 21
            g.drawSlice(sourse_img, map.sx, map.sy, map.sw, map.sh, offsetx, y, map.dw, map.dh)
        }
    }
    draw () {
        var o = this
        var g = this.g
        g.drawSlice(sourse_img, o.sx, o.sy, o.sw, o.sh, o.dx, o.dy, o.dw, o.dh)
        g.drawSlice(sourse_img, o.sx, o.sy, o.sw, o.sh, o.dx + o.dw - 5, o.dy, o.dw, o.dh)
        if (o.onWellcome) {
            g.drawByName("_ready")
            g.drawByName("_start")
            o.elements.forEach(function(element) {
                g.drawSlice(sourse_img, element.sx, element.sy, element.sw, element.sh, element.dx, element.dy, element.dw, element.dh)
            })
        }else if (o.onGameover) {
            g.drawByName("_over")
            o.drawScore()
        }
    }
    update () {
        this.changeImg()
    }

}
class Pipes extends Element {
    constructor(game, name) {
        super(game, name)
        this.collideable = true
        this.x = 512
        this.y = 0
        this.pipes = []
    }
    draw () {
        let g = this.g
        this.pipes.forEach(function(p) {
            g.drawSlice(sourse_img, p.sx, p.sy, p.sw, p.sh, p.dx, p.dy, p.dw, p.dh)
        })
    }

    update () {
        let o = this
        let g = this.g
        let speed = parseInt(Window.pipeSpeed)
        let s = parseInt(Window.pipeSpace)
        let r = Math.random()
        r = -50 - (200 * r)
        o.pipes.forEach(function(p) {
            p.dx -= speed
            //reset pipe's offsetx and offsety
            if (p.dx < 0 - p.dw) {
                p.dx = g.canvas.width
                if (p.type === "up") {
                    p.dy = r
                }else if (p.type === "down") {
                    p.dy = r + p.dh + s
                }
            }
        //check collideable
        o.collideable = Window.collideable
        })
    }
    initPipe (pipe) {
        pipe.lastCollideX = false
        pipe.lastCollideY = false
        pipe.overLeft = false
        pipe.overUp = false
    }
    init () {
        let o = this
        let g = this.g
        let n = parseInt(Window.numOfPipes)
        let s = parseInt(Window.pipeSpace)
        let r = Math.random()
        let d = g.canvas.width / n + 44 / n //d = distance between pipes
        for (let i = 0; i < n; i++) {
            let pu = {type:"up",}
            let pd = {type:"down",}
            let r = Math.random()
            r = - 50 - (200 * r)
            let offsetx = d * i + o.x
            o.setmap(pu, longPipe1, offsetx, r)
            o.initPipe(pu)
            let offsety = pu.dy + pu.dh + s
            o.setmap(pd, longPipe2, offsetx, offsety)
            o.initPipe(pd)
            o.pipes.push(pu)
            o.pipes.push(pd)
        }
        g.addElement(o)
    }
    
}
class Player extends Element {
    constructor(game, name) {
        super(game, name)
        this.speedy = 0
        this.maxSpeedy = 10
        this.gravity = 0.25
        this.coolDown = true
        this.coolCount = 0
        this.coolDownReset = 20
        this.chgImgCount = 0
        this.chgImgTime = 3
        this.score = 0
        this.rotate = false
        this.rotateAngle = 15
    }
    init () {
        let o = this
        let g = this.g
        //setmap
        o.numOfBird = g.birdType * 3 + 1
        let n = o.numOfBird.toString()
        let map = window["bird" + n]
        o.setmap(o, map)
        //register keys
        g.registerActions('s', 'keydown', function() {
            o.moveLeft()
        })
        g.registerActions('f', 'keydown', function() {
            o.moveRight()
        })
        g.registerActions(' ', 'keydown', function() {
            o.jump()
        })
        g.addElement(o)
    }
    moveLeft () {
        let o = this
        let s = parseInt(Window.speed)
        o.dx += -s
    }
    moveRight () {
        let o = this
        let s = parseInt(Window.speed)
        o.dx += s
    }
    jump () {
        let j = parseInt(Window.jumpSpeed)
        let o = this
        if (o.coolDown) {
            o.speedy = -j
            o.coolDown = false
        }
    }
    checkstatus () {
        let o = this
        let g = this.g
        //update gravity
        if (o.speedy < o.maxSpeedy) {
            o.speedy += o.gravity
        }
        o.dy += o.speedy
        //max xy && min xy
        //floor.y == 460
        if (o.dy > 460 - o.dh){
            o.dy = 460 - o.dh
            o.speedy = 0
        }
        if (o.dy < 0) {
            o.dy = 0
            o.speedy = 0
        }
        if (o.dx > g.canvas.width - o.dw) {
            o.dx = g.canvas.width - o.dw
        }
        if (o.dx < 0) {
            o.dx = 0
        }
        //check jump cooldown
        if (o.coolDown === false) {
            o.coolCount += 1
        }
        if (o.coolCount > o.coolDownReset) {
            o.coolDown = true
            o.coolCount = 0
        }
        //check rotation
        if (o.speedy > 3) {
            o.rotate = true
        }else{
            o.rotate = false
        }
    }
    //用中心距离判断矩形相交
    //第二版将小鸟当作质点考虑
    checkCollide () {
        let o = this
        let g = this.g
        var ox1 = o.dx + o.dw / 2
        var oy1 = o.dy + o.dh / 2
        g.elements.forEach(function(element) {
            if (element.name === "pipes") {
                element.pipes.forEach(function(e) {
                    var ox2 = e.dx + e.dw / 2
                    var oy2 = e.dy + e.dh / 2
                    var collideX = Math.abs(ox1 - ox2) < e.dw / 2
                    var collideY = Math.abs(oy1 - oy2) < e.dh / 2
                    if (element.collideable && collideX && collideY) {
                        if (g.hardcore) {
                            g.score = o.score
                            g.load("gameover")
                        }else if (o.dx === 0) {
                            g.score = o.score
                            g.load("gameover")
                        }
                        if (e.overLeft) {
                            o.dx = e.dx - o.dw / 2
                        }else{
                            o.dx = e.dx + e.dw - o.dw / 2
                        }
                        if (e.overUp && !e.lastCollideY) {
                            o.dy = e.dy - o.dh / 2
                        }else if (!e.overUp && !e.lastCollideY){
                            o.dy = e.dy + e.dh -o.dh / 2
                        }
                    }
                    //update last status
                    if (collideX) {
                        e.lastCollideX = true
                    }else{
                        e.lastCollideX = false
                    }
                    if (collideY) {
                        e.lastCollideY = true
                    }else{
                        e.lastCollideY = false
                    }
                })
            }
        })
    }
    updateScore () {
        let o = this
        let g = this.g
        var ox1 = o.dx + o.dw / 2
        var oy1 = o.dy + o.dh / 2
        g.elements.forEach(function(element) {
            if (element.name === "pipes") {
                element.pipes.forEach(function(e) {
                    var ox2 = e.dx + e.dw / 2
                    var oy2 = e.dy + e.dh / 2
                    var collideX = Math.abs(ox1 - ox2) < e.dw / 2
                    var collideY = Math.abs(oy1 - oy2) < e.dh / 2
                    if (e.type === "up") {
                        if (e.overLeft && ox1 >= ox2) {
                            o.score += 1
                        }
                    }
                    //update last status
                    if (ox1 < ox2) {
                        e.overLeft = true
                    }else{
                        e.overLeft = false
                    }
                    if (oy1 < oy2) {
                        e.overUp = true
                    }else{
                        e.overUp = false
                    }
                })
            }
        })
    }
    switchmap(target, map) {
        //change img only, keep the position
        target.dw = map.dw
        target.dh = map.dh
        target.sx = map.sx
        target.sy = map.sy
        target.sw = map.sw
        target.sh = map.sh
    }
    changeImg () {
        let o = this
        o.chgImgCount += 1
        let c = o.chgImgCount
        let t = o.chgImgTime
        let n = o.numOfBird.toString()
        let map = window["bird" + n]
        if (c > t * 3) {
            n = o.numOfBird.toString()
            let map = window["bird" + n]
            o.switchmap(o, map)
            o.chgImgCount = 0
        }else if (c > t * 2) {
            n = (o.numOfBird + 1).toString()
            let map = window["bird" + n]
            o.switchmap(o, map)
        }else if (c > t) {
            n = (o.numOfBird + 2).toString()
            let map = window["bird" + n]
            o.switchmap(o, map)
        }
    }
    drawScore () {
        let o = this
        let g = this.g
        if (o.score < 1) {
            return
        }
        var s = o.score.toString()
        var l = s.length
        var x = g.canvas.width -5
        var y = 5
        for (let i = 0;i < l; i++) {
            let key = s[i]
            key = "num" + key
            let map = window[key]
            let offsetx = x - (l - i) * 21
            g.drawSlice(sourse_img, map.sx, map.sy, map.sw, map.sh, offsetx, y, map.dw, map.dh)
        }
    }

    update () {
        this.checkCollide()
        this.checkstatus()
        this.updateScore()
        this.changeImg()
    }    
    draw () {
        let o = this
        let g = this.g
        if (o.rotate) {
            o.drawRotate(o.rotateAngle)
        }else{
            g.drawSlice(sourse_img, o.sx, o.sy, o.sw, o.sh, o.dx, o.dy, o.dw, o.dh)           
        }
        o.drawScore()
    }
}

class Floor extends Element {
    constructor(game, name) {
        super(game, name)
        this.speed = 1,
        this.xResetCount = 0,
        this.xReset = 24
    }
    draw () {
        let o = this
        let g = this.g
        g.drawSlice(sourse_img, o.sx, o.sy, o.sw, o.sh, o.dx, o.dy, o.dw, o.dh)
        g.drawSlice(sourse_img, o.sx, o.sy, o.sw, o.sh, o.dx + o.dw - 22, o.dy, o.dw, o.dh)
        //draw title
        g.drawByName("_title")
    }
    update () {
        let o = this
        let c = o.xResetCount
        let r = o.xReset
        if (c < r) {
            o.dx -= o.speed
            o.xResetCount += 1
        }else{
            o.dx += o.speed * r
            o.xResetCount = 0
        }
    }
    init () {
        let o = this
        let g = this.g
        o.setmap(o, floor1)
        g.addElement(o)
    }
}