import {Route, Routes} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Concert from "./pages/Concert";
import Hangaram from "./pages/Hangaram";
import Location from "./pages/Location";
import Ticket from "./pages/Ticket";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/hangaram" element={<Hangaram />} />
        <Route path="/concert" element={<Concert />} />
        <Route path="/login" element={<Login />} />
        <Route path="/location" element={<Location />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
