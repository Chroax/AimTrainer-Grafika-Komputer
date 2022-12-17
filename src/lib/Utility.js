import * as THREE from "three";

export default class Utility{
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
}
