import { atom } from 'recoil';

export const defaultStatus = ['할 일', '하는중', '완료'] as const;
export interface Todo {
  id: number;
  text: string;
  status: string;
}

export const todoState = atom<Todo[]>({
  key: 'todo',
  default: [],
});

export const todoStatusState = atom<string[]>({
  key: 'todoStatus',
  default: [...defaultStatus],
});
