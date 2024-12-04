import { updateDOM } from '../dom/updateDom';
import {
  getCurrentComponent,
  increateStateIndex,
  stateIndexMap,
  stateStore,
} from '../vdom/store';

/**
 * useState 훅은 컴포넌트에 상태를 추가하고,
 * 상태 업데이트 함수와 함께 반환합니다.
 *
 * @param initialState - 초기 상태 값
 * @returns [state, setState] - 현재 상태와 상태를 업데이트하는 함수
 */
export function useState<T>(
  initialState: T
): [T, (newState: T | ((prev: T) => T)) => void] {
  const currentComponent = getCurrentComponent();

  // 상태 초기화
  if (!stateStore.has(currentComponent)) {
    stateStore.set(currentComponent, []);
  }

  const componentState = stateStore.get(currentComponent) as T[];

  // 현재 상태 인덱스 확인
  let currentIndex = stateIndexMap.get(currentComponent);

  // 인덱스가 없다면 새로 추가
  if (currentIndex === undefined) {
    currentIndex = 0;
  }

  // 초기 상태 설정
  if (componentState[currentIndex] === undefined) {
    componentState[currentIndex] = initialState;
  }

  const state = componentState[currentIndex];

  // 상태 업데이트 함수
  const setState = (newState: T | ((prev: T) => T)) => {
    let nextState: T;

    // newState가 함수일 경우, prevState로 최신 상태를 사용하여 계산
    if (typeof newState === 'function') {
      nextState = (newState as (prev: T) => T)(componentState[currentIndex]);
    } else {
      // newState가 값일 경우, 그 값을 그대로 사용
      nextState = newState;
    }

    // 상태 업데이트
    componentState[currentIndex] = nextState;
    stateStore.set(currentComponent, componentState); // 상태 업데이트
    updateDOM();
  };

  // 상태 인덱스 관리 (새로운 상태가 추가되면 인덱스 증가)
  increateStateIndex();

  return [state, setState];
}
