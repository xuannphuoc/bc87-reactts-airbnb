import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { renderRoutes } from "./routes/index";
import { BookingProvider } from "./context/BookingContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
          containerStyle={{
            marginTop: "100px",
            zIndex: 999999,
          }}
        />
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;
