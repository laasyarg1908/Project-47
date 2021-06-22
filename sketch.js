
var plane, planeImg;
var asteroid, asteroidImg;
var bg;
var missile, missileImg;
var missileGroup, asteroidGroup;
var score = 0;
var gamestate = "play";
var earth;

function preload()
{
  //loading all images
    planeImg = loadImage("img/plane.png");
    asteroidImg = loadImage("img/asteroid.png");
    bg = loadImage("img/bg.jpg");
    missileImg = loadImage("img/missile.png");
}


function setup() 
{
  createCanvas(800, 600);

  //creating plane
    plane = createSprite(400, 500, 50, 50);
    plane.addImage(planeImg);
    plane.scale = 0.3;
    plane.debug = true;
    plane.setCollider("rectangle", 0, -30, 450, 40);

    asteroidGroup = new Group();
    missileGroup = new Group();

    earth = createSprite(400, 595, 800, 10);

}

function draw() 
{

  if (gamestate === "play")
  {
    background(bg);  

    //making plane move according to arrow keys
    if (keyDown(RIGHT_ARROW))
    {
      plane.x = plane.x + 10;
    }

    if (keyDown(LEFT_ARROW))
    {
      plane.x = plane.x - 10;
    }

    //calling asteroid spawning function
    spawnAsteroids();

    if (keyDown("space"))
    {
      createMissile();
    }

    //destroying missile and asteroid if they collide
    if (asteroidGroup.isTouching(missileGroup))
    {
      asteroidGroup.destroyEach();
      missileGroup.destroyEach();
      score += 1;
    }

    drawSprites();

    fill("white");
    textSize(20);
    text("UsE aRrOw KeYs tO MoVe aNd SpAcE kEy To sHoOt!", 150, 20);

    fill("white");
    textSize(20);
    text("SCORE: "+score, 40, 120);

    if (asteroidGroup.isTouching(earth) || asteroidGroup.isTouching(plane))
    {
      gamestate = "end";
    }

  }

  if (gamestate ===  "end")
  {
    if (asteroidGroup.isTouching(earth))
    {
      asteroidGroup.destroyEach();
      missileGroup.destroyEach();
      plane.destroy();
      background("black");
      textSize(30);
      fill("red");
      text("MISSION FAILED...EARTH DESTROYED", 200, 300);

    }
    else 
    if (asteroidGroup.isTouching(plane))
    {
      asteroidGroup.destroyEach();
      missileGroup.destroyEach();
      plane.destroy();
      background("black");
      textSize(30);
      fill("red");
      text("YOUR JET IS DESTROYED...MISSION FAILED", 150, 300);
    }
  }

}

//function to create asteroids every 60 frames
function spawnAsteroids()
{
    if(frameCount % 60 === 0)
    {          
      asteroid = createSprite(random(50, 550), 10, 30, 30);
      asteroid.addImage(asteroidImg);
      asteroid.scale = 0.15;
      asteroid.velocityY = 4 + frameCount/240;
      asteroid.lifetime = 200;
      //asteroid.debug = true;   
      asteroidGroup.add(asteroid);
    }
}

//creating missile
function createMissile()
{
  missile = createSprite(plane.x, 470, 20, 50);
  missile.addImage(missileImg);
  missile.scale = 0.15;
  missile.velocityY = -5;
  missile.lifetime = 200;
  //missile.debug = true;
  missile.setCollider("rectangle", 0, 0, 30, 50);
  missileGroup.add(missile);
}
