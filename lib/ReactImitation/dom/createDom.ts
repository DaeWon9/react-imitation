import { TextVDOM, TextVDOMNode, VDOM } from '../types';
import { flattenArray, isTextVDOM, isTextVDOMNode } from '../utils';
import { setAttributes } from './setAttributes';

/**
 * createDOM 함수는 주어진 VDOM을 실제 DOM 요소로 변환합니다.
 *
 * - VDOM이 TextVDOM 또는 TextVDOMNode인 경우 텍스트 노드를 생성하여 반환합니다.
 * - VDOM이 일반 VDOM인 경우 해당 HTML 엘리먼트를 생성하고,
 *   해당 엘리먼트의 속성(props)을 설정하며 자식 요소들을 재귀적으로 생성하여 추가합니다.
 *
 * @param vDOM - 변환할 VDOM 객체. VDOM, TextVDom 또는 TextVDOMNode일 수 있습니다.
 * @returns 생성된 DOM 요소 또는 텍스트 노드. VDOM이 제공되지 않으면 undefined를 반환합니다.
 */
export function createDOM(
  vDOM?: VDOM | TextVDOM | TextVDOMNode
): Text | HTMLElement | undefined {
  if (!vDOM) {
    return undefined; // vDOM이 제공되지 않은 경우 undefined 반환
  }

  // TextVDOMNode일 경우 텍스트 노드를 반환
  if (isTextVDOMNode(vDOM)) {
    const $textNode = document.createTextNode(vDOM.toString()); // 텍스트 노드 생성
    return $textNode;
  }

  // TextVDOM일 경우 텍스트 노드를 반환
  if (isTextVDOM(vDOM)) {
    const $textNode = document.createTextNode(vDOM.value.toString()); // 텍스트 노드 생성
    vDOM.current = $textNode; // 새 텍스트 노드를 저장
    return $textNode;
  }

  // VDOM일 경우 HTMLElement를 생성
  const { tag, props, children } = vDOM;
  const $el = document.createElement(tag); // 태그로 Element 생성
  vDOM.current = $el; // 생성된 엘리먼트를 현재 참조로 저장

  setAttributes(props, $el); // 속성 설정

  // 자식 요소 처리
  const childrenArray = flattenArray(children || []); // children이 배열이 아니면 빈 배열로 처리
  childrenArray.forEach((child) => {
    const childNode = createDOM(child); // 자식 VDOM을 DOM으로 변환
    if (childNode) {
      $el.append(childNode); // 유효한 경우 추가
    }
  });

  return $el;
}
