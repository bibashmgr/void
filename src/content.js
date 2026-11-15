const pad = (value) => String(value).padStart(2, "0");

export function renderProjects(container, projects, limit = 3) {
  const visible = projects.slice(0, limit);

  container.innerHTML = visible
    .map(
      (project, index) => `
      <li class="project reveal">
        <span class="project-index">${pad(index + 1)}</span>
        <div class="project-main">
          <h3 class="project-title">
            <a class="project-link" href="${project.liveUrl}" target="_blank" rel="noopener">${project.title}</a>
          </h3>
          <p class="project-tags">${project.tags.join(" · ")}</p>
        </div>
        <p class="project-meta">
          <span>${project.year}</span>
          <span>${project.role}</span>
        </p>
        <span class="project-arrow" aria-hidden="true">↗</span>
        <div class="project-details">
          <div class="project-details-inner">
            <p class="project-description">${project.description}</p>
            <a class="project-source" href="${project.codeUrl}" target="_blank" rel="noopener">Source code ↗</a>
          </div>
        </div>
      </li>`,
    )
    .join("");

  const count = document.querySelector(".work-count");
  if (count) {
    count.textContent = `(${pad(visible.length)})`;
  }
}

export function setupReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2 },
  );

  elements.forEach((element) => observer.observe(element));
}
