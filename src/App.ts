import { Counter } from './components/Counter';
import { createElement, useState } from './lib';

export const App = (): HTMLElement => {
  const [t1, setT1] = useState(1);
  const [t2, setT2] = useState(2);
  const [t3, setT3] = useState(3);

  return createElement({
    tag: 'section',
    className: 'section-class',
    props: { style: { backgroundColor: '#f4f4f4', padding: '20px' } },
    children: [
      createElement({
        tag: 'header',
        children: [
          `${t1}`,
          createElement({
            tag: 'button',
            props: {
              onClick: () => {
                setT1(t1 + 1);
              },
            },
            children: ['Click me'],
          }),
        ],
      }),
      createElement({
        tag: 'header',
        children: [
          `${t2}`,
          createElement({
            tag: 'button',
            props: {
              onClick: () => {
                setT2(t2 + 1);
              },
            },
            children: ['Click me'],
          }),
        ],
      }),
      createElement({
        tag: 'header',
        children: [
          `${t3}`,
          createElement({
            tag: 'button',
            props: {
              onClick: () => {
                setT3(t3 + 1);
              },
            },
            children: ['Click me'],
          }),
        ],
      }),
      createElement({
        tag: 'header',
        children: [createElement({ tag: 'h1', children: ['Element Test'] })],
      }),
      createElement({
        tag: 'div',
        children: [Counter(t1)],
      }),
      createElement({
        tag: 'div',
        children: [Counter(t2)],
      }),
      createElement({
        tag: 'div',
        children: [Counter(t3)],
      }),
    ],
  });
};
