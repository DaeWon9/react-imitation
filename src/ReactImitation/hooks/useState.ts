import { updateDOM } from '../dom';
import {
  getCurrentKey,
  increaseStateIndex,
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
  const currentKey = getCurrentKey(); // 현재 렌더링 중인 컴포넌트의 고유 키

  // 컴포넌트의 상태를 저장하기 위한 초기화
  if (!stateStore.has(currentKey)) {
    stateStore.set(currentKey, []); // 현재 컴포넌트에 대한 상태 배열을 초기화
  }

  // 현재 컴포넌트의 상태 배열
  const componentState = stateStore.get(currentKey) as T[];

  // 현재 컴포넌트의 상태 인덱스
  let currentIndex = stateIndexMap.get(currentKey);

  // 상태 인덱스가 정의되지 않은 경우 0으로 초기화
  if (currentIndex === undefined) {
    currentIndex = 0;
  }

  // 상태 배열에 초기 상태값을 설정
  if (componentState[currentIndex] === undefined) {
    componentState[currentIndex] = initialState;
  }

  // 현재 상태
  const state = componentState[currentIndex];

  // 상태를 업데이트하는 함수
  const setState = (newState: T | ((prev: T) => T)) => {
    let nextState: T;

    // newState가 함수인 경우, 이전 상태를 인자로 사용해 계산
    if (typeof newState === 'function') {
      nextState = (newState as (prev: T) => T)(componentState[currentIndex]);
    } else {
      // newState가 값인 경우, 해당 값을 그대로 사용
      nextState = newState;
    }

    // 상태를 업데이트하고, 상태 저장소를 갱신
    componentState[currentIndex] = nextState;
    stateStore.set(currentKey, componentState); // 상태 배열을 상태 저장소에 저장
    updateDOM(); // DOM 업데이트를 트리거
  };

  // 상태 인덱스를 증가시켜 다음 상태를 가리키도록 설정
  increaseStateIndex();

  // 상태와 상태 업데이트 함수를 반환
  return [state, setState];
}
