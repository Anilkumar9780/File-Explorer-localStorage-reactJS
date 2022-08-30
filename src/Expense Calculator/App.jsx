import React from 'react';

// import bootstarp and font-awesome css and font logo css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './app.css';

// import component ExpenseAdd;
import ExpenseAdd from './ExpenseAdd';

export default function App() {
  return (
    <div className="App">
      <ExpenseAdd />
    </div>
  );
}
