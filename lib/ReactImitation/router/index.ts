import { updateDOM } from '../dom';
import { TextVDOM, VDOM } from '../types';
import { createElement } from '../vdom';
import {
  generateKey,
  popParentKey,
  pushParentKey,
  resetIndexMap,
  resetStore,
} from '../vdom/store';
import { routeStore } from './store';
import { RouterProps } from './types';

/**
 * 라우터 초기화 함수
 * - routeStore에 경로(path)와 컴포넌트(element)를 매핑합니다.
 * - 현재 경로에 맞는 컴포넌트를 렌더링합니다.
 *
 * @param {RouterProps} routes - 경로와 컴포넌트 매핑 정보
 * @returns {VDOM} - 현재 경로에 해당하는 가상 DOM 엘리먼트
 */
export function createRouter({ routes }: RouterProps): VDOM {
  routes.forEach(({ path, element }) => {
    routeStore.set(path, element); // 경로와 컴포넌트를 스토어에 저장
  });
  // 처음 렌더링 시 현재 경로에 맞는 컴포넌트 생성
  return generateComponentByRoute(window.location.pathname);
}

/**
 * 현재 경로(path)에 매칭되는 컴포넌트를 생성합니다.
 * - 경로가 없으면 404 페이지를 반환합니다.
 * - 부모 키와 인덱스 맵을 활용해 컴포넌트를 생성합니다.
 *
 * @param {string} path - 렌더링할 경로
 * @returns {VDOM} - 생성된 가상 DOM 엘리먼트
 */
function generateComponentByRoute(path: string): VDOM {
  const componentFactory = routeStore.get(path);

  if (!componentFactory) {
    console.warn(`No component found for path: ${path}`);
    return createElement('div', null, {
      value: '404 - Page not found',
    } as TextVDOM);
  }

  const key = generateKey(componentFactory); // 컴포넌트의 고유 키 생성
  pushParentKey(key); // 부모 키 추가
  resetIndexMap(); // 인덱스 초기화

  const createdElement = componentFactory() as VDOM; // 컴포넌트 생성
  popParentKey(); // 부모 키 제거
  return createdElement;
}

/**
 * 경로 이동 함수
 * - history.pushState를 통해 경로를 변경하고 렌더링을 수행합니다.
 *
 * @param {string} targetPath - 이동할 경로
 */
export function navigate(targetPath: string) {
  if (window.location.pathname !== targetPath) {
    resetStore(); // 상태 스토어 초기화
    history.pushState({}, '', targetPath); // 브라우저 주소 변경
    updateDOM(); // DOM 업데이트
  }
}

/**
 * popstate 이벤트 처리
 * - 브라우저의 뒤로 가기/앞으로 가기 버튼 클릭 시 상태 복원과 DOM 업데이트를 수행합니다.
 */
window.addEventListener('popstate', () => {
  resetStore(); // 상태 스토어 초기화
  updateDOM(); // DOM 업데이트
});
