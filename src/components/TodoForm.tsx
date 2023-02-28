import React from 'react';
import { todoState } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';

interface Form {
  todo: string;
}

export default function TodoForm() {
  const setTodos = useSetRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<Form>();
  const handleValid = ({ todo }: Form) => {
    setTodos((prevTodos) => [
      {
        id: Date.now(),
        text: todo,
      },
      ...prevTodos,
    ]);
    setValue('todo', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('todo', {
          required: '할 일을 입력해주세요.',
        })}
        name='todo'
        placeholder='할 일을 입력해주세요.'
      />
      <button type='submit'>등록</button>
    </form>
  );
}
