import { createElement } from './lib';

export const App = (): HTMLElement => {
  return createElement({
    tag: 'section',
    className: 'section-class',
    props: { style: { backgroundColor: '#f4f4f4', padding: '20px' } },
    children: [
      createElement({
        tag: 'header',
        children: [createElement({ tag: 'h1', children: ['Element Test'] })],
      }),
      createElement({
        tag: 'button',
        props: {
          onClick: (event) => {
            console.log('Button clicked', event);
          },
        },
        children: ['Click me'],
      }),
    ],
  });
};
