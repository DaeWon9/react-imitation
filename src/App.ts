import { useState, createElement } from './ReactImitation';
import { FunctionalComponent } from './component/FunctionalComponent';

export const App = () => {
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(2);

  return createElement({
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
