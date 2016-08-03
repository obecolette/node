'use strict'

console.log('api.js all day');

const port = 1337;
const dataFilePath = "data/items.json"

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

var autoIncrementingID = 0;

// es5 way
// var item = function(name, description) {
//   this.name =         name;
//   this.description =  description;
//   this.id =           autoIncrementingID++;
//   this.completed =    false;
//   this.created_at =   1468953083;
//   this.updated_at =   null;
//   this.deleted_at =   null;

//   this.complete = function() { // not compatiible with JSON
//     this.completed = !this.completed;
//     this.updated_at = Date.now;
//   }
// }

// ES6 way
class Item {
  constructor(name, description) {
    this.name =         name;
    this.description =  description;
    this.id =           autoIncrementingID++;
    this.completed =    false;
    this.created_at =   Date.now();
    this.updated_at =   null;
    this.deleted_at =   null;
  }
}

// main storage of items in memory
var items = [
  new Item('Welcome'),
  new Item('Feed dog')
]

// fetch saved copy of list
fs.readFile(dataFilePath, 'utf8', function(err, data) {

  // do this when the file comes back from hd
  console.log(err, data);

    try {
      var retrieved = JSON.parse( data );
      autoIncrementingID = retrieved.autoIncrementingID;
      items = retrieved.items;
    } catch(e) {
        console.warn("loaded JSON file with invalid JSON")
    }
})

var saveToFile = function() {

  var toStore = {
    autoIncrementingID: autoIncrementingID,
    items: items
  }

  fs.writeFile(dataFilePath, JSON.stringify(toStore), function(err) {
    console.error(err);
  });
}
// use openSync but whats the api?

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.get('/about', function (req, res) {
  res.send('You\'re talking to the API for my another todo list!');
});

/*
GET                 /items      return all items
POST                /items      create a new item
GET                 /items/1    return item 1
PUT/POST/UPDATE     /items/1    edit item 1
DELETE              /items/1    delete item 1
*/

app.get('/items', function (req, res) {
  console.log("request for full item list")
  res.send( items );
});

app.get('/items/:item_id', function (req, res) {

  // loop
  // for (var i = 0; i < items.length; i++) {
  //   if ( items[i].id == req.params.item_id) {
  //     res.send( items[i] );
  //     return;
  //   }
  // };

  // filter
  // var item = items.filter(function (item) {
  //     return item.id == req.params.item_id;
  // })
  // res.send( item );

  // find
  var item = items.find(function(item) {
    return item.id == req.params.item_id;
  })
  res.send( item );

});


app.delete('/items/:item_id', function(req, res) {

  var item = items.find(function(item) {
    return item.id == req.params.item_id;
  });
  if (item) {
    item.updated_at = item.deleted_at = Date.now();
    res.send(item);
  } else {
    res.status(400).send("Item does not exist");
  }

  saveToFile();
});

// create a new to do item
app.post("/items", function(req, res) {

  if (req.body.new_item.trim()) { // if the user entered anything

    var newItem = {

      id: autoIncrementingID++,
      name: req.body.new_item,
      description: "",
      completed: false,
      created_at: Date.now(),
      updated_at: null,
      deleted_at: null
    }

    items.push(newItem);

    res.send(newItem);

  } else {

    res.status(400).send("You didn't enter anything, dummy!");

  }
  // res.send("testing!" + req.body.new_item);
  saveToFile();
})


app.use(express.static("public"));

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});













