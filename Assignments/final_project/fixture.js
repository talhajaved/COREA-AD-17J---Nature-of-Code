var oddsDiff = 2;

// Constructor
function Fixture(id,url,date,matchday,homeTeam,awayTeam,goalsHomeTeam,goalsAwayTeam) {
  this.matchID = id
  this.url = url;
  this.date = date.split("T")[0];
  this.matchday = matchday;
  this.homeTeamName = homeTeam; 
  this.awayTeamName = awayTeam; 
  this.goalsHomeTeam = goalsHomeTeam; 
  this.goalsAwayTeam = goalsAwayTeam; 
  var goalDiff = goalsHomeTeam - goalsAwayTeam;
  if (goalDiff == 0) {
  	this.result = 'Draw'
  } else if (goalDiff > 0) {
  	this.result = "HomeWin"
  } else {
  	this.result = "AwayWin"
  };
  this.imp = false;
  this.homeOdds;
  this.awayOdds;
  this.drawOdds;
}

// Change color when hit
Fixture.prototype.addOdds = function(homeOdds,drawOdds,awayOdds) {
  this.homeOdds = homeOdds;
  this.awayOdds = awayOdds;
  this.drawOdds = drawOdds;
  if ((this.homeOdds < this.awayOdds - oddsDiff) && (this.result != "HomeWin")){
  	this.imp = true;
  } else if ((this.awayOdds < this.homeOdds - oddsDiff) && (this.result != "AwayWin")){
  	this.imp = true;
  } else {
  	this.imp = false;
  }
}

