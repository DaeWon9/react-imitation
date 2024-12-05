import { useState } from '../ReactImitation/hooks';
import { createElement } from '../ReactImitation/vdom';

export const TestComponent = (props: any) => {
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
          key: 1,
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
