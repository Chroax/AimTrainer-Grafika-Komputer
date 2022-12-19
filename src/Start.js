if(BALL_TEXTURE == 0){
  document.getElementById("select-texture").innerHTML = "Plain";
}
if(BALL_TEXTURE == 1){
  document.getElementById("select-texture").innerHTML = "American Football";
}
else if(BALL_TEXTURE == 2){
  document.getElementById("select-texture").innerHTML = "Football";
}
else if(BALL_TEXTURE == 3){
  document.getElementById("select-texture").innerHTML = "Basketball";
}
else if(BALL_TEXTURE == 4){
  document.getElementById("select-texture").innerHTML = "Metal";
}
else if(BALL_TEXTURE == 5){
  document.getElementById("select-texture").innerHTML = "Ambient";
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
    }
    if(name == "American Football"){
      BALL_TEXTURE = 1;
    }
    else if(name == "Football"){
      BALL_TEXTURE = 2;
    }
    else if(name == "Basketball"){
      BALL_TEXTURE = 3;
    }
    else if(name == "Metal"){
      BALL_TEXTURE = 4;
    }
    else if(name == "Ambient"){
      BALL_TEXTURE = 5;
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