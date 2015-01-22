var start_x = 150;
var x_incr, y_incr;
var teamsData;
var teamsDict = {};
var standingsData = [];
var fixturesData;
var fixturesDict = {};
var matchdayCompleted = 22;
var colorsDict = {};
var circleRad = 15;
var cont = 0;

// A list for all of our particles

function preload() {
  var teamsURL = "data/teams.json";
  teamsData = loadJSON(teamsURL);

  for (i = 1; i <= matchdayCompleted; i++)
  {
    var standingsURL = "data/standings/matchday" + i + ".json";
    standingsData.push(loadJSON(standingsURL));
  }

  var fixturesURL = "data/fixtures.json";
  fixturesData = loadJSON(fixturesURL);

  var colorsURL = "data/colors.json";
  colorsDict = loadJSON(colorsURL);
}

function setup() {
  createCanvas(3000,1000);
  background(255,255,255);
  y_incr = floor(height/21);
  for (i = 0; i < height; i = i + y_incr) {
    line(0,i,width,i);
  }
  x_incr = (width - start_x)/40;
  for (i = start_x; i < width; i = i + x_incr) {
    line(i,0,i,height);
  }

  for (i = 0; i < 39; i++) {
    var x_coor = start_x + x_incr/4 + i * x_incr;
    fill(0);
    textStyle(NORMAL);
    noStroke();
    textSize(20);
    text(""+i, x_coor, 2 * y_incr/3);
  }
  
  // var leagueURL = "http://api.football-data.org/alpha/soccerseasons/354/teams";
  // loadJSON(leagueURL,dataLoaded);
  
  // load all teams
  for (i = 0; i<teamsData['count']; i++){
    var teamURL = teamsData['teams'][i]["_links"]["self"]["href"];
    var teamName = teamsData['teams'][i]["name"];
    var teamShortName = teamsData['teams'][i]["shortName"]
    teamsDict[teamName] = new Team(teamURL, teamName, teamShortName);
  }

  // load the standings of all matchdays
  for (i = 0; i<standingsData.length; i++){
    var matchdayStandings = standingsData[i].standing;
    var matchday = standingsData[i].matchday;
    for (j = 0; j<matchdayStandings.length; j++){
      var tempTeamName = matchdayStandings[j]["teamName"];
      var tempTeam = teamsDict[tempTeamName];
      tempTeam.updateStanding(matchday,matchdayStandings[j]["position"])
    }
  }

  // load all fixtures
  for (i in fixturesData.fixtures){
    var x = fixturesData.fixtures[i];
    if (x.matchday <= matchdayCompleted){
      var tempMatchID = x._links.self.href.slice(-6);
      fixturesDict[tempMatchID] = new Fixture(
        tempMatchID, x._links.self.href, x.date, x.matchday,
        x.homeTeamName, x.awayTeamName,
        x.result.goalsHomeTeam, x.result.goalsAwayTeam);
      var tempHomeTeam = teamsDict[x.homeTeamName];
      tempHomeTeam.addMatch(x.matchday, tempMatchID);
      var tempAwayTeam = teamsDict[x.awayTeamName];
      tempAwayTeam.addMatch(x.matchday, tempMatchID);
    }
  }

}

// function dataLoaded(jsonData) {
//   teamsData = jsonData;

//   for (i = 0; i<teamsData['count']; i++){
//     var teamURL = teamsData['teams'][i]["_links"]["self"];
//     var teamName = teamsData['teams'][i]["name"];
//     var teamShortName = teamsData['teams'][i]["shortName"]
//     teamsArray.push(Team(teamURL))
//   }

// }




function draw(){
  background(255,255,255);

  for (i = 0; i < height; i = i + y_incr) {
    stroke(0),
    line(0,i,width,i);
  }

  for (i = start_x; i < width; i = i + x_incr) {
    line(i,0,i,height);
  }

  for (i = 0; i < 39; i++) {
    var x_coor = start_x + x_incr/4 + i * x_incr;
    fill(0);
    textStyle(NORMAL);
    noStroke();
    textSize(20);
    text(""+i, x_coor, 2 * y_incr/3);
  }

  var drawnMatchesArray = [];
  for (x in teamsDict){
    var tempTeam = teamsDict[x];
    var R = colorsDict[x][0];
    var G = colorsDict[x][1];
    var B = colorsDict[x][2];
    noFill();
    stroke(R,G,B);
    strokeWeight(5.0);
    strokeJoin(ROUND);
    beginShape();
    for (y in tempTeam.standings){
      var x_coor = start_x + x_incr/2 + y * x_incr;
      var y_coor = tempTeam.standings[y] * y_incr + y_incr/2;
      vertex(x_coor,y_coor) 
    }
    endShape();
    noStroke();
    for (y in tempTeam.standings){
      var x_coor = start_x + x_incr/2 + y * x_incr;
      var y_coor = tempTeam.standings[y] * y_incr + y_incr/2;
      var tempFixtureID = tempTeam.fixtures[y];
      fill(R,G,B);
      if (fixturesDict[tempFixtureID].imp) {
        rectMode(CENTER);
        rect(x_coor,y_coor,circleRad+5,circleRad+5);
        drawnMatchesArray.push([x_coor,y_coor,tempFixtureID]);
      } else {
        ellipse(x_coor,y_coor,circleRad,circleRad); 
        drawnMatchesArray.push([x_coor,y_coor,tempFixtureID]);
      }
    }

    for (i = 0; i<drawnMatchesArray.length;i++) {
      var d = dist(mouseX, mouseY, drawnMatchesArray[i][0], drawnMatchesArray[i][1]);
      if (d < circleRad) {
        ellipse(0,0,100,100);
      }
    }
    
  }
println(cont);

//   for (i = 0; i < 39; i++) {
//     var x_coor = start_x + x_incr/4 + i * x_incr;
//     fill(0);
//     textStyle(NORMAL);
//     noStroke();
//     textSize(20);
//     text(""+i, x_coor, 2 * y_incr/3);
//   }
//   noFill();
//   stroke(0,0,255);
//   strokeWeight(5.0);
//   strokeJoin(ROUND);
//   beginShape();
//   for (i=0; i<chelsea_position.length; i++) {
//     var x_coor = start_x + x_incr/2 + i * x_incr;
//     var y_coor = chelsea_position[i] * y_incr + y_incr/2;
//     vertex(x_coor,y_coor) 
//   }
//   endShape();
}

    matchDetails.fill(0);
    matchDetails.textStyle(NORMAL);
    matchDetails.noStroke();
    matchDetails.textSize(20);
    matchDetails.text(tempText,0,0);
    // matchDetails.text("Date: " + tempFixture.date);
    image(matchDetails,100,100,200,200);


