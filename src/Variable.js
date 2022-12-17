let GAME_STATE = "IDLE";
let MAX_TIME = prompt("MAX_TIME (s)");
let START_TIME = null;
let HIGH_SCORE = localStorage.getItem("highscore") ? localStorage.getItem("highscore") : 0;
const AUDIO_CLICK_RIGHT = "/src/assets/roblox_death.mp3";
const AUDIO_CLICK_WRONG = "/src/assets/bruh.mp3";
let THIS_ACTIVE = true;
let CLICKABLE_OBJ = [];
let SPHERE_RADIUS = 6;
let MAX_TARGET = 3;
let DISTANCE = 55;
let score = 0;
let boundary = {
  x: { min: -45, max: 45 },
  y: { min: -45, max: 45 },
  z: { min: -100, max: -8 },
}