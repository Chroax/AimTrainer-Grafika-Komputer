import Utility from "./Utility";
import * as THREE from "three";

export default class EventListener {
  addMouseMove(camera) {
    document.body.addEventListener("mousemove", (event) => {
      if (document.pointerLockElement === document.body) {
        camera.rotation.y -= event.movementX / 500;
        camera.rotation.x -= event.movementY / 500;
      }
    });
  }

  addMouseClickListener(camera, scene, raycaster) {
    const utility = new Utility();
    document.body.addEventListener(
      "click",
      (event) => {
        if (!THIS_ACTIVE) return;
        if (event.which == 3) {
          selected_object.forEach((item) => {
            scene.remove(item.item.wireframe);
          });
        }
        document.body.requestPointerLock();

        let middle_point = new THREE.Vector2(0, 0);
        raycaster.setFromCamera(middle_point, camera);
        var intersects = raycaster.intersectObjects(scene.children); //array
        click += 1;
        let objectTerklik = false;
        intersects.forEach((obj) => {
          CLICKABLE_OBJ.forEach((C_OBJ) => {
            if (C_OBJ.item.solid == obj.object) {
              utility.selectObject(C_OBJ);
              score += 100;
              hit += 1;
              document.querySelector("#score").innerHTML = score;
              objectTerklik = true;
              const audio_click = new Audio(AUDIO_CLICK_RIGHT);
              audio_click.play();
            }
          });
        });
        if (!objectTerklik) {
          score -= 10;
          document.querySelector("#score").innerHTML = score;
          const audio_wiff = new Audio(AUDIO_CLICK_WRONG);
          audio_wiff.play();
        }
        accuracy = ((hit / click) * 100).toFixed(2);

        document.getElementById("accuracy").innerHTML = Math.floor(accuracy) + "%";
      },
      true
    );
  }
}
