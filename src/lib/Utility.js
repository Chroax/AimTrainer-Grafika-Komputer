export default class Utility {

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

  defaultPosBall(){
    CLICKABLE_OBJ.forEach((C_OBJ) => {
      C_OBJ.item.solid.position.set(0, 0, -DISTANCE);
      C_OBJ.item.wireframe.position.set(0, 0, -DISTANCE);
      
    });
  }

  selectObject(object) {
    let new_position = null;
    let index = 0;
    while (true) {
      new_position = [this.getRndInteger(boundary.x.min, boundary.x.max), this.getRndInteger(boundary.y.min, boundary.y.max), -DISTANCE];
      let isOK = true;
      for (let i = 0; i < CLICKABLE_OBJ.length; i++) {
        if (CLICKABLE_OBJ[i] == object) {
          index = i;
          continue;
        }

        if (
          Math.abs(CLICKABLE_OBJ[i].item.solid.position.x - new_position[0]) <= 2.5 * SPHERE_RADIUS
          &&
          Math.abs(CLICKABLE_OBJ[i].item.solid.position.y - new_position[1]) <= 2.5 * SPHERE_RADIUS
        ) {
          isOK = false;
          break;
        }
      }
      if (isOK) {
        break;
      }
    }

    object.item.solid.position.set(new_position[0], new_position[1], new_position[2]);
    //entah kenapa gabisa pas
    object.item.wireframe.position.set(new_position[0], new_position[1]-3, new_position[2]);
  }

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
}
