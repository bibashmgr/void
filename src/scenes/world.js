import * as THREE from 'three';
import gsap from 'gsap';

// src
import Experience from '../Experience.js';

// scenes
import Environment from './Environment.js';
import Overlay from './Overlay.js';

//sections
import HomeSection from './sections/homeSection.js';
import WorkSection from './sections/workSection.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.mouse = this.experience.mouse;
    this.resources = this.experience.resources;

    this.group = new THREE.Group();

    this.resources.on('ready', () => {
      this.environment = new Environment();
      this.overlay = new Overlay();

      // this.homeSection = new HomeSection();
      // this.workSection = new WorkSection();

      this.group.add(this.overlay.group);
      // this.group.add(this.homeSection.group);
      // this.group.add(this.workSection.group);
    });

    this.scene.add(this.group);
  }

  resize() {}

  update() {
    if (this.overlay) {
      this.overlay.update();
      // this.workSection.update();
      // this.homeSection.update();
    }
  }
}
