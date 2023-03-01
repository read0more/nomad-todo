import React, { useEffect } from 'react';
import { Todo, todoState, StatusType } from '@/recoil/atoms';
import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import TodoList from '../TodoList';
import { act } from 'react-dom/test-utils';

const fakeTodos: Todo[] = [
  {
    id: 1,
    text: 'fake1',
    status: '할 일',
  },
  {
    id: 2,
    text: 'fake2',
    status: '하는중',
  },
  {
    id: 3,
    text: 'fake3',
    status: '완료',
  },
];

interface ObserverProps {
  node: typeof todoState;
  todos: Todo[];
  onChange: (value: Todo[]) => void;
}

const RecoilObserver = ({ node, todos, onChange }: ObserverProps) => {
  const [value, setValue] = useRecoilState(node);
  useEffect(() => {
    setValue(todos);
  }, []);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

it('state에 있는 todo들 출력', () => {
  render(
    <RecoilRoot>
      <RecoilObserver node={todoState} todos={fakeTodos} onChange={() => {}} />
      <TodoList />
    </RecoilRoot>
  );

  fakeTodos.forEach((todo) => {
    expect(screen.getByText(todo.text)).toBeInTheDocument();
  });
});

describe('todo 상태 변경', () => {
  function run(todo: Todo, newStatus: StatusType) {
    const onChange = vi.fn();
    render(
      <RecoilRoot>
        <RecoilObserver node={todoState} todos={[todo]} onChange={onChange} />
        <TodoList />
      </RecoilRoot>
    );

    act(() => {
      const button = screen.getByRole('button', {
        name: newStatus,
      });
      fireEvent.click(button);
    });

    expect(onChange).toBeCalledWith([
      {
        id: expect.any(Number),
        text: todo.text,
        status: newStatus,
      },
    ]);
  }

  it('하는중으로 변경', () => {
    run(fakeTodos[0], '하는중');
  });

  it('완료로 변경', () => {
    run(fakeTodos[0], '완료');
  });

  it('할 일로 변경', () => {
    run(fakeTodos[1], '할 일');
  });
});
