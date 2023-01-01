import "./FooterComponent.css";

export function FooterComponent() {
  return (
    <footer>
      <div className="footer-container">
        <p className="logo logo-footer">REACH</p>

        <ul>
          <li>
            <h4>Pricing:</h4>
          </li>
          <li>Overview</li>
          <li>Premium Plans</li>
          <li>Promotions</li>
        </ul>

        <ul>
          <li>
            <h4>Company:</h4>
          </li>
          <li>About Us</li>
          <li>Blog</li>
          <li>Careers</li>
          <li>Partnerships</li>
        </ul>

        <div className="socials socials-footer">
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-tiktok"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-twitter"></i>
        </div>
      </div>

      <p className="copyright">
        <span>©</span>Copyright. All rights reserved
      </p>
    </footer>
  );
}
