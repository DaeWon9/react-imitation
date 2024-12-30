import { updateDOM } from '../dom';
import { VDOM } from '../types';
import {
  setRoot,
  setCreateVDOM,
  generateKey,
  resetAllKeysIndex,
  pushParentKey,
} from './store';

/**
 * render 함수는 주어진 `createVDOM` 함수와 `rootElement`를 바탕으로 가상 DOM을 렌더링합니다.
 *
 * - `createVDOM` 함수는 현재 상태에 맞는 가상 DOM을 반환하는 함수입니다.
 * - `rootElement`는 가상 DOM을 렌더링할 실제 DOM 요소입니다.
 *
 * 이 함수는 렌더링 과정에서 `rootElement`를 설정하고, `createVDOM`을 저장한 후, `updateDOM`을 호출하여 DOM을 업데이트합니다.
 *
 * @param createVDOM - 가상 DOM을 생성하는 함수입니다.
 * @param rootElement - 가상 DOM을 렌더링할 실제 DOM 요소입니다.
 * @throws Error - `rootElement`가 없으면 오류를 던집니다.
 */
export function render(
  createVDOM: () => VDOM,
  rootElement: HTMLElement | null
): void {
  // rootElement가 null이면 렌더링이 불가능하므로 오류를 던짐
  if (!rootElement) {
    throw new Error('root element를 찾을 수 없습니다.');
  }

  // 렌더링 대상인 실제 DOM 요소를 저장
  setRoot(rootElement);

  // createVDOM 함수를 기반으로 고유 키를 생성
  const rootKey = generateKey(createVDOM);

  // 현재 컴포넌트의 부모 키를 설정
  pushParentKey(rootKey);

  // 가상 DOM 생성 함수를 저장
  setCreateVDOM(createVDOM);

  // 상태 인덱스를 초기화하여 상태 관리 시작점 설정
  resetAllKeysIndex();

  // 가상 DOM과 실제 DOM을 동기화
  updateDOM();
}
