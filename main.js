// styling
import "./style.css";

// src
import Experience from "./src/experience.js";
import { renderProjects, setupReveal } from "./src/content.js";

// constants
import projects from "./src/constants/projects.js";

renderProjects(document.querySelector(".project-list"), projects);
setupReveal();

new Experience(document.querySelector("canvas.experience-canvas"));
