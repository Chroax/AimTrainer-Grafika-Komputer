let GAME_STATE = "IDLE";
let MAX_TIME = prompt("MAX_TIME (s)");
let START_TIME = null;
let HIGH_SCORE = localStorage.getItem("highscore")
  ? localStorage.getItem("highscore")
  : 0;
const AUDIO_CLICK_RIGHT = "/src/assets/roblox_death.mp3";
const AUDIO_CLICK_WRONG = "/src/assets/bruh.mp3";
let THIS_ACTIVE = true;
let CLICKABLE_OBJ = [];
let SPHERE_RADIUS = 5;
let MAX_TARGET = 3;
let DISTANCE = 10;
let score = 0;
let boundary = {
  x: { min: -20, max: 20 },
  y: { min: -20, max: 20 },
  z: { min: -100, max: -8 },
};
let hit = 0;
let click = 0;
let accuracy = 100;
let currentTime_for_fps = performance.now();
let previousTime_for_fps = performance.now();
let elapsedTime_for_fps = currentTime_for_fps - previousTime_for_fps;
let raw_fps = 0;
let use_fps=0;
let lastupdateTime_for_fps = performance.now();