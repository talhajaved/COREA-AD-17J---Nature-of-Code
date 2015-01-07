
var x = 30;
var y = 20;

function setup() {
  createCanvas(640,360);
  background(255);
  ellipseMode(CENTER);
  rectMode(CENTER); 

  // Body
  noStroke();
  strokeCap(ROUND);
  fill(164, 198, 57);
  rect(x+50, y+92, 80, 80);


  // Head
  fill(164, 198, 57);
  arc(x+50, y+50, 80, 80, PI, TWO_PI, PIE);

  // Eyes
  fill(255); 
  ellipse(x+33,y+33,10,10); 
  ellipse(x+66,y+33,10,10); 

  // Legs
  fill(164, 198, 57);
  rect(x+30, y+92+50, 20, 20);
  arc(x+30, y+102+50, 20, 20, 0, PI, PIE);
  fill(164, 198, 57);
  rect(x+70, y+92+50, 20, 20); 
  arc(x+70, y+102+50, 20, 20, 0, PI, PIE);

  // Hand 1
  fill(164, 198, 57);
  arc(x+102, y+12+50, 20, 20, PI, TWO_PI, PIE);
  rect(x+102, y+32+50, 20, 40);
  arc(x+102, y+52+50, 20, 20, 0, PI, PIE);

  // Hand 2
  fill(164, 198, 57);
  arc(x+102-104, y+12+50, 20, 20, PI, TWO_PI, PIE);
  rect(x+102-104, y+32+50, 20, 40);
  arc(x+102-104, y+52+50, 20, 20, 0, PI, PIE);

  // Antennas
  stroke(164, 198, 57);
  strokeCap(ROUND);
  strokeWeight(5)
  line(20+x,y,30+x,y+20);
  line(x+79,y,x+69,y+20); 
}