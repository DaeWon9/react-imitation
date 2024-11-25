import {
  getCurrentComponent,
  render,
  stateIndexMap,
  stateStore,
} from '../core';

/**
 * useState는 상태를 관리하기 위한 훅으로, 컴포넌트별 상태를 저장하고,
 * 상태 변경 시 해당 컴포넌트를 리렌더링하는 역할을 합니다.
 *
 * @template T - 상태의 타입
 * @param {T} initialState - 초기 상태 값
 * @returns {[T, (newState: T | ((prev: T) => T)) => void]}
 *  - 현재 상태와 상태를 업데이트할 수 있는 함수의 배열
 *
 * 예시:
 * const [count, setCount] = useState(0);
 * setCount(prev => prev + 1);
 */
export function useState<T>(
  initialState: T
): [T, (newState: T | ((prev: T) => T)) => void] {
  const currentComponent = getCurrentComponent();

  if (!stateStore.has(currentComponent)) {
    stateStore.set(currentComponent, []);
  }

  const componentState = stateStore.get(currentComponent) as unknown[];
  const currentIndex = stateIndexMap.get(currentComponent) || 0;

  if (componentState[currentIndex] === undefined) {
    componentState[currentIndex] = initialState;
  }

  const state = componentState[currentIndex] as T;

  const setState = (newState: T | ((prev: T) => T)) => {
    const nextState =
      typeof newState === 'function'
        ? (newState as (prev: T) => T)(state)
        : newState;

    componentState[currentIndex] = nextState;

    render(currentComponent); // 컴포넌트 리렌더링
  };

  stateIndexMap.set(currentComponent, currentIndex + 1);

  return [state, setState];
}
