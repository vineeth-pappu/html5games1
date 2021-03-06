import pop from "../pop/index.js";
const { Game, KeyControls, math, MouseControls } = pop;
import TitleScreen from "./screens/TitleScreen.js";
import GameScreen from "./screens/GameScreen.js";

const game = new Game(800, 400);
const controls = {
  keys: new KeyControls(),
  mouse: new MouseControls(game.renderer.view)
};

math.useSeededRandom(true);
let lastSeed = 1; //(Math.random() * 420000) | 0;
math.randomSeed(lastSeed);

let hole = 0;
let total = 0;

function playHole(completed = true, shots = 0) {
  if (completed) {
    hole++;
    total += shots;
    shots = 0;
  } else {
    // Reset seed to last level
    math.randomSeed(lastSeed);
  }

  lastSeed = math.randomSeed();
  const stats = {
    hole,
    shots,
    total
  };
  game.scene = new GameScreen(game, controls, playHole, stats);
}

//playHole(true, 0, 0);
game.scene = new TitleScreen(game, controls, playHole);
game.run();
