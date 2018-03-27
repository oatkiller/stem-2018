const streamToPromise = require('stream-to-promise')
const http = require('http')
const sqlite = require('sqlite')
const querystring = require('querystring')

main()

async function main() {
  const database = await sqlite.open('./database.sqlite')
  console.log('creating database')
  await database.run('create table if not exists people (name text, favoriteColor text)')

  console.log('creating server')
  const server = http.createServer(
    requestHandler
  )

  // This function is called each time a request comes in (when the user browses to your site)
  async function requestHandler(request, response) {
    console.log('handling request')

    // Tell the web browser that this is an html document
    response.setHeader('Content-Type', 'text/html')

    if (request.method === 'POST') {

      // It takes a little while for data from the form to arrive. wait on that
      const data = await streamToPromise(request)

      // The data comes encoded, decode it using querystring.parse
      const post = querystring.parse(data.toString())

      // Run a database statement to add the name and favorite color into a new row in the database
      await database.run('insert into people (name, favoriteColor) values (?, ?)', post.name, post.favoriteColor)
      console.log('Added ' + post.name + ' into database. favorite color is ' + post.favoriteColor)
    }

    // Query the database for all of the entries
    const people = await database.all('select * from people')

    response.write(
      `<form method="POST" action="/">
        <label>Name <input name="name" /></label>
        <label>Favorite color <input name="favoriteColor" /></label>
        <button>Add</button>
      </form>`
    )

    // Output list of favorite colors and names
    response.write(
      `<table>
        <thead>
          <tr>
            <th>name</th>
            <th>favorite color</th>
          </tr>
        </thead>
        <tbody>`
    )
    response.write(
      people.
        map(
          function(person) {
            return `<tr><td>${ person.name }</td><td>${ person.favoriteColor }</td></tr>`
          }
        ).join('')
    )
    response.end(
      ` </tbody>
      </table>`
    )
  }

  const port = 8080
  console.log('starting server. listening on port ' + port)
  server.listen(port)
}
