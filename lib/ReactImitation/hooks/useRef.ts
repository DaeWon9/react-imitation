import { getCurrentKey, refIndexMap, refStore } from '../vdom/store';

/**
 * useRef 훅은 컴포넌트에 값을 추가하고,
 * 값에 접근할 수 있는 객체를 반환합니다.
 *
 * @param initialValue - 초기 값
 * @returns ref 객체 (current 프로퍼티를 통해 값에 접근)
 */
export function useRef<T>(initialValue: T | null): { current: T | null } {
  const currentKey = getCurrentKey(); // 현재 렌더링 중인 컴포넌트의 고유 키

  // 컴포넌트의 ref 상태를 저장하기 위한 초기화
  if (!refStore.has(currentKey)) {
    refStore.set(currentKey, [] as Array<{ current: T | null }>);
  }

  // 현재 컴포넌트의 ref 배열
  const componentRef = refStore.get(currentKey) as Array<{ current: T | null }>;

  // 현재 컴포넌트의 ref 인덱스
  let currentIndex = refIndexMap.get(currentKey) ?? 0;

  // ref 값이 정의되지 않은 경우 초기 값으로 설정
  if (componentRef[currentIndex] === undefined) {
    componentRef[currentIndex] = { current: initialValue };
  }

  // ref 객체 반환 (current 프로퍼티에 값이 들어 있음)
  const ref = componentRef[currentIndex];

  // ref 인덱스를 증가시켜 다음 ref를 가리키도록 설정
  refIndexMap.set(currentKey, currentIndex + 1);

  // ref 객체 반환
  return ref;
}
