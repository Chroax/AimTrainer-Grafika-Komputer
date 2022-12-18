document.getElementById("play").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});

if (localStorage.getItem("highscore") != undefined && localStorage.getItem("highscore") != null) {
  document.querySelector('#highscore').innerHTML = localStorage.getItem("highscore");
}
else {
  localStorage.setItem("highscore", 0);
};

if (localStorage.getItem("ball-texture") != undefined && localStorage.getItem("ball-texture") != null) {
  BALL_TEXTURE = localStorage.getItem("ball-texture");
}
else {
  localStorage.setItem("ball-texture", 0);
};