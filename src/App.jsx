import {Route, Routes} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Korea from "./pages/Korea";
import Japan from "./pages/Japan";
import USA from "./pages/USA";
import China from "./pages/China";
import Contact from "./pages/Contact";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/korea" element={<Korea />} />
        <Route path="/japan" element={<Japan />} />
        <Route path="/usa" element={<USA />} />
        <Route path="/china" element={<China />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
