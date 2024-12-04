import { VDOM } from './ReactImitation/types/vdom';
import { createElement } from './ReactImitation/vdom';

export const App = (): VDOM => {
  return createElement({
    el: 'div',
    children: [
      'hi',
      createElement({ el: 'li', children: ['1'] }),
      createElement({ el: 'li', children: ['1'] }),
      createElement({
        el: 'button',
        props: {
          className: 'test',
          onclick: () => {
            console.log('clicked');
          },
        },
        children: ['Click me'],
      }),
    ],
  });
};
