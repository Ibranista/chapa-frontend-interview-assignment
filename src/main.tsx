import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/index.tsx";

if (import.meta.env.MODE === 'development') {
  const { worker } = await import('./api/browser');
  await worker.start();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
