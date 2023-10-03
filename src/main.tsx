import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import ErrorPage from "./error-page.tsx";
import Root from "./routes/root.tsx";
import Settings from "./routes/settings.tsx";
import Home from "./routes/home.tsx";

import "./styles/styles.css";
import { SettingsProvider } from "./components/SettingsProvider.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "*",
        element: <Home />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
    </Provider>
  </React.StrictMode>
);
