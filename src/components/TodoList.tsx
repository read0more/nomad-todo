import React from 'react';
import { todoState, todoStatusState } from '@/recoil/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function TodoList() {
  const [todos, setTodos] = useRecoilState(todoState);
  const statuses = useRecoilValue(todoStatusState);
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
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <span> / {todo.status}</span>
            {statuses
              .filter((status) => status !== todo.status)
              .map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(todo.id, status)}
                >
                  {status}
                </button>
              ))}
          </li>
        ))}
      </ul>
    </>
  );
}
