import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import App from './App';
import RootLayout from './components/layout/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
