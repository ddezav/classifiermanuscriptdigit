const Knn = require('./knn.js');

const host = 'localhost';
const port = 8000;
var bodyParser = require('body-parser')

let arr =[];
let root_kdtree =[];

 
// create application/json parser
var jsonParser = bodyParser.json()
const fs = require("fs");
const { parse } = require("csv-parse");
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
  arr28x28 = listToMatrix(X); 
 
  clasificarMatriz(arr28x28);
 
}


function HOG(arr){

  const kernelX = [
  [-1,0,1],
  [-2,0,2],
  [-1,0,1]
  ];

  const kernelY = [
  [-1,-2,-1],
  [0,0,0],
  [1,2,1]
  ];


  sobelData = [];
  angles = [];
  for (y = 0; y < 28; y++) {
      sobelData[y] = [];
      angles[y] = [];
      for (x = 0; x < 28; x++) {
          var pixelX = (
              (kernelX[0][0] * arr[(x-1<0)?x:(x-1)][(y-1<0)?y:(y-1)]) +
              (kernelX[0][1] * arr[x][(y-1<0)?y:(y-1)]) +
              (kernelX[0][2] * arr[(x+1>x)?x:(x+1)][(y-1<0)?y:(y-1)]) +
              (kernelX[1][0] * arr[(x-1<0)?x:(x-1)][y]) +
              (kernelX[1][1] * arr[x][y]) +
              (kernelX[1][2] * arr[(x+1>x)?x:(x+1)][y]) +
              (kernelX[2][0] * arr[(x-1<0)?x:(x-1)][(y+1>y)?y:(y+1)]) +
              (kernelX[2][1] * arr[x][(y+1>y)?y:(y+1)]) +
              (kernelX[2][2] * arr[(x+1>x)?x:(x+1)][(y+1>y)?y:(y+1)])
          );
  
          var pixelY = (
              (kernelY[0][0] * arr[(x-1<0)?x:(x-1)][(y-1<0)?y:(y-1)]) +
              (kernelY[0][1] * arr[x][(y-1<0)?y:(y-1)]) +
              (kernelY[0][2] * arr[(x+1>x)?x:(x+1)][(y-1<0)?y:(y-1)]) +
              (kernelY[1][0] * arr[(x-1<0)?x:(x-1)][y]) +
              (kernelY[1][1] * arr[x][y]) +
              (kernelY[1][2] * arr[(x+1>x)?x:(x+1)][y]) +
              (kernelY[2][0] * arr[(x-1<0)?x:(x-1)][(y+1>y)?y:(y+1)]) +
              (kernelY[2][1] * arr[x][(y+1>y)?y:(y+1)]) +
              (kernelY[2][2] * arr[(x+1>x)?x:(x+1)][(y+1>y)?y:(y+1)])
          );
          var magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY))>>>0;
          let angle = Math.atan(pixelY/pixelX)+Math.PI/2;
          angle = angle/Math.PI*180;
  
          sobelData[y].push(magnitude);
          angles[y].push(angle);
      }
  }
  console.log('sobel data',sobelData);
  console.log('sobel angles',angles);

  h = [];
  for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
          h[i*7+j] = [0,0,0,0,0,0];
          for (let a = 0; a < 4; a++) {
              a:for (let b = 0; b < 4; b++) {
                  let value = angles[i*4+a][j*4+b];
                  if(isNaN(value))
                      continue a;
                  if(value > 0 && value <= 30 || value <= 180 && value > 150){
                      h[i*7+j][0] += sobelData[i*4+a][j*4+b] / 2;
                      h[i*7+j][5] += sobelData[i*4+a][j*4+b] / 2;
                  }
                  if(value > 30 && value <=60)
                      h[i*7+j][1] += sobelData[i*4+a][j*4+b];
                  if(value > 60 && value <=90)
                      h[i*7+j][2] += sobelData[i*4+a][j*4+b];
                  if(value > 90 && value <=120)
                      h[i*7+j][3] += sobelData[i*4+a][j*4+b];
                  if(value > 120 && value <=150)
                      h[i*7+j][4] += sobelData[i*4+a][j*4+b];
              }
          }
      }
  }
  console.log(h);
  let final = [];
  for (let i = 0; i < h.length; i++) {
      const element = h[i];
      final = final.concat(element);        
  }
  return final;
}


function clasificarMatriz(arr28x28){
  console.log(arr28x28);


  
  points_knn=[];
 
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
  return max_class;
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
app.post('/clasificar', jsonParser, function (req, res) {  
  // Prepare output in JSON format  

  res.end(JSON.stringify(clasificarMatriz(req.body)));  
})  

app.get('/accuracy', (req, res) => {
  res.send(arr[req.params.id]);
  console.log(arr[req.params.id]);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
















MAX_VECINOS = 3;
k = 294;
points_knn =[];
distances_knn =[];
class Point {
    constructor (x, y, userData ){
    this.x = x;
    this.y = y;
    this.userData = userData;
    }
}


class Node {
   constructor(point, axis,classdf) {
      this.point = point;
      this.left = null;
      this.right = null;
      this.axis = axis;
      this.classdf = classdf;
   }
}

function getHeight(node) {
   if (!node) return 0;
   return Math.max(getHeight(node.left) + 1, getHeight(node.right + 1));

}
function generate_dot(node) {
   if(!node){
      return;
   }else{
      if(node.left!=null)
         console.log(node.point+"=>"+node.left.point);
      
      generate_dot(node.left);
      
      if(node.right!=null)
         console.log(node.point+"=>"+node.right.point);
      generate_dot(node.right);
   }
}
function build_kdtree(points, depth = 0) {
   var classdf = points[0][0];
   let points_data = points[0][1];   
   var n = points.length;
   var axis = depth % k;


   if (n <= 0) {
      return null;
   }
   if (n == 1) {
      return new Node(points_data, axis, classdf)
   }

   var median = Math.floor(points.length / 2);

   // sort by the axis
   points.sort(function (a, b) {
      return a[1][axis] - b[1][axis];
   });
   //console.log(points);

   var left = points.slice(0, median);
   var right = points.slice(median + 1);

   //console.log(right);

   var node = new Node(points[median][1].slice(0, k), axis, points[median][0]);
   node.left = build_kdtree(left, depth + 1);
   node.right = build_kdtree(right, depth + 1);

   return node;

}

 function getHeight ( node ) {
    if (!node) return 0 ;
    return  Math.max(getHeight(node.left)+1, getHeight(node.right+1));

 }
 
function distanceSquared ( point1 , point2 ){
    var distance = 0;
    for (var i = 0; i < k; i ++)
        distance += Math.pow (( point1[i] - point2[i]) , 2) ;
    return Math.sqrt ( distance );
}

function closest_point_brute_force ( points , point ) {
    let min      = 999999999;
    let minIndex = -1; 
    for ( let i = 0 ; i < points.length ; i++ ) {
        let temp = distanceSquared( point , points[ i ] );
        if ( temp < min ) {
            min = temp;
            minIndex = i;
        }
    }
    return (minIndex != -1 ) ? points[ minIndex ] : null;
}

function closest_point (node , point , depth = 0, best = null ) {
    if ( node == null || point == null )
        return null;
        
    let axis   = depth % k;
    nodeValue  = node.point[ axis ];
    pointValue = point[ axis ];

    if ( best ) {
        let d1 = distanceSquared ( best , point );
        let d2 = distanceSquared ( node.point , point );

        best = ( d1 < d2 ) ? best : node.point;
    } else {
        best = node.point;
    }

    if ( pointValue < nodeValue) {
        let dif1 = distanceSquared( node.point , point );
        let dif2 = nodeValue - pointValue;
        if (dif1 > dif2 && node.right)
            best = closest_point( node.right , point , depth + 1 , best );

        if ( node.left )
            return closest_point( node.left , point , ++depth , best );

    } else {
        let dif1 = distanceSquared( node.point , point );
        let dif2 = pointValue - nodeValue;
        if (dif1 > dif2 && node.left)
            best = closest_point( node.left , point , depth + 1 , best );

        if ( node.right )
            return closest_point( node.right , point , ++depth , best );
    }

   return best;
}

function k_closest_point (node , point , depth = 0, best = null ) {
    if ( node == null || point == null )
        return null;
        
    let axis   = depth % k;
    nodeValue  = node.point[ axis ];
    pointValue = point[ axis ];
    let obj;
    if ( best ) {
        let d1 = distanceSquared ( best , point );
        let d2 = distanceSquared ( node.point , point );

        best = ( d1 < d2 ) ? best : node.point;
        
        obj = {point:node.point,d:d2,class:node.classdf};
        points_knn.push(obj);
        
        points_knn.sort(function(a, b){
            return a.d - b.d;
        });
        if (points_knn.length>MAX_VECINOS){
            points_knn=points_knn.slice(0,MAX_VECINOS+1);
        }

    } else {
        best = node.point;
        let d2 = distanceSquared ( node.point , point );
        obj = {point:node.point,d:d2,class:node.classdf};
        points_knn.push(obj);
    }

    if ( pointValue < nodeValue) {
        let dif1 = distanceSquared( node.point , point );
        let dif2 = nodeValue - pointValue;
        if (dif1 > dif2 && node.right)
            best = k_closest_point( node.right , point , depth + 1 , best );

        if ( node.left )
            return k_closest_point( node.left , point , ++depth , best );

    } else {
        let dif1 = distanceSquared( node.point , point );
        let dif2 = pointValue - nodeValue;
        if (dif1 > dif2 && node.left)
            best = k_closest_point( node.left , point , depth + 1 , best );

        if ( node.right )
            return k_closest_point( node.right , point , ++depth , best );
    }

   return best;
}


function range_query_circle (node , center , radio , queue , depth = 0) {
    if ( node == null || point == null )
    return null;
    if (!queue){
        queue = [];
    }

    let axis   = depth % k;
    nodeValue  = node.point[ axis ];
    pointValue = center[ axis ];
    //console.log('range circl  dept',depth,node.point)
     if(distanceSquared ( node.point , center )<radio){
        queue.push(node);
    }

    let dat = depth +1 ;
    if ( (pointValue-radio) < nodeValue) {
   
        if ( node.left )
             range_query_circle (node.left , center , radio , queue , dat ) ;
    } 
    dat = depth +1;
    

    if ( (pointValue+radio) > nodeValue) {
      
        if ( node.right)
             range_query_circle (node.right , center , radio , queue , dat ); 
    } 

    
}

function range_query_rectangle (node , box , queue , depth = 0) {
    if ( node == null || point == null )
    return null;
    if (!queue){
        queue = [];
    }

    let axis   = depth % k;
    nodeValue  = node.point[ axis ];
    
    //console.log(node.point,distanceSquared ( node.point, center ));
    let isInside = true;
    depth = depth +1 ;

    for ( let i = 0 ; i < box.length ; i++ ) {
        if(box[i][0] > node.point[i] || box[i][1] < node.point[i] )
        isInside = false;
        
    }
    if (isInside){
         queue.push(node);
    }

    if ( box[axis][0] < nodeValue) {
   
        if ( node.left )
        range_query_rectangle (node.left ,box , queue , depth ) 
    } 

    

    if (  box[axis][1] > nodeValue) {
      
        if ( node.right)
        range_query_rectangle (node.right ,box, queue , depth) 
    } 

    
}


