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

    
    d3.csv("./mnist_train,csv", function(data) {
        for (var i = 0; i < 2; i++) {
            console.log(data );
            
        }
    });
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
    const url=urlminix+"4";
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
     console.log(Http.responseText)
    }

}
