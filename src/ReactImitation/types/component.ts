import { VDOMChildren } from './vdom';

export interface Component {
  (props: { [propName: string]: any; children?: VDOMChildren }): any;
}
