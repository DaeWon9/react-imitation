import { TestComponent } from './component/TestComponent';
import { useState } from './ReactImitation/hooks';
import { createElement } from './ReactImitation/vdom';

export const App = () => {
  const [count, setCount] = useState(1);

  return createElement({
    el: 'div',
    children: [
      'hi',
      createElement({ el: 'li', children: [`${count}`] }),
      createElement({ el: 'li', children: [`${count}`] }),
      createElement({
        el: 'button',
        props: {
          className: 'test',
          onclick: () => {
            setCount(count + 1);
            console.log('clicked');
          },
        },
        children: ['Click me'],
      }),
      TestComponent({
        count: count,
        setCount: setCount,
      }),
    ],
  });
};
