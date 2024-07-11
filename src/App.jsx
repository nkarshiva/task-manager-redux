import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterAndSearch from './components/FilterAndSearch';
import { addTask, editTask, deleteTask, toggleComplete } from './store/actions';

const App = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [highlight, setHighlight] = useState('')
  const [sorting, setSorting] = useState({ field: '', order: 'asc' });
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (index, task) => {
    setEditingTask({ index, task });
  };

  const handleSaveTask = (task) => {
    if (editingTask !== null) {
      dispatch(editTask(editingTask.index, task));
      setEditingTask(null);
    } else {
      dispatch(addTask(task));
    }
  };

  const handleToggleComplete = (index) => {
    dispatch(toggleComplete(index));
  };

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      if (filter === 'completed') {
        return task.completed;
      } else if (filter === 'not_completed') {
        return !task.completed;
      }
      else if (filter === "in a week") {
        return task.duration === filter;
      }
      else if (filter === "in a month") {
        return task.duration === filter;
      }
      else if (filter === "in a year") {
        return task.duration === filter;
      }
      else if (filter === "low") {
        return task.priority === filter;
      }
      else if (filter === "medium") {
        return task.priority === filter;
      }
      else if (filter === "high") {
        return task.priority === filter;
      }

      else {
        return true;
      }
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sorting.field) {
        if (sorting.field === 'dueDate') {
          return sorting.order === 'asc'
            ? new Date(a.dueDate) - new Date(b.dueDate)
            : new Date(b.dueDate) - new Date(a.dueDate);
        } else {
          return sorting.order === 'asc'
            ? a[sorting.field].localeCompare(b[sorting.field])
            : b[sorting.field].localeCompare(a[sorting.field]);
        }
      } else {
        return 0;
      }
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <TaskForm addTask={handleSaveTask} editingTask={editingTask} />
      <FilterAndSearch
        setFilter={setFilter}
        setSearch={setSearch}
        setSorting={setSorting}
        setHighlight={setHighlight}
      />
      <TaskList
        tasks={filteredAndSortedTasks}
        editTask={handleEditTask}
        deleteTask={(index) => dispatch(deleteTask(index))}
        toggleComplete={handleToggleComplete}
        highlight={highlight}
      />
    </div>
  );
};

export default App;
