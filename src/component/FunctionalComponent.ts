import { useState, createElement } from '../ReactImitation';
import { getCurrentKey } from '../ReactImitation/vdom/store';
import styles from './FunctionalComponent.module.css';

export function FunctionalComponent(props: any) {
  const [testState, setTestState] = useState(1);

  return createElement({
    el: 'div',
    props: { className: styles['functional-component-container'] },
    children: [
      createElement({
        el: 'div',
        children: [`KEY: ${getCurrentKey()}`],
        props: {
          className: styles['key-element'],
        },
      }),

      createElement({
        el: 'br',
      }),
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
          className: styles['button3'],
          onclick: () => {
            setTestState(testState + 1);
          },
        },
        children: ['inner State'],
      }),
      createElement({
        el: 'button',
        props: {
          className: styles['button4'],
          onclick: () => {
            props.setCount(props.count + 1);
          },
        },
        children: ['outter State'],
      }),
    ],
  });
}
