import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

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
    <main>
      <form onSubmit={(e) => {formSubmit(e)}}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email"
            name="email" id="email"
            value={formInputs.email}
            onChange={(e) => {inputHandler(e)}}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password"
            name="password" id="password"
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
    </main>
  );
}
 
export default Login;