// Constructor
function Team(url,name,shortName) {
  this.url = url;
  this.name = name;
  this.shortName = shortName; 
  this.standings = {};
  this.fixtures = {};
}

Team.prototype.addMatch = function(matchday,matchID) {
  this.fixtures[matchday] = matchID;
}

// Change color when hit
Team.prototype.updateStanding = function(matchday,position) {
  this.standings[matchday] = position;
}

