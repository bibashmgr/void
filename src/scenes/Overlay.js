import * as THREE from 'three';

// src
import Experience from '../Experience.js';

// helpers
import { random } from '../helpers/randomGenerator.js';

export default class Overlay {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.mouse = this.experience.mouse;

    this.parameters = {
      materialColor: '#ffffff',
      particleSize: 0.5,
      particlesCount: 1000,
      range: {
        x: [-40, 40],
        y: [-160, 40],
        z: [-40, 40],
      },
      shapeSize: [2, 2.5],
      shapesCount: 50,
      shapeSpeed: 0.2,
      shapesSpeed: 1,
    };

    this.group = new THREE.Group();

    this.shapes = new THREE.Group();
    this.group.add(this.shapes);

    this.setParticles();
    this.setShapes();
  }

  setParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleMaterial = new THREE.PointsMaterial({
      size: this.parameters.particleSize,
      sizeAttenuation: true,
      color: this.parameters.materialColor,
    });

    let postions = new Float32Array(this.parameters.particlesCount * 3);

    for (let i = 0; i < this.parameters.particlesCount * 3; i++) {
      postions[i * 3 + 0] = random(
        this.parameters.range.x[0],
        this.parameters.range.x[1]
      );
      postions[i * 3 + 1] = random(
        this.parameters.range.y[0],
        this.parameters.range.y[1]
      );
      postions[i * 3 + 2] = random(
        this.parameters.range.z[0],
        this.parameters.range.z[1]
      );
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(postions, 3)
    );

    this.particles = new THREE.Points(particleGeometry, particleMaterial);

    this.group.add(this.particles);
  }

  setShapes() {
    let shapeMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: this.parameters.materialColor,
    });

    let cubeGeometry = new THREE.BoxGeometry();
    let octaGeometry = new THREE.OctahedronGeometry();
    let icosaGeometry = new THREE.IcosahedronGeometry();

    this.cubeShapes = this.generateShape(
      cubeGeometry,
      shapeMaterial,
      this.parameters.shapesCount
    );
    this.octaShapes = this.generateShape(
      octaGeometry,
      shapeMaterial,
      this.parameters.shapesCount
    );
    this.icosaShapes = this.generateShape(
      icosaGeometry,
      shapeMaterial,
      this.parameters.shapesCount
    );
  }

  generateShape(shapeGeometry, shapeMaterial, shapesCount) {
    let shapesMesh = new THREE.InstancedMesh(
      shapeGeometry,
      shapeMaterial,
      shapesCount
    );

    let shapeMesh = new THREE.Object3D();

    for (let i = 0; i < shapesCount; i++) {
      shapeMesh.position.set(
        random(this.parameters.range.x[0], this.parameters.range.x[1]),
        random(this.parameters.range.y[0], this.parameters.range.y[1]),
        random(this.parameters.range.z[0], this.parameters.range.z[1])
      );

      shapeMesh.rotation.set(
        random(-1, 1) * Math.PI * 2,
        random(-1, 1) * Math.PI * 2,
        random(-1, 1) * Math.PI * 2
      );

      shapeMesh.scale.x =
        shapeMesh.scale.y =
        shapeMesh.scale.z =
          random(this.parameters.shapeSize[0], this.parameters.shapeSize[1]);

      shapeMesh.updateMatrix();

      shapesMesh.setMatrixAt(i, shapeMesh.matrix);
    }

    this.shapes.add(shapesMesh);

    return shapesMesh;
  }

  animateShapes(shapesMesh) {
    let matrix = new THREE.Matrix4();
    let shapeMesh = new THREE.Object3D();

    for (let i = 0; i < this.parameters.shapesCount; i++) {
      shapesMesh.getMatrixAt(i, matrix);

      matrix.decompose(shapeMesh.position, shapeMesh.rotation, shapeMesh.scale);

      shapeMesh.rotation.x +=
        this.time.delta * this.parameters.shapeSpeed * 0.0001;
      shapeMesh.rotation.y +=
        this.time.delta * this.parameters.shapeSpeed * 0.0001;
      shapeMesh.rotation.z +=
        this.time.delta * this.parameters.shapeSpeed * 0.0001;

      shapeMesh.updateMatrix();

      shapesMesh.setMatrixAt(i, shapeMesh.matrix);
    }

    shapesMesh.instanceMatrix.needsUpdate = true;
  }

  update() {
    this.animateShapes(this.cubeShapes);
    this.animateShapes(this.octaShapes);
    this.animateShapes(this.icosaShapes);

    this.shapes.rotation.y +=
      this.time.delta * this.parameters.shapesSpeed * 0.00001;
  }
}
