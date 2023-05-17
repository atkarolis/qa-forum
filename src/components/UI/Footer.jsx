import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div>
        <ul>
          <li><NavLink to='/'>HOME</NavLink></li>
          <li><NavLink to='/'>ABOUT</NavLink></li>
        </ul>
        <ul>
          <li><a href="https://www.facebook.com/" target="_blank">Facebook</a></li>
          <li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
          <li><a href="https://www.reddit.com/" target="_blank">Reddit</a></li>
          <li><a href="https://discord.com/" target="_blank">Discord</a></li>
        </ul>
      </div>
      <div>
        <p>© 2023 Ask Anything Group</p>
        <p>developed by atkarolis</p>
      </div>
    </footer>
  );
}
 
export default Footer;