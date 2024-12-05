import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import MealsList from "./components/ui/MealsList.jsx";
import MealDetail from "./components/ui/MealDetail.jsx";
import AboutUs from "./components/ui/AboutUs.jsx";
import Layout from "../layout/Layout.jsx"; 
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/home",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/meals",
    element: (
      <Layout>
        <MealsList />
      </Layout>
    ),
  },
  {
    path: "/about-us",
    element: (
      <Layout>
        <AboutUs />
      </Layout>
    ),
  },
  {
    path: "/meals/:id", 
    element: (
      <Layout>
        <MealDetail />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <div>404 - Page Not Found</div>
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

