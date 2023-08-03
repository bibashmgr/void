import * as THREE from 'three';

import Experience from '../Experience';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.parameters = {
      fogColor: '#2b2b2b',
      fogIntensity: 1,
      lightColor: '#ffffff',
      lightIntensity: 3.5,
    };

    this.setFog();
    this.setLight();
  }

  setFog() {
    this.fog = new THREE.FogExp2(
      this.parameters.fogColor,
      this.parameters.fogIntensity * 0.01
    );
    this.scene.fog = this.fog;
  }

  setLight() {
    this.light = new THREE.DirectionalLight(
      this.parameters.lightColor,
      this.parameters.lightIntensity
    );
    this.light.position.set(0, 1, 2);
    this.scene.add(this.light);
  }
}
