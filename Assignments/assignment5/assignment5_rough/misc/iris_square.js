var img1,img2;

function preload() {
  img2 = loadImage("data/sunflower.jpg");
  img1 = loadImage("data/panda.jpg");
  slider = createSlider(0,100,-1);
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
      var x_incr = width/200;
      var y_incr = height/200;
      var x_limit_min = floor(width/2 - x_incr * slider.value());
      var x_limit_max = floor(width/2 + x_incr * slider.value());
      var y_limit_min = floor(height/2 - y_incr * slider.value());
      var y_limit_max = floor(height/2 + y_incr * slider.value());
      if (x > x_limit_min && x < x_limit_max && y > y_limit_min && y < y_limit_max) {
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
