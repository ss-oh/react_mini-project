import {useNavigate} from "react-router-dom";
import "./header.css";
function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <div className="logo" onClick={() => navigate("/")}>
        <img src="../src/imges/logo.png" alt="" srcset="" />
      </div>
      <nav>
        <ul>
          <li onClick={() => navigate("/korea")}>한가람미술관</li>
          <li onClick={() => navigate("/japan")}>콘서트홀</li>
          <li onClick={() => navigate("/usa")}>로그인</li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
