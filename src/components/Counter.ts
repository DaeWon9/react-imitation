import { createElement } from '../lib';
import { useState } from '../lib/hooks/useState';

export const Counter = (testState: number): HTMLElement => {
  const [count, setCount] = useState(0);

  return createElement({
    tag: 'header',
    children: [
      `${count}`,
      createElement({
        tag: 'button',
        props: {
          onClick: () => setCount(count + 1),
        },
        children: ['Click me', [`${testState}`]],
      }),
    ],
  });
};
