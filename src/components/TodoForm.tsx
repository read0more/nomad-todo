import React from 'react';
import { todoState, selectedStatusState } from '../recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from './Button';

interface Form {
  todo: string;
}

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
`;

export default function TodoForm() {
  const selectedStatus = useRecoilValue(selectedStatusState);
  const setTodos = useSetRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<Form>();
  const handleValid = ({ todo }: Form) => {
    setTodos((prevTodos) => [
      {
        id: Date.now(),
        text: todo,
        status: selectedStatus,
      },
      ...prevTodos,
    ]);
    setValue('todo', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register('todo', {
          required: '할 일을 입력해주세요.',
        })}
        placeholder='할 일을 입력해주세요.'
      />
      <Button type='submit'>등록</Button>
    </form>
  );
}
