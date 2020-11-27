import Actions from '../static/Actions';

export default function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case Actions.Change:
      return {
        ...state,
        type,
        update: null,
        projects: state.projects.map((project) => {
          if (project.isCurrent || project.name === payload[0]) {
            return {
              ...project,
              isCurrent: !project.isCurrent,
              tasks: project.tasks.map((tasks) => ({ ...tasks })),
            };
          }

          return {
            ...project,
            tasks: project.tasks.map((tasks) => ({ ...tasks })),
          };
        }),
      };

    case Actions.Check:
      return {
        ...state,
        type,
        update: payload[0],
        projects: state.projects.map((project) => {
          if (!project.isCurrent) return { ...project };

          return {
            ...project,
            tasks: project.tasks.map((task) => {
              if (task.id !== payload[0]) return { ...task };

              return { ...task, done: !task.done };
            }),
          };
        }),
      };

    default:
      return state;
  }
}
