import { createBrowserRouter } from "react-router";

import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./components/HomePage";
import { StyleGuidePage } from "./components/StyleGuidePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "styles", Component: StyleGuidePage },
    ],
  },
]);
