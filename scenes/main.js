  //Set the move speed
  const MOVE_SPEED = 150

  //Layer
  layer("obj", "ui", "obj")

//Add a level to the game - the first argument is the map and the second one the object (config)
addLevel([
  "!           p  p  p  p  p           &",
  "!                                   &",
  "!                                   &",
  "!                                   &",
  "!                                   &",
  "!                                   &",
  "!                                   &",
  "!                                   &",
  "!                                   &",
  "!                                   &",
], {
  //The width and the height are the values for every object (character) in the map e.g. x
  width: 30,
  height: 22,
  "p" : [sprite("panda-evil"), scale(0.1)],
  "!" : [sprite("wall"), "left-wall"],
  "&" : [sprite("wall"), "right-wall"],
})

//Add the player
const player = add([
  sprite("golfinho"), scale(0.1),
  pos(width() / 2, height() / 2),
  origin("center")
  ])

  //Assign keystrokes to the player
  keyDown("left", () => {
    player.move(-MOVE_SPEED, 0)
  })

  keyDown("right", () => {
    player.move(MOVE_SPEED, 0)
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

  const TIME_LEFT = 150

  //Add the timer
  const timer = add([
    text("0"),
    pos(65, 15),
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
    go("lose");
  }
})
