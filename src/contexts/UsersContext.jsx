import { createContext, useReducer, useEffect, useState } from "react";

const UsersContext = createContext();
const UsersActionTypes = {
  get: 'get_all_users',
  add: 'add_user',
  changeStatus: 'block_or_unlock_user' //new addition
};

const reducer = (state, action) => {
  switch(action.type){
    case UsersActionTypes.get:
      return action.data;
    case UsersActionTypes.add:
      fetch(`http://localhost:8080/users`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [ ...state, action.data];
    case UsersActionTypes.changeStatus: //new addition start
      return state.map(el => {
        if(el.id === action.id){
          fetch(`http://localhost:8080/users/${action.id}`, {
            method: "PATCH",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({ isBlocked:!el.isBlocked })
          })
          return { ...el, isBlocked:!el.isBlocked }
        } else {
          return el;
        }
      }) //new addition ends here
    default:
      return state;
  }
}

const UsersProvider = ({ children }) => {
  
  const [users, setUsers] = useReducer(reducer, []);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then(data => setUsers({
        type: UsersActionTypes.get,
        data: data
      }));
  }, []);

  return (
    <UsersContext.Provider
    value={{
      users,
      UsersActionTypes,
      setUsers,
      currentUser,
      setCurrentUser
    }}
    >
      { children }
    </UsersContext.Provider>
  );
}

export { UsersProvider };
export default UsersContext;