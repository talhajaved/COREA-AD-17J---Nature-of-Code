function Particle(tempX, tempY, tempR, tempL, tempColor) {
  // Particle Attributes
  this.r = tempR;
  this.color = tempColor;
  this.historyX = [tempX];
  this.historyY = [tempY];
  this.trailLength = tempL;
  for (i = 0; i < this.trailLength; i++)
  {
    this.historyX.push(tempX);
    this.historyY.push(tempY);
  }

  // Method that updates the history of mouse location
  this.updateHistory = function(newX, newY) {
    if (!(this.historyX.length < this.trailLength))
    {
      this.historyX.shift();
      this.historyY.shift();
    }
    this.historyX.push(newX);
    this.historyY.push(newY);
  }

  // Draws the circles with decreasing radius and opacity corresponding
  // to the the coordinates in the mouse location history
  this.display = function() {
    noStroke(0);
    var opacPercentage = 100;
    var radPercentage = 100;
    var colorR = this.color[0];
    var colorG = this.color[1];
    var colorB = this.color[2];
    var percentageDec = 100/this.trailLength;
    for (i = this.historyX.length -1 ; i > -1; i--) {
      var rad = this.r * radPercentage * 0.01;
      var opac = 255 * opacPercentage * 0.01;
      fill(colorR,colorG,colorB,opac);
      ellipse(this.historyX[i], this.historyY[i], rad*2, rad*2);
      opacPercentage = opacPercentage - percentageDec;
      radPercentage = radPercentage - percentageDec;
    }
  }
  
  // Changes the color of circles drawn
  this.changeColor = function(newColor) {
    this.color = newColor;
  }
}

