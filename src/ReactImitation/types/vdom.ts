import { ReactImitationProps } from './attributes';

export interface VDOM {
  el: keyof HTMLElementTagNameMap;
  props: ReactImitationProps | null;
  children?: VDOMChildren;
  current?: HTMLElement | Text;
}

export interface TextVDOM {
  value: string;
  current?: Text;
}

export type VDOMChildren = (TextVDOM | VDOM | undefined)[];

export type Children = (string | VDOM | Function | undefined)[];
