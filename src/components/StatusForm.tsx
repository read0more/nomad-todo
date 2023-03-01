import React from 'react';
import { statusesState } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from './Button';

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

interface Form {
  newStatus: string;
}

export default function StatusForm() {
  const setTodoStatus = useSetRecoilState(statusesState);
  const { register, handleSubmit, setValue } = useForm<Form>();
  const handleValid = ({ newStatus }: Form) => {
    setTodoStatus((prevStatus) => [...prevStatus, newStatus]);
    setValue('newStatus', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register('newStatus', {
          required: '새로 추가할 상태를 입력해주세요.',
        })}
        placeholder='새로 추가할 상태를 입력해주세요.'
      />
      <Button type='submit'>등록</Button>
    </form>
  );
}
