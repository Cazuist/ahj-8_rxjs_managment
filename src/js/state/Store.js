import { Subject } from 'rxjs';
import { startWith, scan } from 'rxjs/operators';
import reducer from './reducer';
import Actions from '../static/Actions';

export default class Store {
  constructor(projects) {
    this.projects = projects;
    this.actions$ = new Subject();
    this.state$ = this.actions$.asObservable().pipe(
      startWith({ type: '__INITIALIZATION__' }),
      scan((state, action) => reducer(state, action),
        { projects: this.projects, type: '__INITIALIZATION__', update: null }),
    );
  }

  dispatch(type, payload = null) {
    this.actions$.next({ type, payload });
  }

  checkTask(value = null) {
    this.dispatch(Actions.Check, value);
  }

  changeTask(value = null) {
    this.dispatch(Actions.Change, value);
  }
}
