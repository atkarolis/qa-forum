import { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { v4 as generateId} from 'uuid';
import UsersContext from '../../contexts/UsersContext';
import QuestionsContext from "../../contexts/QuestionsContext";
import { useLocation } from "react-router-dom";
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
      width: 670px;
      input {
        width: 462px;
      }
      input::placeholder{
        padding-left: 5px;
        color: #3D72A4;
      }
      textarea::placeholder{
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
      <h2>Submit Your Question, Pal</h2>
      <form onSubmit={(e) => {formHandler(e)}}>
        <div>
          <label htmlFor="title">Title of Your Question:</label>
          <input required type="text"
            name="title" id="title"
            placeholder="Type it here, dude."
            value={formInputs.question.title}
            onChange={(e) => {inputHandler(e)}}
          />
        </div>
        <div>
          <label htmlFor="question">Ask here, mate:</label>
          <textarea required
            name="question" id="question" 
            cols="50" rows="10"
            placeholder="Shoot that Question!"
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