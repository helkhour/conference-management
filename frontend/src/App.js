import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Header from './components/common/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  );
}

export default App