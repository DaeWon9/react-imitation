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

export interface UnknownAttribute {
  [prop: string]: unknown;
}

export type ReactImitationProps =
  | DOMAttribute
  | InputDOMAttribute
  | AnchorDOMAttribute
  | UnknownAttribute
  | null;
