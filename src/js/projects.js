import { v4 } from 'uuid';

const projects = [
  {
    id: 1,
    name: 'REST Backend',
    isCurrent: true,
    tasks: [
      {
        id: v4(),
        name: 'Create server',
        done: false,
      },
      {
        id: v4(),
        name: 'Customization',
        done: false,
      },
      {
        id: v4(),
        name: 'Router logic',
        done: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Frontend',
    isCurrent: false,
    tasks: [
      {
        id: v4(),
        name: 'Main menu',
        done: false,
      },
      {
        id: v4(),
        name: 'Change logo',
        done: false,
      },
      {
        id: v4(),
        name: 'Delete last task',
        done: false,
      },
      {
        id: v4(),
        name: 'Adaptive layout',
        done: false,
      },
      {
        id: v4(),
        name: 'Add new info',
        done: false,
      },
      {
        id: v4(),
        name: 'Check form validation',
        done: false,
      },
    ],
  },
  {
    id: 3,
    name: 'Android App',
    isCurrent: false,
    tasks: [
      {
        id: v4(),
        name: 'Push Notification',
        done: false,
      },
      {
        id: v4(),
        name: 'Apple Pay Support',
        done: false,
      },
      {
        id: v4(),
        name: 'l18n',
        done: false,
      },
      {
        id: v4(),
        name: 'AppStore Publication',
        done: false,
      },
      {
        id: v4(),
        name: 'Test 1',
        done: false,
      },
      {
        id: v4(),
        name: 'Test 2',
        done: false,
      },
    ],
  },
  {
    id: 4,
    name: 'iOS App',
    isCurrent: false,
    tasks: [
      {
        id: v4(),
        name: 'Push Notification',
        done: true,
      },
      {
        id: v4(),
        name: 'Apple Pay Support',
        done: false,
      },
      {
        id: v4(),
        name: 'l18n',
        done: false,
      },
      {
        id: v4(),
        name: 'AppStore Publication',
        done: false,
      },
    ],
  },
];

export default projects;
