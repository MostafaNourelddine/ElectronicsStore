// src/App.jsx
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./AppRoutes";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </>
  );
}
