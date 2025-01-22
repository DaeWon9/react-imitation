import { ReactImitationProps, VDOM, VDOMChildren } from '../types';
import {
  generateKey,
  popParentKey,
  pushParentKey,
  resetIndexMap,
} from './store';

/**
 * 가상 DOM 요소를 생성합니다.
 *
 * @param tag - 생성할 요소 (HTML 태그 또는 함수형 컴포넌트)
 * @param props - 요소의 속성
 * @param children - 자식 요소
 * @returns 생성된 VDOM 객체
 */
export function createElement(
  tag: keyof HTMLElementTagNameMap | Function,
  props: ReactImitationProps | null = null,
  ...children: VDOMChildren
): VDOM {
  // 요소가 함수형 컴포넌트인 경우
  if (typeof tag === 'function') {
    const key = generateKey(tag); // 컴포넌트의 고유 키 생성
    pushParentKey(key); // 현재 컴포넌트를 부모로 설정
    resetIndexMap();
    const functionalCompoent = tag({ ...props, children }) as VDOM; // 함수형 컴포넌트를 실행하여 VDOM 생성
    popParentKey(); // 부모 키를 원래 상태로 복원

    return functionalCompoent; // 생성된 VDOM 반환
  }

  if (!tag) tag = 'div';

  return {
    tag, // 태그 이름
    props, // 요소 속성
    children: children, // 처리된 자식 요소들
    current: undefined, // 현재 실제 DOM 요소 (초기값 undefined)
  };
}
