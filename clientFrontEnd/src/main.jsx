import App from './App.jsx';
import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Home from "./pages/Home.jsx";
import Video from "./pages/Video.jsx";
import Channel from "./pages/Channel.jsx";
import Register from "./pages/Register.jsx";
import CreateChannel from "./pages/CreateChannel.jsx";
import SignIn from "./pages/SignIn.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import "./index.css";



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signin',
        element: <SignIn/>,
      },
      {
        path: '/register',
        element: <Register/>,
      },
      {
        path: "/video/:id",
        element:<Video/>,
      },
      {
        path: "/channel/:id",
        element:<Channel/>,
      },
      {
        path: "/createChannel",
        element:<CreateChannel/>,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
        <RouterProvider router={appRouter} />

  </React.StrictMode>
);