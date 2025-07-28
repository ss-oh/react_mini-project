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
          <li onClick={() => navigate("/hangaram")}>한가람미술관</li>
          <li onClick={() => navigate("/concert")}>콘서트홀</li>
          <li onClick={() => navigate("/login")}>로그인</li>
          <li onClick={() => navigate("/location")}>오시는 길</li>
          <li onClick={() => navigate("/ticket")}>예매하기</li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
