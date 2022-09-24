
const host = 'localhost';
const port = 8000;

const fs = require("fs");
const { parse } = require("csv-parse");
let arr =[];

fs.createReadStream("./mnist_train.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    arr.push(row);
   
  })


const express = require('express')
const app = express()


app.get('/dibujo/:id', (req, res) => {
  res.send(arr[req.params.id]);
  console.log(arr[req.params.id]);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})