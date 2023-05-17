import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import logo from '../../resources/ask.svg';

const Header = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="ask-logo" />
      </div>
      <nav>
        <ul>
          <li><NavLink to='/'>HOME</NavLink></li>
          <li><NavLink to='/'>ABOUT</NavLink></li>
          <li><NavLink to='/'>LOG IN</NavLink></li>
          <li><NavLink to='/'>SIGN UP</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
 
export default Header;