let location = `Universe`;
let msg = `Hello ${location}`;
console.log(msg);

console.log( __dirname );
console.log( __filename );

var os = require('os');
console.log(os.platform());

var fs = require('fs');
fs.open('data.json', 'w', (err, fd) => {

  if (err) {

    // handle error
  } else {

  }

});

// core idea of node and es6 == starting one js file and calling the ones you need.
// OOP modules