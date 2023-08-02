import * as THREE from 'three';

// src
import Experience from '../../Experience';

// helpers
import { generateText } from '../../helpers/textGenerator';

export default class HomeSection {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.font = this.resources.items.dmSerifRegular;

    this.parameters = {
      posY: {
        header: 0,
      },
      textSize: {
        title: 0.6,
        subtitle: 0.3,
      },
      text: {
        title: 'Bibash Magar',
        subtitle: 'A Full Stack Developer',
      },
    };

    this.group = new THREE.Group();

    this.setHeader();
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

    this.group.add(this.title);
    this.group.add(this.subtitle);
  }
}
