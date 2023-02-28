import { atom } from 'recoil';

export const status = {
  todo: '할 일',
  doing: '하는중',
  done: '완료',
} as const;

export type StatusType = keyof typeof status;
export interface Todo {
  id: number;
  text: string;
  status: StatusType;
}

export const todoState = atom<Todo[]>({
  key: 'todo',
  default: [],
});
