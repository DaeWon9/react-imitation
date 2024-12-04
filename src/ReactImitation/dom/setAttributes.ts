import { DOMAttribute, ReactImitationProps } from '../types/attributes';

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
  // $el이 HTMLElement가 아닌 경우 처리하지 않습니다.
  if (!($el instanceof HTMLElement)) {
    return;
  }

  // 기존에 설정된 속성을 확인하여, 필요한 변경 작업을 합니다.
  if ($el.attributes?.length) {
    for (const attr of Object.values($el.attributes)) {
      const tmpAttrName = attr.name as keyof DOMAttribute;

      // 속성값이 주어지면 기존 속성 값을 비교하고, 필요시 업데이트 또는 삭제합니다.
      if (props) {
        const propValue = `${props[tmpAttrName]}`;
        if (!propValue || propValue === 'undefined') {
          $el.removeAttribute(attr.name); // 값이 없으면 속성을 삭제합니다.
        } else if (Object.is(propValue, attr.value)) {
          delete props[tmpAttrName]; // 값이 동일하면 속성값을 삭제합니다.
        }
      } else {
        $el.removeAttribute(attr.name); // props가 없으면 속성을 삭제합니다.
      }
    }
  }

  // 새로운 속성값을 설정합니다.
  if (props) {
    for (const [propName, propValue] of Object.entries(props)) {
      const tmpPropName = propName as keyof DOMAttribute;

      // className 속성의 경우 makeClassName 함수를 사용하여 처리합니다.
      if (tmpPropName === 'className') {
        $el[tmpPropName] = makeClassName(propValue);
      } else {
        $el[tmpPropName] = propValue; // 나머지 속성은 직접 설정합니다.
      }
    }
  }
}

function makeClassName(classList: string | (string | undefined)[]): string {
  if (Array.isArray(classList)) {
    return classList
      .map((className) => {
        if (className === undefined) {
          throw new Error('해당 클래스는 존재하지 않습니다.');
        }
        return className;
      })
      .join(' ');
  } else {
    return classList;
  }
}
