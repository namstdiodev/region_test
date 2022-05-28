import { Suspense } from "react";
import { AllRoutes } from "../Routes/index";
export const App = () => {
  return (
    <Suspense>
      <AllRoutes />
    </Suspense>
  );
};
