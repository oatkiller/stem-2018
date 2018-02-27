const http = require('http')
const fs = require('bluebird').promisifyAll(require('fs'))
const formBody = require('body/form')

const server = http.createServer(
  async function(request, response) {
    if (request.method === 'GET') {
      response.setHeader('Content-Type', 'text/html')

      let bestColor = null

      try {
        bestColor = await fs.readFileAsync('./best_color.txt')
      } catch (error) {
        console.log('missing best_color.txt')
      }

      response.end(
        `
          <h1>Best color: ${ bestColor ? bestColor : 'no color picked yet' }</h1>
          <form method="post">
            <input type="text" name="best-color" value="${ bestColor ? bestColor : '' }" />
            <button>Change best color</button>
          </form>
        `
      )
    } else {
      console.log(await formBody(request)())
    }
    console.log(request.method)
  }
)

server.listen(
  3000,
  function() {
    console.log('listening')
  }
)
