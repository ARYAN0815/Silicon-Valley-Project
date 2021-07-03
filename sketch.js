var player
var robot
var lGun
var rgun
var playerHealth=100
var robotHealth=100
var lose
var win
var ammo=50
var gameState="play"
var bulletsGroup
var bullets1Group
var over
function preload(){
gunshot=loadSound("Images/gunshot1.mp3")
playerIMG=loadImage("Images/MEN.png")
robotIMG=loadImage("Images/r1.png")
bgIMG=loadImage("Images/fight.jpg")
lGunIMG=loadImage("Images/Gun_l1.png")
winIMG=loadImage("Images/You Win.png")
loseIMG=loadImage("Images/game over.png")
bulletsImg=loadImage("Images/bullets.png")
bullets1Img=loadImage("Images/bulls.png")
fail=loadSound("Images/fail.mp3")
bgImg1=loadImage("Images/bg img.jpg")
levelUp=loadSound("Images/level_up.mp3")
won=loadSound("Images/Tada-sound.mp3")

}
function setup() {
  createCanvas(displayWidth,displayHeight-78);
  player=createSprite(displayWidth/10,displayHeight/2,50,80)
  robot=createSprite(displayWidth/1.1,displayHeight/2,50,80)
  robot.velocityY=10
  rGun=createSprite(400,400,70,80)
  lGun=createSprite(1200,400,70,80)
  win=createSprite(displayWidth/2,displayHeight/2)
  lose=createSprite(displayWidth/2,displayHeight/2)
  edges=createEdgeSprites()
  player.addImage(playerIMG)
  robot.addImage(robotIMG)
  lGun.addImage(lGunIMG)
  win.addImage(winIMG)
  lose.addImage(loseIMG)
  bulletsGroup=new Group()
  bullets1Group=new Group()
  win.scale=0.59  
  lGun.scale=0.3
  rGun.scale=0.3
  robot.scale=0.5
  player.scale=0.6
  lose.scale=0.25
  win.visible=false
  lose.visible=false
  rGun.visible=false
 
  
}

function draw() {
  background(bgIMG);
  console.log(gameState)
   robot.setCollider("rectangle",-100,0,600,600)
  
  
  
  if(gameState=="play"){
    if (mouseIsPressed) {
    if (mouseButton === LEFT) {
    bullets();
    }
  }
  if(keyDown(UP_ARROW)){
  player.y=player.y-50
  }
  if(keyDown(DOWN_ARROW)){
  player.y=player.y+50  
  }
  rGun.y=player.y-30
  rGun.x=player.x+150
  for(var i=0;i<bulletsGroup.length;i++){
    if(bulletsGroup.get(i).isTouching(robot)){
  bulletsGroup.get(i).destroy()
   robotHealth=robotHealth-5
     
    }
 }
  for(var i=0;i<bullets1Group.length;i++){
    if(bullets1Group.get(i).isTouching(player)){
  bullets1Group.get(i).destroy()
   playerHealth=playerHealth-5
     
    }
 }
 fill("white")
  text("Player Health = "+playerHealth,300,200)
  text("ammo- "+ammo,100,100)
  text("Robot Health = "+robotHealth,600,200)
if(ammo===0||playerHealth==0){  
  fail.play()

gameState="end"
}
if(robotHealth===0&&playerHealth>0){
robotHealth=120
playerHealth=100
ammo=60
gameState="stopStage"
robot.velocityY=0

}

lGun.y=robot.y+5
lGun.x=robot.x-105
robot.bounceOff(edges)

bullets1()
}
else if(gameState==="stopStage"){
textSize(50)
fill("white")
text("press n for next level",displayWidth/3,displayHeight/2)
if(keyDown("n")){
gameState="levelUp"
levelUp.play()
robot.velocityY=15
}
}
else if(gameState==="levelUp"){
background(bgImg1)
fill("white")
text("Robot Health = "+robotHealth,600,200)
text("Player Health = "+playerHealth,300,200)
text("ammo = "+ammo,100,100)
if(keyDown(UP_ARROW)){
player.y=player.y-50
}
if(keyDown(DOWN_ARROW)){
player.y=player.y+50
}
if (mouseIsPressed) {
  if (mouseButton === LEFT) {
  bullets();
  }
}
bullets1()
rGun.y=player.y-30
rGun.x=player.x+150
lGun.y=robot.y+5
lGun.x=robot.x-105

for(var i=0;i<bulletsGroup.length;i++){
  if(bulletsGroup.get(i).isTouching(robot)){
bulletsGroup.get(i).destroy()
 robotHealth=robotHealth-5
   
  }
}
for(var i=0;i<bullets1Group.length;i++){
  if(bullets1Group.get(i).isTouching(player)){
bullets1Group.get(i).destroy()
 playerHealth=playerHealth-5
   
  }
}
robot.bounceOff(edges)

if(robotHealth===0){
gameState="win"
won.play()

}
if(playerHealth===0||ammo===0){
gameState="end1"
 fail.play()   
 
}
}
else if(gameState==="win"){
win.visible=true
robot.velocityY=0
player.velocityY=0

background(bgImg1)

}

else if(gameState=="end"){
lose.visible=true
robot.velocityY=0
player.velocityY=0
bulletsGroup.destroyEach()
bullets1Group.destroyEach()
}
else if(gameState==="end1"){
  lose.visible=true
  robot.velocityY=0
  player.velocityY=0
  bulletsGroup.destroyEach()
  bullets1Group.destroyEach()
  background(bgImg1)

}

player.collide(edges)
  drawSprites();
  console.log(gameState)
}
function bullets(){
  if(frameCount%20==0){
var bullet=createSprite(rGun.x,rGun.y,20,10)
bullet.addImage(bulletsImg)
bullet.scale=0.135
bullet.velocityX=30
ammo=ammo-1
gunshot.play()
bulletsGroup.add(bullet)
}
}
function bullets1(){
if(frameCount%30==0){
var bullet=createSprite(lGun.x-125,lGun.y,20,10)
bullet.addImage(bullets1Img)
bullet.scale=0.12
bullet.attractionPoint (30,player.x,player.y)
bullets1Group.add(bullet)
gunshot.play()
}

}
