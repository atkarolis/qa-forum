import { NavLink } from 'react-router-dom';
import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 200px;
  background-color: #000000;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  .links-div {
    padding-top: 25px;
    display: flex;
    gap: 80px;
  }
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    line-height: 30px;
    color: #FFFFFF
  }
  .credits {
    position: absolute;
    bottom: 10px;
    right: 200px;
    color: red; //adjust the color and font-size (?) later
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <div className='links-div'>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/'>About</NavLink></li>
        </ul>
        <ul>
          <li><a href="https://www.facebook.com/" target="_blank">Facebook</a></li>
          <li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
          <li><a href="https://www.reddit.com/" target="_blank">Reddit</a></li>
          <li><a href="https://discord.com/" target="_blank">Discord</a></li>
        </ul>
      </div>
      <div className='credits'>
        <p>© 2023 Ask Anything Group</p>
        <p>developed by atkarolis</p>
      </div>
    </StyledFooter>
  );
}
 
export default Footer;