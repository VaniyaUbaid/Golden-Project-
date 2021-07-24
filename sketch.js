var girl,bg,girlImg
var ground1,ground
var groundGroup
var rdImg,ydImg, gdImg,bdImg
var diamond1Group, diamondGroup
var score=0
var bird, birdImg,birdGroup
var gameover,gameoverImg,restart,restartImg
var PLAY=1
var END=0
var gameState= PLAY
var fall
function preload(){

bg= loadImage("background.jpg")
girlImg= loadAnimation("G1.png","G2.png","G3.png")
girlStd= loadAnimation("G1.png")
girlLeft= loadAnimation("G1flip.png","G2flip.png","G3flip.png")
girlStdLeft= loadAnimation("G1flip.png")
p1 = loadImage("pf1.png")
p2 = loadImage("pf2.png")
p3 = loadImage("pf3.png")
p4 = loadImage("pf4.png")
p5 = loadImage("pf5.png")

rdImg=loadAnimation("rd1.PNG","rd2.PNG","rd3.PNG","rd4.PNG")
bdImg=loadAnimation("bd1.PNG","bd2.PNG","bd3.PNG","bd4.PNG")
ydImg=loadAnimation("yd1.PNG","yd2.PNG","yd3.PNG","yd4.PNG")
gdImg=loadAnimation("gd1.PNG","gd2.PNG","gd3.PNG","gd4.PNG")

birdImg=loadAnimation("bird1.PNG","bird2.PNG","bird3.PNG")
fall=loadAnimation("fall1.PNG","fall2.PNG","fall3.PNG")

}



function setup() {

  createCanvas(1600,800);

  girl=createSprite(100, 350, 50, 50);
  girl.addAnimation("standing",girlStd)
  girl.addAnimation("running",girlImg)
  girl.addAnimation("left",girlStdLeft)
  girl.addAnimation("leftRunning",girlLeft)
  girl.addAnimation("falling",fall)

ground1=createSprite(100,410,200,20)
ground1.addImage(p3)
ground1.scale=1.2
groundGroup =new Group()
girl.debug= true
girl.setCollider("rectangle",0,0,50,90)
diamond1Group =new Group()
diamondGroup =new Group()
birdGroup = new Group()
gameover=createSprite(800,400,100,100)

gameover.visible=false

}

function draw() {

  background(bg);  
  if(gameState===PLAY){

  girl.collide(ground1)
  
  if(keyDown("LEFT_ARROW")){
    girl.x=girl.x-12
    girl.direction=90
    girl.changeAnimation("leftRunning",girlLeft)
  }
  if(keyWentUp("LEFT_ARROW")){
    girl.changeAnimation("left",girlStdLeft)
  }
  if(keyDown("RIGHT_ARROW")){
    girl.x=girl.x+12
    girl.changeAnimation("running",girlImg)
  }
  if(keyWentUp("RIGHT_ARROW")){
    girl.changeAnimation("standing",girlStd)
  }
  if(keyDown("UP_ARROW")){
    girl.velocityY=-5
  }
  girl.velocityY=girl.velocityY+0.5
  spawnGround()
  spawnBird()
  girl.collide(groundGroup)
  if(girl.isTouching(diamondGroup)){
    diamondGroup.destroyEach()
    score=score+5
  }
  if(girl.isTouching(diamond1Group)){
    diamond1Group.destroyEach()
    score=score+10
  }

if (girl.isTouching(birdGroup)){
  birdGroup.destroyEach()
  gameState=END
}
if(girl.y > 750|| girl.x<0){

  gameState=END
}
  }


if(gameState===END){
  birdGroup.destroyEach()
  girl.changeAnimation("falling",fall)
diamondGroup.destroyEach()
diamond1Group.destroyEach()
diamondGroup.setLifetimeEach(-1)
diamond1Group.setLifetimeEach(-1)
groundGroup.setLifetimeEach(-1)
groundGroup.setVelocityXEach(0)
groundGroup.destroyEach()
gameover.visible=true

fill("yellow")
textSize(30)
text("Press 'r' to restart", 700,550)



}
if(keyDown("r" )&& gameState===END){
  reset()
  gameState=PLAY
}


  drawSprites();
  fill ("yellow")
  textSize(25)
  text("score :"+score,800,20)

}
function spawnGround(){
  if(frameCount%50===0){
    var ground= createSprite(1600,random(200,600),random(150,300),20)
    ground.velocityX=-10
    
    ground.lifetime=200
    var rand= Math.round(random(1,5))
    switch(rand){
      case 1:ground.addImage(p1)
      break;
      case 2:ground.addImage(p2)
      break;
      case 3:ground.addImage(p3)
      break;
      case 4:ground.addImage(p4)
      break;
      case 5:ground.addImage(p5)
      break;
    }
    ground.scale=1.5
    groundGroup.add(ground)
    var dr=Math.round(random(1,3))
    var cr = Math.round(random(1,4))
    if(dr===1){
      var diamond= createSprite(1600,ground.y-40,40,40)
      diamond.velocityX=-10
      
      switch(cr){
        case 1:diamond.addAnimation("moving",rdImg)
        break;
        case 2:diamond.addAnimation("moving1",ydImg)
        break;
        case 3:diamond.addAnimation("moving2",bdImg)
        break;
        case 4:diamond.addAnimation("moving3",gdImg)
        break;
        
      }
      
      diamondGroup.add(diamond)
    }
   
    if (dr===2){
      var diamond1= createSprite(1600,ground.y-80,40,40)
      diamond1.velocityX=-10
      var diamond= createSprite(1600,ground.y-40,40,40)
      diamond.velocityX=-10

      switch(cr){
        case 1:diamond.addAnimation("moving",rdImg),
          diamond1.addAnimation("moving1",ydImg)
        break;
        case 2:diamond.addAnimation("moving",rdImg)
        diamond1.addAnimation("moving2",bdImg)
        break;
        case 3:diamond.addAnimation("moving",rdImg)
        diamond1.addAnimation("moving3",gdImg)
        break;
        case 4:diamond.addAnimation("moving2",bdImg)
        diamond1.addAnimation("moving1",ydImg)
        break;
        
      }
      diamond1Group.add(diamond1)
      diamondGroup.add(diamond)
      diamond1.lifetime=200
      diamond.lifetime=200    
    }
//    console.log(dr)
  }
}
function spawnBird(){
  if(frameCount%80 === 0){
    var bird=createSprite(1600,random(50,600),50,50)
    bird.velocityX=-12
    bird.addAnimation("flying",birdImg)
    bird.scale=0.5
    bird.lifetime=200
    birdGroup.add(bird)
  }
}
function reset(){
gameState=PLAY
gameover.visible=false
score=0
girl.x=100
girl.y=350
girl.changeAnimation("standing",girlStd)
girl.velocityX=0
}












