import { Children, ReactImitationProps, VDOM, VDOMChildren } from '../types';
import { flattenArray } from '../utils';
import {
  generateKey,
  getParentKey,
  popParentKey,
  pushParentKey,
  resetIndexMap,
} from './store';

interface CreateElementProps {
  el: keyof HTMLElementTagNameMap | Function;
  props?: ReactImitationProps | null;
  children?: Children;
}

/**
 * 가상 DOM 요소를 생성합니다.
 *
 * @param el - 생성할 요소 (HTML 태그 또는 함수형 컴포넌트)
 * @param props - 요소의 속성
 * @param children - 자식 요소
 * @returns 생성된 VDOM 객체
 */
export function createElement({
  el,
  props = null,
  children = [],
}: CreateElementProps): VDOM {
  const parentKey = getParentKey(); // 현재 렌더링 중인 부모 요소의 키

  // 자식 요소를 평탄화(flatten)하고 VDOMChildren 형식으로 변환
  const vDOMChildren: VDOMChildren = flattenArray(
    Array.isArray(children) ? children : [children] // 배열이 아닌 경우 배열로 변환
  ).map((child, idx) => {
    // 자식 요소가 문자열 또는 숫자인 경우 처리
    if (typeof child === 'string' || typeof child === 'number') {
      return {
        value: String(child), // 문자열로 변환
        current: undefined, // 현재 실제 DOM 요소 (초기값 undefined)
        key: `${parentKey}-${idx}`, // 부모 키를 기반으로 고유 키 생성
      };
    }

    // 자식 요소가 undefined 또는 boolean인 경우 빈 문자열로 처리
    if (child === undefined || typeof child === 'boolean') {
      return {
        value: '', // 빈 문자열로 대체
        current: undefined,
        key: `${parentKey}-${idx}`,
      };
    }

    // 자식 요소가 이미 VDOM 객체인 경우
    const childVDOM = child as VDOM;
    const childProps = {
      ...childVDOM.props, // 기존 속성을 유지
      key: `${parentKey}-${childVDOM.props?.key || idx}`, // 고유 키 추가
    };

    return {
      ...childVDOM, // 기존 VDOM 정보를 복사
      props: childProps, // 속성 업데이트
    };
  });

  // 요소가 함수형 컴포넌트인 경우
  if (typeof el === 'function') {
    const key = generateKey(el); // 컴포넌트의 고유 키 생성
    pushParentKey(key); // 현재 컴포넌트를 부모로 설정
    resetIndexMap();
    const functionalCompoent = el(props) as VDOM; // 함수형 컴포넌트를 실행하여 VDOM 생성
    popParentKey(); // 부모 키를 원래 상태로 복원
    return functionalCompoent; // 생성된 VDOM 반환
  }

  // 일반 HTML 요소인 경우
  return {
    el, // 태그 이름
    props, // 요소 속성
    children: vDOMChildren, // 처리된 자식 요소들
    current: undefined, // 현재 실제 DOM 요소 (초기값 undefined)
  };
}
