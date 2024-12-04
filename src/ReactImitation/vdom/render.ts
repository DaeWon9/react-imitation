import { updateDOM } from '../dom/updateDom';
import { VDOM } from '../types/vdom';
import { setRoot, setCreateVDOM } from './store';

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
  // rootElement가 존재하지 않으면 오류를 던짐
  if (!rootElement) {
    throw new Error('root element를 찾을 수 없습니다.');
  }

  // rootElement를 설정
  setRoot(rootElement);

  // createVDOM을 설정
  setCreateVDOM(createVDOM);

  // updateDOM을 호출하여 가상 DOM을 실제 DOM에 반영
  updateDOM();
}
