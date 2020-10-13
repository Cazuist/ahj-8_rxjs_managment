import { Subject } from 'rxjs';

export default class Store {
  constructor(projects) {
    this.projects = projects;
    this.stream$ = new Subject();
  }

  makeSubscribe() {
    this.stream$.subscribe((val) => {
      if (val.type === 'checkTask') {
        this.checkTask(val);
      }
    });
  }

  checkTask({ taskId, statId }) {
    const taskEl = document.querySelector(`[data-id="${taskId}"]`);
    const statCounterEl = document.querySelector(`[data-id="${statId}"] .project-stat-field`);

    const stat = this.projects.find((project) => project.id === statId);
    const task = stat.tasks.find((tsk) => tsk.id === taskId);
    task.done = !task.done;

    const amount = stat.tasks.filter((tsk) => !tsk.done).length;

    taskEl.classList.toggle('done');
    statCounterEl.textContent = amount;
  }
}
