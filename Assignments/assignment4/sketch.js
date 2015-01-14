// variable and constant declartion
var p1;
var R = 255;
var G = 255;
var B = 255;
var clickCount = 0;
var startRadius = 35;
var trailLength = 30;
var trailSpeed = 30;

// Canvas and Particle Setup
function setup() {
  createCanvas(800,600);
  p1 = new Particle(mouseX,mouseY,startRadius,trailLength,[0,0,0]);
  p1.display();
  // trail Drawer and Speed Controller
  setInterval(drawTrail,trailSpeed);
}

// Function that draws the trail
function drawTrail() {
  background(R,G,B);
  p1.updateHistory(mouseX, mouseY);
  p1.display();
  fill(0);
  stroke(0);
  textSize(14);
  text("Click once to change color randomly.", 10, 25);
  text("Click twice to change color to black and white.", 10, 43);
}

// Function for changing color
function mousePressed(){
  clickCount++;
  if (clickCount === 1) {
    singleClick();
      singleClickTimer = setTimeout(function() {
          clickCount = 0;
      }, 200);
  } else if (clickCount === 2) {
      clearTimeout(singleClickTimer);
      clickCount = 0;
      doubleClick();
  }
}

// On single click, random colors are chosen
function singleClick() {
    R = random(0,255);
    G = random(0,255);
    B = random(0,255);
    p1.changeColor([R,G,B])
    R = random(0,255);
    G = random(0,255);
    B = random(0,255);
}
 
// On double click, black and white are chosen as the colors
function doubleClick() {
    R = 0;
    G = 0;
    B = 0;
    p1.changeColor([R,G,B]);
    R = 255;
    G = 255;
    B = 255;
}
 