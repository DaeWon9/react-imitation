export interface Props {
  [key: string]:
    | string
    | number
    | boolean
    | object
    | ((event: Event) => void)
    | undefined;
  // on으로 시작하는 이벤트들을 EventListener로 지정
  [key: `on${string}`]: EventListener | undefined;
}

export type Children = string | HTMLElement | Children[];

export interface CreateElementProps {
  tag: string;
  className?: string;
  props?: Props;
  children?: Children[];
}
