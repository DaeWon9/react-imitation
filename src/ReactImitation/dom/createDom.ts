import { TextVDOM, VDOM } from '../types/vdom';
import { isTextVDOM } from '../utils/typeGuard';
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
  // TextVDOM인 경우 텍스트 노드를 생성하여 반환합니다.
  if (isTextVDOM(vDOM)) {
    const $textNode = document.createTextNode(vDOM.value);
    const { current } = vDOM;

    // 이전에 생성된 텍스트 노드가 동일한 경우 재사용합니다.
    if (
      typeof current?.data === 'string' &&
      Object.is(current?.data, $textNode.data)
    ) {
      return current;
    } else {
      vDOM.current = $textNode;
      return $textNode;
    }
  } else if (vDOM) {
    // 일반 VDOM인 경우 엘리먼트를 생성합니다.
    const { el, props, children } = vDOM;
    const $el = document.createElement(el);
    vDOM.current = $el;

    // 엘리먼트의 속성을 설정합니다.
    setAttributes(props, $el);

    // 자식 요소들을 재귀적으로 생성하여 추가합니다.
    children?.map(createDOM).forEach(($childEl) => {
      if ($childEl) {
        $el.appendChild($childEl);
      }
    });
    return $el;
  }

  // vDOM이 제공되지 않으면 undefined를 반환합니다.
  return undefined;
}

export default createDOM;
