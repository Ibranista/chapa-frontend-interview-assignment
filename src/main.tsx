import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/index.tsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import AuthProvider from "./components/AuthProvider";

if (import.meta.env.MODE === 'development') {
  console.log("mocked")
  const { worker } = await import('./api/browser');
  worker.start();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ChakraProvider value={defaultSystem}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
