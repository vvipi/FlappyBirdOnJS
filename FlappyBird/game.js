Window.fps = 30
Window.speed = 4
Window.jumpSpeed = 5
Window.pipeSpeed = 3
Window.numOfPipes = 3
Window.pipeSpace = 100
Window.collideable = true
Window.difficulty = "2"

var VGame = function () {
    var g = {
        keyDowns: {},
        keyPressed: {},
        actionsPressed: {},
        actionsDown: {},
        elements: [],
        working: true,
        birdType: null,
        score: 0,
        hardcore: false,
    }
    var canvas = document.querySelector('#main_canvas')
    var ctx = canvas.getContext('2d')
    g.canvas = canvas
    g.ctx = ctx
    //drawimage
    g.drawImage = function (element) {
        g.ctx.drawImage(element.img, element.x, element.y)
    }
    g.drawSlice = function (img, sx, sy, sw, sh, dx, dy, dw, dh) {
        g.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
    }
    g.drawByName = function (name) {
        var m = window[name]
        g.ctx.drawImage(sourse_img, m.sx, m.sy, m.sw, m.sh, m.dx, m.dy, m.dw, m.dh)
    }
    //add element
    g.addElement = function (element) {
        g.elements.push(element)
    }
    //register actions
    g.registerActions = function (key, type, callback) {
        if (type === 'keydown') {
            g.actionsDown[key] = callback
        }
        if (type === 'keypress') {
            g.actionsPressed[key] = callback
        }
        if (type === 'click') {
            g.actionsClick[key] = callback
        } 
    }
    //register controls
    g.registerControl = function (id, key, callback) {
        var control = e(id)
        control.addEventListener("change", function(event){
            if (control.type === "range"){
                Window[key] = control.value
            }else if (control.type === "checkbox") {
                Window[key] = control.checked
            }
            e("#" + control.name).innerText = control.name +": " + control.value
        })
        if (callback) {
            callback()
        }
    }
    g.onClick = function(event) {
        var target = event.target
        var rect = target.getBoundingClientRect()
        var x1 = event.clientX - rect.left
        var y1 = event.clientY - rect.top
        var pointInRec = function(x1, y1, x2, y2, width, height) {
            let xIn = (x2 < x1 && x1 < x2 + width)
            let yIn = (y2 < y1 && y1 < y2 + height)
            if (xIn && yIn) {
                return true
            }else{
                return false
            }
        }
        let x2 = bird1.dx
        let y2 = bird1.dy
        let width = bird1.dw
        let height = bird1.dh
        if (pointInRec(x1, y1, x2, y2, width, height)) {
            g.birdType = 0
            g.load("level1")
        }else if (pointInRec(x1, y1, x2 + 140, y2, width, height)) {
            g.birdType = 1
            g.load("level1")
        }else if (pointInRec(x1, y1, x2 + 280, y2, width, height)) {
            g.birdType = 2
            g.load("level1")
        }
        if (g.birdType != null) {
            g.canvas.removeEventListener("click", g.onClick)
        }
    }
    g.wellcome = function() {
        //actions and controls
        g.init()
        g.canvas.addEventListener("click", g.onClick)
        //init elements
        var bg = new Background(g)
        var floor = new Floor(g)
        bg.onWellcome = true
        bg.init()
        floor.init()
    }
    g.gameover = function() {
        var bg = new Background(g)
        var floor = new Floor(g)
        bg.onGameover = true
        bg.init()
        floor.init()
    }
    g.level1 = function() {
        //actions and controls
        g.init()
        //init elements
        var bg = new Background(g)
        var pipes = new Pipes(g, "pipes")
        var floor = new Floor(g)
        var player = new Player(g)
        bg.init()
        pipes.init()
        floor.init()
        player.init()
    }
    g.init = function () {
        //control events
        g.registerControl("#id-speed-range", "speed")
        g.registerControl("#id-jump-speed-range", "jumpSpeed")
        g.registerControl("#id-pipes-space-range", "pipeSpace")
        g.registerControl("#id-pipes-speed-range", "pipeSpeed")
        g.registerControl("#id-difficulty-range", "difficulty")
        //key events
        window.addEventListener("keydown", function(event){
            //只处理已注册的key
            if(Object.keys(g.actionsDown).indexOf(event.key) != -1) {
                g.keyDowns[event.key] = true
            }
        })
        window.addEventListener("keyup", function(event){
            if(Object.keys(g.actionsDown).indexOf(event.key) != -1) {
                g.keyDowns[event.key] = false
            }
        })
        window.addEventListener("keypress", function(event){
            if(Object.keys(g.actionsPressed).indexOf(event.key) != -1) {
                g.keyPressed[event.key] = true
            }
        })
        //actions
        g.registerActions('p', 'keypress', function() {
            g.pause()
        })

    }
    g.load = function(scence="wellcome") {
        g.keyDowns = {}
        g.keyPressed = {}
        g.actionsPressed = {}
        g.actionsDown = {}
        g.elements = []
        if (scence === "wellcome" || scence === "level1" || scence === "gameover") {
            g[scence]()
        }
    }
    //update
    g.pause = function () {
        g.working = !g.working
        var music = e("#bgm")
        if (music.paused) {
            music.play()
        }else{
            music.pause()
        }
    }
    g.checkDifficulty = function() {
        if (Window.difficulty === "3") {
            g.hardcore = true
            Window.collideable = true
        }else if (Window.difficulty === "2") {
            g.hardcore = false
            Window.collideable = true
        }else{
            g.hardcore = false
            Window.collideable = false
        }
    }
    g.update = function () {
        g.checkDifficulty()
        g.elements.forEach(function(element) {
            element.update()
        })
    }
    g.draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        g.elements.forEach(function(element) {
            element.draw()
        })
    }
    setInterval (function(){
        var ad = Object.keys(g.actionsDown)
        var ap = Object.keys(g.actionsPressed)
        if (g.working) {
            for (let i = 0; i < ad.length; i++) {
                var key = ad[i]
                //如果key被按下,则调用其对应回调函数
                if (g.keyDowns[key]) {
                    g.actionsDown[key]()
                }
            }
        }
        for (let i = 0; i < ap.length; i++) {
            var key = ap[i]
            //如果key被点击,则调用其对应回调函数,暂停时仍保持监听该事件，因为恢复也是keypress事件
            if (g.keyPressed[key]) {
                g.actionsPressed[key]()
                g.keyPressed[key] = false
            }
        }
        if (g.working) {
            g.update()
            g.draw()
        }
    }, 1000/parseInt(Window.fps))

    return g
}
