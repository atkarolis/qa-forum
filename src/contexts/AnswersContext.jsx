import { createContext, useReducer, useEffect } from 'react';

const AnswersContext = createContext();
const AnswersActionTypes = {
  get: 'get_all_answers',
  add: 'add_new_answers',
  delete: 'remove_specific_answer',
  update: 'edit_answer'
};

const reducer = (state, action) => {
  switch(action.type){
    case AnswersActionTypes.get:
      return action.data;
    case AnswersActionTypes.add:
      fetch(`http://localhost:8080/answers`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [ ...state, action.data];
    case AnswersActionTypes.delete:
      fetch(`http://localhost:8080/answers/${action.id}`, {
        method: "DELETE"
      });
      return state.filter(el => el.id !== action.id);
    case AnswersActionTypes.update:
      fetch(`http://localhost:8080/answers/${action.data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      });
      let newState = [...state];
      let index = newState.findIndex((element) => element.id === action.data.id);
      newState[index] = action.data;
      return newState;
    default:
      return state;
  }
}

const AnswersProvider = ({ children }) => {
  
  const [answers, setAnswers] = useReducer(reducer,[]);

  useEffect(() => {
    fetch(`http://localhost:8080/answers`)
    .then(res => res.json())
    .then(data => setAnswers({
      type: AnswersActionTypes.get,
      data: data
    }));
  }, []);

  return (
    <AnswersContext.Provider
    value={{
      answers,
      AnswersActionTypes,
      setAnswers
    }}
    >
      { children }
    </AnswersContext.Provider>
  );
}

export { AnswersProvider };
export default AnswersContext;