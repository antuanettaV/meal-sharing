import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import MealsList from "./components/MealsList.jsx";
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,  
  },
    
  
]);  

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
