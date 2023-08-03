import * as THREE from 'three';
import { EventEmitter } from 'events';

import Experience from '../Experience.js';

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};

    this.loaders.textureLoader = new THREE.TextureLoader();
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === 'texture') {
        this.loaders.textureLoader.load(asset.path, (file) => {
          file.colorSpace = THREE.SRGBColorSpace;
          this.singleAssetLoaded(asset, file);
        });
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit('ready');
    }
  }
}
