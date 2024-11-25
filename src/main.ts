import { App } from './App';
import { render } from './lib';

const root = document.getElementById('app');
if (root) {
  render(App);
}
