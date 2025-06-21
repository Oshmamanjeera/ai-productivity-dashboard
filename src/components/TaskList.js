import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask } = useContext(TaskContext);
  const [taskInput, setTaskInput] = useState('');

  const handleAdd = () => {
    if (taskInput.trim()) {
      addTask(taskInput);
      setTaskInput('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>✅ Task List</h2>

      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Enter your task..."
        style={{ marginRight: '10px', padding: '0.5rem' }}
      />
      <button onClick={handleAdd}>Add Task</button>

      <ul style={{ marginTop: '1rem' }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ marginBottom: '0.5rem' }}>
            <span
              onClick={() => toggleTask(index)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
