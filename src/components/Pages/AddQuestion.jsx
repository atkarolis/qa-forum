import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { v4 as generateId} from 'uuid';
import UsersContext from '../../contexts/UsersContext';
import QuestionsContext from "../../contexts/QuestionsContext";
import { CategoryEnum } from "../Atoms/Categories";

const AddQuestion = () => {

  const navigate = useNavigate();
  const { currentUser } = useContext(UsersContext);
  const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext);
  const [formInputs, setFormInputs] = useState({
    category: false,
    title: '',
    question: ''
  });

  const inputHandler = e => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    });
  }

  const formHandler = e => {
    e.preventDefault();
    const AddQuestion = {
      id: generateId(),
      user_id: currentUser.id,
      category: formInputs.category,
      title: formInputs.title,
      question: formInputs.question
    }
    setQuestions({
      type: QuestionsActionTypes.add,
      data: AddQuestion
    });
    navigate('/');
  }
  
  let categoriesOptions = [];
  CategoryEnum.forEach(element => {
    categoriesOptions.push(<label htmlFor={element}>{element}</label>)
    categoriesOptions.push(<input type="checkbox" id={element} onChange={(e) => {inputHandler(e)}}/>)
  })

  return (
    <main>
      <h1>Submit Your Question, Pal</h1>
      <form onSubmit={(e) => {formHandler(e)}}>
        <div>
          Choose Category: 
            {categoriesOptions}
        </div>
        <div>
          <label htmlFor="title">Title of Your Question:</label>
          <input required type="text"
            name="title" id="title"
            value={formInputs.title}
            onChange={(e) => {inputHandler(e)}}
          />
        </div>
        <div>
          <label htmlFor="question">Ask here, mate:</label>
          <textarea required
            name="question" id="question" 
            cols="50" rows="10"
            value={formInputs.question}
            onChange={(e) => {inputHandler(e)}}
          ></textarea>
        </div>
        <button>Ask!</button>
      </form>
    </main>
  );
}
 
export default AddQuestion;