import * as THREE from 'three';

export default class Renderer {
  
  resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
  
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  } 

  render(camera, renderer, scene) {
    let currentTime = new Date();
    var timeDiff = currentTime - START_TIME;
    timeDiff /= 1000;
  
    var seconds = Math.round(timeDiff);
    if (seconds >= MAX_TIME) {
  
      if (score > HIGH_SCORE) {
        HIGH_SCORE = score;
      }
  
      GAME_STATE = "IDLE";
      document.querySelector('#mainmenu').style.display = 'flex';
      document.querySelector('#crosshair').style.display = 'none';
      document.querySelector('#score-container').style.display = 'none';
      document.querySelector('#time-container').style.display = 'none';
      document.exitPointerLock();
      scene.clear();
      THIS_ACTIVE = false;
  
      localStorage.setItem("highscore", HIGH_SCORE);
      document.querySelector('#highscore').innerHTML = localStorage.getItem("highscore");
      return;
    }
  
    document.querySelector('#time').innerHTML = MAX_TIME - seconds;
  
    if (this.resizeRendererToDisplaySize(renderer)) {
      console.log("RESIZED")
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
  
    renderer.render(scene, camera);
    if (GAME_STATE != "IDLE") {
      requestAnimationFrame(render);
    }
  }
}