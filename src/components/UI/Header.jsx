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
  font-size: 1.2rem;
  div img {
    height: 100px;
    padding-left: 200px;
  }
  nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-right: 250px;
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
    .logged {
      display: flex;
      align-items: center;
      gap: 20px;
      p {
        color: #3D72A4
      }
      img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border: 1px solid #3D72A4;
      box-shadow: 1px 1px 2px #3D72A4;
      border-radius: 50%;
      padding: 0;
      }
      button {
        cursor: pointer;
        background-color: #3D72A4;
        color: #FFFFFF;
        border: 1px solid #3D72A4;
        box-shadow: 1px 1px 2px #3D72A4;
        padding: 5px 20px;
        font-weight: 600;
        &:hover {
          border: 1px solid #000000;
          color: #000000;
          box-shadow: 3px 3px 3px #3D72A4;
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
      <div className='logged'>
        <p>Welcome {currentUser.username}!</p>
        <img src={currentUser.picture} alt={`Avatar of ${currentUser.username}`} />
        <button
        onClick={() => {
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
          navigate('/')
        }}
        >
          LOG OUT
        </button>
      </div>
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
        </ul>
        <ul className='loginNav'>
          <Nav/>
        </ul>
      </nav>
    </StyledHeader>
  );
}
 
export default Header;