import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UsersProvider from "./users/components/UsersProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UsersProvider />
  </StrictMode>
);
