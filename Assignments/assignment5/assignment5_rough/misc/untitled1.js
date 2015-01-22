var img1,img2;

function preload() {
  img2 = loadImage("data/sunflower.jpg");
  img1 = loadImage("data/panda.jpg");
  slider = createSlider(0,100,-01);
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

      var pixels_incr = width * height/100;
       var y_incr = height/10;
      var y_temp = floor(y/10) * 10;
      var x_forward, x_limit;

      if (y_temp % y_incr == 0) {
        x_forward = true;
      } else {
        x_forward = false;
      }

      if (x_forward){
        x_limit = 0 + pixels_incr * slider.value()/100;
      } else {
        x_limit = width - pixels_incr * slider.value()/100;
      }

      var y_limit = height * slider.value()/100;
     


      if (x_forward && x < x_limit && y < y_limit)  {
        pixels[loc    ] = r1;
        pixels[loc + 1] = g1;
        pixels[loc + 2] = b1;
        pixels[loc + 3] = 255;
      } 
      else if (x > x_limit && y < y_limit) {
        pixels[loc    ] = r1;
        pixels[loc + 1] = g1;
        pixels[loc + 2] = b1;
        pixels[loc + 3] = 255;
      }  else {
        pixels[loc    ] = r2;
        pixels[loc + 1] = g2;
        pixels[loc + 2] = b2;
        pixels[loc + 3] = 255;
      }
      
    }
  }

  updatePixels();
}
