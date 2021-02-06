
var monkey ,monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup, ground;
var score=0;
var survivalTime=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameOverImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_stop = loadAnimation("sprite_6.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameOver.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(60,450,20,20)

  monkey.addAnimation("monkey_running", monkey_running);
  monkey.addAnimation("monkey_stop", monkey_stop);
  monkey.scale = 0.2;
  
  ground = createSprite(300,560,1500,90);
  ground.velocityX=-5;
  ground.shapeColor = "brown";
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
background("lightblue");
  
  if (gameState === PLAY){
  
  if (ground.x<0){
    
    ground.x = 300;
  }
    
    stroke("black");
  strokeWeight(5);
  textSize(25);
  fill("white");
  survivalTime = Math.ceil(frameCount/frameRate()); 
  text("Survial Time:"+survivalTime,250,50);
  
  text("Score:"+score,450,50);
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  
  if(keyDown("space")){
    
    monkey.velocityY = -10;
  }
    monkey.velocityY = monkey.velocityY+0.5;
  
  monkey.collide(ground); 
  
  if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score=score+1;
  } 
    
  spawnBananas();
  spawnObstacles();
  }
  
  if (gameState === END){
    
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    ground.velocityX = 0;
    monkey.collide(ground); 
    
    monkey.changeAnimation("monkey_stop",monkey_stop);
    
    gameOver = createSprite(300,300)
    gameOver.addImage(gameOverImage);
    gameOver.scale = 0.5;
    
  }
  
  drawSprites();
  
  
  
}

function spawnBananas(){
  
  if (frameCount % 120 === 0) {
    
    var x = Math.round(random);
    
    banana = createSprite(600, Math.round(random(100,450)), 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX=-5;
    
    banana.lifetime=400;
    
    bananaGroup.add(banana);
}
}

function spawnObstacles(){
  
  if (frameCount % 300 === 0){
    
    obstacle = createSprite(600,480,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3       ;
    obstacle.velocityX = -5;
    
    obstacle.lifetime = 400;
    
    obstacleGroup.add(obstacle);
  }
  
}





