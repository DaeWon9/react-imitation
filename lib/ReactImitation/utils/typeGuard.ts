import { TextVDOM } from '../types/vdom';

export function isTextVDOM(VDOM: any): VDOM is TextVDOM {
  return VDOM && typeof VDOM.value !== 'undefined';
}
