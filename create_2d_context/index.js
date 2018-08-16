// Create a new 'canvas' element. It can be drawn on using code
const canvas = document.createElement('canvas')

// document is an object that has properties and methods related to the web page
// document.body is a reference to the `body` element
// `appendChild` is a method on all HTMLElement objects. It adds another element
// as one of its children
// This will add the `canvas` element to the web page
document.body.appendChild(canvas)

// Request a 2d context to draw on. This object has methods
// that you can use to draw on the canvas
// `getContext` must be passed an arguments. The value must be a string.
// Always use '2d' (for now)
const context = canvas.getContext('2d')

// `fillRect` is a method that draws a rectangle
context.fillRect(0, 0, 100, 100)