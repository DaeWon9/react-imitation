import {
  effectIndexMap,
  getCurrentKey,
  effectStore,
  increaseEffectIndex,
} from '../vdom/store';

/**
 * useEffect는 의존성 배열에 있는 값이 변경되었을 때, 주어진 콜백 함수를 실행하는 훅
 * @param callback - 의존성이 변경되었을 때 실행할 콜백 함수
 * @param dependencies - 의존성 배열, 해당 값의 변경 여부에 따라 콜백이 실행됨
 */
export function useEffect(callback: () => void, dependencies: unknown[]): void {
  const currentKey = getCurrentKey(); // 현재 렌더링 중인 컴포넌트의 고유 키를 가져옴
  // effectStore에 현재 컴포넌트 키에 대한 상태가 없는 경우 초기화
  if (!effectStore.has(currentKey)) {
    effectStore.set(currentKey, []);
  }

  const oldDependencies = effectStore.get(currentKey)!; // 기존의 의존성 배열을 가져옴
  let currentIndex = effectIndexMap.get(currentKey); // 현재 인덱스를 가져옴

  // 현재 인덱스가 정의되지 않은 경우 0으로 초기화
  if (currentIndex === undefined) {
    currentIndex = 0;
    effectIndexMap.set(currentKey, currentIndex); // 초기화된 인덱스를 저장
  }

  // 의존성 배열이 초기화되지 않은 경우
  if (oldDependencies[currentIndex] === undefined) {
    oldDependencies[currentIndex] = dependencies || []; // 빈 배열로 초기화
    callback(); // 초기 실행
    effectStore.set(currentKey, oldDependencies); // 초기화된 의존성을 저장
    increaseEffectIndex(); // 다음 인덱스로 이동
    return;
  }

  const old = oldDependencies[currentIndex] as unknown[]; // 이전 의존성 배열을 가져옴

  // 이전 의존성 배열이 비어있으면 아무 작업도 하지 않고 다음 인덱스로 이동
  if (old.length === 0) {
    increaseEffectIndex();
    return;
  }

  // 이전 의존성과 새 의존성을 비교하여 변경된 경우에만 콜백을 실행
  if (isDependenciesShouldChange(old, dependencies)) {
    callback(); // 변경이 감지되면 콜백을 실행
    oldDependencies[currentIndex] = dependencies; // 새 의존성으로 업데이트
    effectStore.set(currentKey, oldDependencies); // 업데이트된 의존성을 저장
  }

  increaseEffectIndex(); // 다음 상태 인덱스로 이동
}

/**
 * 두 의존성 배열이 서로 다른지 확인하는 함수
 * @param obj1 - 이전 의존성 배열
 * @param obj2 - 새로운 의존성 배열
 * @returns 두 배열이 다르면 true, 같으면 false
 */
const isDependenciesShouldChange = (
  obj1: unknown[],
  obj2: unknown[]
): boolean => {
  // 배열 길이가 다르면 변경으로 간주
  if (obj1.length !== obj2.length) {
    return true;
  }

  // 배열의 모든 요소가 동일한지 확인
  return !obj1.every((item, index) => item === obj2[index]);
};
