import * as React from 'react';
import PropTypes from 'prop-types';

import './App.css';
import Home from './views/Home';
import Header from './components/common/Header';

function App() {
 
  return (
    <div>
      <Header/>
      <Home/>

    </div>
    

  );
}

export default App;