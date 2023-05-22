import { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { v4 as generateId} from 'uuid';
import UsersContext from '../../contexts/UsersContext';
import QuestionsContext from "../../contexts/QuestionsContext";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledMain = styled.main`
  min-height: calc(100vh - 320px);
  padding-top: 120px;
`

const AddQuestion = () => {

  const navigate = useNavigate();
  const navigateData = useLocation();
  const { currentUser } = useContext(UsersContext);
  const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext);
  const [formInputs, setFormInputs] = useState(
    {
      question: {
        id: -1,
        user_id: -1,
        title: "",
        question: "",
        answer_ids: [],
        likes: 0,
        likers: [],
        dislikers: [],
        edited: false
      },
      formState: {
        toEdit: false
      }
    });
  
  const updateStateForEdit = () => {
    if(navigateData.state){
      if(navigateData.state.formState.toEdit){
        setFormInputs({
          question: navigateData.state.data, 
          formState: navigateData.state.formState
        });
      }  
    }
    //console.log(formInputs);
  }

  const inputHandler = e => {
    let newState = {...formInputs};

    if(e.target.name === "title")
      newState.question.title = e.target.value;
    else if(e.target.name === "question")
      newState.question.question = e.target.value;

    setFormInputs(newState);
  }

  const formHandler = e => {
    e.preventDefault();

    const newQuestionData = formInputs.question;
    let isEdit = formInputs.formState.toEdit;
    let contextActionType = isEdit ? QuestionsActionTypes.update : QuestionsActionTypes.add;

    if(!isEdit){
      newQuestionData.id = generateId();
      newQuestionData.user_id = currentUser.id;
    } else {
      newQuestionData.edited = true;
    }

    setQuestions({
      type: contextActionType,
      data: newQuestionData
    });
    navigate('/');
  }

  useEffect(() => updateStateForEdit(), []);

  return (
    <StyledMain>
      <h1>Submit Your Question, Pal</h1>
      <form onSubmit={(e) => {formHandler(e)}}>
        <div>
          <label htmlFor="title">Title of Your Question:</label>
          <input required type="text"
            name="title" id="title"
            value={formInputs.question.title}
            onChange={(e) => {inputHandler(e)}}
          />
        </div>
        <div>
          <label htmlFor="question">Ask here, mate:</label>
          <textarea required
            name="question" id="question" 
            cols="50" rows="10"
            value={formInputs.question.question}
            onChange={(e) => {inputHandler(e)}}
          ></textarea>
        </div>
        <button>{formInputs.formState.toEdit ? <>Edit</> : <>Ask!</>}</button>
      </form>
    </StyledMain>
  );
}
 
export default AddQuestion;