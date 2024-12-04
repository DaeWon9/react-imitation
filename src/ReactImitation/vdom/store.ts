import { VDOM } from '../types/vdom';

export const stateStore = new WeakMap<HTMLElement | Text, unknown[]>(); // 각 컴포넌트별 상태 저장
export const stateIndexMap = new WeakMap<HTMLElement | Text, number>(); // 상태 인덱스 추적

let currentComponent: HTMLElement | Text | null = null; // 현재 렌더링 중인 컴포넌트 추적용 변수
let $root: HTMLElement;
let VDOM: VDOM;
let createVDOM: () => VDOM;

export function getCurrentComponent(): HTMLElement | Text {
  if (!currentComponent) {
    throw new Error('No component is currently being rendered.');
  }
  return currentComponent;
}

export function setCurrentComponent(component: HTMLElement | Text): void {
  currentComponent = component;
}

export function clearCurrentComponent(): void {
  currentComponent = null;
}

export function resetStateIndex(): void {
  stateIndexMap.set(currentComponent!, 0);
}

export function increateStateIndex(): void {
  let currentIndex = stateIndexMap.get(currentComponent!);
  stateIndexMap.set(currentComponent!, currentIndex! + 1);
}

export const getRoot = () => {
  return $root;
};

export const setRoot = (currentRoot: HTMLElement) => {
  $root = currentRoot;
};

export const getVDOM = () => {
  return VDOM;
};

export const setVDOM = (currentVDOM: VDOM) => {
  VDOM = currentVDOM;
};

export const getNewVDOM = () => {
  if (!createVDOM) {
    throw new Error('아직 createVDOM 함수가 바인딩 되지 않았음');
  }
  return createVDOM();
};

export const setCreateVDOM = (currentCreateVDOM: () => VDOM) => {
  createVDOM = currentCreateVDOM;
};
