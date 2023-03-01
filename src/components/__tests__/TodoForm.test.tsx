import React, { useEffect } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { act } from 'react-dom/test-utils';
import { todoState, Todo, StatusType } from '@/recoil/atoms';
import TodoForm from '../TodoForm';

interface ObserverProps {
  node: typeof todoState;
  onChange: (value: Todo[]) => void;
}

const RecoilObserver = ({ node, onChange }: ObserverProps) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

function renderTodoForm(onChange: (value: Todo[]) => void) {
  render(
    <RecoilRoot>
      <RecoilObserver node={todoState} onChange={onChange} />
      <TodoForm />
    </RecoilRoot>
  );
}

describe('등록한 todo가 선택한 셀렉트박스의 값의 상태를 가짐', () => {
  async function run(status: StatusType) {
    const onChange = vi.fn();
    renderTodoForm(onChange);

    act(() => {
      const input = screen.getByPlaceholderText('할 일을 입력해주세요.');
      const button = screen.getByRole('button');
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: status },
      });
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(onChange).toBeCalledWith([
        {
          id: expect.any(Number),
          text: 'test',
          status,
        },
      ]);
    });
  }

  it('todo 상태로 등록', async () => {
    await run('할 일');
  });

  it('doing 상태로 등록', async () => {
    await run('하는중');
  });

  it('done 상태로 등록', async () => {
    await run('완료');
  });
});
