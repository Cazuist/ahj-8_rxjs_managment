export default class TasksWidget {
  constructor(container, projects) {
    this.container = container;
    this.projects = projects;
    this.currentProject = this.projects.find((prj) => prj.isCurrent);
    this.bindToDOM();
  }

  // eslint-disable-next-line class-methods-use-this
  createHTML() {
    return `
      <section class="widget-wrapper tasks-wrapper">
        <header class="widget-title tasks-box_title">Tasks</header>
        <div class="select-box hidden">
          <div class="select-title">Project: </div>
            <div class="select-names">
              ${this.drawSelectBox(this.projects)}
            </div>
          </div>
        </div>        
        <div class="wrapper-box tasks-box">
          <div class="box-header item task-item">
            <div class="project-field">Project: </div>
            <div class="open-project">
              ${this.currentProject.name}
            </div>
          </div>
          <div class="task-box">
            ${this.createTasksHtml(this.currentProject)}
          </div>
        </div>
      </section>      
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  createTasksHtml(project) {
    let html = '';

    project.tasks.forEach(({ id, name, done }) => {
      html += `
        <div class="item task-item ${done ? 'done' : ''}" data-id=${id}>
          <div class="task-status"></div>
          <div class="task-name">${name}</div>        
        </div>
      `;
    });
    return html;
  }

  // eslint-disable-next-line class-methods-use-this
  drawSelectBox(projects) {
    const names = projects
      .filter(({ isCurrent }) => !isCurrent)
      .map((prj) => prj.name);

    const current = projects.find((prj) => prj.isCurrent);

    let html = `
        <div class="select-name current-select">
          ${current.name}
        </div>
    `;

    names.forEach((name) => {
      html += `
        <div class="select-name">
          ${name}
        </div>
      `;
    });

    return html;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.createHTML());
  }
}
