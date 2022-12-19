if(BALL_TEXTURE == 0){
  document.getElementById("select-texture").innerHTML = "Plain";
  document.querySelector(".ball").src = BALL_IMG_SRC + "plain-ball" + BALL_IMG_EXT;
}
if(BALL_TEXTURE == 1){
  document.getElementById("select-texture").innerHTML = "American Football";
  document.querySelector(".ball").src = BALL_IMG_SRC + "american-football-ball" + BALL_IMG_EXT;
}
else if(BALL_TEXTURE == 2){
  document.getElementById("select-texture").innerHTML = "Football";
  document.querySelector(".ball").src = BALL_IMG_SRC + "football-ball" + BALL_IMG_EXT;
}
else if(BALL_TEXTURE == 3){
  document.getElementById("select-texture").innerHTML = "Basketball";
  document.querySelector(".ball").src = BALL_IMG_SRC + "basketball-ball" + BALL_IMG_EXT;
}
else if(BALL_TEXTURE == 4){
  document.getElementById("select-texture").innerHTML = "Metal";
  document.querySelector(".ball").src = BALL_IMG_SRC + "metal-ball" + BALL_IMG_EXT;
}
else if(BALL_TEXTURE == 5){
  document.getElementById("select-texture").innerHTML = "Ambient";
  document.querySelector(".ball").src = BALL_IMG_SRC + "ambient-ball" + BALL_IMG_EXT;
}

document.getElementById("select-field").onclick = function(){
  document.getElementById("list").classList.toggle("hide");
  document.getElementById("arrow-icon").classList.toggle("rotate");
};


for(option of document.getElementsByClassName("options")){
  option.onclick = function(){
    document.getElementById("select-texture").innerHTML = this.textContent;
    document.getElementById("list").classList.toggle("hide");
    document.getElementById("arrow-icon").classList.toggle("rotate");
    var name = this.getAttribute('name');
    
    if(name == "Plain"){
      BALL_TEXTURE = 0;
      document.querySelector(".ball").src = BALL_IMG_SRC + "plain-ball" + BALL_IMG_EXT;
    }
    if(name == "American Football"){
      BALL_TEXTURE = 1;
      document.querySelector(".ball").src = BALL_IMG_SRC + "american-football-ball" + BALL_IMG_EXT;
    }
    else if(name == "Football"){
      BALL_TEXTURE = 2;
      document.querySelector(".ball").src = BALL_IMG_SRC + "football-ball" + BALL_IMG_EXT;
    }
    else if(name == "Basketball"){
      BALL_TEXTURE = 3;
      document.querySelector(".ball").src = BALL_IMG_SRC + "basketball-ball" + BALL_IMG_EXT;
    }
    else if(name == "Metal"){
      BALL_TEXTURE = 4;
      document.querySelector(".ball").src = BALL_IMG_SRC + "metal-ball" + BALL_IMG_EXT;
    }
    else if(name == "Ambient"){
      BALL_TEXTURE = 5;
      document.querySelector(".ball").src = BALL_IMG_SRC + "ambient-ball" + BALL_IMG_EXT;
    }
    localStorage.setItem("texture", BALL_TEXTURE);
  }
}

document.getElementById("play").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "flex";
});

document.getElementById("target").addEventListener("click", function () {
  document.getElementById("target-popup").style.display = "flex";
});


document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});

document.querySelector(".target-close").addEventListener("click", function () {
  document.getElementById("target-popup").style.display = "none";
});

if (localStorage.getItem("highscore") != undefined && localStorage.getItem("highscore") != null) {
  document.querySelector('#highscore').innerHTML = localStorage.getItem("highscore");
}
else {
  localStorage.setItem("highscore", 0);
};

if (localStorage.getItem("texture") != undefined && localStorage.getItem("texture") != null) {
  BALL_TEXTURE = localStorage.getItem("texture");
}
else {
  localStorage.setItem("texture", 0);
};