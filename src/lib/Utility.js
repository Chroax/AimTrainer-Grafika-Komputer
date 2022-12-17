export default class Utility {
  boundary = {
    x: { min: -20, max: 20 },
    y: { min: -20, max: 20 },
    z: { min: -100, max: -8 },
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return parseInt(color, 16);
  }

  selectObject(object, ...CLICKABLE_OBJ) {
    let new_position = null;
    while (true) {
      new_position = [this.getRndInteger(this.boundary.x.min, this.boundary.x.max), this.getRndInteger(this.boundary.y.min, this.boundary.y.max), 0];
      let isOK = true;
      for (let i = 0; i < CLICKABLE_OBJ.length; i++) {
        if (CLICKABLE_OBJ[i] == object) continue;

        if (
          Math.abs(CLICKABLE_OBJ[i].item.solid.position.x - new_position[0]) <= SPHERE_RADIUS
          ||
          Math.abs(CLICKABLE_OBJ[i].item.solid.position.y - new_position[1]) <= SPHERE_RADIUS
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
  }
}
