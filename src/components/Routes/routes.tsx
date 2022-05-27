/**This holds all the setting for all the available paths. Not to be confused with the side navigation routes */
import { Pages } from "../../pages";
import { createRoutes } from "./routes-config";
import { useUserIsAuthenticated } from "../../contexts";

export const routes = createRoutes({
  fallback_route: "/",
  layouts: {},
  routes: [
    {
      path: "/",
      element: <Pages.Home />,
    },
  ],
  useUserIsAuthenticated,
});
