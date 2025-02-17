import type { VDOM } from '../types';

export const stateStore = new Map<string, unknown[]>(); // 각 컴포넌트 키별 상태 저장
export const stateIndexMap = new Map<string, number>(); // 상태 인덱스 추적
export const effectStore = new Map<string, unknown[]>(); // 의존성 배열 추적
export const effectIndexMap = new Map<string, number>(); // effect 인덱스 추적
export const refStore = new Map<string, unknown[]>(); // ref 추적
export const refIndexMap = new Map<string, number>(); // ref 인덱스 추적
const componentKeyStore = new WeakMap<Function, string>(); // 각 컴포넌트별 고유 키 저장
const componentIndexStore = new WeakMap<Function, number>(); // 동일 컴포넌트 비교를 위한 인덱스 저장
const componentKeys = new Set<Function>(); // WeakMap의 Key추적을 위한 셋
const parentKeyStack: string[] = []; // 부모 컴포넌트 추적을 위한 스택
const usedKeys = new Set(); // 고유 키 생성을 위한 사용된 키셋
const nstChildIndexMap = new Map<string, number>(); // 부모의 몇번 째 자식인지 저장
let $root: HTMLElement;
let VDOM: VDOM;
let createVDOM: () => VDOM;

export function resetNstChildIndexMap() {
  nstChildIndexMap.clear();
}

export function incrementNstChildIndexMap(parentKey: string): number {
  const currentIndex = nstChildIndexMap.get(parentKey) || 0;
  nstChildIndexMap.set(parentKey, currentIndex + 1);
  return currentIndex;
}

export function resetStore(): void {
  stateStore.clear();
  effectStore.clear();
  refStore.clear();
}

export function increaseEffectIndex(): number {
  const currentKey = getCurrentKey();
  let currentIndex = effectIndexMap.get(currentKey);

  if (currentIndex === undefined) {
    currentIndex = 0;
  }

  effectIndexMap.set(currentKey, currentIndex + 1);
  return currentIndex;
}

export function getEffectIndex(): number {
  const currentKey = getCurrentKey();
  return effectIndexMap.get(currentKey) || 0;
}

export function resetAllComponentKeysIndex() {
  componentKeys.forEach((key) => {
    if (componentIndexStore.has(key)) {
      componentIndexStore.set(key, 0);
    }
  });
}

export function randomKey() {
  let key = Math.random().toString(36).slice(2);
  while (usedKeys.has(key)) {
    key = Math.random().toString(36).slice(2);
  }
  usedKeys.add(key);
  return key;
}

export function generateKey(component: Function): string {
  if (componentKeyStore.has(component)) {
    const baseKey = componentKeyStore.get(component)!;
    const componentIndex = componentIndexStore.get(component);
    const uniqueKey = `${baseKey}-${componentIndex}`;
    componentIndexStore.set(component, componentIndex! + 1);

    return uniqueKey;
  }

  // 새로운 키 생성
  const key = randomKey();
  const uniqueKey = `${key}-${0}`;
  componentKeyStore.set(component, key);
  componentIndexStore.set(component, 1);
  componentKeys.add(component);
  return uniqueKey;
}

export function popParentKey(): void {
  parentKeyStack.pop();
}

export function pushParentKey(key: string): void {
  parentKeyStack.push(key);
}

export function getParentKey(): string {
  return parentKeyStack.join('-');
}

export function getCurrentKey(): string {
  return parentKeyStack.length === 0
    ? 'App'
    : parentKeyStack[parentKeyStack.length - 1];
}

export function resetIndexMap(): void {
  const currentKey = getCurrentKey();
  stateIndexMap.set(currentKey, 0);
  effectIndexMap.set(currentKey, 0);
  refIndexMap.set(currentKey, 0);
}

export function increaseStateIndex(): void {
  const currentKey = getCurrentKey();
  let currentIndex = stateIndexMap.get(currentKey);

  if (currentIndex === undefined) {
    currentIndex = 0;
  }

  stateIndexMap.set(currentKey, currentIndex + 1);
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

export const getCreateVDOM = () => {
  return createVDOM;
};
