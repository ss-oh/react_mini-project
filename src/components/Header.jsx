import {useNavigate} from "react-router-dom";
import "./Header.css";
import {useRef, useState} from "react";
function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null); // useRef로 버튼 참조

  const handleButtonClick = () => {
    const button = buttonRef.current;
    if (!button) return;

    if (button.classList.contains("clicked")) {
      const resetButton = () => {
        button.removeEventListener("transitionend", resetButton);
        button.classList.remove("prev_clicked");
      };

      button.classList.add("prev_clicked");
      button.classList.remove("clicked");
      button.addEventListener("transitionend", resetButton);
    } else {
      const clickButton = () => {
        button.removeEventListener("transitionend", clickButton);
        button.classList.remove("prev_clicked");
        button.classList.add("clicked");
      };

      button.classList.add("prev_clicked");
      button.addEventListener("transitionend", clickButton);
    }
  };

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
        <div className="togglebtn" onClick={() => setMenuOpen((prev) => !prev)}>
          <button
            className="hamburger"
            id="hamburger_button"
            ref={buttonRef} // ref 연결
            onClick={handleButtonClick}
          >
            <span className="button_text"></span>
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
        )}
        <nav className={menuOpen ? "open" : ""}>
          <ul>
            <li
              onClick={() => {
                setMenuOpen(false);
                const button = buttonRef.current;
                if (button) {
                  button.classList.remove("clicked", "prev_clicked");
                }
                navigate("/");
              }}
            >
              HOME
            </li>
            <li
              onClick={() => {
                setMenuOpen(false);
                const button = buttonRef.current;
                if (button) {
                  button.classList.remove("clicked", "prev_clicked");
                }
                navigate("/hangaram");
              }}
            >
              한가람미술관
            </li>
            <li
              onClick={() => {
                setMenuOpen(false);
                const button = buttonRef.current;
                if (button) {
                  button.classList.remove("clicked", "prev_clicked");
                }
                navigate("/concert");
              }}
            >
              콘서트홀
            </li>
            <li
              onClick={() => {
                setMenuOpen(false);
                const button = buttonRef.current;
                if (button) {
                  button.classList.remove("clicked", "prev_clicked");
                }
                navigate("/login");
              }}
            >
              로그인
            </li>
            <li
              onClick={() => {
                setMenuOpen(false);
                const button = buttonRef.current;
                if (button) {
                  button.classList.remove("clicked", "prev_clicked");
                }
                navigate("/location");
              }}
            >
              오시는 길
            </li>
            <li
              onClick={() => {
                setMenuOpen(false);
                const button = buttonRef.current;
                if (button) {
                  button.classList.remove("clicked", "prev_clicked");
                }
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
