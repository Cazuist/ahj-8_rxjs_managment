import { fromEvent } from 'rxjs';
import StatsWidget from './StatsWidget';
import TasksWidget from './TasksWidget';
import Store from './Store';

export default class StateManager {
  constructor(container, projects) {
    this.container = container;
    this.projects = projects;
    this.store = new Store(this.projects);
  }

  init() {
    this.bindToDOM();
    this.statsWidget = new StatsWidget(this.widgetsBox, this.projects);
    this.tasksWidget = new TasksWidget(this.widgetsBox, this.projects);
    this.currentProject = this.tasksWidget.currentProject;
    this.initElements();
    this.registerEvents();
    this.store.makeSubscribe();
  }

  // eslint-disable-next-line class-methods-use-this
  createHTML() {
    return `
      <div class="dashboard-widget_box">
        <header class="dashboard-widget_header">
          <div class="dots">
            <span class="dot dot-1"></span>
            <span class="dot dot-2"></span>
            <span class="dot dot-3"></span>
          </div>
          <h3 class="dashboard-widget_header_title">
            ProjectsDashboard v.1.0
          </h3>
        </header>
        
        <div class="dashboard-widgets_wrapper">                      
        </div>
      </div>  
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.createHTML());
    this.widgetsBox = document.querySelector('.dashboard-widgets_wrapper');
  }

  initElements() {
    this.taskItemEl = document.querySelector('.tasks-wrapper');
    this.selectEl = document.querySelector('.select-box');
    this.openEl = document.querySelector('.open-project');
    this.taskTitleEl = document.querySelector('.tasks-box_title');
  }

  registerEvents() {
    fromEvent(this.taskItemEl, 'click').subscribe((event) => {
      const { target } = event;

      if (target.classList.contains('task-status')) {
        const taskId = target.closest('.task-item').dataset.id;
        const statId = this.currentProject.id;

        this.store.stream$.next({ type: 'checkTask', statId, taskId });
        return;
      }

      if (target.classList.contains('open-project')) {
        this.selectEl.classList.remove('hidden');
      }
    });

    fromEvent(this.selectEl, 'click').subscribe((event) => {
      const { target } = event;

      if (!target.classList.contains('select-name')) return;

      const prjName = target.textContent.trim();
      this.openEl.textContent = prjName;
      this.currentProject.isCurrent = false;
      this.currentProject = this.projects.find((prj) => prj.name === prjName);
      this.currentProject.isCurrent = true;

      const newTasks = this.tasksWidget.createTasksHtml(this.currentProject);
      this.taskItemEl.querySelector('.task-box').innerHTML = newTasks;

      const newSelect = this.tasksWidget.drawSelectBox(this.projects);
      this.selectEl.querySelector('.select-names').innerHTML = newSelect;

      this.selectEl.classList.add('hidden');
    });
  }
}
