import React from 'react';
import StatusForm from './components/StatusForm';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <>
      <TodoForm />
      <StatusForm />
      <TodoList />
    </>
  );
}

export default App;
