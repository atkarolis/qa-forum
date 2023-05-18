import { NavLink } from 'react-router-dom';
import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 200px;
  padding-right: 200px;
  background-color: #000000;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  .links-div {
    padding: 25px 0px 0px 250px;
    display: flex;
    gap: 30px;
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
    padding-top: 130px;
    font-size: 14px;
    color: #FFFFFF;
    p {
      margin: 0;
    }
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
            <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://www.reddit.com/" target="_blank" rel="noreferrer">Reddit</a></li>
            <li><a href="https://discord.com/" target="_blank" rel="noreferrer">Discord</a></li>
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