const http = require('http')
http.createServer(
  function(request, response) {
    response.setHeader('Content-Type', 'text/html')
    response.end('<h1>nick is cool</h1>')
  }
).listen(8080)
