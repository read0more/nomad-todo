import React, { useEffect } from 'react';
import { Todo, todoState } from '@/recoil/atoms';
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
  {
    id: 4,
    text: 'fake4',
    status: '할 일',
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

it('state에 있는 "할 일" todo들 출력', () => {
  render(
    <RecoilRoot>
      <RecoilObserver node={todoState} todos={fakeTodos} onChange={() => {}} />
      <TodoList />
    </RecoilRoot>
  );

  fakeTodos
    .filter((todo) => todo.status === '할 일')
    .forEach((todo) => {
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });
});

describe('todo 상태 변경', () => {
  function run(todo: Todo, newStatus: string) {
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

  // TODO: 기본이 할 일이라서 할 일 버튼은 노출되지 않고, selectedStatusState를 바꿔야 하는데 어떻게 할지?
  // it('할 일로 변경', () => {
  //   run(fakeTodos[1], '할 일');
  // });
});
