import { atom } from 'recoil';

export interface Todo {
  id: number;
  text: string;
}

export const todoState = atom<Todo[]>({
  key: 'todo',
  default: [],
});
