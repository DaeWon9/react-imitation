import { useState } from './ReactImitation/hooks';
import { createElement } from './ReactImitation/vdom';

const TestComponent = (props: any) => {
  const [testState, setTestState] = useState(1);

  return createElement({
    el: 'div',
    props: { className: 'test-component' },
    children: [
      `innerState: ${testState}`,
      createElement({
        el: 'br',
      }),
      `outterState: ${props.count}`,
      createElement({
        el: 'br',
      }),
      createElement({
        el: 'button',
        props: {
          className: 'test',
          onclick: () => {
            setTestState(testState + 1);
            console.log('clicked');
          },
        },
        children: ['inner State'],
      }),
      createElement({
        el: 'button',
        props: {
          className: 'test',
          onclick: () => {
            props.setCount(props.count + 1);
            console.log('clicked');
          },
        },
        children: ['outter State'],
      }),
    ],
  });
};

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
