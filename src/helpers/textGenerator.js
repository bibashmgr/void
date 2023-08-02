import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export const generateText = (fontType, text, textSize, posY) => {
  let textGeometry = new TextGeometry(text, {
    font: fontType,
    size: textSize,
    height: 0.01,
    curveSegments: 12,
  });
  textGeometry.computeBoundingBox();

  let textMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
  });

  let textMesh = new THREE.Mesh(textGeometry, textMaterial);

  let centerOffsetX =
    -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
  let centerOffsetY =
    -0.5 * (textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y);

  textMesh.position.x = centerOffsetX;
  textMesh.position.y = posY + centerOffsetY;
  textMesh.position.z = 0;

  textMesh.rotation.x = 0;
  textMesh.rotation.y = Math.PI * 2;

  return textMesh;
};
