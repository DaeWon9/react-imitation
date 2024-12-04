import { VDOM } from '../types/vdom';

let $root: HTMLElement;
let VDOM: VDOM;
let createVDOM: () => VDOM;

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
