import { KeyAttribute, ReactImitationProps } from '../types/attributes';
import { TextVDOM } from '../types/vdom';

export function isTextVDOM(VDOM: any): VDOM is TextVDOM {
  return VDOM && typeof VDOM.value !== 'undefined';
}

export function hasKeyAttribute(
  props: ReactImitationProps
): props is KeyAttribute {
  return !!props && 'key' in props;
}
