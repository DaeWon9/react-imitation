import { ReactImitationProps, VDOM, VDOMChildren } from '../types';
import { isVDOM } from '../utils';
import {
  generateKey,
  popParentKey,
  pushParentKey,
  resetIndexMap,
  getParentKey,
  incrementNstChildIndexMap,
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
  if (typeof tag === 'function') {
    const key = generateKey(tag);
    pushParentKey(key);
    resetIndexMap();

    const functionalComponent = tag({ ...props, children }) as VDOM;

    popParentKey();
    return functionalComponent;
  }

  if (!tag) tag = 'div';

  const parentKey = getParentKey(); // 부모 키 가져오기
  const currentIndex = incrementNstChildIndexMap(parentKey); // 현재 부모 아래 몇 번째 자식인지 계산

  return {
    tag,
    props: {
      ...props,
      key: props?.key ?? `${parentKey}-${currentIndex}`, // 자식의 고유 key 적용
    },
    children: children.map((child) => {
      if (isVDOM(child)) {
        const childIndex = incrementNstChildIndexMap(parentKey); // 자식 요소의 고유 인덱스 계산
        return {
          ...child,
          props: {
            ...child.props,
            key: child.props?.key ?? `${parentKey}-${childIndex}`,
          },
        };
      }
      return child;
    }),
    current: undefined,
  };
}
