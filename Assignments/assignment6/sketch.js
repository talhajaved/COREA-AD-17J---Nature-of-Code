var img_array = [];
var temp_img;
var ctr = 0;
var percentage = 0;
var pic_duration = 30;
var wait_timer = pic_duration;

function preload() {
  img_array.push(loadImage("data/panda.jpg"));
  img_array.push(loadImage("data/cat.jpg"));
  img_array.push(loadImage("data/penguin.jpg"));
  img_array.push(loadImage("data/rabbit.jpg"));
  img_array.push(loadImage("data/bear.jpg"));
  img_array.push(loadImage("data/dog.jpg"));
}

function setup() {
  createCanvas(400, 400);
  temp_img = img_array.shift();
  img_array.push(temp_img);
}

function draw() {
  if (ctr % 4 == 3){
    percentage += .005;
    wait_timer += .5;
  } 
  else
    percentage += .02;
  if (percentage > 1.0) {
    if (wait_timer < 1) {
      percentage = 0;
      ctr++;
      temp_img = img_array.shift();
      img_array.push(temp_img);
      wait_timer = pic_duration;
    } else {
      wait_timer--;
      percentage = 1;}
  }
  if (ctr > 5) ctr = 0;

  if (ctr % 4 == 0) barWipe(img_array[0],temp_img,percentage);
  else if (ctr % 4 == 1) clockwiseWipe(img_array[0],temp_img,percentage);
  else if (ctr % 4 == 2) irisWipe(img_array[0],temp_img,percentage);
  else if (ctr % 4 == 3) crossFade(temp_img,img_array[0],percentage);
}


function crossFade(img1,img2,p) {
  loadPixels();

  // We must also call loadPixels() on the PImage since we are going to read its pixels.
  img1.loadPixels();
  img2.loadPixels();
  for (var y = 0; y < height; y++ ) {
    for (var x = 0; x < width; x++ ) {
      var loc = (x + y * width) * 4;
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r1 = img1.pixels[loc   ]; 
      var g1 = img1.pixels[loc + 1];
      var b1 = img1.pixels[loc + 2];

      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r2 = img2.pixels[loc   ]; 
      var g2 = img2.pixels[loc + 1];
      var b2 = img2.pixels[loc + 2];

      // Set the display pixel to the image pixel
      pixels[loc    ] = r1 + (r2 - r1) * p;
      pixels[loc + 1] = g1 + (g2 - g1) * p;
      pixels[loc + 2] = b1 + (b2 - b1) * p;
      pixels[loc + 3] = 255; // Always have to set alpha
    }
  }
  updatePixels();
}

function irisWipe(img1,img2,p) {
  loadPixels();

  // We must also call loadPixels() on the PImage since we are going to read its pixels.
  img1.loadPixels();
  img2.loadPixels();
  for (var y = 0; y < height; y++ ) {
    for (var x = 0; x < width; x++ ) {
      var loc = (x + y * width) * 4;
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r1 = img1.pixels[loc   ]; 
      var g1 = img1.pixels[loc + 1];
      var b1 = img1.pixels[loc + 2];

      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r2 = img2.pixels[loc   ]; 
      var g2 = img2.pixels[loc + 1];
      var b2 = img2.pixels[loc + 2];

      var radius_limit = sqrt(sq(width)+sq(height))/2 * p;
      if (sq(x-width/2)+sq(y-height/2) < sq(radius_limit))  {
        pixels[loc    ] = r1;
        pixels[loc + 1] = g1;
        pixels[loc + 2] = b1;
        pixels[loc + 3] = 255;
      } else {
        pixels[loc    ] = r2;
        pixels[loc + 1] = g2;
        pixels[loc + 2] = b2;
        pixels[loc + 3] = 255;
      }
    }
  }
  updatePixels();
}

function barWipe(img1,img2,p) {
  loadPixels();

  // We must also call loadPixels() on the PImage since we are going to read its pixels.
  img1.loadPixels();
  img2.loadPixels();
  for (var y = 0; y < height; y++ ) {
    for (var x = 0; x < width; x++ ) {
      var loc = (x + y * width) * 4;
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r1 = img1.pixels[loc   ]; 
      var g1 = img1.pixels[loc + 1];
      var b1 = img1.pixels[loc + 2];

      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r2 = img2.pixels[loc   ]; 
      var g2 = img2.pixels[loc + 1];
      var b2 = img2.pixels[loc + 2];

      // Set the display pixel to the image pixel
      var x_limit = floor(width * p);
      if (x < x_limit) {
        pixels[loc    ] = r1;
        pixels[loc + 1] = g1;
        pixels[loc + 2] = b1;
        pixels[loc + 3] = 255;
      } else {
        pixels[loc    ] = r2;
        pixels[loc + 1] = g2;
        pixels[loc + 2] = b2;
        pixels[loc + 3] = 255;
      }
      
    }
  }
  updatePixels();
}

function clockwiseWipe(img1,img2,p) {
  loadPixels();

  // We must also call loadPixels() on the PImage since we are going to read its pixels.
  img1.loadPixels();
  img2.loadPixels();
  for (var y = 0; y < height; y++ ) {
    for (var x = 0; x < width; x++ ) {
      var loc = (x + y * width) * 4;
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r1 = img1.pixels[loc   ]; 
      var g1 = img1.pixels[loc + 1];
      var b1 = img1.pixels[loc + 2];

      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r2 = img2.pixels[loc   ]; 
      var g2 = img2.pixels[loc + 1];
      var b2 = img2.pixels[loc + 2];

      var angle_limit = floor(360 * p);
      angleMode(DEGREES);
      var angle;
      if (x < width/2 && y < height/2) {
        angle = floor(atan((height/2-y)/(width/2-x))) + 270;
      }
      else if (x >= width/2 && y < height/2) {
        angle = floor(atan((x-width/2)/(height/2-y))) + 0;
      }
      else if (x >= width/2 && y >= height/2) {
        angle = floor(atan((y-height/2)/(x-width/2))) + 90;
      }
      else if (x < width/2 && y >= height/2) {
        angle = floor(atan((width/2-x)/(y-height/2))) + 180;
      }

      if (angle < angle_limit)  {
        pixels[loc    ] = r1;
        pixels[loc + 1] = g1;
        pixels[loc + 2] = b1;
        pixels[loc + 3] = 255;
      } else {
        pixels[loc    ] = r2;
        pixels[loc + 1] = g2;
        pixels[loc + 2] = b2;
        pixels[loc + 3] = 255;
      }
    }
  }
  updatePixels();
}

