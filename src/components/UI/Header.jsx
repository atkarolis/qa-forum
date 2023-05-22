import { NavLink, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from '../../resources/ask.svg';
import UsersContext from '../../contexts/UsersContext';
import { useContext } from 'react';

const StyledHeader = styled.header` //header scroll adjust
  height: 120px;
  padding: 0 200px 0 150px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  div img {
    height: 100px;
  }
  nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    ul {
      list-style-type: none;
      display: flex;
      gap: 25px;
      li {
        a {
          text-decoration: none;
          position: relative;
          display: inline-block;
          color: #000000;
        }
        a::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px; //maybe adjust it later
          bottom: 0;
          left: 0;
          background-color: #000000;
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }
        a:hover::after{
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        a.active {
          color: #000000;
          font-weight: 600; //adjust it later
        }
      }
    }
  }
`

function Nav(){

  const { currentUser, setCurrentUser } = useContext(UsersContext);
  const navigate = useNavigate();

  if(!currentUser){
    return (
      <>
        <li><NavLink to='/login'>LOG IN</NavLink></li>
        <li><NavLink to='/register'>SIGN UP</NavLink></li>
      </>
    );
  } else {
    return (
      <>
        <button
        onClick={() => {
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
          navigate('/')
        }}
        >
          Log out
        </button>
      </>
    );
  }
}

const Header = () => {
  return (
    <StyledHeader>
      <div>
        <img src={logo} alt="ask-logo" />
      </div>
      <nav>
        <ul>
          <li><NavLink to='/'>HOME</NavLink></li>
          <li><NavLink to='/'>ABOUT</NavLink></li>
        </ul>
        <ul>
          <Nav/>
        </ul>
      </nav>
    </StyledHeader>
  );
}
 
export default Header;