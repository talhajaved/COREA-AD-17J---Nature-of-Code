var timerValue = 3;
var x_speed = 25;
var y_speed = -.5;

// Constructor
function Particle(x,y,r) {
  this.r = r;
  this.col = color(100,210,230,100);
  this.popped = false;
  this.timer = timerValue;

  // Define a body
  var bd = new box2d.b2BodyDef();
  bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y);

  // Define a fixture
  var fd = new box2d.b2FixtureDef();
  // Fixture holds shape
  fd.shape = new box2d.b2CircleShape();
  fd.shape.m_radius = scaleToWorld(this.r);
  
  // Some physics
  fd.density = sq(sq(1000.0)) * sq();
 
  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
  this.body.CreateFixture(fd);

  // Some additional stuff
  this.body.SetLinearVelocity(new box2d.b2Vec2(0, 0));
  this.body.SetUserData(this);
}

// Change color when hit
Particle.prototype.change = function() {
  this.popped = true;
}

// This function removes the particle from the box2d world
Particle.prototype.killBody = function() {
  world.DestroyBody(this.body);
}

// Is the particle ready for deletion?
Particle.prototype.done = function() {
  // Let's find the screen position of the particle
  var pos = scaleToPixels(this.body.GetPosition());
  // Is it off the bottom of the screen?
  if ( (this.popped) || (pos.y < 0-this.r*2)) {
    this.killBody();
    return true;
  }
  return false;
}

// Drawing the bubble
Particle.prototype.display = function() {
  if (this.timer == 0) {
    var x_velocity;
    if (random(1) > 0.5) {
        x_velocity = x_speed * noise(1000000);
    } else {
        x_velocity = -1 * x_speed * noise(1000000);
    }
    this.body.SetLinearVelocity(new box2d.b2Vec2(x_velocity, sq(sq(this.r/13)) * y_speed));
    this.timer = timerValue;
  } else {
    this.timer--;
  }

  // Get the body's position
  var pos = scaleToPixels(this.body.GetPosition());

  // Draw it!
  rectMode(CENTER);
  fill(this.col);
  stroke(200);
  strokeWeight(2);
  ellipse(pos.x,pos.y,random(0.8,1)*this.r*2,random(0.8,1)*this.r*2);
}