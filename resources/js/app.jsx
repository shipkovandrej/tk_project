import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = [
    {
        path: '/test1',
        element: <div>Hello laravel 11</div>,
    }
];

createRoot(document.getElementById('root')).render(
    <RouterProvider
        router={createBrowserRouter(routes)}
    />
);
