import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
