import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={{ width: '200px', padding: '1rem', background: '#f0f0f0' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/productivity">Productivity</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
