import gsap from "gsap";
import { EventEmitter } from "events";

import Experience from "../experience.js";

export default class Loading extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.parameters = {
      countDuration: 2, // seconds to count the full 0 -> 100
      fadeDuration: 0.8,
    };

    this.element = document.querySelector(".loading");
    this.countElement = this.element.querySelector(".loading-count");
    this.barElement = this.element.querySelector(".loading-bar-fill");

    this.progress = { value: 0 };
    this.isReady = false;

    this.resources.on("progress", (ratio) => {
      if (!this.isReady) {
        this.setProgress(ratio * 100);
      }
    });
    this.resources.on("ready", () => {
      this.isReady = true;
      this.setProgress(100);
    });
  }

  setProgress(target) {
    if (this.tween) {
      this.tween.kill();
    }

    const distance = Math.max(target - this.progress.value, 0);

    this.tween = gsap.to(this.progress, {
      value: target,
      duration: (distance / 100) * this.parameters.countDuration,
      ease: "power1.out",
      onUpdate: () => this.render(),
      onComplete: () => {
        if (this.isReady && target === 100) {
          this.hide();
        }
      },
    });
  }

  render() {
    const value = Math.round(this.progress.value);

    this.countElement.textContent = String(value).padStart(3, "0");
    this.barElement.style.transform = `scaleX(${this.progress.value / 100})`;
  }

  hide() {
    document.body.classList.remove("is-loading");

    gsap.to(this.element, {
      opacity: 0,
      duration: this.parameters.fadeDuration,
      ease: "power2.inOut",
      onComplete: () => {
        this.element.style.display = "none";
        this.emit("finished");
      },
    });
  }
}
