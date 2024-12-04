import { ReactImitationProps } from '../types/attributes';
import { Component } from '../types/component';
import { Children, VDOM, VDOMChildren, TextVDOM } from '../types/vdom';
import { flattenArray } from '../utils/arrayUtil';

/**
 * createElement 함수는 주어진 태그 이름, 속성, 자식 요소를 기반으로
 * 가상 DOM 객체(VDOM)를 생성합니다.
 *
 * @param el - 태그 이름(keyof HTMLElementTagNameMap) 또는 컴포넌트 함수
 * @param props - 태그 속성, 기본값은 `null`
 * @param children - 자식 요소들
 * @returns 생성된 VDOM 객체
 */

interface CreateElementProps {
  el: keyof HTMLElementTagNameMap | Component;
  props?: ReactImitationProps | null;
  children?: Children;
}

export function createElement({
  el,
  props = null,
  children = [], // 기본값으로 빈 배열을 설정
}: CreateElementProps): VDOM {
  // children을 배열로 변환하고 VDOMChildren으로 매핑
  const vDOMChildren: VDOMChildren = flattenArray(
    Array.isArray(children) ? children : [children]
  ).map((child): VDOM | TextVDOM => {
    if (typeof child === 'string' || typeof child === 'number') {
      return { value: String(child), current: undefined }; // 텍스트 VDOM
    }
    if (child === undefined || typeof child === 'boolean') {
      return { value: '', current: undefined }; // 빈 텍스트 VDOM
    }
    return child as VDOM | TextVDOM; // 이미 VDOM 형식인 경우 그대로 반환
  });

  // el이 함수형 컴포넌트라면 호출하여 결과 반환
  if (typeof el === 'function') {
    return el({ ...props, children: vDOMChildren });
  }

  // el이 HTML 태그 이름이라면 VDOM 생성
  return {
    el,
    props,
    children: vDOMChildren,
    current: undefined,
  };
}
