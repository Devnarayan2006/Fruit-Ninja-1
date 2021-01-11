var PLAY=1;
var END=0;
var gameState=1;

var sword,swordImage,monster,monsterImage,gameOver,gameOverImg;

var fruit1,fruit2,fruit3,fruit4;

var score;

var knifeSwooshSound,gameOverSound;


function preload(){
  swordImage=loadImage("sword.png");
  monsterImage=loadAnimation("alien1.png","alien2.png");
  
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  
  gameOverImg=loadImage("gameover.png");
  
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameOver=loadSound("gameover.mp3");
  
}

function setup(){
  
  createCanvas(400,400);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.5;

  gameOver=createSprite(200,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5
  
  
  enemyGroup=createGroup();
  fruitGroup=createGroup();
  
  score=0;
  
}

function draw(){
  background("pink");
  
  text("Score:"+score,325,40);
  
  if(gameState==PLAY){
     sword.y=World.mouseY;
  sword.x=World.mouseX;
    
    gameOver.visible=false;
  
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      //knife Swooh sound
      knifeSwooshSound.play();      
      score=score+2;
    }
    if(enemyGroup.isTouching(sword)){
      gameState=END;
      //gameover sound
      gameOver.play();
      
 }
  
} else if(gameState===END){
  gameOver.visible=true;
  enemyGroup.destroyEach();
  fruitGroup.destroyEach();
  
  fruitGroup.setVelocityX=0;
  enemyGroup.setVeloctyX=0;
  
  if(mousePressedOver(gameOver)){
    gameState=PLAY;
    score=0;
  }
      
}
  
  
  
  
 
  fruits();
  Enemy();
  
  drawSprites();
}

function fruits(){
  
        if(World.frameCount%80===0){
          fruit=createSprite(400,200,20,20);
          fruit.scale=0.2;
          r=Math.round(random(1,4));
          if(r == 1){
            fruit.addImage(fruit1);
          } else if (r == 2) {
            fruit.addImage(fruit2);
          } else if(r == 3) {
            fruit.addImage(fruit3);
          } else if (r == 4) {
            fruit.addImage(fruit4);
          }
          fruit.y=Math.round(random(50,340));

          fruit.velocityX=-(7+(score/4));
          fruit.lifetime=100;

          fruitGroup.add(fruit);
        }
  
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=- (8+(score/10));
    monster.lifetime=100;
    
    enemyGroup.add(monster);
    }
}

