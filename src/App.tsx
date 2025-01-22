import { createRouter } from '@ReactImitation';
import { Home } from './pages/Home';
import { TestPage } from './pages/TestPage';

export const App = () => {
  return createRouter({
    routes: [
      { path: '/', element: Home },
      { path: '/test', element: TestPage },
    ],
  });
};
