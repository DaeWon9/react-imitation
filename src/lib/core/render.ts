import {
  clearCurrentComponent,
  setCurrentComponent,
  stateIndexMap,
} from './store';

// 컴포넌트 렌더링 함수
export function render(component: Function): void {
  stateIndexMap.set(component, 0); // index 초기화

  setCurrentComponent(component); // 현재 실행 중인 컴포넌트 지정

  const root = document.getElementById('app');
  if (root) {
    root.innerHTML = ''; // 기존 렌더링된 내용 제거
    root.appendChild(component()); // 새로운 컴포넌트 추가
  }

  clearCurrentComponent(); // 현재 실행 중인 컴포넌트 초기화
}
