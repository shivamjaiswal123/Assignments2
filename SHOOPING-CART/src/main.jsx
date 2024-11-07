import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  Route,
  RouterProvider,
  BrowserRouter
} from "react-router-dom";
import Home from "./component/Home";
import Cart from "./component/Cart";
import Context from "./context/Context";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/" element={<Home />} />
//       <Route path="cart" element={<Cart />} />
//     </Route>
//   )
// );

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // <RouterProvider router={router}>
  <Context>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context>
  // </RouterProvider>
  // </StrictMode>,
);
