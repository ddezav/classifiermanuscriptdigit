k = 2;
MAX_VECINOS = 3;
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
   constructor(point, axis) {
      this.point = point;
      this.left = null;
      this.right = null;
      this.axis = axis;
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
   var n = points.length;
   var axis = depth % k;


   if (n <= 0) {
      return null;
   }
   if (n == 1) {
      return new Node(points[0], axis)
   }

   var median = Math.floor(points.length / 2);

   // sort by the axis
   points.sort(function (a, b) {
      return a[axis] - b[axis];
   });
   //console.log(points);

   var left = points.slice(0, median);
   var right = points.slice(median + 1);

   //console.log(right);

   var node = new Node(points[median].slice(0, k), axis);
   node.left = build_kdtree(left, depth + 1);
   node.right = build_kdtree(right, depth + 1);

   return node;

}

 function getHeight ( node ) {
    if (!node) return 0 ;
    return  Math.max(getHeight(node.left)+1, getHeight(node.right+1));

 }
 function build_kdtree(points, depth = 0){
    var n = points.length;
    var axis = depth % k;
    
    
    if (n <= 0){
    return null;
    }
    if (n == 1){
    return new Node(points[0], axis)
    }
    
    var median = Math.floor(points.length / 2);
    
    // sort by the axis
    points.sort(function(a, b)
    {
    return a[axis] - b[axis];
    });
    //console.log(points);
    
    var left = points.slice(0, median);
    var right = points.slice(median + 1);
    
    //console.log(right);
    
    var node = new Node(points[median].slice(0, k), axis);
    node.left = build_kdtree(left, depth + 1);
    node.right = build_kdtree(right, depth + 1);
    
    return node;
    
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
        
        obj = {point:node.point,d:d2};
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
        obj = {point:node.point,d:d2};
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
