import {useNavigate} from "react-router-dom";
import "./header.css";
function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <div className="logo" onClick={() => navigate("/")}>
        Museums of the World
      </div>
      <nav>
        <ul>
          <li onClick={() => navigate("/korea")}>Korea</li>
          <li onClick={() => navigate("/japan")}>Japan</li>
          <li onClick={() => navigate("/usa")}>USA</li>
          <li onClick={() => navigate("/china")}>China</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
