import { TextVDOM, TextVDOMNode, VDOM } from '../types';
import { isTextVDOM, isTextVDOMNode, isVDOM } from '../utils';
import {
  getNewVDOM,
  getRoot,
  getVDOM,
  resetAllComponentKeysIndex,
  resetIndexMap,
  resetNstChildIndexMap,
  setVDOM,
} from '../vdom/store';
import { createDOM } from './createDom';
import { setAttributes } from './setAttributes';

/**
 * updateDOM 함수는 가상 DOM(Virtual DOM)과 실제 DOM을 비교하고, 변경 사항을 적용합니다.
 *
 * - 초기 가상 DOM과 새로운 가상 DOM을 비교하여 변경된 부분만 실제 DOM에 반영합니다.
 * - 이 과정에서 불필요한 렌더링을 최소화합니다.
 *
 * @param $parent - DOM 업데이트를 적용할 부모 요소입니다. 기본값은 루트 요소입니다.
 * @param nextVDOM - 새로운 가상 DOM입니다.
 * @param prevVDOM - 이전의 가상 DOM입니다.
 */
export function updateDOM(
  $parent: HTMLElement = getRoot(), // 부모 DOM 요소 기본값은 루트 요소
  nextVDOM: VDOM = getNewVDOM(), // 새로운 가상 DOM, 기본값으로 초기화된 가상 DOM 사용
  prevVDOM: VDOM = getVDOM() // 이전 가상 DOM, 기본값으로 현재 가상 DOM 사용
): void {
  resetAllComponentKeysIndex(); // 모든 컴포넌트 키 인덱스를 초기화
  resetIndexMap(); // 상태 인덱스를 초기화
  resetNstChildIndexMap(); // 자식 인덱스 초기화
  updateElement($parent, nextVDOM, prevVDOM); // 개별 요소 업데이트
  setVDOM(nextVDOM); // 최신 가상 DOM 설정
}

/**
 * updateElement 함수는 주어진 VDOM을 기준으로 DOM 트리를 업데이트합니다.
 *
 * - 새로운 VDOM이 없는 경우 기존 DOM을 제거합니다.
 * - 이전 VDOM이 없는 경우 새로운 DOM을 생성하여 추가합니다.
 * - 이전 VDOM과 새로운 VDOM의 태그나 키가 다른 경우 DOM을 교체합니다.
 * - 동일한 태그일 경우 속성을 업데이트하고 자식 노드를 재귀적으로 비교하여 업데이트합니다.
 *
 * @param $parent - 부모 DOM 요소
 * @param nextVDOM - 새로운 VDOM
 * @param prevVDOM - 이전 VDOM
 */
export function updateElement(
  $parent: HTMLElement | Text,
  nextVDOM?: VDOM | TextVDOM,
  prevVDOM?: VDOM | TextVDOM
): void {
  let $current = prevVDOM?.current;

  // prevVDOM가 TextVDomNode인 경우 $current가 undefined이므로 부모로부터 찾아서 대입
  if (!$current && isTextVDOMNode(prevVDOM)) {
    const childIndex = findChildIndexByTextVDOMNode($parent, prevVDOM);
    if (childIndex !== -1) {
      $current = $parent.childNodes[childIndex] as Text;
    }
  }

  // 1. 새로운 VDOM이 없는 경우: 기존 DOM 제거
  if (!nextVDOM) {
    if ($current) {
      $parent.removeChild($current); // 기존 DOM 제거
    }
    return;
  }

  // 2. 이전 VDOM이 없는 경우: 새로운 DOM 추가
  if (!prevVDOM) {
    const $newElement = createDOM(nextVDOM); // 새로운 DOM 생성
    if ($newElement) {
      $parent.appendChild($newElement); // 부모에 추가
      nextVDOM.current = $newElement; // 참조 저장
    }
    return;
  }

  // 3. 텍스트 노드 비교 및 업데이트
  if (isTextVDOM(prevVDOM) && isTextVDOM(nextVDOM)) {
    if (prevVDOM.value !== nextVDOM.value) {
      const $newTextNode = createDOM(nextVDOM) as Text;
      if ($current && $newTextNode) {
        $current.replaceWith($newTextNode); // 텍스트 노드 교체
        nextVDOM.current = $newTextNode; // 참조 업데이트
      }
    } else {
      nextVDOM.current = prevVDOM.current; // 변경이 없으면 참조 유지
    }
    return;
  }

  // 4. VDOM의 타입이 다른 경우: DOM 교체
  if (typeof prevVDOM !== typeof nextVDOM) {
    const $newElement = createDOM(nextVDOM); // 새로운 DOM 생성
    if ($current && $newElement) {
      $current.replaceWith($newElement); // DOM 교체
      nextVDOM.current = $newElement; // 참조 업데이트
    }
    return;
  }

  // 5. 태그나 키가 다른 경우: DOM 전체 교체
  if (
    (isVDOM(prevVDOM) && isVDOM(nextVDOM) && prevVDOM.tag !== nextVDOM.tag) ||
    (isVDOM(prevVDOM) &&
      isVDOM(nextVDOM) &&
      prevVDOM.props?.key !== nextVDOM.props?.key)
  ) {
    const $newElement = createDOM(nextVDOM); // 새로운 DOM 생성
    if ($current && $newElement) {
      $current.replaceWith($newElement); // DOM 교체
      nextVDOM.current = $newElement; // 참조 업데이트
    }
    return;
  }

  // 6. 동일한 태그: 속성 업데이트 및 자식 노드 재귀 처리
  const $el = $current as HTMLElement;

  if ($el instanceof HTMLElement) {
    // nextVDOM이 VDOM일 때만 props를 처리
    if (isVDOM(nextVDOM)) {
      setAttributes(nextVDOM.props, $el); // 속성 업데이트
    }

    const prevChildren = isVDOM(prevVDOM)
      ? (prevVDOM as VDOM).children || []
      : [];
    const nextChildren = isVDOM(nextVDOM)
      ? (nextVDOM as VDOM).children || []
      : [];

    // 자식 노드 비교 및 업데이트
    const maxChildren = Math.max(prevChildren.length, nextChildren.length);
    for (let i = 0; i < maxChildren; i++) {
      let prevChild = prevChildren[i];
      let nextChild = nextChildren[i];

      // TextVDOMNode일 때 텍스트 노드로 처리
      if (isTextVDOMNode(nextChild)) {
        const $textNode = document.createTextNode(nextChild.toString());
        if (
          $el.childNodes[i] &&
          $el.childNodes[i].nodeValue !== $textNode.nodeValue
        ) {
          $el.replaceChild($textNode, $el.childNodes[i]);
        } else if (!$el.childNodes[i]) {
          $el.appendChild($textNode);
        }
      } else {
        // VDOM인 경우 기존 방식대로 처리
        if (!prevChild || nextChild !== prevChild) {
          updateElement($el, nextChild, prevChild); // 변경된 자식만 업데이트
        }
      }
    }
  }

  nextVDOM.current = $el; // 참조 유지
}

/**
 * 부모 DOM 요소의 자식 중 특정 문자열 값을 가진 자식의 인덱스를 반환
 *
 * @param parentElement - 부모 DOM 요소
 * @param targetString - 찾고자 하는 문자열 값
 * @returns 문자열 값을 가진 자식의 인덱스 (0-based) 또는 -1 (찾지 못한 경우)
 */
function findChildIndexByTextVDOMNode(
  parentElement: HTMLElement | Text,
  targetChild: TextVDOMNode
): number {
  if (!parentElement) return -1;

  const childNodes = parentElement.childNodes; // 모든 자식 노드

  for (let i = 0; i < childNodes.length; i++) {
    const child = childNodes[i];

    // 자식이 텍스트 노드이고 해당 텍스트가 targetChild와 일치하는지 확인
    if (
      child.nodeType === Node.TEXT_NODE &&
      child.nodeValue?.trim() === targetChild
    ) {
      return i;
    }
  }

  return -1; // 자식을 찾지 못한 경우
}
