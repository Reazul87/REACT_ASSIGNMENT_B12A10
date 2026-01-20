import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import AddExport from "../Pages/AddExport/AddExport";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyExports from "../Pages/MyExports/MyExports";
import MyImports from "../Pages/MyImports/MyImports";
import Register from "../Pages/Register/Register";
import Loading from "../Components/Loading";
import ProductDetails from "../Components/ProductDetails";
import PrivateRouter from "./PrivateRouter";
import ErrorPage from "../Components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    hydrateFallbackElement: <Loading></Loading>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          fetch("https://global-nexus-backend.vercel.app/latest-products"),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
        loader: () => fetch("https://global-nexus-backend.vercel.app/products"),
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivateRouter>
            <ProductDetails></ProductDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "/my-exports",
        element: (
          <PrivateRouter>
            <MyExports></MyExports>
          </PrivateRouter>
        ),
      },
      // {
      //   path: "/import-details/:id",
      //   element: (
      //     <PrivateRouter>
      //       <ImportedDetails></ImportedDetails>
      //     </PrivateRouter>
      //   ),
      // },
      {
        path: "/my-imports",
        element: (
          <PrivateRouter>
            <MyImports></MyImports>
          </PrivateRouter>
        ),
      },
      {
        path: "/add-export",
        element: (
          <PrivateRouter>
            <AddExport></AddExport>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
