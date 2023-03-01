import React from 'react';
import { defaultStatus, StatusType, todoState } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';

interface Form {
  selectedStatus: StatusType;
  todo: string;
}

export default function TodoForm() {
  const setTodos = useSetRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<Form>();
  const handleValid = ({ selectedStatus, todo }: Form) => {
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
      <select {...register('selectedStatus')}>
        {defaultStatus.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
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
