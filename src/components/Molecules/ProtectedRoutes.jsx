import UsersContext from '../../contexts/UsersContext';
import Login from '../Pages/Login';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';

const ProtectedRoutes = () => {

  const { currentUser } = useContext(UsersContext);

  if(!currentUser){
    return <Login />
  } else {
    return <Outlet />
  }
}

export default ProtectedRoutes;