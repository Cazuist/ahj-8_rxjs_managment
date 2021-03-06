import StatsWidget from './widgets/StatsWidget';
import TasksWidget from './widgets/TasksWidget';
import Store from './state/Store';

const store = new Store();
const stats = new StatsWidget(document.querySelector('.stat_widget_box'), store);
const tasks = new TasksWidget(document.querySelector('.tasks_widget_box'), store);

stats.init();
tasks.init();
