import { TextVDOM, VDOM } from '../types';
import { isTextVDOM } from '../utils';
import {
  getNewVDOM,
  getRoot,
  getVDOM,
  resetAllKeysIndex,
  resetStateIndex,
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
  $parent: HTMLElement = getRoot(), // 부모 DOM 요소 기본값은 루트 요소
  nextVDOM: VDOM = getNewVDOM(), // 새로운 가상 DOM, 기본값으로 초기화된 가상 DOM 사용
  prevVDOM: VDOM = getVDOM() // 이전 가상 DOM, 기본값으로 현재 가상 DOM 사용
): void {
  resetAllKeysIndex(); // 모든 키 인덱스를 초기화
  resetStateIndex(); // 상태 인덱스를 초기화
  updateElement($parent, nextVDOM, prevVDOM); // 개별 요소 업데이트
  setVDOM(nextVDOM); // 최신 가상 DOM 설정
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
  const isTextprevVDOM = isTextVDOM(prevVDOM); // 이전 가상 DOM이 텍스트 노드인지 확인
  const isTextnextVDOM = isTextVDOM(nextVDOM); // 다음 가상 DOM이 텍스트 노드인지 확인

  if (isTextprevVDOM || isTextnextVDOM) {
    // 둘 중 하나가 텍스트 노드이거나 둘 다 텍스트 노드일 경우 비교
    return (
      isTextprevVDOM !== isTextnextVDOM || // 텍스트 여부가 다를 경우
      (isTextprevVDOM && // 텍스트 노드일 때만 value 비교
        isTextnextVDOM &&
        !Object.is(prevVDOM?.value, nextVDOM?.value))
    );
  }

  // `key` 비교
  if (prevVDOM && nextVDOM) {
    if (prevVDOM.props?.key !== nextVDOM!.props?.key) {
      return true; // `key`가 다르면 변경된 것으로 간주
    }
  }

  // 기본 엘리먼트 비교
  return !Object.is(prevVDOM?.el, nextVDOM?.el); // 엘리먼트 타입이 다르면 변경된 것으로 간주
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
  $parent: HTMLElement | Text, // 부모 DOM 요소 타입은 HTMLElement 또는 Text 노드
  nextVDOM: TextVDOM | VDOM | undefined, // 다음 가상 DOM
  prevVDOM?: TextVDOM | VDOM | undefined // 이전 가상 DOM, 선택적
): void {
  const $current = prevVDOM?.current; // 이전 VDOM의 현재 DOM 노드 가져오기

  if (!prevVDOM || (isTextVDOM(prevVDOM) && !prevVDOM.value)) {
    // 이전 VDOM이 없거나 텍스트 노드일 경우, 다음 VDOM을 DOM으로 생성하여 추가
    const $next = createDOM(nextVDOM);
    if ($next) {
      $parent.appendChild($next); // 부모 요소에 새 DOM 추가
    }
  } else if (!nextVDOM || (isTextVDOM(nextVDOM) && !nextVDOM.value)) {
    // 다음 VDOM이 없거나 텍스트 노드일 경우, 현재 DOM 제거
    if ($current) {
      $parent.removeChild($current); // 부모 요소에서 현재 DOM 제거
    }
  } else if (isChanged(prevVDOM, nextVDOM)) {
    // 이전 VDOM과 비교하여 변경된 경우, 새 DOM으로 교체
    const $next = createDOM(nextVDOM);
    if ($current && $next) {
      $current.replaceWith($next); // 기존 DOM 교체
      nextVDOM.current = $next; // 업데이트된 DOM을 저장
    }
  } else if (!isTextVDOM(prevVDOM) && !isTextVDOM(nextVDOM)) {
    // 텍스트 노드가 아닌 경우, 자식 요소들을 재귀적으로 업데이트
    const length = Math.max(
      prevVDOM.children?.length || 0, // 이전 VDOM의 자식 수
      nextVDOM.children?.length || 0 // 다음 VDOM의 자식 수
    );
    nextVDOM.current = $current; // 현재 DOM을 다음 VDOM에 연결

    for (let i = 0; i < length; i++) {
      if ($current) {
        updateElement($current, nextVDOM.children?.[i], prevVDOM.children?.[i]); // 자식 요소 재귀 업데이트
      }
    }
  } else {
    nextVDOM.current = $current; // 텍스트 노드일 경우 그대로 유지
  }

  if (!isTextVDOM(nextVDOM) && nextVDOM) {
    setAttributes(nextVDOM.props, $current); // 속성 설정
  }
}
