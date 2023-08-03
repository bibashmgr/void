import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

// src
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

    this.createPerspectiveCamera();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      20,
      this.sizes.aspect,
      1,
      4000
    );
    this.perspectiveCamera.position.z = 50;

    this.group.add(this.perspectiveCamera);
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();
  }

  update() {
    gsap.to(this.perspectiveCamera.position, {
      y: -(this.mouse.scrollPosition.y / this.sizes.height) * 10,
      duration: 1,
    });

    this.group.position.x +=
      (this.mouse.cursorPosition.x - this.group.position.x) *
      0.008 *
      this.time.delta;
    this.group.position.y +=
      (this.mouse.cursorPosition.y - this.group.position.y) *
      0.008 *
      this.time.delta;
  }
}
