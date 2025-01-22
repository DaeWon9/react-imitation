import { render, createElement } from './vdom';
import { useState, useEffect } from './hooks';
import { createRouter, navigate } from './router';

const ReactImitation = {
  render,
  createElement,
  useState,
  useEffect,
  navigate,
  createRouter,
};

export { render, createElement, useState, useEffect, navigate, createRouter };
export default ReactImitation;
