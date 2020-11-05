import { distinctUntilChanged } from 'rxjs/operators';

export default class StatsWidget {
  constructor(container, store) {
    this.container = container;
    this.store = store;
  }

  init() {
    this.bindToDOM();
    this.subscribe();
  }

  // eslint-disable-next-line class-methods-use-this
  createHTML() {
    return `
      <header class="widget-title stats-box_title">Stats</header>
      <div class="wrapper-box stats-box">
        <div class="box-header item stat-item">
          <div class="project-name">Project</div>
          <div class="open-count">Open</div>
        </div> 

        <div class="stats-items-box">
        </div>       
      </div>     
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.createHTML());
  }

  subscribe() {
    this.store.state$.pipe(
      distinctUntilChanged(),
    )
      .subscribe(({ projects, type }) => {
        if (type === '__INITIALIZATION__') {
          projects.forEach((project) => {
            this.drawProject(project);
          });
          return;
        }

        if (type === 'CHECK') {
          this.redrawStat(projects);
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  drawProject(project) {
    const container = document.querySelector('.stats-items-box');
    const tasksCount = project.tasks.filter(({ done }) => !done).length;

    const html = `
      <div class="item stat-item" data-id=${project.id}>
        <div class="project-name">${project.name}</div>
        <div class="project-stat-field">${tasksCount}</div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', html);
  }

  // eslint-disable-next-line class-methods-use-this
  redrawStat(projects) {
    const currentProject = projects.find(({ isCurrent }) => isCurrent);
    const counter = currentProject.tasks.filter(({ done }) => !done).length;

    document.querySelector(`[data-id="${currentProject.id}" ] .project-stat-field`)
      .textContent = counter;
  }
}
