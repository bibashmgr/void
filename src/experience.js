import * as THREE from 'three';

// src
import Camera from './camera.js';
import Renderer from './renderer.js';

// utils
import Sizes from './utils/sizes.js';
import Time from './utils/time.js';
import Mouse from './utils/mouse.js';
import Resources from './utils/resources.js';

// world
import World from './scenes/world.js';

// config
import assets from './config/assets.js';

export default class Experience {
  static instance;

  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.time = new Time();
    this.mouse = new Mouse();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);

    this.world = new World();

    this.sizes.on('resize', () => {
      this.resize();
    });
    this.time.on('update', () => {
      this.update();
    });
    this.mouse.on('wheel', () => {
      this.wheel();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }

  wheel() {
    // this.camera.wheel();
  }
}
