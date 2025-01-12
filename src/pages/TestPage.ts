import { useState, useEffect, createElement } from '../ReactImitation';
import { navigate } from '../ReactImitation/router/router';

export const TestPage = () => {
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(2);
  const [count3, setCount3] = useState(3);

  useEffect(() => {
    console.log('TestPage가 마운트 되었음');
  }, []);

  return createElement({
    el: 'div',
    children: [
      'hi',
      createElement({ el: 'li', children: [`${count1}`] }),
      createElement({ el: 'li', children: [`${count2}`] }),
      createElement({ el: 'li', children: [`${count3}`] }),

      createElement({
        el: 'button',
        children: [`move to HomePage`],
        props: {
          onclick: () => {
            navigate('/');
          },
        },
      }),
    ],
  });
};
