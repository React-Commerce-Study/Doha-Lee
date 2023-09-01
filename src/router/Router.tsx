import { createBrowserRouter } from 'react-router-dom';
import App from 'App';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import ProductDetail from 'pages/ProductDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'products/:id',
        element: <ProductDetail />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
]);

export default router;
