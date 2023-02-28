import React, { useEffect } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { act } from 'react-dom/test-utils';
import { todoState, Todo } from '@/recoil/atoms';
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

it('todo innput창 submit하면 todo 등록', async () => {
  const onChange = vi.fn();

  render(
    <RecoilRoot>
      <RecoilObserver node={todoState} onChange={onChange} />
      <TodoForm />
    </RecoilRoot>
  );

  act(() => {
    const input = screen.getByPlaceholderText('할 일을 입력해주세요.');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(onChange).toBeCalledWith([
      {
        id: expect.any(Number),
        text: 'test',
      },
    ]);
  });
});
