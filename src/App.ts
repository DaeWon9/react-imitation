import { Home } from './pages/Home';
import { TestPage } from './pages/TestPage';
import { createRouter } from './ReactImitation/router/router';

export const App = () => {
  return createRouter({
    routes: [
      { path: '/', element: Home },
      { path: '/test', element: TestPage },
    ],
  });
};
