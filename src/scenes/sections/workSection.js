import * as THREE from 'three';

// src
import Experience from '../../experience';

// helpers
import { generateText } from '../../helpers/textGenerator';

// shaders
import waveVertexShader from '../../shaders/wave_vertex.glsl';
import waveFragmentShader from '../../shaders/wave_fragment.glsl';

export default class WorkSection {
  constructor() {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.font = this.resources.items.dmSerifRegular;

    this.parameters = {
      posY: {
        header: -40,
      },
      textSize: {
        title: 0.6,
        subtitle: 0.3,
      },
      text: {
        title: 'Selected Works',
        subtitle: 'Discover all my projects that I have built till now.',
      },
    };

    this.group = new THREE.Group();

    this.header = new THREE.Group();
    this.group.add(this.header);

    this.works = new THREE.Group();
    this.group.add(this.works);

    this.setHeader();
    this.setWorks();
  }

  setHeader() {
    this.title = generateText(
      this.font,
      this.parameters.text.title,
      this.parameters.textSize.title,
      this.parameters.posY.header
    );
    this.subtitle = generateText(
      this.font,
      this.parameters.text.subtitle,
      this.parameters.textSize.subtitle,
      this.parameters.posY.header - 0.75
    );

    this.header.add(this.title);
    this.header.add(this.subtitle);
  }

  setWorks() {
    this.projectOne = this.generateWavyImage();
    this.projectOne.position.y = -40 * 2;

    this.works.add(this.projectOne);
  }

  generateWavyImage() {
    let imageGeometry = new THREE.PlaneGeometry(16, 9, 10, 10);
    let imageMaterial = new THREE.ShaderMaterial({
      vertexShader: waveVertexShader,
      fragmentShader: waveFragmentShader,
      uniforms: {
        uTime: {
          type: 'f',
          value: 0.0,
        },
        uTexture: {
          value: this.resources.items.cover,
        },
      },
    });

    let imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);

    return imageMesh;
  }

  update() {
    // this.projectOne.material.uniforms.uTime.value = this.time.elapsed * 0.001;
  }
}
