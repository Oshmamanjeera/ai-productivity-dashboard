import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PomodoroTimer from '../components/PomodoroTimer';
import TaskList from '../components/TaskList';
import AIHelper from '../components/AIHelper';

function DashBoard() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1, padding: '1rem' }}>
          <PomodoroTimer />
          <hr />
          <TaskList />
          <hr />
          <AIHelper />
        </div>
      </div>
    </>
  );
}

export default DashBoard;
