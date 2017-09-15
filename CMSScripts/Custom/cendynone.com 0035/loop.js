function drawPath( path ) {
  var len = path.getTotalLength();
  path.attr({
	  stroke: '#fff',
	  strokeWidth: 5,
    fill: 'none',
    "stroke-dasharray": "1, 0", //no stroke
    "stroke-dashoffset": len
  }).animate({"stroke-dashoffset": 10}, 10000,mina.easeinout);
};
  
function animatePath( el, path,offsetX, offsetY, callback ) {
  var len = path.getTotalLength();
  Snap.animate(0, len, function( value ) {
     var movePoint = path.getPointAtLength( value );      
     el.transform( 't' + parseInt(movePoint.x - offsetX) + ',' + parseInt( movePoint.y - offsetY) + 'r' + (movePoint.alpha - 90));
    
  }, 10000, mina.linear, callback)
}

function animateRepeat( el, path, offsetX, offsetY ) {
  animatePath(el, path, offsetX, offsetY, animateRepeat.bind(null, el, path, offsetX, offsetY))
}


// ---------
//  LOOP LEFT  SVG C
// ---------

  var snapC = Snap("#svgC"); 

  // SVG C - "Squiggly" Path
  // half path - var myPathC = snapC.path("M163.741,10.058C79.186,10.429,10.638,79.766,10.638,165.756c0,85.989,68.546,155.56,153.103,155.697 c33.285,0.056,116.618,7.053,334.97-155.135C283.222,1.432,181.354,9.979,163.741,10.058z").attr({
  var myPathC = snapC.path("M498.71,165.154c0,0-206.19-164.893-334.97-155.135C20.498,19.667,10.638,145.768,10.638,165.717s11.859,147.949,154.4,154.4c116.24,5.57,277.995-114.122,333.672-153.617C562.162,121.49,721.166,0,834.668,9.063C971.59,19.996,987.77,134.022,987.77,164.761C988.498,213,951.832,319,833.37,319.161C707.165,321,569.131,214.384,498.71,165.154z").attr({
  id: "squiggle",
    fill: "none",
    strokeWidth: "4",
    stroke: "#ffffff",
    strokeMiterLimit: "10",
    strokeDasharray: "9 9",
    strokeDashOffset: "988.01"
  });


  drawPath( myPathC )
    
  // SVG C - Triangle (As Polyline)
  var Triangle = snapC.polyline("0,10 15,0 30,10");
  Triangle.attr({
    id: "plane",
    fill: "#fff"
  });  


var triangleGroup = snapC.g( Triangle ).attr({ opacity: 0 }); 


for( var a=0; a<1; a++) { //number of arrows
  setTimeout( function() {
    animateRepeat( triangleGroup.clone().attr({ opacity: 1 }), myPathC, 14, 6)
  }, a*6000); // time until the next arrow is called
};  


// ---------
//  LOOP RIGHT SVG C
// ---------

var snapC2 = Snap("#svgC2"); 

  // SVG C - "Squiggly" Path
  // half path - var myPathC2 = snapC2.path("M834.668,320.459c-33.285,0.055-116.617,7.053-334.97-155.135 C715.188,0.438,817.055,8.985,834.668,9.063C919.223,9.434,987.77,78.771,987.77,164.761 C987.77,250.751,919.224,320.321,834.668,320.459z").attr({
  var myPathC2 = snapC2.path("M499.708,163.733c0,0,206.19,164.894,334.969,155.135 C977.92,309.221,987.78,183.119,987.78,163.17c0-19.949-11.859-147.949-154.4-154.4C717.141,3.2,555.385,122.892,499.708,162.387 c-63.452,45.01-222.456,166.5-335.958,157.437C26.829,308.892,10.649,194.865,10.649,164.126 C9.92,115.887,46.586,9.887,165.048,9.726C291.253,7.887,429.288,114.503,499.708,163.733z").attr({
    id: "squiggle",
    fill: "none",
    strokeWidth: "0",
    stroke: "transparent",
    strokeMiterLimit: "0",
    strokeDasharray: "9 9",
    strokeDashOffset: "988.01"
  });


  drawPath( myPathC2 )
    
  // SVG C - Triangle (As Polyline)
  var Triangle2 = snapC2.polyline("0,10 15,0 30,10");
  Triangle2.attr({
    id: "plane",
    fill: "#fff"
  });  


var triangleGroup2 = snapC2.g( Triangle2 ).attr({ opacity: 0 }); 


for( var a=0; a<1; a++) { //number of arrows
  setTimeout( function() {
    animateRepeat( triangleGroup2.clone().attr({ opacity: 1 }), myPathC2, 14, 6) //position on line
  }, a*6000); // time until the next arrow is called
};  