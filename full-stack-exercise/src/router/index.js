import Login from '../pages/Login';
import Article from '../pages/Article';

import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import About from '../pages/About';
import Board from '../pages/Board';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
       index: true,
        element: <About />
      },
      {
        path: '/board',
        element: <Board />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/article',
    // path: '/article/:id/:name',
    element: <Article />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;