import { useState, createElement } from '../ReactImitation';
import { useEffect } from '../ReactImitation/hooks/useEffect';
import { getCurrentKey } from '../ReactImitation/vdom/store';
import styles from './FunctionalComponent.module.css';

export function FunctionalComponent(props: any) {
  const [testState, setTestState] = useState(1);

  useEffect(() => {
    console.log(getCurrentKey(), '가 마운트 되었음');
  }, []);

  useEffect(() => {
    console.log('외부의 state가 변경되었음', props.count);
  }, [props.count]);

  useEffect(() => {
    console.log('내부의 state가 변경되었음', testState);
  }, [testState]);

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
