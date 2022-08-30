import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/App.css';

import CreatePost from './CreatePost';

export default function App() {
  return (
    <div className="App">
      <CreatePost />
    </div>
  );
}
