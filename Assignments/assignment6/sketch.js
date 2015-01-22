var leagueStandingsData;

function preload() {
  var leagueStandingsURL = "data.json"
  leagueStandingsData = loadJSON(leagueStandingsURL);
}

function setup() {
  createCanvas(800,900);
  background(255);

  noStroke();
  fill(152,251,152);
  rect(0,175,740,140);
  fill(250,128,114);
  rect(0,770,740,105);


  // vertical lines
  stroke(0,0,0);
  line(75,130,75,876);
  for (i = 1; i < width; i++){
    var x_coor = i * 80 + 260;
    line(x_coor,130,x_coor,876);
  }

  // horizontal lines
  line(0,130,740,130);
  for (i = 5; i < height; i++){
    var y_coor = i * 35;
    line(0,y_coor,740,y_coor);
  }

  // title text
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(45);
  fill(0,0,255);
  noStroke();
  var title = leagueStandingsData.leagueCaption;
  text(title, 370,65);

  // Sub-heading text
  textStyle(NORMAL);
  textSize(30);
  fill(0);
  text("Matchday: "+ leagueStandingsData.matchday,370,105);

    // Standings text
  textSize(20);
  var standings = leagueStandingsData.standing
  var start_x = 200;
  for (i in standings){
    textAlign(LEFT);
    text(standings[i].teamName,100,35*i + start_x);
    textAlign(CENTER);
    var x = parseInt(i) + 1;
    text(x+"",40,35*i + start_x);
    text(standings[i].playedGames+'',380,35*i + start_x);
    text(standings[i].goals+'',460,35*i + start_x);
    text(standings[i].goalsAgainst+'',540,35*i + start_x);
    text(standings[i].goalDifference+'',620,35*i + start_x);
    text(standings[i].points+'',700,35*i + start_x); 
  }

  textStyle(BOLD);
  textSize(23);
  textAlign(LEFT);
  text('Team',175,start_x - 38);
  textAlign(CENTER);
  text("#",40,start_x - 38);
  text('P',380,start_x - 38);
  text('GF',460,start_x - 38);
  text('GA',540,start_x - 38);
  text('GF',620,start_x - 38);
  text('PTS',700,start_x - 38);

 }
