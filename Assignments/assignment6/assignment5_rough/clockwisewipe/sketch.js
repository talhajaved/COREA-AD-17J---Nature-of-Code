var img1,img2;

function preload() {
  img2 = loadImage("data/sunflower.jpg");
  img1 = loadImage("data/panda.jpg");
  slider = createSlider(0,100,-01);
  slider.position(25,200);
}

function setup() {
  createCanvas(200, 200);
}

function draw() {
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

      // Image Processing would go here
      // If we were to change the RGB values, we would do it here, before setting the pixel in the display window.

      // Set the display pixel to the image pixel
     
      var angle_limit = floor(360 * slider.value()/100);
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
