import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledMain = styled.main`
  min-height: calc(100vh - 320px);
  padding: 120px 250px 0px 400px;
  h2 {
    margin-top: 50px;
  }
  form {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    font-size: 1.1rem;
    div {
      display: flex;
      justify-content: space-between;
      width: 350px;
      input {
        width: 250px;
      }
      input::placeholder{
        padding-left: 5px;
        color: #3D72A4;
      }
    }
  }
  button{
    width: 80px;
    cursor: pointer;
      background-color: #3D72A4;
      border: 1px solid #3D72A4;
      color: #FFFFFF;
      padding: 5px 0px;
    &:hover{
      background-color: #3D72A4;
      border-color: #000000;
      color: #000000;
      box-shadow: 3px 3px 3px #3D72A4;
    }
  }
`

const Login = () => {
  const [formInputs, setFormInputs]= useState({
    email: '',
    password: ''
  });

  const [failedLogIn, setFailedLogIn] = useState(false);
  const { users, setCurrentUser } = useContext(UsersContext);

  const navigate = useNavigate();

  const inputHandler = e => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    });
    setFailedLogIn(false);
  }

  const formSubmit = e => {
    e.preventDefault();
    const loggedInUser = users.find(user => user.email === formInputs.email && formInputs.password === user.password);

    if(loggedInUser){
      setCurrentUser(loggedInUser);
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      navigate('/');
    } else {
      setFailedLogIn(true);
    }
  }
  return (
    <StyledMain>
      <h2>Login:</h2>
      <form onSubmit={(e) => {formSubmit(e)}}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email"
            required
            name="email" id="email"
            placeholder="example@email.com"
            value={formInputs.email}
            onChange={(e) => {inputHandler(e)}}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password"
            required
            name="password" id="password"
            placeholder="Keep it secret"
            value={formInputs.password}
            onChange={(e) => {inputHandler(e)}}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
      {
        failedLogIn &&
        <h1
          style={{ color:'red' }}
        >
          Incorrect login information
        </h1>
      }
    </StyledMain>
  );
}
 
export default Login;