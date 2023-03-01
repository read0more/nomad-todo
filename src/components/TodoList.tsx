import React from 'react';
import { todoState, statusesState, filteredTodoState } from '@/recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from './Button';

export default function TodoList() {
  const setTodos = useSetRecoilState(todoState);
  const statuses = useRecoilValue(statusesState);
  const handleStatusChange = (id: number, newStatus: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) return { ...todo, status: newStatus };
        return todo;
      })
    );
  };

  return (
    <>
      <ul>
        {useRecoilValue(filteredTodoState).map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <span> / {todo.status}</span>
            {statuses
              .filter((status) => status !== todo.status)
              .map((status) => (
                <Button
                  key={status}
                  onClick={() => handleStatusChange(todo.id, status)}
                >
                  {status}
                </Button>
              ))}
          </li>
        ))}
      </ul>
    </>
  );
}
