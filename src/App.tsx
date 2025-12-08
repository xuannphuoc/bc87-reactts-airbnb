import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { renderRoutes } from "./routes/index";
import { BookingProvider } from "./context/BookingContext";
function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;
