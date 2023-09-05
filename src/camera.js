import * as THREE from 'three';
import gsap from 'gsap';

import Experience from './Experience.js';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.mouse = this.experience.mouse;
    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;

    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.group.position.y = 0;

    this.createPerspectiveCamera();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      20,
      this.sizes.aspect,
      1,
      4000
    );
    this.perspectiveCamera.position.x = 0;
    this.perspectiveCamera.position.z = 50;

    this.group.add(this.perspectiveCamera);
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();
  }

  update() {
    gsap.to(this.perspectiveCamera.position, {
      y: -(this.mouse.scrollPosition.y / this.sizes.height) * 20,
      duration: 1,
    });

    this.group.position.x +=
      (this.mouse.cursorPosition.x - this.group.position.x) *
      this.time.delta *
      0.004;
    this.group.position.y +=
      (this.mouse.cursorPosition.y - this.group.position.y) *
      this.time.delta *
      0.004;
  }
}
