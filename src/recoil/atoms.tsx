import { atom } from 'recoil';

export const defaultStatus = ['할 일', '하는중', '완료'] as const;
export type StatusType = (typeof defaultStatus)[number];
export interface Todo {
  id: number;
  text: string;
  status: StatusType;
}

export const todoState = atom<Todo[]>({
  key: 'todo',
  default: [],
});
