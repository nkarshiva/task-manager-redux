import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [duration, setDuration] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.task.title || '');
      setDescription(editingTask.task.description || '');
      setDueDate(editingTask.task.dueDate || '');
      setPriority(editingTask.task.priority || '');
      setDuration(editingTask.task.duration || '');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    if (!priority) newErrors.priority = 'Priority is required';
    if (!duration) newErrors.duration = 'Duration is required';


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addTask({ title, description, dueDate, priority, duration, completed: false });
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('');
    setDuration('')
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className='flex flex-col sm:flex-row gap-y-4 gap-x-4 justify-center mb-4'>
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
            }}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title && 'border-red-500'}`}
          />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
        </div>
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, dueDate: '' }));
            }}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dueDate && 'border-red-500'}`}
          />
          {errors.dueDate && <p className="text-red-500 text-xs italic">{errors.dueDate}</p>}
        </div>
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, priority: '' }));
            }}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.priority && 'border-red-500'}`}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="text-red-500 text-xs italic">{errors.priority}</p>}
        </div>
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, duration: '' }));
            }}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.priority && 'border-red-500'}`}
          >
            <option value="">Select duration</option>
            <option value="in a week">In a Week</option>
            <option value="in a month">In a Month</option>
            <option value="in a year">In a Year</option>
          </select>
          {errors.duration && <p className="text-red-500 text-xs italic">{errors.duration}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
          }}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description && 'border-red-500'}`}
        />
        {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
