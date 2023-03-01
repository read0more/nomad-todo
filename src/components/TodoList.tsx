import React from 'react';
import { status, StatusType, todoState } from '@/recoil/atoms';
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
            {Object.entries(status).map(([key, value]) => {
              if (value === status[todo.status]) return <></>;
              return (
                <button
                  key={key}
                  onClick={() => handleStatusChange(todo.id, key as StatusType)}
                >
                  {value}
                </button>
              );
            })}
          </li>
        ))}
      </ul>
    </>
  );
}
