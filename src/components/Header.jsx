import {useNavigate} from "react-router-dom";
import "./Header.css";
import {useState} from "react";
function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="desktop-nav">
        <div className="logo" onClick={() => navigate("/")}>
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt=""
            srcSet=""
          />
        </div>
        <nav>
          <ul className="desktop-nav-list">
            <li onClick={() => navigate("/hangaram")}>한가람미술관</li>
            <li onClick={() => navigate("/concert")}>콘서트홀</li>
            <li onClick={() => navigate("/location")}>오시는 길</li>
            <li onClick={() => navigate("/ticket")}>
              <i className="fa-regular fa-calendar"></i>
            </li>
            <li onClick={() => navigate("/login")}>
              <i className="fa-regular fa-user"></i>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mobile-nav">
        <div className="mobile-nav-wrap">
          <div className="logo" onClick={() => navigate("/")}>
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt=""
              srcSet=""
            />
          </div>
        </div>
        <div className="togglebtn">
          <button onClick={() => setMenuOpen((prev) => !prev)}>☰</button>
        </div>
        {menuOpen && (
          <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
        )}
        <nav className={menuOpen ? "open" : ""}>
          <ul>
            <li
              onClick={() => {
                setMenuOpen(false);
                navigate("/");
              }}
            >
              HOME
            </li>
            <li
              onClick={() => {
                setMenuOpen(false);
                navigate("/hangaram");
              }}
            >
              한가람미술관
            </li>
            <li
              onClick={() => {
                setMenuOpen(false);
                navigate("/concert");
              }}
            >
              콘서트홀
            </li>
            <li
              onClick={() => {
                setMenuOpen(false);
                navigate("/login");
              }}
            >
              로그인
            </li>
            <li
              onClick={() => {
                setMenuOpen(false);
                navigate("/location");
              }}
            >
              오시는 길
            </li>
            <li
              onClick={() => {
                setMenuOpen(false);
                navigate("/ticket");
              }}
            >
              예매하기
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
