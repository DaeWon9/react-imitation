import { TextVDOM, TextVDOMNode, VDOM } from '../types/vdom';

export function isTextVDOM(VDOM: any): VDOM is TextVDOM {
  return VDOM && typeof VDOM.value !== 'undefined';
}

export function isTextVDOMNode(VDOM: any): VDOM is TextVDOMNode {
  return (
    typeof VDOM === 'string' ||
    typeof VDOM === 'number' ||
    typeof VDOM === 'boolean'
  );
}

export function isVDOM(VDOM: any): VDOM is VDOM {
  return VDOM && VDOM.tag && VDOM.props !== undefined;
}
