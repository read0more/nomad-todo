import React, { useEffect } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { act } from 'react-dom/test-utils';
import { todoStatusState, defaultStatus } from '@/recoil/atoms';
import StatusForm from '../StatusForm';

interface ObserverProps {
  node: typeof todoStatusState;
  onChange: (value: string[]) => void;
}

const RecoilObserver = ({ node, onChange }: ObserverProps) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

function renderStatusForm(onChange: ObserverProps['onChange']) {
  render(
    <RecoilRoot>
      <RecoilObserver node={todoStatusState} onChange={onChange} />
      <StatusForm />
    </RecoilRoot>
  );
}

it('입력한 status가 state에 추가 됨', async () => {
  const onChange = vi.fn();
  renderStatusForm(onChange);

  act(() => {
    const input =
      screen.getByPlaceholderText('새로 추가할 상태를 입력해주세요.');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(onChange).toBeCalledWith([...defaultStatus, 'test']);
  });
});
