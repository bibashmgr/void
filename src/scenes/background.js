import * as THREE from 'three';

// src
import Experience from '../experience.js';

// helpers
import { random } from '../helpers/randomGenerator.js';

export default class Background {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.mouse = this.experience.mouse;

    this.parameters = {
      particleSize: 0.5,
      particleCount: 1000,
      range: {
        x: [-50, 50],
        y: [-150, 30],
        z: [-50, 50],
      },
      shapeCount: 50,
      rotationSpeed: 0.002,
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
    });

    let vertices = [];

    for (let i = 0; i < this.parameters.particleCount; i++) {
      let vertex = new THREE.Vector3();
      vertex.x = random(this.parameters.range.x[0], this.parameters.range.x[1]);
      vertex.y = random(this.parameters.range.y[0], this.parameters.range.y[1]);
      vertex.z = random(this.parameters.range.z[0], this.parameters.range.z[1]);

      vertices.push(vertex.x, vertex.y, vertex.z);
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    this.particles = new THREE.Points(particleGeometry, particleMaterial);

    this.group.add(this.particles);
  }

  setShapes() {
    let shapeMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
    });

    let cubeGeometry = new THREE.BoxGeometry();
    let octaGeometry = new THREE.OctahedronGeometry();
    let icosaGeometry = new THREE.IcosahedronGeometry();

    this.cubeShapes = this.generateShape(
      cubeGeometry,
      shapeMaterial,
      this.parameters.shapeCount
    );
    this.octaShapes = this.generateShape(
      octaGeometry,
      shapeMaterial,
      this.parameters.shapeCount
    );
    this.icosaShapes = this.generateShape(
      icosaGeometry,
      shapeMaterial,
      this.parameters.shapeCount
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
          random(2, 2.5);

      shapeMesh.updateMatrix();

      shapesMesh.setMatrixAt(i, shapeMesh.matrix);
    }

    this.shapes.add(shapesMesh);

    return shapesMesh;
  }

  animateShapes(shapesMesh) {
    let matrix = new THREE.Matrix4();
    let shapeMesh = new THREE.Object3D();

    for (let i = 0; i < this.parameters.cubesCount; i++) {
      shapesMesh.getMatrixAt(i, matrix);

      matrix.decompose(shapeMesh.position, shapeMesh.rotation, shapeMesh.scale);

      shapeMesh.rotation.x += this.parameters.rotationSpeed;
      shapeMesh.rotation.y += this.parameters.rotationSpeed;
      shapeMesh.rotation.z += this.parameters.rotationSpeed;

      shapeMesh.updateMatrix();

      this.shapesMesh.setMatrixAt(i, shapeMesh.matrix);
    }

    shapesMesh.instanceMatrix.needsUpdate = true;
  }

  update() {
    this.animateShapes(this.cubeShapes);
    this.animateShapes(this.octaShapes);
    this.animateShapes(this.icosaShapes);

    this.shapes.rotation.y += this.parameters.rotationSpeed * 0.1;
  }
}
