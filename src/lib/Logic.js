import Utility from "./Utility";
const utility = new Utility();

export default class selectObjects {
  // fungsi untuk memindahkan elemen ketika berhasil di klik
  selectObject(object, boundary, CLICKABLE_OBJ, SPHERE_RADIUS) {
    let new_position = null;
    while (true) {
      new_position = [
        utility.getRndInteger(boundary.x.min, boundary.x.max),
        utility.getRndInteger(boundary.y.min, boundary.y.max),
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
    // this.score += 100; //menambahkan score
    document.querySelector("#score").innerHTML = score;
  }
}
