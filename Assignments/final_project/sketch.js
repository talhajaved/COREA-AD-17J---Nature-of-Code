var start_x = 150;
var x_incr, y_incr;
var teamsData;
var teamsDict = {};
var standingsData = [];
var fixturesData;
var fixturesDict = {};
var matchdayCompleted = 22;
var colorsDict = {};
var shortNamesDict = {};
var circleRad = 15;
var cont = 0;
var board;
var drawnMatchesArray = [];
var bettingOddsTable;
var bettingOddsDict = {};
var shortNamesArray = [];

var selectMenu;



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

  var bettingOddsURL = "data/odds.csv"
  bettingOddsTable = loadTable('data/match_betting_odds.csv','header');

  var colorsURL = "data/team_colors.json";
  colorsDict = loadJSON(colorsURL);
  var shortNamesURL = "data/team_short_names.json";
  shortNamesDict = loadJSON(shortNamesURL);
 
}

function setup() {
  createCanvas(3000,1000);
  board = createGraphics(3000,1000);
  board.background(255,255,255);
  y_incr = floor(height/21);
  board.stroke(0,0,0,100);
  for (i = 0; i < height; i = i + y_incr) {
    board.line(0,i,width,i);
  }
  x_incr = (width - start_x)/40;
  for (i = start_x; i < width; i = i + x_incr) {
    board.line(i,0,i,height);
  }

  for (i = 0; i < 39; i++) {
    var x_coor = start_x + x_incr/4 + i * x_incr;
    fill(0);
    textStyle(NORMAL);
    noStroke();
    textSize(20);
    text(""+i, x_coor, 2 * y_incr/3);
  }


  selectMenu = getElement('menu');
  
  // load all teams
  for (i = 0; i<teamsData['count']; i++){
    var teamURL = teamsData['teams'][i]["_links"]["self"]["href"];
    var teamName = teamsData['teams'][i]["name"];
    var teamShortName = teamsData['teams'][i]["shortName"]
    teamsDict[teamName] = new Team(teamURL, teamName, teamShortName);
    shortNamesArray.push(shortNamesDict[teamName]);
  }
  shortNamesArray.sort();
  for (i in shortNamesDict){
    for (x in shortNamesArray){
      if (shortNamesArray[x] == shortNamesDict[i]) {
        var tempX = x;
        teamsDict[i].updateStanding(0,++tempX);
        var R = colorsDict[i][0];
        var G = colorsDict[i][1];
        var B = colorsDict[i][2];
        var y_coor = 1.7 * y_incr + x * y_incr;
        board.fill(R,G,B);
        board.textStyle(NORMAL);
        board.noStroke();
        board.textSize(22);
        var teamName = shortNamesArray[x];
        board.text(teamName, 4, y_coor);
      }
    }
  }
  for (i = 1; i<21; i++){
    board.fill(0);
    var y_coor = 1 * i * y_incr + 32;
    board.text(i + "", 170, y_coor);
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

  // load bettings odds
  for (i = 1; i < bettingOddsTable.rows.length; i++){
    var home = bettingOddsTable.rows[i].get(0);
    var away = bettingOddsTable.rows[i].get(1);
    bettingOddsDict[[home,away]] = [bettingOddsTable.rows[i].get(3),
    bettingOddsTable.rows[i].get(4),bettingOddsTable.rows[i].get(5)] 
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
      var homeTeam = shortNamesDict[x.homeTeamName];
      var awayTeam = shortNamesDict[x.awayTeamName];
      var tempOddsArray = bettingOddsDict[[homeTeam, awayTeam]];
      fixturesDict[tempMatchID].addOdds(tempOddsArray[0],tempOddsArray[1],tempOddsArray[2]);
    }
  }

  var selected = selectMenu.elt.value;
  for (x in teamsDict){
    var tempTeam = teamsDict[x];
    var R = colorsDict[x][0];
    var G = colorsDict[x][1];
    var B = colorsDict[x][2];
    if (selected == "All") var A = 255;
    else A = 50;
     if (x == "Manchester United FC") A = 255;
    board.noFill();
    board.stroke(R,G,B,A);
    board.strokeWeight(5.0);
    board.strokeJoin(ROUND);
    board.beginShape();
    startingPosition = true;
    for (y in tempTeam.standings){
      if (startingPosition){
        startingPosition = false;
        continue;
      }
      var x_coor = start_x + x_incr/2 + y * x_incr;
      var y_coor = tempTeam.standings[y] * y_incr + y_incr/2;
      board.vertex(x_coor,y_coor) ;
      
    }
    board.endShape();
    board.noStroke();
    startingPosition = true;
    for (y in tempTeam.standings){
      var x_coor = start_x + x_incr/2 + y * x_incr;
      var y_coor = tempTeam.standings[y] * y_incr + y_incr/2;
      var tempFixtureID = tempTeam.fixtures[y];
      if (startingPosition){
        startingPosition = false;
        continue;
      }
      board.fill(R,G,B,A );
      if (fixturesDict[tempFixtureID].imp) {
        board.rectMode(CENTER);
        board.rect(x_coor,y_coor,circleRad+10,circleRad+10);
        drawnMatchesArray.push([x_coor,y_coor,tempFixtureID]);
      } else {
        board.ellipse(x_coor,y_coor,circleRad,circleRad); 
        drawnMatchesArray.push([x_coor,y_coor,tempFixtureID]);
      }
    }
  }
}

function optionSelected(){
  var tempBoard;
  tempBoard = createGraphics(3000,1000);
  tempBoard.background(255,255,255);
  tempBoard.stroke(0,0,0,100);
  for (i = 0; i < height; i = i + y_incr) {
    tempBoard.line(0,i,width,i);
  }
  for (i = start_x; i < width; i = i + x_incr) {
    tempBoard.line(i,0,i,height);
  }

  var selected = selectMenu.elt.value;

  for (x in teamsDict){
    var tempTeam = teamsDict[x];
    var R = colorsDict[x][0];
    var G = colorsDict[x][1];
    var B = colorsDict[x][2];
    var A = 30;
    if (selected == "All") A = 255;
    if (x == selected) A = 255;
    tempBoard.noFill();
    tempBoard.stroke(R,G,B,A);
    tempBoard.strokeWeight(5.0);
    tempBoard.strokeJoin(ROUND);
    tempBoard.beginShape();
    startingPosition = true;
    for (y in tempTeam.standings){
      if (startingPosition){
        startingPosition = false;
        continue;
      }
      var x_coor = start_x + x_incr/2 + y * x_incr;
      var y_coor = tempTeam.standings[y] * y_incr + y_incr/2;
      tempBoard.vertex(x_coor,y_coor) ;
      
    }
    tempBoard.endShape();
    tempBoard.noStroke();
    startingPosition = true;
    for (y in tempTeam.standings){
      var x_coor = start_x + x_incr/2 + y * x_incr;
      var y_coor = tempTeam.standings[y] * y_incr + y_incr/2;
      var tempFixtureID = tempTeam.fixtures[y];
      if (startingPosition){
        startingPosition = false;
        continue;
      }
      tempBoard.fill(R,G,B,A );
      if (fixturesDict[tempFixtureID].imp) {
        tempBoard.rectMode(CENTER);
        tempBoard.rect(x_coor,y_coor,circleRad+10,circleRad+10);
      } else {
        tempBoard.ellipse(x_coor,y_coor,circleRad,circleRad); 
      }
    }
  }
    for (i in shortNamesDict){
    for (x in shortNamesArray){
      if (shortNamesArray[x] == shortNamesDict[i]) {
        var tempX = x;
        teamsDict[i].updateStanding(0,++tempX);
        var R = colorsDict[i][0];
        var G = colorsDict[i][1];
        var B = colorsDict[i][2];
        var A = 30;
        if (selected == "All") A = 255;
        if (i == selected) A = 255;
        var y_coor = 1.7 * y_incr + x * y_incr;
        tempBoard.fill(R,G,B,A);
        tempBoard.textStyle(NORMAL);
        tempBoard.noStroke();
        tempBoard.textSize(22);
        var teamName = shortNamesArray[x];
        tempBoard.text(teamName, 4, y_coor);
      }
    }
  }
  for (i = 1; i<21; i++){
    tempBoard.fill(0);
    var y_coor = 1 * i * y_incr + 32;
    tempBoard.text(i + "", 170, y_coor);
  }

  board = tempBoard;
}

function draw(){
  background(255,255,255);
  image(board,0,0);
  var expandedMatches = [];

  textSize(22);
  text("Color Key", 25, 33);

  textSize(15);
  text("Matchday", 153, 19);
  text(" /Position", 152, 39);

  for (i = 1; i < 39; i++) {
    if (i<10) var x_coor = start_x + .42*x_incr + i * x_incr;
    else var x_coor = start_x + x_incr/3 + i * x_incr;
    fill(0);
    textStyle(NORMAL);
    noStroke();
    textSize(20);
    text(""+i, x_coor, 2 * y_incr/3);
  }

  for (i = 0; i<drawnMatchesArray.length;i++) {
    var d = dist(mouseX, mouseY, drawnMatchesArray[i][0], drawnMatchesArray[i][1]);
    if (d < circleRad) {
      expandedMatches.push([drawnMatchesArray[i][0], drawnMatchesArray[i][1],drawnMatchesArray[i][2]]);
    }
  }

  var rectDrawn = false;
  for (i = 0; i<expandedMatches.length;i++){
    var matchDetails = createGraphics(500,500);
    var tempFixture = fixturesDict[expandedMatches[i][2]];
    var homeTeam = shortNamesDict[tempFixture.homeTeamName];
    var awayTeam = shortNamesDict[tempFixture.awayTeamName];
    var tempText = homeTeam + "  " + tempFixture.goalsHomeTeam + " - " + tempFixture.goalsAwayTeam + "  " + awayTeam;
    rectMode(CORNER);
    fill(180,180,180,200);
    var x_coor = expandedMatches[i][0];
    var y_coor = expandedMatches[i][1];
    if (!rectDrawn){
      rectDrawn = true;
      rect(x_coor,y_coor,420,75*expandedMatches.length);
    }
    fill(0);
    textStyle(NORMAL);
    noStroke();
    textSize(30);
    text(tempText,x_coor + 15,expandedMatches[i][1] + 30 + i * 75)
    text("Date: " + tempFixture.date,x_coor + 15,expandedMatches[i][1]+60+ i * 75)
  }
  
}



