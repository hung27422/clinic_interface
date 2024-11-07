import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ContextClinic from "./Context/ContextClinic.tsx";
import { SWRConfig } from "swr";
const fetcher = async (url: string) => {
  if (!url) return null; // Tránh gọi fetch nếu URL là null
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ContextClinic>
        <SWRConfig
          value={{
            fetcher,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
          }}
        >
          <App />
        </SWRConfig>
      </ContextClinic>
    </LocalizationProvider>
  </React.StrictMode>
);
