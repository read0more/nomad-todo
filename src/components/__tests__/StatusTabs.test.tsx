import React, { useEffect } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { statusesState, defaultStatus } from '@/recoil/atoms';
import StatusTabs from '../StatusTabs';

interface ObserverProps {
  node: typeof statusesState;
  onChange: (value: string[]) => void;
}

const RecoilObserver = ({ node, onChange }: ObserverProps) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

function renderStatusTabs(onChange: ObserverProps['onChange']) {
  render(
    <RecoilRoot>
      <RecoilObserver node={statusesState} onChange={onChange} />
      <StatusTabs />
    </RecoilRoot>
  );
}

it('초기 활성화 된 탭은 할 일 li의 class는 active', async () => {
  const onChange = vi.fn();
  renderStatusTabs(onChange);

  await waitFor(() => {
    expect(screen.getByText(defaultStatus[0])).toHaveClass('active');
  });
});

it('클릭한 탭의 li의 class는 active', async () => {
  const onChange = vi.fn();
  renderStatusTabs(onChange);

  const doing = screen.getByText(defaultStatus[1]);
  fireEvent.click(doing);

  await waitFor(() => {
    expect(doing).toHaveClass('active');
  });
});
