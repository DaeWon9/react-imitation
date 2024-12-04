import { Children } from './vdom';

export interface DefaultProps {
  children?: Children;
}

export type PropsWithChildren<T> = {
  [P in keyof T]: T[P];
} & DefaultProps;
