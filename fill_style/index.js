const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
context.fillStyle = 'pink'
context.fillRect(0, 0, 100, 100)
document.body.appendChild(canvas)