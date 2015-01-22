// A reference to our box2d world
var world;

// variable for sound and image
var img;
var sound1;

// A list for all of our particles
var particles = [];

function preload(){
  img = loadImage("data/water-background.jpg");  // Load the image 
  sound1 = loadSound('data/pop.mp3');
}

function setup() {
  createCanvas(1200,600);
  background(img);

  // Initialize box2d physics and create the world
  world = createWorld();

  world.SetContactListener(new CustomListener());
  // Set negative gravity to simulate rising bubbles
  world.SetGravity(new box2d.b2Vec2(0,-1000) );

}

function draw() {
  background(img);

  // We must always step through time!
  var timeStep = 1.0/100;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);

  if (random(1) < 0.2) {
    var sz = random(10,25);
    particles.push(new Particle(random(width), height-10, sz));
  }

  // Look at all particles
  for (var i = particles.length-1; i >= 0; i--) {
    particles[i].display();
    // Particles that leave the screen, we delete them
    if (particles[i].done()) {
      particles.splice(i,1);
    }
  }  
}



