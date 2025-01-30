import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Programme from './components/Programme';
import App from './App';

const allRoutes = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path: '/programme',
    element: <Programme />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={allRoutes} />
  </StrictMode>,
);
