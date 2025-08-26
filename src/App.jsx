import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";

import { commonDataLoader } from "./loader/MainLoader.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader.jsx";
import Error from "./pages/Error.jsx";
import DualBrandDepartments from "./pages/DualBrandDepartments.jsx";
import DualBrandTrainings from "./pages/DualBrandTrainings.jsx";
import DualBrandList from "./pages/DualBrandList.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Departments = lazy(() => import("./pages/Departments.jsx"));
const Trainings = lazy(() => import("./pages/Trainings.jsx"));
const Error404 = lazy(() => import("./pages/Error404.jsx"));

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    loader: commonDataLoader,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "departments",
        element: (
          <Suspense fallback={<Loader />}>
            <Departments />
          </Suspense>
        ),
      },
      {
        path: "trainings",
        element: (
          <Suspense fallback={<Loader />}>
            <Trainings />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <Error404 />
          </Suspense>
        ),
      },
      {
        path: "dual-brands",
        element: (
          <Suspense fallback={<Loader />}>
            <DualBrandList />
          </Suspense>
        ),
      },
      {
        path: "dual-brands/departments",
        element: (
          <Suspense fallback={<Loader />}>
            <DualBrandDepartments />
          </Suspense>
        ),
      },
      {
        path: "dual-brands/trainings",
        element: (
          <Suspense fallback={<Loader />}>
            <DualBrandTrainings />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  const date = new Date();
  return (
    <>
      <div className="mb-20">
        <RouterProvider router={router} />
      </div>

      <footer className="bottom-fix">
        <div className="bg-grey">
          <div className="container mx-auto py-2">
            <div className="text-[12px] text-center">
              ©{date.getFullYear()} IHG Hotels & Resorts. All rights reserved.
              Proprietary and Confidential.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
