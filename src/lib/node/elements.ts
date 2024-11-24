import { CreateElementProps } from './types';
import { flattenArray } from './utils';

/**
 * createElement 함수는 동적으로 HTML 요소를 생성하고,
 * 지정된 속성(props), 자식(children) 및 이벤트를 추가하는 역할을 합니다.
 *
 * @param {TagType} param.tag - 생성할 HTML 태그 이름 (예: 'div', 'button', 'section')
 * @param {string} [param.className] - 요소에 추가할 CSS 클래스 이름 (선택 사항)
 * @param {Object} [param.props] - 요소에 설정할 속성들 (선택 사항)
 * @param {Children[]} [param.children] - 요소의 자식 요소들 (문자열 또는 HTMLElement 배열)
 *
 * @returns {HTMLElement} 생성된 HTML 요소
 *
 * 예시:
 * const button = createElement({
 *   tag: 'button',
 *   className: 'btn-primary',
 *   props: { onClick: () => alert('Clicked!') },
 *   children: ['Click me']
 * });
 * document.body.appendChild(button);
 */
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
