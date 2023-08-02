import * as THREE from 'three';

// src
import Camera from './Camera.js';
import Renderer from './Renderer.js';

// utils
import Sizes from './utils/Sizes.js';
import Time from './utils/Time.js';
import Mouse from './utils/Mouse.js';
import Resources from './utils/Resources.js';

// world
import World from './scenes/World.js';

// constants
import assets from './constants/assets.js';

export default class Experience {
  static instance;

  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.mouse = new Mouse();
    this.scene = new THREE.Scene();
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
}
