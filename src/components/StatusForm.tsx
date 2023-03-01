import React from 'react';
import { statusesState } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';

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
      <input
        {...register('newStatus', {
          required: '새로 추가할 상태를 입력해주세요.',
        })}
        placeholder='새로 추가할 상태를 입력해주세요.'
      />
      <button type='submit'>등록</button>
    </form>
  );
}
