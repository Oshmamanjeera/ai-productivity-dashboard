import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import './productivity.css';

const COLORS = ['#00C49F', '#FF8042']; // Green for completed, Orange for pending

function ProductivityChart() {
  const { tasks } = useContext(TaskContext);

  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.length - completed;

  const productivityData = [
    { name: 'Completed', value: completed },
    { name: 'Pending', value: pending }
  ];

  useEffect(() => {
    localStorage.setItem('productivityData', JSON.stringify({ completed, pending }));
  }, [completed, pending]);

  return (
    <div className="productivity-container">
      <h2>📊 Productivity Analytics</h2>
      <div className="chart-wrapper">
        <PieChart width={300} height={250}>
          <Pie
            data={productivityData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {productivityData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <ul>
        <li>Total Tasks: {tasks.length}</li>
        <li>Completed Tasks: {completed}</li>
        <li>Pending Tasks: {pending}</li>
        <li>Productivity Score: {tasks.length ? Math.round((completed / tasks.length) * 100) : 0}%</li>
      </ul>
    </div>
  );
}

export default ProductivityChart;
