import {  Knn } from "./knnFake.js";

const host = 'localhost';
const port = 8000;

const fs = require("fs");
const { parse } = require("csv-parse");
let arr =[];
let testData = [];
const cors = require('cors');


fs.createReadStream("./mnist_train.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    arr.push(row);
   
  })



  fs.createReadStream("./mnist_test.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    testData.push(row);
   
  })


const express = require('express')
const app = express()


function listToMatrix(list) {
   

  for(let i = 0; i < 28 ; i++){
      for(let j = 0; j < 28 ; j++){
              arreglo[i][j]=parseInt(list[j*28+i]);
      }
  }


}
function clasificar (list){
  let knn = new Knn();
  return knn.clasificar(list);
    
}

let acuracy = [];
let matrizConfusion = [];

function mostrarACurracy(){



}

function matrizConfusion(){



}




app.use(cors({
  origin: '*'
}));
app.get('/dibujo/:id', (req, res) => {
  res.send(arr[req.params.id]);
  console.log(arr[req.params.id]);
})
app.get('/accuracy', (req, res) => {
  res.send(arr[req.params.id]);
  console.log(arr[req.params.id]);
})

app.get('/accuracy', (req, res) => {
  res.send(arr[req.params.id]);
  console.log(arr[req.params.id]);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

