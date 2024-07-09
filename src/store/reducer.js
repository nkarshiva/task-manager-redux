import { ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_COMPLETE } from './actions';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const newTasks = [...state.tasks, action.payload];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };
    case EDIT_TASK:
      console.log("Editing task:", action.payload);
      const editedTasks = state.tasks.map((task, index) =>
        index === action.payload.index ? action.payload.task : task
      );
      console.log("Edited tasks:", editedTasks);
      localStorage.setItem('tasks', JSON.stringify(editedTasks));
      return { ...state, tasks: editedTasks };
    case DELETE_TASK:
      const filteredTasks = state.tasks.filter((_, index) => index !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(filteredTasks));
      return { ...state, tasks: filteredTasks };
    case TOGGLE_COMPLETE:
      const toggledTasks = state.tasks.map((task, index) =>
        index === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      localStorage.setItem('tasks', JSON.stringify(toggledTasks));
      return { ...state, tasks: toggledTasks };
    default:
      return state;
  }
};

export default taskReducer;
