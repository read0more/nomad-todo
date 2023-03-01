import React from 'react';
import { defaultStatus, StatusType, todoState } from '@/recoil/atoms';
import { useRecoilState } from 'recoil';

export default function TodoList() {
  const [todos, setTodos] = useRecoilState(todoState);
  const handleStatusChange = (id: number, newStatus: StatusType) => {
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
            {defaultStatus
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
