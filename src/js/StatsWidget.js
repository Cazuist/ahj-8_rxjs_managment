export default class StatsWidget {
  constructor(container, projects) {
    this.container = container;
    this.projects = projects;
    this.bindToDOM();
  }

  createHTML() {
    return `
      <section class="widget-wrapper stats-wrapper">
        <header class="widget-title stats-box_title">Stats</header>
        <div class="wrapper-box stats-box">
          <div class="box-header item stat-item">
            <div class="project-name">Project</div>
            <div class="open-count">Open</div>
          </div>
          ${this.createStatsHtml(this.projects)}
        </div>
      </section>      
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  createStatsHtml(projects) {
    let html = '';

    projects.forEach(({ id, name, tasks }) => {
      const prjID = id;
      const prjName = name;
      const counts = tasks.filter((task) => !task.done).length;

      html += `
        <div class="item stat-item" data-id=${prjID}>
          <div class="project-name">${prjName}</div>
          <div class="project-stat-field">${counts}</div>
        </div>
      `;
    });
    return html;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.createHTML());
  }
}
