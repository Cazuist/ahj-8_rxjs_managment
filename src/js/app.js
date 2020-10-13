import StateManager from './StateManager';
import projects from './projects';

// const dashboard = new DashboardManager(document.body, 'ws://localhost:7070');
const dashboard = new StateManager(document.body, projects);

dashboard.init();
