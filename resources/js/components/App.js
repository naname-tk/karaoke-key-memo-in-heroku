import React from 'react';
import ReactDOM from 'react-dom';
import Top from './Top';

const App = () => {

  return(
    <Top/>
  )
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
