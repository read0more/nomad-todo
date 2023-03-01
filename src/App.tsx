import React, { useEffect } from 'react';
import StatusForm from './components/StatusForm';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import * as localStorageUtil from '@/localStorageUtil';
import { useSetRecoilState } from 'recoil';
import { statusesState, Todo, todoState } from './recoil/atoms';
import styled from 'styled-components';
import StatusTabs from './components/StatusTabs';

const Container = styled.main`
  margin: auto;
  max-width: 1024px;
`;

const Title = styled.h1`
  padding-top: 1em;
  margin: auto;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
`;

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
    <Container>
      <Title>Todo</Title>
      <StatusTabs />
      <TodoForm />
      <StatusForm />
      <TodoList />
    </Container>
  );
}

export default App;
