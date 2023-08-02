import * as THREE from 'three';
import gsap from 'gsap';

// src
import Experience from '../experience.js';

// scenes
import Environment from './environment.js';
import Background from './background.js';

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
      this.background = new Background();

      // this.homeSection = new HomeSection();
      // this.workSection = new WorkSection();

      this.group.add(this.background.group);
      // this.group.add(this.homeSection.group);
      // this.group.add(this.workSection.group);
    });

    this.scene.add(this.group);
  }

  resize() {}

  update() {
    if (this.background) {
      this.background.update();
      // this.workSection.update();
      // this.homeSection.update();
    }
  }
}
