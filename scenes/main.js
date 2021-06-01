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

  //Set the move speed
  const MOVE_SPEED = 150

  //Assign keystrokes to the player
  keyDown("left", () => {
    player.move(-MOVE_SPEED, 0)
  })

  keyDown("right", () => {
    player.move(MOVE_SPEED, 0)
  })