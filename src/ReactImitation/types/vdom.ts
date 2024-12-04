import { DOMAttribute, InputDOMAttribute } from './attributes';

export interface VDOM {
  el: keyof HTMLElementTagNameMap;
  props: DOMAttribute | InputDOMAttribute | null;
  children?: VDOMChildren;
  current?: HTMLElement | Text;
}

export interface TextVDOM {
  value: string;
  current?: Text;
}

export type VDOMChildren = (TextVDOM | VDOM | undefined)[];

export type Children = (string | VDOM | undefined)[];
