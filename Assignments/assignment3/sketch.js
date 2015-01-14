// constans and variables
var particlesArray = [];
var numberOfBubbles = 25;
var img;
var timeDiff = 0;

function setup() {
	// sets up canvas and loads the background and sound
  createCanvas(1200,600);
  img = loadImage("water-background.jpg");  // Load the image 
  sound1 = loadSound('pop.mp3');
  sound2 = loadSound('pop2.mp3');
}

function draw() {
	background(img);
	// adds a new bubbles
	if (particlesArray.length < numberOfBubbles)
	{
		var startX = random(0,width);
		var randomRadius = random(10,30)
		var p1 = new Particle(startX,height,randomRadius);
		setTimeout(particlesArray.push(p1),timeDiff);
		timeDiff = timeDiff + 0;
	}

	var poppedParticles = [];
	var playSound = false;
	// Creates and causes the bubbles to rise
	// Also checks for collision, popping the colliding bubbles
	for (i = 0; i < particlesArray.length; i++)
	{
		particlesArray[i].display();
		particlesArray[i].rise();
		if (particlesArray[i]. y < 0){
			poppedParticles.push(i);
			break;
		}
		for (j = 0; j < particlesArray.length; j++)
		{
			if (j == i) {
				continue;
			}
			if (particlesArray[i].collide(particlesArray[j])){
				playSound = true;
				if (poppedParticles.indexOf(i) == -1) {
					poppedParticles.push(i);
				}
				if (poppedParticles.indexOf(j) == -1) {
					poppedParticles.push(j);
				}
			}
		}
	}

	// Plays a popping sound when a bubble is popped
	if (playSound){
		var temp = random(0,10);
		if (temp > 5) {
			sound1.play();
		}
		else sound2.play();
	}

	poppedParticles.sort();
	var subDiff = 0;
	for (i = 0; i < poppedParticles.length; i++) {
		var temp = poppedParticles[i] - subDiff;
		particlesArray.splice(temp, 1);
		subDiff++;
	}
}