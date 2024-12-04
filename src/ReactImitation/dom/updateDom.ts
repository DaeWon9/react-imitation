import { TextVDOM, VDOM } from '../types/vdom';
import { isTextVDOM } from '../utils/typeGuard';
import {
  getNewVDOM,
  getRoot,
  getVDOM,
  resetStateIndex,
  setCurrentComponent,
  setVDOM,
} from '../vdom/store';
import { createDOM } from './createDom';
import { setAttributes } from './setAttributes';

/**
 * updateDOM 함수는 가상 DOM(Virtual DOM)과 실제 DOM을 비교하고, 변경 사항을 적용합니다.
 *
 * - 초기 가상 DOM과 새로운 가상 DOM을 비교하여 변경된 부분을 실제 DOM에 반영합니다.
 * - 이 과정에서 불필요한 렌더링을 최소화하기 위해 효율적인 비교 및 업데이트가 이루어집니다.
 *
 * @param $parent - DOM 업데이트를 적용할 부모 요소입니다. 기본값은 루트 요소입니다.
 * @param nextVDOM - 새로운 가상 DOM입니다.
 * @param prevVDOM - 이전의 가상 DOM입니다.
 */
export function updateDOM(
  $parent: HTMLElement = getRoot(),
  nextVDOM: VDOM = getNewVDOM(),
  prevVDOM: VDOM = getVDOM()
): void {
  resetStateIndex();
  setCurrentComponent($parent);
  updateElement($parent, nextVDOM, prevVDOM);
  setVDOM(nextVDOM);
}

/**
 * isChanged 함수는 두 가상 DOM 객체가 다른지를 비교합니다.
 *
 * - 텍스트 노드가 변경되었는지, 또는 요소 노드가 변경되었는지를 판단하여 반환합니다.
 *
 * @param prevVDOM - 이전의 가상 DOM 객체입니다.
 * @param nextVDOM - 새로운 가상 DOM 객체입니다.
 * @returns 두 가상 DOM 객체가 다르면 true, 같으면 false를 반환합니다.
 */
function isChanged(
  prevVDOM: VDOM | TextVDOM | undefined,
  nextVDOM: VDOM | TextVDOM | undefined
): boolean {
  const isTextprevVDOM = isTextVDOM(prevVDOM);
  const isTextnextVDOM = isTextVDOM(nextVDOM);

  return (
    isTextprevVDOM !== isTextnextVDOM ||
    (isTextprevVDOM &&
      isTextnextVDOM &&
      !Object.is(prevVDOM.value, nextVDOM.value)) ||
    (!isTextprevVDOM &&
      !isTextnextVDOM &&
      !Object.is(prevVDOM?.el, nextVDOM?.el))
  );
}

/**
 * updateElement 함수는 개별 요소를 비교하고, 변경 사항을 실제 DOM에 반영합니다.
 *
 * - 텍스트 노드나 엘리먼트가 변경된 경우, 해당 요소를 추가, 삭제 또는 교체합니다.
 * - 자식 요소들이 있을 경우 재귀적으로 자식 요소들에 대해서도 동일한 작업을 수행합니다.
 *
 * @param $parent - 부모 DOM 요소입니다.
 * @param nextVDOM - 새로운 가상 DOM 객체입니다.
 * @param prevVDOM - 이전의 가상 DOM 객체입니다.
 */
function updateElement(
  $parent: HTMLElement | Text,
  nextVDOM: TextVDOM | VDOM | undefined,
  prevVDOM?: TextVDOM | VDOM | undefined
): void {
  const $current = prevVDOM?.current;

  // 초기 가상 DOM이 없거나 텍스트 노드 값이 없으면 새로운 DOM을 생성하여 추가
  if (!prevVDOM || (isTextVDOM(prevVDOM) && !prevVDOM.value)) {
    const $next = createDOM(nextVDOM);
    if ($next) {
      $parent.appendChild($next);
    }
  }
  // 새로운 가상 DOM이 없거나 텍스트 노드 값이 없으면 기존 DOM을 제거
  else if (!nextVDOM || (isTextVDOM(nextVDOM) && !nextVDOM.value)) {
    if ($current) {
      $parent.removeChild($current);
    }
  }
  // 가상 DOM이 변경되었다면 기존 DOM을 교체
  else if (isChanged(prevVDOM, nextVDOM)) {
    const $next = createDOM(nextVDOM);
    if ($current && $next) {
      $current.replaceWith($next);
      nextVDOM.current = $next;
    }
  }
  // 가상 DOM이 모두 엘리먼트인 경우 자식 요소들에 대해 재귀적으로 처리
  else if (!isTextVDOM(prevVDOM) && !isTextVDOM(nextVDOM)) {
    const length = Math.max(
      prevVDOM.children?.length || 0,
      nextVDOM.children?.length || 0
    );
    nextVDOM.current = $current;

    for (let i = 0; i < length; i++) {
      if ($current) {
        updateElement($current, nextVDOM.children?.[i], prevVDOM.children?.[i]);
      }
    }
  } else {
    nextVDOM.current = $current;
  }

  // 새로운 가상 DOM이 엘리먼트인 경우 속성을 설정
  if (!isTextVDOM(nextVDOM) && nextVDOM) {
    setAttributes(nextVDOM.props, $current);
  }
}
