import { todoState } from '@/recoil/atoms';
import { render, screen } from '@testing-library/react';
import React, { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import TodoList from '../TodoList';

interface ObserverProps {
  node: typeof todoState;
}

const fakeTodos = [
  {
    id: 1,
    text: 'fake1',
  },
  {
    id: 2,
    text: 'fake2',
  },
  {
    id: 3,
    text: 'fake3',
  },
];

const RecoilObserver = ({ node }: ObserverProps) => {
  const set = useSetRecoilState(node);
  useEffect(() => {
    set(fakeTodos);
  }, []);
  return null;
};

it('state에 있는 todo들 출력', () => {
  render(
    <RecoilRoot>
      <RecoilObserver node={todoState} />
      <TodoList />
    </RecoilRoot>
  );

  fakeTodos.forEach((todo) => {
    expect(screen.getByText(todo.text)).toBeInTheDocument();
  });
});