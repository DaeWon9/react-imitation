import { CreateElementProps } from './types';
import { flattenArray } from './utils';

export function createElement({
  tag,
  className,
  props = {},
  children = [],
}: CreateElementProps): HTMLElement {
  const element = document.createElement(tag);

  // className이 존재하면 추가
  if (className) {
    element.className = className;
  }

  // props 속성 설정
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      // 이벤트 리스너 추가
      const eventType = key.substring(2).toLowerCase(); // 'onClick' => 'click'
      const eventListener = value as EventListener; // 이벤트 리스너 타입을 명시
      element.addEventListener(eventType, eventListener);
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value); // 스타일 속성
    } else if (value !== undefined) {
      // undefined가 아닌 경우에만 일반 속성 설정
      element.setAttribute(key, value.toString());
    }
  });

  // 자식 요소 추가
  flattenArray(children).forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      element.appendChild(child);
    }
  });

  return element;
}
