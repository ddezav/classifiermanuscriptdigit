const Knn = require('./knnFake.js');

const host = 'localhost';
const port = 8000;

const fs = require("fs");
const { parse } = require("csv-parse");
let arr =[];
let testData = [];
const cors = require('cors');


fs.createReadStream("mnist_test.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    arr.push(row);
   
  })



  fs.createReadStream("mnist_test.csv")
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

function listToMatrix(list) {
   
  let arreglo = [];
  for(let i = 0; i < 28 ; i++){
    let temp = [];
      for(let j = 0; j < 28 ; j++){
        
              temp.push(list[j*28+i]);
      }
      arreglo.push(temp);
  }

  return arreglo;

}

// create k-dtree with mnist_train
function build_kdtree_mnist(){
  
  data_preprocessed = [];
  arr.forEach(row => {
    clase = row[0];
    data = row.slice(1,row.length);
    
    arr28x28 = listToMatrix(data);
    row_withHOG = HOG(arr28x28);

    row_preprocessed = [clase,row_withHOG];
    data_preprocessed.push(row_preprocessed);
  });
  root_kdtree = build_kdtree(data_preprocessed);
  console.log(root_kdtree);
}

// return the class of input image with out processing
function clasificar(X){
  points_knn=[];
  arr28x28 = listToMatrix(X); 
  query_point = HOG(arr28x28);
  best = null;
  k_closest_point(root_kdtree,query_point,0,best);        
  console.log("knn", points_knn);
  let txt = "";

  let cont_class = [0,0,0,0,0,0,0,0,0,0];
  points_knn.forEach(element => {
    txt += (element.point+ "=>"+element.d+"\n");
    cont_class[element.class]++;
  });
  let max_value = -1;
  let max_class = -1;
  for (let j = 0; j < cont_class.length; j++) {
    if( max_value<cont_class[j]){
      max_value = cont_class[j];
      max_class = j;
    }    
  }
  console.log(max_class);
}


function main(){
  arr = [];
  var temp=[];
  temp[0] = 5;
  for (let i = 1; i < 28*28+1; i++) {
    temp[i] = 2*i%255;      
  }
  arr.push([...temp]);
  temp[0] = 4;
  for (let i = 1; i < 28*28+1; i++) {
    temp[i] = 5*i%255;      
  }
  arr.push([...temp]);
  temp[0] = 7;
  for (let i = 1; i < 28*28+1; i++) {
    temp[i] = 15*i%255;      
  }
  arr.push([...temp]);
  temp[0] = 8;
  for (let i = 1; i < 28*28+1; i++) {
    temp[i] = 3*i%255;      
  }
  arr.push([...temp]);
  temp[0] = 2;
  for (let i = 1; i < 28*28+1; i++) {
    temp[i] = -5*i%255;      
  }
  arr.push([...temp]);
  temp[0] = 1;
  for (let i = 1; i < 28*28+1; i++) {
    temp[i] = 7*i%255;      
  }
  arr.push([...temp]);
  temp[0] = 3;
  for (let i = 1; i < 28*28+1; i++) {
    temp[i] = 3*i%255;      
  }
  arr.push([...temp]);
  build_kdtree_mnist();
  
  test_X = []
  //test_X[0] = -1;
  for (let i = 0; i < 28*28; i++) {
    test_X[i] = 45*i%255;      
  }
  
  clasificar(test_X);
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

