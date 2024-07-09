import React from 'react';

const TaskList = ({ tasks, editTask, deleteTask, toggleComplete }) => {
  return (
    <div className="task-list">
      {tasks.length>0?<h1 className="text-2xl font-bold mb-4">Tasks</h1>:null}
      {tasks.map((task, index) => (
        <div
          key={index}
          className={`task-item p-4 mb-2 border ${task.completed ? 'bg-green-100' : 'bg-white'}`}
        >
          <div className="flex flex-col gap-y-2 sm:flex-row justify-start items-start sm:justify-between sm:items-center">
            <div className='flex flex-col justify-start'>
              <h3 className="text-xl font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
              <p className="text-sm text-gray-600">Priority: {task.priority}</p>
            </div>
            <div>
              <button
                onClick={() => toggleComplete(index)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button
                onClick={() => editTask(index, task)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
