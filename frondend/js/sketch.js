/* 
let qt;
let count = 0;
function setup() {
    createCanvas(400, 400);

    // centre point and half of width and height
    let boundary = new Rectangle(200, 200, 200, 200);

    // each leave just could have 4 elements
    qt = new QuadTree(boundary, 4);

    console.log(qt);
    for (let i = 0; i < 200; i++) {
        let p = new Point(Math.random() * 400, Math.random() * 400);
        qt.insert(p);
    }

    background(0);
    qt.show();
}
 */

let qt;
let urlminix="http://localhost:8000/dibujo/"
let count = 0;
let arreglo  =[];
let escala   = 10;
let tamanio = 28 ;
let degradado = 50;
function setup() {
    for(let i = 0; i < 28 ; i++){
        arreglo.push([]);
        for(let j = 0; j < 28 ; j++){
                arreglo[i].push(0);
        }
    }
 
    createCanvas(tamanio*escala,tamanio*escala);

    
    // d3.csv("./mnist_train,csv", function(data) {
    //     for (var i = 0; i < 2; i++) {
    //         console.log(data );
            
    //     }
    // });
}

function draw() {
    background(0);
    for(let i = 0; i < 28 ; i++){
        for(let j = 0; j < 28 ; j++){
            fill(arreglo[i][j]);
            rect(i*escala, j*escala,escala, escala);  

        }
        
    }
    if (mouseIsPressed) {
        for (let i = 0; i < 1; i++) {
           
            let  iniX = Math.max(Math.min(Math.floor(mouseX/escala),tamanio-1),0);
            let  iniY = Math.max(Math.min(Math.floor(mouseY/escala),tamanio-1),0);
         
            arreglo[iniX][iniY] =  Math.min(arreglo[iniX][iniY] + degradado,255);


            iniX = Math.max(Math.min(Math.floor(mouseX/escala)-1,tamanio-1),0);
            iniY = Math.max(Math.min(Math.floor(mouseY/escala),tamanio-1),0);
            arreglo[iniX][iniY] = Math.min(arreglo[iniX][iniY] + degradado/2,255);
          
            iniX = Math.max(Math.min(Math.floor(mouseX/escala),tamanio-1),0);
            iniY = Math.max(Math.min(Math.floor(mouseY/escala)-1,tamanio-1),0);
            arreglo[iniX][iniY] = Math.min(arreglo[iniX][iniY] + degradado/2,255);
          

            iniX = Math.max(Math.min(Math.floor(mouseX/escala)+1,tamanio-1),0);
            iniY = Math.max(Math.min(Math.floor(mouseY/escala),tamanio-1),0);
            arreglo[iniX][iniY] = Math.min(arreglo[iniX][iniY] + degradado/2,255);
          

            iniX = Math.max(Math.min(Math.floor(mouseX/escala),tamanio-1),0);
            iniY = Math.max(Math.min(Math.floor(mouseY/escala)+1,tamanio-1),0);
            arreglo[iniX][iniY] = Math.min(arreglo[iniX][iniY] + degradado/2,255);
          



          
        }
    }
 
}

function cargarImagenMinix(){
    const Http = new XMLHttpRequest();
    const url=urlminix+"2";
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        if(e.currentTarget.readyState==4 && e.currentTarget.status==200){
            let data = int(JSON.parse(Http.responseText));
            console.log(data)
            console.log(HOG(data));
        }
    }

}

function HOG(data){

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
    var arr = [];
    for(let i = 0; i < 28 ; i++){
        arr[i]=[];
        for(let j = 0; j < 28 ; j++){
            arr[i][j] = data[j*28+i];
        }
    }


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
    console.log(sobelData);
    console.log(angles);

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

cargarImagenMinix();