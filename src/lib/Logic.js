import { getRndInteger } from "./utilityfunc.js";
// fungsi untuk memindahkan elemen ketika berhasil di klik
function selectObject(object) {
  let new_position = null;
  while (true) {
    new_position = [
      getRndInteger(boundary_x_min, boundary_x_max),
      getRndInteger(boundary_y_min, boundary_y_max),
      0,
    ];
    let isOK = true;
    for (let i = 0; i < CLICKABLE_OBJ.length; i++) {
      if (CLICKABLE_OBJ[i] == object) continue;

      if (
        Math.abs(CLICKABLE_OBJ[i].item.solid.position.x - new_position[0]) <=
          SPHERE_RADIUS ||
        Math.abs(CLICKABLE_OBJ[i].item.solid.position.y - new_position[1]) <=
          SPHERE_RADIUS
      ) {
        isOK = false;
        break;
      }
    }
    if (isOK) {
      break;
    }
  }
  let position = new_position;

  object.item.solid.position.set(position[0], position[1], position[2]);
  score += 100; //menambahkan score
  document.querySelector("#score").innerHTML = score;
}

// fungsi untuk menghandle event kliknya, jika benda berhasil di klik maka akan menjalankan fungsi selectObject, jika tidak maka akan mengurangi score
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

    let objectTerklik = false;
    intersects.forEach((obj) => {
      CLICKABLE_OBJ.forEach((C_OBJ) => {
        if (C_OBJ.item.solid == obj.object) {
          selectObject(C_OBJ);
          objectTerklik = true;
          const audio_click = new Audio("./assets/roblox_death.mp3");
          audio_click.play();
        }
      });
    });
    if (!objectTerklik) {
      score -= 10;
      document.querySelector("#score").innerHTML = score;
      const audio_wiff = new Audio("./assets/bruh.mp3");
      audio_wiff.play();
    }
  },
  true
);
