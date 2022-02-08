import React from 'react';
import useMockData from '../utils/mockData';

const Main = () => {
  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    console.log('init');
    initialize();
  };

  return (
    <div className="container mt-5">
      <h1>Main</h1>
      <h3>Init data to firebase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        innit firebase data
      </button>
    </div>
  );
};

export default Main;
