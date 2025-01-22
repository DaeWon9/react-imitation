import { TextVDOM, VDOM } from '../types';
import { isTextVDOM } from '../utils';
import { setAttributes } from './setAttributes';

/**
 * createDOM 함수는 주어진 VDOM을 실제 DOM 요소로 변환합니다.
 *
 * - VDOM이 TextVDOM인 경우 텍스트 노드를 생성하여 반환합니다.
 * - VDOM이 일반 VDOM인 경우 해당 HTML 엘리먼트를 생성하고,
 *   해당 엘리먼트의 속성(props)을 설정하며 자식 요소들을 재귀적으로 생성하여 추가합니다.
 *
 * @param vDOM - 변환할 VDOM 객체. TextVDOM 또는 VDOM일 수 있습니다.
 * @returns 생성된 DOM 요소 또는 텍스트 노드. VDOM이 제공되지 않으면 undefined를 반환합니다.
 */
export function createDOM(
  vDOM?: VDOM | TextVDOM
): Text | HTMLElement | undefined {
  // VDOM이 TextVDOM인지 확인
  if (isTextVDOM(vDOM)) {
    const $textNode = document.createTextNode(vDOM.value); // 텍스트 노드 생성
    const { current } = vDOM;

    // 현재 텍스트 노드가 기존 텍스트와 동일한지 확인
    if (
      typeof current?.data === 'string' &&
      Object.is(current?.data, $textNode.data)
    ) {
      return current; // 동일하면 기존 노드를 반환
    } else {
      vDOM.current = $textNode; // 새 텍스트 노드를 저장
      return $textNode;
    }
  } else if (vDOM) {
    // VDOM이 일반 VDOM인 경우 처리
    const { el, props, children } = vDOM;

    // 지정된 태그 이름으로 엘리먼트를 생성
    const $el = document.createElement(el);
    vDOM.current = $el; // 생성된 엘리먼트를 현재 참조로 저장

    // 생성된 엘리먼트에 속성을 설정
    setAttributes(props, $el);

    // 자식 요소들을 순회하며 재귀적으로 DOM 생성 후 추가
    children?.map(createDOM).forEach(($childEl) => {
      if ($childEl) {
        $el.appendChild($childEl); // 생성된 자식 노드를 부모에 추가
      }
    });

    return $el; // 최종 생성된 엘리먼트를 반환
  }

  // vDOM이 제공되지 않은 경우 undefined 반환
  return undefined;
}
