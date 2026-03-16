import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import About from "../pages/About";
import Certificates from "../pages/Certificates";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

import BlogForm from "../pages/BlogForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Không cần children prop
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "/blog/create",
        element: <BlogForm />
      },
      {
        path: "/blog/edit/:id",
        element: <BlogForm />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/certificates",
        element: <Certificates />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/blog/:slug",
        element: <BlogDetail />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

export default router;