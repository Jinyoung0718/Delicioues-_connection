import { AiOutlineInstagram, AiOutlineYoutube, AiOutlineFacebook } from 'react-icons/ai';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="social-icons">
          <a className="social-icon-link" href="https://www.instagram.com" target="blank">
            <AiOutlineInstagram size={30} />
          </a>
          <a className="social-icon-link" href="https://www.youtube.com" target="blank">
            <AiOutlineYoutube size={30} />
          </a>
          <a className="social-icon-link" href="https://www.facebook.com" target="blank">
            <AiOutlineFacebook size={30} />
          </a>
        </div>
        <div className="text-container">
          <h1>Everyone can cook easily</h1>
          <hr style={{ width: '300px' }} />
          <p>“If it tastes good then it’s 0 calories”</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;