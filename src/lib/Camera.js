import * as THREE from 'three';
export default class Camera {

  constructor(canvasId) {
    this.camera = undefined;
    this.renderer = undefined;
    this.fov = undefined;
    this.nearPlane = undefined;
    this.farPlane = undefined;
    this.canvasId = canvasId;
  }

  initialize(fov, nearPlane, farPlane) {
    this.fov = fov;
    this.nearPlane = nearPlane;
    this.farPlane = farPlane;

    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.nearPlane,
      this.farPlane
    )
    this.camera.position.set(0, 0, 150);

    const canvas = document.querySelector(this.canvasId);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      logarithmicDepthBuffer: true,
      antialias: true,
      powerPreference: "high-performance",
      alpha: false
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
}