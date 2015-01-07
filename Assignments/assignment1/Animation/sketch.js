// Spiraling Circle

var i;
  
function setup() {
  createCanvas(1000,1000);
  smooth();
  i = 0;
}

function draw() {

  // Uncomment next line to only show one circle spiraling
  // background(255);


  fill(164, 198, 57);

  var angle_incr = radians(4);

  var cx = width/2;
  var cy = height/2;
  var outer_rad = width*.45;
  
  var sm_diameter = 10;
  var ratio = sq(i)/1000000;
  var spiral_rad = ratio * outer_rad;
  var angle = i*angle_incr;

  var x = cx + cos(angle) * spiral_rad;
  var y = cy + sin(angle) * spiral_rad;
  i = i+1;
  
  // draw tiny circle at x,y
  ellipse(x, y, sm_diameter, sm_diameter);

}
// END
