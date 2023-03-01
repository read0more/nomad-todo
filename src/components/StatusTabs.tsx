import React from 'react';
import { selectedStatusState, statusesState } from '@/recoil/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 1em;
  gap: 1em;
  & > li {
    cursor: pointer;
    padding: 0.5em 1em;
    border: 2px solid #999;
    border-radius: 5px;
    &.active {
      font-weight: 700;
    }
  }
`;

export default function StatusTabs() {
  const statuses = useRecoilValue(statusesState);
  const [selectedStatus, setSelectedStatus] =
    useRecoilState(selectedStatusState);

  return (
    <nav>
      <Ul>
        {statuses.map((status) => (
          <li
            key={status}
            className={selectedStatus === status ? 'active' : ''}
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </li>
        ))}
      </Ul>
    </nav>
  );
}
