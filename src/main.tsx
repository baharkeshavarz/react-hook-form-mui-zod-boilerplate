import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Users from "./users/components/Users.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Users />
  </StrictMode>
);
