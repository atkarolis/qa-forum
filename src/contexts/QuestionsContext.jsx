import { createContext, useReducer, useEffect } from 'react';

const QuestionsContext = createContext();
const QuestionsActionTypes = {
  get: 'get_all_questions',
  add: 'add_new_question',
  delete: 'remove_specific_question',
  update: 'edit_question'
};

const reducer = (state, action) => {
  switch(action.type){
    case QuestionsActionTypes.get:
      return action.data;
    case QuestionsActionTypes.add:
      fetch(`http://localhost:8080/questions`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [ ...state, action.data];
    case QuestionsActionTypes.delete:
      fetch(`http://localhost:8080/questions/${action.id}`, {
        method: "DELETE"
      });
      return state.filter(el => el.id !== action.id);
    case QuestionsActionTypes.update:
      fetch(`http://localhost:8080/questions/${action.data.id}`, {
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

const QuestionsProvider = ({ children }) => {
  
  const [questions, setQuestions] = useReducer(reducer,[]);

  useEffect(() => {
    fetch(`http://localhost:8080/questions`)
    .then(res => res.json())
    .then(data => setQuestions({
      type: QuestionsActionTypes.get,
      data: data
    }));
  }, []);

  return (
    <QuestionsContext.Provider
    value={{
      questions,
      QuestionsActionTypes,
      setQuestions
    }}
    >
      { children }
    </QuestionsContext.Provider>
  );
}

export { QuestionsProvider };
export default QuestionsContext;