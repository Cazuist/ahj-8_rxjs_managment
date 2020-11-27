import { distinctUntilChanged } from 'rxjs/operators';

export default class TasksWidget {
  constructor(container, store) {
    this.container = container;
    this.store = store;
  }

  init() {
    this.bindToDOM();
    this.subscribe();
    this.registerEvents();
  }

  // eslint-disable-next-line class-methods-use-this
  createHTML() {
    return `
      <header class="widget-title tasks-box_title">Tasks</header>
      <div class="wrapper-box tasks-box">
        <div class="box-header item task-item">
          <div class="project-field">Project: </div>
          <div class="open-project">
          </div>

          <div class="select-box hidden">
            <div class="select-title">Project: </div>
            <div class="select-names"></div>
          </div> 
        </div>

        <div class="task-box">
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
      .subscribe(({ type, projects, update }) => {
        if (type === '__INITIALIZATION__' || type === 'CHANGE') {
          this.drawProjectTask(projects);
          return;
        }

        if (type === 'CHECK') {
          this.updChecks(update);
        }
      });
  }

  drawProjectTask(projects) {
    const container = document.querySelector('.task-box');
    const titleEl = document.querySelector('.open-project');
    const currentProject = projects.find(({ isCurrent }) => isCurrent);

    let html = '';

    currentProject.tasks.forEach(({ done, id, name }) => {
      html += `
        <div class="item task-item ${done ? 'done' : ''}" data-id=${id}>
        <div class="task-status"></div>
        <div class="task-name">${name}</div>        
      </div>
      `;
    });

    titleEl.textContent = currentProject.name;
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', html);
    this.redrawSelectBox(projects);
  }

  // eslint-disable-next-line class-methods-use-this
  redrawSelectBox(projects) {
    const container = document.querySelector('.select-names');
    const currentName = projects.find(({ isCurrent }) => isCurrent).name;
    const othersNames = projects.filter(({ isCurrent }) => !isCurrent)
      .map(({ name }) => name);

    const selectedHtml = `<div class="select-name current-select">${currentName}</div>`;
    let othersHtml = '';

    othersNames.forEach((name) => {
      othersHtml += `<div class="select-name">${name}</div>`;
    });

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', selectedHtml);
    container.insertAdjacentHTML('beforeend', othersHtml);
  }

  registerEvents() {
    const selectBoxEl = document.querySelector('.select-box');
    const taskBoxEl = document.querySelector('.task-box');
    const currentPrjEl = document.querySelector('.open-project');

    document.querySelector('.open-project')
      .addEventListener('mouseover', () => {
        selectBoxEl.classList.remove('hidden');
      });

    selectBoxEl.addEventListener('mouseleave', () => {
      selectBoxEl.classList.add('hidden');
    });

    taskBoxEl.addEventListener('click', (event) => {
      const { target, target: { classList } } = event;

      if (!classList.contains('task-status')) return;

      const checkedTaskId = target.closest('.task-item').dataset.id;

      this.store.checkTask([checkedTaskId]);
    });

    selectBoxEl.addEventListener('click', (event) => {
      const { target, target: { classList } } = event;

      if (!classList.contains('select-name')) return;

      selectBoxEl.classList.add('hidden');

      if (target.textContent === currentPrjEl.textContent) {
        return;
      }

      this.store.changeTask([target.textContent]);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  updChecks(id) {
    document.querySelector(`[data-id="${id}"]`).classList.toggle('done');
  }
}
