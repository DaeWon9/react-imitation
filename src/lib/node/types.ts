// Props 타입 정의
export type Props = {
  [key: string]:
    | string
    | number
    | boolean
    | object
    | ((event: Event) => void)
    | undefined;
  className?: string;
};

// 자식 요소 타입 정의
export type Children = string | HTMLElement | Children[];

// 시멘틱 태그 타입 정의
export type SemanticTags =
  | 'header'
  | 'footer'
  | 'section'
  | 'article'
  | 'nav'
  | 'aside'
  | 'main'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'ul'
  | 'ol'
  | 'li'
  | 'p'
  | 'span'
  | 'div';

// 폼 요소 타입 정의
export type FormTags =
  | 'button'
  | 'input'
  | 'textarea'
  | 'select'
  | 'option'
  | 'label'
  | 'form';

export type TagType = SemanticTags | FormTags;

// createElement 함수의 props 타입 정의
export interface CreateElementProps {
  tag: TagType;
  className?: string;
  props?: Props;
  children: Children[];
}
