import React, { useEffect } from 'react';
import StatusForm from './components/StatusForm';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import * as localStorageUtil from '@/localStorageUtil';
import { useSetRecoilState } from 'recoil';
import { statusesState, Todo, todoState } from './recoil/atoms';

function App() {
  const setTodos = useSetRecoilState(todoState);
  const setStatuses = useSetRecoilState(statusesState);

  useEffect(() => {
    const todos = localStorageUtil.get<Todo[]>('todos');
    const statuses = localStorageUtil.get<string[]>('statuses');

    if (todos) {
      setTodos(todos);
    }

    if (statuses) {
      setStatuses(statuses);
    }
  }, []);

  return (
    <>
      <TodoForm />
      <StatusForm />
      <TodoList />
    </>
  );
}

export default App;
