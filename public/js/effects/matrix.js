var canvas = document.createElement('canvas')
var cw = canvas.width = innerWidth
var ch = canvas.height = innerHeight
var c = canvas.getContext('2d')
var texts = []
var fontSize = 16
var cooldown = 0

class MatrixText {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.texts = `ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ゛゜ゝゞァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾヿ㍐`.split('')
        this.text = this.texts[Math.floor(Math.random() * this.texts.length)]
        this.finished = false
    }

    draw() {
        c.save()
        c.beginPath()
        c.font = `${fontSize}px Arial`
        c.fillStyle = this.color
        c.fillText(this.text, this.x, this.y)
        c.closePath()
        c.restore()
    }
    update() {
        this.draw()
        this.y += fontSize
        this.text = this.texts[Math.floor(Math.random() * this.texts.length)]
        if (this.y - fontSize > ch) {
            this.reset()
        }
    }
    reset() {
        this.finished = true
        //this.y = -(Math.random() * ch)

    }
}

window.addEventListener('resize', function () {
    texts = []
    canvas.width = cw = innerWidth
    canvas.height = ch = innerHeight
    init()
})

function init() {
    // for (let i = 0; i < cw; i += fontSize) {
    //     texts.push(new MatrixText(i, '#00ff00'))
    // }


    c.fillStyle = "rgb(0,0,0)"
    c.fillRect(0, 0, cw, ch)
}

function animate() {
    setTimeout(animate, 50)
    // c.fillStyle = "rgba(0,0,0,.1)"
    // c.fillRect(0, 0, cw, ch)
    c.clearRect(0, 0, cw, ch)
    texts.forEach(text => {
        text.update()
    })
}

canvas.addEventListener('mousemove', function(e){
    texts.push(new MatrixText(e.x, e.y, '#00ff00'))
})
canvas.classList.add('fixed-canvas')
document.body.append(canvas)

init()
animate()


export default MatrixText