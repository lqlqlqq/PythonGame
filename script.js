//Zombie Thanksgiving Game template

// Declare resources
let resources = {images:[
                          {id:"bk", src:"images/abk.jpg"}, 
                          {id:"wraith", src:"images/wraith.png"},
                          {id:"loba", src:"images/loba.png"},
                          {id:"crosshair", src:"images/crosshair.png"},
                          {id:"logo",src:"images/logo.png"},
  

                  ],       
                 audios:[
                         {id:"gun", src:"audios/Gun.mp3"},
                         {id:"WH", src:"audios/WraithHited.mp3"},
                         {id:"LH", src:"audios/LobaHited.mp3"},
                         {id:"die", src:"audios/Die.mp3"}
                   
                          
                  ]
                };


// Load resources and start game loop
function preload(){
  game = new Game("game"); // game object (uses canvas id)
  game.preload(resources); // preloads "resources"

  game.state = init; //sets state of game to execute init() function
  gameloop(); //first call to gameloop() function
}
document.onload = preload(); //when page loads, call preload() function


// Control the state of the game
function gameloop(){
  game.processInput(); // handle mouse & key actions (input)
  
  if(game.ready){ // game.ready becomes true when resources have loaded
    game.state(); // determine function to execute based on current state of game
  }

  game.update(); // refresh canvas
  setTimeout(gameloop, 10); //call up gameloop every 10ms
}

// Create game objects and initialize game settings
function init(){
  bk = new Sprite(game.images.bk, game);//creates an image object 
  bk.scale = 0.5; //scale the image down to 50% of original size
  wraith = new Sprite(game.images.wraith, game); //creates an image for wraith
  wraith.scale = 0.3; //scale the image down to 30% of original size
  wraith.setVector(2,45); 
  loba = new Sprite(game.images.loba, game); // image for loba
  loba.scale = 0.1; //scale the image down to 10% of original size
  loba.setVector(2,-45);
  crosshair = new Sprite(game.images.crosshair, game); //image for crosshair
  crosshair.scale = 0.3; //scale the image down to 30% of original size
  logo = new Sprite(game.images.logo, game) //image for startscreen logo
  f = new Font("28pt", "Arial", "white","black") // new font
  gun = new Sound(game.audios.gun) // sound for gun
  WH = new Sound(game.audios.WH) // sound for wraith
  LH = new Sound(game.audios.LH) // sound for loba
  die = new Sound(game.audios.die) // sound for loba die
  game.state = startScreen;//sets state of game to execute main() function
}
function startScreen(){  //function that show what will show on startscreen
  bk.draw()
  logo.draw()
  game.drawText("Click the left mouse button to begin", game.width / 2 - 300, game.height -100,f)
  if(mouse.leftClick){//if mouse left lick the sound of gun will play and game start
    gun.play()
    game.state = main
  }
}
// Main program (Game logic)
function main(){
  bk.draw();// draws the sprite on the game canvas
  wraith.move(true);
  loba.move(true)
  crosshair.moveTo(mouse.x , mouse.y)
  if(wraith.collidedWith(loba)){
    LH.play() //play sound for loba
    WH.play() //play sound for wraith
    wraith.health -= 5
    wraith.moveTo(randint(100,860), randint(100,500))
  }
  game.drawText(wraith.health,wraith.x,wraith.y+70,f)
  if(loba.collidedWith(mouse) && mouse.leftClick){
    die.play()
    loba.health -= 5
    loba.speed += 0.5
    loba.moveTo(randint(100,860), randint(100,500))
  }
  if(mouse.leftClick){ //if left click the sound of gun will play
    gun.play()
  }
  game.drawText(loba.health,loba.x,loba.y+ 100,f)
  if(wraith.health < 0 || loba.health< 0){
    game.state = gameOver;
  }
  function gameOver(){ //types of gameover
  bk.draw()
  game.drawText("Game over", game.width/2 -200, game.height/2,new Font("70pt","Arial","white","black"))
  if(wraith.health<0){
    game.drawText("You lose",game.width/2-150, game.height/2 +100,new Font("50pt","Arial","red","black"))
  }else{
    game.drawText("You win",game.width/2-150, game.height/2 +100,new Font("50pt","Arial","green","black"))
  }
}

}
