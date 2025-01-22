declare module '*.css' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg';

declare module JSX {
  type Element = string;
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare namespace ReactImitation {
  function createElement(
    tag: keyof HTMLElementTagNameMap | Function,
    props: ReactImitationProps | null = null,
    ...children: VDOMChildren
  ): VDOM;

  // 상태 관리
  function useState<T>(
    initialState: T
  ): [T, (newState: T | ((prev: T) => T)) => void];

  function useEffect(callback: () => void, dependencies: unknown[]): void;

  // 렌더링 관련
  function render(
    createVDOM: () => VDOM,
    rootElement: HTMLElement | null
  ): void;

  // 라우터 관련
  interface Router {
    createRouter({ routes }: RouterProps): VDOM;
    navigate(targetPath: string): void;
  }

  function createRouter({ routes }: RouterProps): VDOM;

  function navigate(targetPath: string): void;
}

declare module '@ReactImitation' {
  export = ReactImitation;
}
