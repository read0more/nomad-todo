import { atom } from 'recoil';
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
