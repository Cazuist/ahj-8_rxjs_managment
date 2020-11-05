import Actions from '../static/Actions';

export default function reducer(state, action) {
  const { type } = action;

  switch (type) {
    case Actions.Change:
      // eslint-disable-next-line no-param-reassign
      state.projects.find(({ isCurrent }) => isCurrent).isCurrent = false;
      // eslint-disable-next-line no-param-reassign
      state.projects.find(({ name }) => name === action.payload[0]).isCurrent = true;
      return { ...state, type, update: action.payload[0] };

    case Actions.Check:
      // eslint-disable-next-line no-case-declarations
      const changedStat = state.projects.find(({ isCurrent }) => isCurrent);
      // eslint-disable-next-line no-case-declarations
      const changedTask = changedStat.tasks.find((task) => task.id === action.payload[0]);
      changedTask.done = !action.payload[1];
      return { ...state, type, update: action.payload[0] };

    default:
      return state;
  }
}
