import React from 'react';
import { todoState } from '@/recoil/atoms';
import { useRecoilValue } from 'recoil';

export default function TodoList() {
  const todos = useRecoilValue(todoState);
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
