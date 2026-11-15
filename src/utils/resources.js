import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EventEmitter } from "events";

import Experience from "../experience.js";

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
    this.manager = new THREE.LoadingManager();
    this.manager.onProgress = (url, loaded, total) => {
      this.emit("progress", loaded / total);
    };

    this.loaders = {};

    this.loaders.textureLoader = new THREE.TextureLoader(this.manager);
    this.loaders.gltfLoader = new GLTFLoader(this.manager);
  }

  startLoading() {
    // nothing to fetch: still notify listeners once they're attached
    if (this.queue === 0) {
      setTimeout(() => {
        this.emit("progress", 1);
        this.emit("ready");
      });
      return;
    }

    for (const asset of this.assets) {
      if (asset.type === "texture") {
        this.loaders.textureLoader.load(asset.path, (file) => {
          file.colorSpace = THREE.SRGBColorSpace;
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === "gltfModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
