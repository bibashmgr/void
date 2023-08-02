import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

// src
import Experience from './experience.js';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.mouse = this.experience.mouse;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    // this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      20,
      this.sizes.aspect,
      1,
      4000
    );
    this.perspectiveCamera.position.z = 50;

    this.scene.add(this.perspectiveCamera);
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.orbitControls.enableDamping = true;
    this.orbitControls.enableZoom = true;
    this.orbitControls.enablePan = true;
    this.orbitControls.maxPolarAngle = Math.PI;
    this.orbitControls.target.set(0, 0, 0);
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();
  }

  update() {
    // this.orbitControls.update();
  }

  wheel() {
    this.currentPosY = this.perspectiveCamera.position.y;
    if (this.mouse.scrollDirection === 'up') {
      this.currentPosY += 40;
    }

    if (this.mouse.scrollDirection === 'down') {
      this.currentPosY -= 40;
    }

    gsap.to(this.perspectiveCamera.position, {
      y: this.currentPosY,
      duration: 1,
    });
    console.log(this.currentPosY);
  }
}
