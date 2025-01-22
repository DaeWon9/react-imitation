import { DOMAttribute, ReactImitationProps } from '../types';
import { makeClassName } from '../utils';

/**
 * setAttributes 함수는 주어진 속성(props)을 기반으로 DOM 요소($el)의 속성을 설정합니다.
 *
 * - HTML 요소인 경우 해당 요소의 기존 속성(attribute)을 확인하고,
 *   새로운 속성값으로 업데이트하거나 제거합니다.
 * - `className` 속성에 대해서는 `makeClassName` 함수를 사용하여 클래스를 처리합니다.
 *
 * @param props - 설정할 속성들. `ReactImitationProps` 형태로 제공됩니다.
 * @param $el - 속성을 설정할 대상 DOM 요소입니다. HTML 요소 또는 텍스트 노드일 수 있습니다.
 */
export function setAttributes(
  props: ReactImitationProps,
  $el: HTMLElement | Text | undefined
): void {
  // $el이 HTMLElement가 아닌 경우 속성 설정 중단
  if (!($el instanceof HTMLElement)) {
    return;
  }

  // props가 존재하는 경우 속성 설정
  if (props) {
    for (const [propName, propValue] of Object.entries(props)) {
      const normalizedPropName = propName.toLowerCase(); // 속성 이름을 소문자로 변환
      const tmpPropName = normalizedPropName as keyof DOMAttribute;

      // 'key' 속성은 무시
      if (tmpPropName === 'key') {
        continue;
      }

      // className 속성 처리
      if (propName === 'className') {
        const newClassName = makeClassName(propValue);
        if ($el.className !== newClassName) {
          $el.className = newClassName; // 클래스명이 변경된 경우 업데이트
        }
      } else {
        // 다른 속성 처리
        if ($el[tmpPropName] !== propValue) {
          $el[tmpPropName] = propValue; // 속성 값이 변경된 경우 업데이트
        }
      }
    }
  }
}
