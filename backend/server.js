
const host = 'localhost';
const port = 8000;

const fs = require("fs");
const { parse } = require("csv-parse");
let arr =[];
const cors = require('cors');


fs.createReadStream("./mnist_train.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    arr.push(row);
   
  })


const express = require('express')
const app = express()
function listToMatrix(list, elementsPerSubArray) {
   

  for(let i = 0; i < 28 ; i++){
      for(let j = 0; j < 28 ; j++){
              arreglo[i][j]=parseInt(list[j*28+i]);
      }
  }


}

// create k-dtree with mnist_train
function build_kdtree_mnist(){
  data_withHOG = arr;
  root = build_kdtree(data_withHOG);
}

// return the class of input image with out processing
function clasificar(X){
  points_knn=[];
  k_closest_point(root,query_point,0,best);        
  console.log("knn", points_knn);
  let txt = "";

  points_knn.forEach(element => {
    txt += (element.point+ "=>"+element.d+"\n");
  });
}

app.use(cors({
  origin: '*'
}));
app.get('/dibujo/:id', (req, res) => {
  res.send(arr[req.params.id]);
  console.log(arr[req.params.id]);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

