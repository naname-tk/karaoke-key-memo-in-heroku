import React from 'react';
import ReactDOM from 'react-dom';
import Top from './Top';

const App = () => {
  // コンソール上のdevtoolに関するメッセージを本番環境では表示しないようにする。
  if (process.env.NODE_ENV === 'production') {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {}
  }
  console.log(process.env.NODE_ENV);

  return(
    <Top/>
  )
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
