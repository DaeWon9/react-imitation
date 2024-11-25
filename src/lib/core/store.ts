export const stateStore = new WeakMap<Function, unknown[]>(); // 각 컴포넌트별 상태 저장
export const stateIndexMap = new WeakMap<Function, number>(); // 상태 인덱스 추적
let currentComponent: Function | null = null; // 현재 렌더링 중인 컴포넌트 추적용 변수

// 현재 실행 중인 컴포넌트를 반환
export function getCurrentComponent(): Function {
  if (!currentComponent) {
    throw new Error('No component is currently being rendered.');
  }
  return currentComponent;
}

// 현재 컴포넌트를 설정
export function setCurrentComponent(component: Function): void {
  currentComponent = component;
}

// 컴포넌트 렌더링이 끝나면 초기화
export function clearCurrentComponent(): void {
  currentComponent = null;
}
