//Set the move speed
const MOVE_SPEED = 150
const INVADER_SPEED = 300
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 425
const TIME_LEFT = 150
const BULLET_SPEED = 300

  //Layer
  layer(["obj", "ui"], "obj")

//Add a level to the game - the first argument is the map and the second one the object (config)
addLevel([
  "!                      p  p  p  p  p                      &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                      p  p  p  p  p                      &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                      p  p  p  p  p                      &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
  "!                                                         &",
], {
  //The width and the height are the values for every object (character) in the map e.g. x
  width: 30,
  height: 22,
  "p" : [sprite("panda-evil"), scale(0.1), "panda-evil"],
  "!" : [sprite("wall"), "left-wall"],
  "&" : [sprite("wall"), "right-wall"],
})

//Add the player
const player = add([
  sprite("golfinho"), scale(0.1),
  pos(width() / 2, height() / 2),
  // origin("center")
  pos(900, 1000)
])

//Assign keystrokes to the player
keyDown("left", () => {
  player.move(-MOVE_SPEED, 0)
})

keyDown("right", () => {
  player.move(MOVE_SPEED, 0)
})

//function to spawn bullets
function spawnBullet(g) {
  add([
    rect(6,18), 
    pos(g), 
    origin("center"), 
    color(0.5, 0.5, 1), 
    "bullet"
  ])
}

//Spawning bullets
keyPress("space", () => {
  //pass the player position
  spawnBullet(player.pos.add(0, -25))
})

//Make the bullets move
action("bullet", (b) => {
  b.move(0, -BULLET_SPEED)
  //Destroy the bullet
  if(b.pos.y < 0){
    destroy(b)
  }
})

collides("bullet", "panda-evil", (b, p) => {
  //Shake the camera
  camShake(4)
  destroy(b)
  destroy(p)
  //add 1 to the score
  score.value++
  //show the score value
  score.text = score.value
})

//Add the score to the game
const score = add([
  text("0"),
  pos(35, 10),
  layer("ui"),
  scale(3),
  {
    //Set the score to start with zero
    value: 0,
  }
])

//Add the timer
 const timer = add([
  text("0"),
  pos(95, 15),
  layer("ui"),
  scale(2),    
  {
    time: TIME_LEFT,
  },
])

//Make the timer count down
timer.action(() => {
  //dt (delta time) since last frame
  timer.time -= dt()
  timer.text = timer.time.toFixed(2)

  //What happens if we ran out of time
  if(timer.time <= 0){
    //Go to the lose scene and bring the score
    go("lose", { score: score.value });
  }
})

//Get the Panda Evil moving right and left
action("panda-evil", (p) => {
  p.move(CURRENT_SPEED, 0)
})

//Collide function for when the pandas touch the walls they bounce back
collides("panda-evil", "right-wall", () => {
  CURRENT_SPEED = -INVADER_SPEED
  every("panda-evil", (p) => {
    p.move(0, LEVEL_DOWN)
  })
})

collides("panda-evil", "left-wall", () => {
  CURRENT_SPEED = INVADER_SPEED
  every("panda-evil", (p) => {
    p.move(0, LEVEL_DOWN)
  })
})

//What happens when golfinho collides with the evil pandas
player.overlaps("panda-evil", () => {
  go("lose", { score: score.value})
})

//if the evil panda goes too LEVEL_DOWN
action("panda-evil", (p) => {
  if(p.pos.y >= height()/2){
    go("lose", {score: score.value})
  }
})

