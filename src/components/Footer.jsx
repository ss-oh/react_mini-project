import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div>
        <div className="footer-logo">
          <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" />
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/hangaram">한가람미술관</a>
          </li>
          <li>
            <a href="/concert">콘서트홀</a>
          </li>
          <li>
            <a href="/login">로그인</a>
          </li>
        </ul>
      </nav>
      <p>© 2025 Mini Project. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
