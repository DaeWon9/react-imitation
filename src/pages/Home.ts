import { useState, createElement } from '../ReactImitation';
import { navigate } from '../ReactImitation/router/router';
import { FunctionalComponent } from '../component/FunctionalComponent';

export const Home = () => {
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(2);

  return createElement({
    el: 'div',
    children: [
      createElement({
        el: 'button',
        children: [`move to TestPage`],
        props: {
          onclick: () => {
            navigate('/test');
          },
        },
      }),
      createElement({ el: 'li', children: [`${count1}`] }),
      createElement({ el: 'li', children: [`${count2}`] }),
      createElement({
        el: 'button',
        props: {
          className: 'button1',
          onclick: () => {
            setCount1(count1 + 1);
          },
        },
        children: ['Click me'],
      }),
      createElement({
        el: 'button',
        props: {
          className: 'button2',
          onclick: () => {
            setCount2(count2 + 1);
          },
        },
        children: ['Click me'],
      }),

      createElement({
        el: FunctionalComponent,
        props: {
          count: count1,
          setCount: setCount1,
        },
      }),

      createElement({
        el: FunctionalComponent,
        props: {
          count: count2,
          setCount: setCount2,
        },
      }),

      createElement({
        el: 'div',
        props: {},
        children: [
          createElement({
            el: 'div',
            children: [
              'hi',
              createElement({ el: 'li', children: [`${count1}`] }),
              createElement({ el: 'li', children: [`${count2}`] }),
              createElement({
                el: 'button',
                props: {
                  className: 'button1',
                  onclick: () => {
                    setCount1(count1 + 1);
                  },
                },
                children: ['Click me'],
              }),
              createElement({
                el: 'button',
                props: {
                  className: 'button2',
                  onclick: () => {
                    setCount2(count2 + 1);
                  },
                },
                children: ['Click me'],
              }),

              createElement({
                el: FunctionalComponent,
                props: {
                  count: count1,
                  setCount: setCount1,
                },
              }),

              createElement({
                el: FunctionalComponent,
                props: {
                  count: count2,
                  setCount: setCount2,
                },
              }),

              createElement({
                el: 'div',
                props: {},
                children: [
                  createElement({
                    el: 'div',
                    children: [
                      'hi',
                      createElement({ el: 'li', children: [`${count1}`] }),
                      createElement({ el: 'li', children: [`${count2}`] }),
                      createElement({
                        el: 'button',
                        props: {
                          className: 'button1',
                          onclick: () => {
                            setCount1(count1 + 1);
                          },
                        },
                        children: ['Click me'],
                      }),
                      createElement({
                        el: 'button',
                        props: {
                          className: 'button2',
                          onclick: () => {
                            setCount2(count2 + 1);
                          },
                        },
                        children: ['Click me'],
                      }),

                      createElement({
                        el: FunctionalComponent,
                        props: {
                          count: count1,
                          setCount: setCount1,
                        },
                      }),

                      createElement({
                        el: FunctionalComponent,
                        props: {
                          count: count2,
                          setCount: setCount2,
                        },
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
