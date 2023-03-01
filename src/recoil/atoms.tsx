import { atom, selector } from 'recoil';
import * as localStorageUtil from '@/localStorageUtil';

export const defaultStatus = ['할 일', '하는중', '완료'] as const;
export interface Todo {
  id: number;
  text: string;
  status: string;
}

export const todoState = atom<Todo[]>({
  key: 'todos',
  default: [],
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorageUtil.set<Todo[]>('todos', newValue);
      });
    },
  ],
});

export const statusesState = atom<string[]>({
  key: 'statuses',
  default: [...defaultStatus],
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorageUtil.set<string[]>('statuses', newValue);
      });
    },
  ],
});

export const selectedStatusState = atom<string>({
  key: 'selectedStatus',
  default: defaultStatus[0],
});

export const filteredTodoState = selector<Todo[]>({
  key: 'filteredTodos',
  get: ({ get }) => {
    const todos = get(todoState);
    const selectedStatus = get(selectedStatusState);

    return todos.filter((todo) => todo.status === selectedStatus);
  },
});
