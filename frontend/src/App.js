import React from 'react';

import './App.css';
import Australian from './sections/Australian';
import RolandGarros from './sections/RolandGarros';
import Wimbledon from './sections/Wimbledon';
import UsOpen from './sections/UsOpen';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Australian />
      <RolandGarros />
      <Wimbledon />
      <UsOpen />
    </div>
  );
}

export default App;
