import React from 'react';

import ReactDOM from 'react-dom/client';
import App from './App';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import TeamsPage from './TeamsPage';
import MatchDetailsPage from './MatchDetailsPage';
import AdminPage from './AdminPage'
import ErrorPage from './404Page';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<MainPage />} />
      <Route path="home" element={<MainPage />} />
      <Route path="datamanagement" element={<AdminPage />} />
      <Route path="teams" element={<TeamsPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="matchdetails" element={<MatchDetailsPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);
