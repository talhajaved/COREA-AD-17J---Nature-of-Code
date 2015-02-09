

function setup() {
  createCanvas(640, 360);
}

function draw() {
  loadPixels();
  for (var y=0; y < height; y++)
  {
    for (var x=0; x < width; x++)
    {
      var loc = (x + y * width) * 4;
      pixels[loc] = 0;
      pixels[loc+1] = x;
      pixels[loc+2] = y;
      pixels[loc+3] = 255;
    }
  }
  updatePixels();
}