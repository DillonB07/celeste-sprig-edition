/*
Celeste: Sprig Editon is directly inspired by https://celestegame.com and is a version made especially for the Sprig!

@title: Celeste: Sprig Edition
@author: DillonB07
@tags: []
@img: ""
@addedOn: 2024-00-00
*/

const strawberry = "a"
const blueStrawberry = "A"
const brickFacingLeft = "b"
const goal = "B"
const verticalGirder = "c"
const bottomVerticalGird = "C"
const darkBrick = "d"
const brickFacingUp = "D"
const brickFacingRight = "e"
const brick = "E"
const brickFacingDown = "f"
const darkGrass = "g"
const blueGround1 = "G"
const lightGrass = "l"
const player = "p";
const spike = "s"
const sprungSpring = "S"
const spring = "u"

let playerUpwardsVel = -1
let playerHorizontalVel = 1
let maxJump = 2;
let dashActive = false;
let dashDirections = [];
let deaths = 0;


// SPRITES

// Maddy :D
const madelineStanding = bitmap`
.....00000......
....0C333C0.....
...0C33333C0....
...03333C3330...
...03333CC330...
...03C6666600...
..033FFFFFF00...
..030C66660C0...
..030555CC500...
...0577777550...
...056F77770F0..
....06FCCCC0F0..
...00000000.0...
..00CC000C0.....
..0CC0.0CC0.....
..0CF0.0CF0.....`;
const madelineDashlessStanding = bitmap`
.....00000......
....0577750.....
...057777750....
...07777C7770...
...07777CC770...
...07C6666600...
..077FFFFFF00...
..070C66660C0...
..070555CC500...
...0577777550...
...056F77770F0..
....06FCCCC0F0..
...00000000.0...
..00CC000C0.....
..0CC0.0CC0.....
..0CF0.0CF0.....`;
const tinyline = bitmap`
................
................
................
................
................
................
................
................
................
................
................
.....333........
....33333.......
...33555........
...3.CCC........
.....0.0........`;


// Interactables
const springUnsprungBitmap = bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
.00000000000000.
.0C9999999999C0.
.091CCCCCCCC190.`;
const springSprungBitmap = bitmap`
................
................
................
................
................
.00000000000000.
.0C9999999999C0.
.091CCCCCCCC190.
.00000L00L00000.
.....0L00L0.....
.....001100.....
.....0L00L0.....
.....0L00L0.....
.....001100.....
.....0L00L0.....
.....0L00L0.....`;
const strawberryBitmap = bitmap`
................
................
................
......0000......
.....0D0440.....
....0440D40.....
.....0H44D40....
....0H3HH3H0....
...0333333330...
...0338338330...
...0833333380...
...0333333330...
....03333330....
.....033330.....
......0330......
.......00.......`
const blueStrawberryBitmap = bitmap`
................
................
................
......0000......
.....0D0440.....
....0440D40.....
.....0H44D40....
....0H7HH7H0....
...0775777770...
...0575775770...
...0577777550...
...0777577770...
....07777770....
.....077770.....
......0770......
.......00.......`

// Blocks
const verticalGirderBitmap = bitmap`
1115555555555111
11115LLLLLL51111
115115LLLL511511
1155115LL5115511
115L51155115L511
115LL511115LL511
115LLL5115LLL511
115LLLL11LLLL511
115LLLL11LLLL511
115LLL5115LLL511
115LL511115LL511
115L51155115L511
1155115LL5115511
115115LLLL511511
11115LLLLLL51111
1115555555555111`;
const bottomVerticalGirderBitmap = bitmap`
1111111111111111
1111111111111111
1115555555555111
1111LLLLLLLL1111
1151155555511511
115L11LLLL11L511
115L511LL115L511
115L5L1LL1L5L511
115L5L1LL1L5L511
115L511LL115L511
115L11LLLL11L511
1151155555511511
1111LLLLLLLL1111
1115555555555111
1111111111111111
1111111111111111`;
const blueGround1Bitmap = bitmap`
2222222222222222
2111222112222112
2212222221221222
2221221222112212
2125215151151251
7555755251255755
7777770777777777
7777707777777777
0005775775077772
0050007777707772
0000500005577722
0000005000557072
0000000000057777
0550000000007772
0570000000000077
0000000000050007`;
const goalBitmap = bitmap`
CCCCCCCCCCCCCCCC
CDDDDDDDDDDDDDDC
CDDDDDDDDDDDDDDC
CDD4444444444DDC
CDD4444444444DDC
CDD4488888844DDC
CDD4488888844DDC
CDD4488888844DDC
CDD4488888844DDC
CDD4488888844DDC
CDD4488888844DDC
CDD4444444444DDC
CDD4444444444DDC
CDDDDDDDDDDDDDDC
CDDDDDDDDDDDDDDC
CCCCCCCCCCCCCCCC`

// Bricks
const brickFacingLeftBitmap = bitmap`
1121LL111LL111LL
2212LL111LL111LL
2121LL111LLLLLLL
2121LL111LLLLLLL
1112LLLLLLL111LL
2211LLLLLLL111LL
2121LL111LL111LL
1111LL111LL111LL
2111LL111LLLLLLL
2221LL111LLLLLLL
2111LL111LL111LL
2211LL111LL111LL
1121LLLLLLL111LL
2112LLLLLLL111LL
2211LL111LLLLLLL
2111LL111LLLLLLL`
const brickFacingRightBitmap = bitmap`
LLLLLLL111LL1112
LLLLLLL111LL1122
LL111LLLLLLL2112
LL111LLLLLLL1211
LL111LL111LL1122
LL111LL111LL1112
LLLLLLL111LL1222
LLLLLLL111LL1112
LL111LL111LL1111
LL111LL111LL1212
LL111LLLLLLL1122
LL111LLLLLLL2111
LLLLLLL111LL1212
LLLLLLL111LL1212
LL111LL111LL2122
LL111LL111LL1211`
const brickFacingUpBitmap = bitmap`
2221222212212221
1211212111211121
1112112112112212
1121111111121121
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
11LL111111LL1111
11LL111111LL1111
11LL111111LL1111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL1111LL1111LL11
LL1111LL1111LL11
LL1111LL1111LL11
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`
const brickFacingDownBitmap = bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
11LL1111LL1111LL
11LL1111LL1111LL
11LL1111LL1111LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111LL111111LL11
1111LL111111LL11
1111LL111111LL11
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1211211111111211
2122112112112111
1211121112121121
1222122122221222`
const brickBitmap =  bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL111LL1111LL1L
LLL111LL1111LL1L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L1LL111111LL111L
L1LL111111LL111L
L1LL111111LL111L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L1111LL1111LL11L
L1111LL1111LL11L
L1111LL1111LL11L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`
const darkBrickBitmap = bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`

setLegend(
  [player, madelineStanding],
  [lightGrass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [darkGrass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [brickFacingUp, brickFacingUpBitmap],
  [brickFacingLeft, brickFacingLeftBitmap],
  [brickFacingRight, brickFacingRightBitmap],
  [brickFacingDown, brickFacingDownBitmap],
  [brick, brickBitmap],
  [spike, bitmap`
................
................
................
................
................
................
.1...1....1...1.
.1...1....1...1.
.1...1....1...1.
.1...1....1...1.
L1L.L1L..L1L.L1L
L1L.L1L..L1L.L1L
L1L.L1L..L1L.L1L
L1L.L1L..L1L.L1L
L1L.L1L..L1L.L1L
L1L.L1L..L1L.L1L`],
  [spring, springUnsprungBitmap],
  [sprungSpring, springSprungBitmap],
  [strawberry, strawberryBitmap],
  [verticalGirder, verticalGirderBitmap],
  [bottomVerticalGird, bottomVerticalGirderBitmap],
  [darkBrick, darkBrickBitmap],
  [blueGround1, blueGround1Bitmap],
  [blueStrawberry, blueStrawberryBitmap],
  [goal, goalBitmap]
);

setSolids([lightGrass, darkGrass, player, block, spike, verticalGirder, blueGround1, goal]);

let score = 0;
let level = 0;
const levels = [
  map`
dcEEcfcEdddddddde.
dcCCc.cfddEffffde.
dc..c.c.fff....be.
dC..c.C........be.
Ee..C..........be.
c..............ff.
c.................
c.................
c.......a.........
c.................
c........us......D
c........DDs...DDE
c.......ubdDssDddd
CGGGGGGDDdddDDdddd`, map`
bbbbbbbbbbbbbbbbbbbb
bbb..c.........bbbbb
bb...c...........cbb
b....c...........c.b
cccccc...........c..
c................c..
c................c..
c................c..
c..........b.....c..
c.......bb..........
c.............b..c..
c...bb...........c..
G......sss......sGGB
bG.u...GGGssssssGGbb
bGGGGGGGbGGGGGGGGbbb
bbbbbbbbbbbbbbbbbbbb`
];

setMap(levels[level]);

// Handle movement

function jump() {
  if (getTile(getFirst(player).x, getFirst(player).y + 1) != 0)
    playerUpwardsVel = maxJump;
}

function springUp(tile) {
  // We are not checking if the player is on a spring as that is done before this function is called
  playerUpwardsVel = maxJump * 3;
  // We are unable to change the bitmap of one spring instance so we recreate the spring
  clearTile(tile.x, tile.y);
  addSprite(tile.x, tile.y, sprungSpring);
  setTimeout(() => {
    clearTile(tile.x, tile.y);
    setTimeout(() => {
      addSprite(tile.x, tile.y, spring);
    }, 50);
  }, 200);
}

function containsAll(arr, values) {
  return values.every(v => arr.includes(v));
}

function dashUp(amount) {
  // Temp increase ver vel up
  playerUpwardsVel = maxJump * amount
  setTimeout(() => playerUpwardsVel = -1, 500)
}

function dashDown(amount) {
  // Temp increase ver vel down
  playerUpwardsVel = maxJump * -amount
  setTimeout(() => playerUpwardsVel = -1, 500)
}

function dashLeft(amount) {
  // Temp increase hori vel left
  playerHorizontalVel = maxJump * -2
  for (let i = 0; i < amount; i++) {
    getFirst(player).x--
    tick++
  }
  setTimeout(() => playerHorizontalVel = 1, 500)
}

function dashRight(amount) {
  // Temp increase hori vel right
  playerHorizontalVel = maxJump * amount
  for (let i = 0; i < amount; i++) {
    getFirst(player).x++
    tick++
  }
  setTimeout(() => playerHorizontalVel = 1, 500)
}

function dash() {
  if (playerUpwardsVel != -1) {
    return
  }
  if (containsAll(dashDirections, ["w", "d"])) {
    // Up right
    dashUp(2)
    dashRight(4)
  } else if (containsAll(dashDirections, ["s", "d"])) {
    // Down right
    dashDown(2)
    dashRight(2)
  } else if (containsAll(dashDirections, ["s", "a"])) {
    // Down left
    dashDown(2)
    dashLeft(2)
  } else if (containsAll(dashDirections, ["w", "a"])) {
    // Up left
    dashUp(2)
    dashLeft(2)
  } else if (containsAll(dashDirections, ["w"])) {
    // Up
    dashUp(2)
  } else if (containsAll(dashDirections, ["d"])) {
    // Right
    dashRight(4)
  } else if (containsAll(dashDirections, ["s"])) {
    // Down
    dashDown(2)
  } else if (containsAll(dashDirections, ["a"])) {
    // Left
    dashLeft(4)
  } else {
    dashRight(4)
  }
}


function calculateGravity(playerX, playerY) {
  let downTile = getTile(playerX, playerY + 1)
  if (playerUpwardsVel > 0) {
    getFirst(player).y--
    playerUpwardsVel--;
  } else if (playerUpwardsVel < 0) {
    getFirst(player).y++
  } else if (downTile == 0)
    playerUpwardsVel = -1;
}


onInput("a", () => {
  // Left
  if (dashActive) {
    if ((dashDirections.length < 2) && (!dashDirections.includes("a"))) {
      dashDirections.push("a")
    }
  } else {
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  // Right
  if (dashActive) {
    if ((dashDirections.length < 2) && (!dashDirections.includes("d"))) {
      dashDirections.push("d")
    }
  } else {
    getFirst(player).x += 1;
  }
});

onInput("w", () => {
  // Up
  if (dashActive && (dashDirections.length < 2) && (!dashDirections.includes("w"))) {
    dashDirections.push("w");
  }
});

onInput("s", () => {
  // Down
  if (dashActive && (dashDirections.length < 2) && (!dashDirections.includes("s"))) {
    dashDirections.push("s");
  }
});

onInput("i", () => {
  jump();
});

onInput("j", () => {
  dashDirections = [];
  dashActive = true;
  setTimeout(() => {
    dash();
    dashActive = false;
  }, 150)
})

let tick = 0;
let playerX;
let playerY;

function murder() {
  deaths++;
  clearText();
  setMap(levels[level]);
  addSprite(5, 5, player)
}

function onTick() {
  addText(`Death${deaths !== 1 ? 's' : ''}: ${deaths}\nScore: ${score}`, { color: color`0` })
  if (tick == 40) clearText();
  if (typeof getFirst(player) == 'undefined') {
    addSprite(playerX, playerY, player);
  };
  playerX = getFirst(player).x;
  playerY = getFirst(player).y;
  tick++;

  let tile = getTile(playerX, playerY + 1)[0]
  try {
    if (tile.type == spike) {
      murder();
    }
  } catch (e) {
    // I have no idea why this catch exists, I should try removing it and see what happens
    // OK DO NOT REMOVE THIS UNDER ANY CIRCUMSTANCES, THAT IS AN INCREDIBLY BAD THING TO DO
  }
  try {
    if (tile.type == spring) {
      springUp(tile);
    }
    if (tile.type == strawberry) {
      score += 1000;
      clearTile(tile.x, tile.y);
      addSprite(tile.x, tile.y, blueStrawberry);
    }
    if (tile.type == goal) {
      nextLevel();
    }
  } catch (e) {}
  calculateGravity(playerX, playerY);
}

function restart() {
  clearText();
  setMap(levels[level]);
  addSprite(5, 5, player);
}

function nextLevel() {
  level++;
  if (levels.length == level) gameOver()
  restart();
}

function gameOver() {
  clearText();
  setMap(map`
bbbbbbbbbbbbbbbbbbbb
bb................bb
b....aa......aa....b
c....aa......aa....c
c..................c
c..a............a..c
c..a.....aa.....a..c
c..a............a..c
c...a..........a...c
c....a........a....c
c.....aaaaaaaa.....c
cc.ccccccccccccccccc
G.........c........G
G.................aG
GG........c......GGG
GGGGGGGGGGcssssGGGGG`)
  addSprite(5, 5, player);
}

addSprite(5, 5, player);
setInterval(onTick, 50);
