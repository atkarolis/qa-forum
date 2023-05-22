import { NavLink, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from '../../resources/ask.svg';
import UsersContext from '../../contexts/UsersContext';
import { useContext } from 'react';

const StyledHeader = styled.header`
  height: 120px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #FFFFFF;
  z-index: 1;
  div img {
    height: 100px;
    padding-left: 150px;
  }
  nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-right: 200px;
    display: flex;
    align-items: center;
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
          font-weight: 600;
        }
        a::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #3D72A4;
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }
        a:hover::after{
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        a.active {
          color: #3D72A4;
          font-weight: 600;
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
        <ul className='loginNav'>
          <Nav/>
        </ul>
      </nav>
    </StyledHeader>
  );
}
 
export default Header;