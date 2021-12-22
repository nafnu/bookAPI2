const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000
const mongoose = require('mongoose')

//classes
const Book = require('./book.js')
// const Notebook = require('./notebook')
//const path = require('path');


//app plugins or labraries
app.use(bodyParser.urlencoded({
  extended: false
}))





//API ROUTES

//SHOW all dogs from the database using GET request
app.get('/book', (req, res) => {
  Book.find((err, books) => {
    if (err) {
      res.send("Error occured no book retrieved")
      return
    }
    res.send(books)
    console.log(books)
  })
})

app.get('/notebook', (req, res) => {
  Notebook.find((err, notebooks) => {
    if (err) {
      res.status(404).send(err)
      return
    }
    res.status(200).send(notebooks)
    console.log(notebooks)
  })
})


// FIND ONE BY ID, using a GET REQUEST and A PARAMETER (id)
app.get('/book/:id', (req, res) => {
  const id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) {
      res.send("Book not found")
      return
    }
    res.send(book)
    console.log(book)
  })
})


//INSERT request using POST to add a book into the database
app.post('/book', (req, res) => {
  console.log("Inserting a book in the database")
  let book = new Book({
    title: req.body.title,
    author: req.body.author,
    ISBN: parseInt(req.body.ISBN),
    yearPublication: parseInt(req.body.yearPublication),
    publishingHouse: req.body.publishingHouse,
  });
  book.save(err => {
    if (err) {
      res.send(`Book not inserted into the database, error is: ${err}`)
      return
    }
    res.send("Book inserted into the database")
    console.log("Book is in the database")
  })
  return
})

//DELETE request using DELETE and a PARAMETER (id)
app.delete('/book/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.send("Book did not delete")
      return
    }
    res.send("Book deleted")
    console.log(`Book with id ${req.params.id} is now deleted`)
  })
})

// PUT request to update or modify one dog from the database
app.put('/book/:id', (req, res) => {
  console.log("Trying to edit book")
  console.log(parseInt(req.body.ISBN))


  Book.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    ISBN: ((parseInt(req.body.ISBN) == NaN) ? 0 : parseInt(req.body.ISBN)),
    author: req.body.author,
    publishingHouse: req.body.publishingHouse,
    yearPublication: (parseInt(req.body.yearPublication))
  }, err => {
    if (err) {
      res.send("It didn't edit. The error is: " + err)
      return;
    }
    res.send("It did edit")
  })
})


//START the server
app.listen(port, () => {
  mongoose.connect('mongodb+srv://admin:ADMIN@bookapi.d2gse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
  catch(error => console.log(error));
  console.log(`Example app listening at http://localhost:${port}`)
})

