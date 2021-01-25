
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var balloon,balloonAnimation;
var background, backgroundimg;

var database;

var bigballoon, smallballoon;

function preload()
{
	backgroundimg = loadImage("MASTER BOILER/Hot Air Balloon-01.png");
	balloonAnimation = loadImage("MASTER BOILER/Hot Air Balloon-02.png");
	bigballoon = loadImage("MASTER BOILER/Hot Air Balloon-03.png")
	smallballoon = loadImage("MASTER BOILER/Hot Air Balloon-04.png")
}

function setup() {
	createCanvas(500, 500);

	database = firebase.database();

	engine = Engine.create();
	world = engine.world;
	//Refer and Read Balloon's Position
	var balloonpositionref = database.ref("Balloon/Position");
	balloonpositionref.on("value",readposition,showerror);
	//Create the Bodies Here.

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  //background(0);
  background(backgroundimg,500,500);
  balloon(balloonAnimation,100,50);

  textSize(20);
  fill("RED");
  text("USE ARROW KEYS TO MOVE THE HOT AIR BALLOON",150,100)
  stroke(4)

  if(keyDown(LEFT_ARROW)) {
	  balloon.x = balloon.x - 10;

	  else if(keyDown(RIGHT_ARROW)) {
		  balloon.x = balloon.x + 10;
	  }

	  else if(keyDown(UP_ARROW)) {
		  balloon.y = balloon.y -10;
	  }

	  else if(keyDown(DOWN_ARROW)){
		balloon.y = balloon.y + 10;
	  }
  }

  if (keyDown(LEFT_ARROW)) {
	  writeposition(-1,0);
  }

  if (keyDown(RIGHT_ARROW)) {
	 writeposition(1,0);
}

	if (keyDown(UP_ARROW)) {
	 writeposition(0,-1);
}

	if (keyDown(LEFT_ARROW)) {
	 writeposition(0,1);
}

if(keyDown(UP_ARROW)) {
	updateposition(0,-10);
	balloon.addAnimation("smallhotairballoon",smallballoon);
	balloon.scale = balloon.scale -0.01;
}

if(keyDown(DOWN_ARROW)) {
	updateposition(0,+10);
	balloon.addAnimation("bighotairballoon",bigballoon);
	balloon.scale = balloon.scale -0.01;
}

  drawSprites();
};

//Change Balloon's Position
function writeposition(x,y) {
	database.ref("Balloon/Position").set({
		x : position.x + x,
		y : position.y + y
	})
	balloon.x = balloon.x + x;
	balloon.y = balloon.y + y;
}

//Update Balloon's position
function readposition (airballoon) {
	position = airballoon.val();
	balloon.x = position.x;
	balloon.y = position.y;
}

//..Show error
function showerror () {
	console.log("error occured");
}