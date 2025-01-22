import { ReactImitationProps } from './attributes';

export interface VDOM {
  tag: keyof HTMLElementTagNameMap;
  props: ReactImitationProps | null;
  children?: VDOMChildren;
  current?: HTMLElement | Text;
}

export interface TextVDOM {
  value: string | boolean | number;
  current?: Text;
}

export type TextVDOMNode = string | number | boolean;

export type VDOMChildren = (TextVDOM | VDOM | undefined)[];

export type Children = (string | VDOM | Function | undefined)[];
