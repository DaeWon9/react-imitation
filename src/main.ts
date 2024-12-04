import { App } from './App';
import { render } from './ReactImitation/vdom';

const root = document.getElementById('app');
render(() => App(), root);
