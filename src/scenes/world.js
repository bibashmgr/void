import * as THREE from 'three';

import Experience from '../Experience.js';

// scenes
import Environment from './Environment.js';
import Overlay from './Overlay.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.mouse = this.experience.mouse;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.group = new THREE.Group();

    this.resources.on('ready', () => {
      this.environment = new Environment();

      this.overlay = new Overlay();
      this.group.add(this.overlay.group);
    });

    this.scene.add(this.group);
  }

  resize() {}

  update() {
    if (this.overlay) {
      this.overlay.update();
    }
  }
}
