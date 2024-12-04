export interface DOMAttribute {
  onclick?: ((this: Notification, ev: Event) => any) | null;
  className?: string | string[];
  id?: string;
}

export interface InputDOMAttribute extends DOMAttribute {
  oninput?: ((this: Window, ev: Event) => any) | null;
  value?: string;
  placeholder?: string;
}

export interface AnchorDOMAttribute extends DOMAttribute {
  href: string;
}

export interface KeyAttribute extends DOMAttribute {
  key?: string | number;
}

export interface UnknownAttribute {
  [prop: string]: unknown;
}

export type ReactImitationProps =
  | DOMAttribute
  | InputDOMAttribute
  | AnchorDOMAttribute
  | KeyAttribute
  | UnknownAttribute
  | null;
