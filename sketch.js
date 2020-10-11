var gameState = PLAY;
var PLAY = 1;
var END = 0;
var monkey , monkey_running;
var banana ,bananaImage,stone, stoneImage;
var jungle, jungleImage;
var FoodGroup, stoneGroup;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() {
  
  monkey_running =loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png","Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  
  jungleImage = loadImage("jungle.jpg");


  
}

function setup() {
  createCanvas(400, 400);
  
    // creating the jungle
  jungle = createSprite(200,200,400,400);
  jungle.addImage( jungleImage);
  jungle.x = jungle.width/2; 
  jungle.velocityX = -4;
  
  
  //creating the monkey
  monkey = createSprite(40,360,10,10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  //creating the banana
  ground = createSprite(200,370,400,5);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.visible = false;

  //creating the foodGroup
  FoodGroup = new Group();

  //creating the stoneGroup
  stoneGroup = new Group();

  score = 0;
}

function draw() {
  background(255);
    
  if(gameState === PLAY) {
  
  //making the ground reset when its X position reaches 0
  if(ground.x > 0) {
  ground.x = ground.width/2;
  }
  //making the jungle reset when its X position reaches 0
  if(jungle.x < 0) {
    jungle.x = jungle.width/2;
  }
  
  //making the monkey move when the space button is tapped
  if(keyDown("space")) {
  monkey.velocityY = -12;
  }
    monkey.velocityY = monkey.velocityY + 0.8;

  //making the monkey collide with the ground
  monkey.collide(ground);
  

  
  //spawning the food and the obstacles
  spawnFood();
  spawnObstacles();



  if(stoneGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
 
   }
      if(FoodGroup.isTouching(monkey))
  {
    score = score + 2;
    FoodGroup.destroyEach();
   
    
     switch(score)
   {
        case 10: monkey.scale = 0.2;
        break;
        case 20: monkey.scale = 0.3;
        break;
        case 30: monkey.scale = 0.4;
        break;
        case 40: monkey.scale = 0.5;
        break;
        case 50: monkey.scale = 0.6;
        break;
        case 60: monkey.scale = 0.7;
        break;
        case 70: monkey.scale = 0.8
        break;
        default: break;
    }
   }
  }
    if(stoneGroup.isTouching(monkey)) {
     
    monkey.scale = 0.1;
    stoneGroup.destroyEach();
    gameState = END;
    }
  
if(gameState === END) {
    FoodGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    jungle.velocityX = 0;
    score = 0;
}
    drawSprites();
    //displaying the score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50); 
  
 //creating the function to spawn food
 function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,160,10,10);
    banana.y = random(150,300);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

//creating the function to spawn obstacles
function spawnObstacles() {
  if(frameCount % 300 === 0) {
   stone = createSprite(400,350,10,10);
   stone.velocityX = -6;
    
    //add image to the obstacle 
   stone.addImage(stoneImage);
    stone.scale=0.15;
    
    //lifetime to the stone    
    stone.lifetime = 300;
    
    //add each obstacle to the group
    stoneGroup.add(stone);
  }
}
}