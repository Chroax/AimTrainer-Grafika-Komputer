import * as THREE from "three";

export default class Utility{
  constructor(){
    this.boundary = {
      x: { min: -20, max: 20 },
      y: { min: -20, max: 20 },
      z: { min: -100, max: -8 },
  };
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
}
