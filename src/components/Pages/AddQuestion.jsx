import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { v4 as generateId} from 'uuid';
import UsersContext from '../../contexts/UsersContext';
import QuestionsContext from "../../contexts/QuestionsContext";

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
  
  return (
    <main>
      <h1>Submit Your Question, Pal</h1>
      <form onSubmit={(e) => {formHandler(e)}}>
        <div>
          <label htmlFor="category">Choose category:</label>
          <input required type="checkbox"
            name="category" id="category"
            value={formInputs.category}
            onChange={(e) => {inputHandler(e)}} //čia reikia arba select arba +2 checkboxus
          />
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