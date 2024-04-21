import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/Themeprovider.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <ThemeProvider>
        <main className="h-screen w-screen ">
          <App />
        </main>
      </ThemeProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
