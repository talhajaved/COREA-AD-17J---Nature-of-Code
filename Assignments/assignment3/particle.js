

function Particle(tempX, tempY, tempR) {
  this.x = tempX;
  this.y = tempY;
  this.r = tempR;

  this.display = function() {
    fill(100,210,230);
    strokeWeight(4);
    stroke(100,210,230);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  // Causes the bubble to rise
  this.rise = function(){
    if (random() > 0.5)
    {
      this.x = this.x + noise(1000000)*15;
    } else {
      this.x = this.x - noise(1000000)*15;
    }
    this.y = this.y - noise(100)*10;
  }
  
  // Checks for collision
  this.collide = function(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d * 1.1 < this.r + other.r) {
      return true;
    } else {
      return false;
    }
  }

}

