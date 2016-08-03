// make a small web server

var http = require("http"); // for network request
var fs = require("fs"); // filesystem access

var server = http.createServer((req, res) => {

  if (req.url == "/") {

    fs.readFile("public_html/index.html", (err, data) => {

      if (err) {
        // handle error
        res.writeHead(404);
        res.end('404 CSS Not Found');
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.end(data)
    })

    // console.log(req);
  } else if ( req.url.match(/.css$/) ) { // serving CSS files

    fs.readFile("public_html" + req.url, (err, data) => {

      if (err) {
        // handle error
        res.writeHead(404);
        res.end('404 CSS Not Found');
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/css"
      });
      res.end(data)
    })

  } else if ( req.url.match(/.js$/) ) {

    fs.readFile("public_html" + req.url, (err, data) => {

      if (err) {
        // handle error
        res.writeHead(404);
        res.end('404 JS Not Found');
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/js"
      });
      res.end(data)
    })

  } else if ( req.url.match(/.jpg$/) ) { //

    fs.readFile("public_html" + req.url, (err, data) => {

      if (err) {
        // handle error
        res.writeHead(404);
        res.end('404 Not Found');
        return;
      }

      res.writeHead(200, {
        "Content-Type": "img/jpg"
      });
      res.end(data)
    })

  } else {
    res.writeHead(404);
    res.end('404 Jpg Not Found');
  }


})

server.listen(1337);