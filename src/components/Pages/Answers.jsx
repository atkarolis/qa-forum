import { useContext, useState } from "react";
import styled from "styled-components";
import AnswersContext from "../../contexts/AnswersContext";
import { useLocation } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import { v4 as generateId} from 'uuid';

const StyledMain = styled.main`
  min-height: calc(100vh - 320px);
  padding-top: 120px;
  section {
    .user {
      img {
        height: 50px;
        width: 50px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
  ul {
    div{
      img {
        height: 50px;
        width: 50px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
`

function Buttons({data}){
  const { setAnswers, AnswersActionTypes } = useContext(AnswersContext);
  const { currentUser } = useContext(UsersContext);
  if(!currentUser)
    return;
  if(currentUser.id === data.user_id){
    return(
      <>
        <button className="delete"
          // data-tooltip="Tap to delete permanently"
          onClick={() => setAnswers({
            type: AnswersActionTypes.delete,
            id: data.id
          })}
        >Delete
        </button>
      </>
    );
  }
}

const Answers = () => {

  const { answers } = useContext(AnswersContext);
  const { users, currentUser } = useContext(UsersContext);
  const question = useLocation().state;
  const user = users.find(el => el.id === question.user_id);
  const questionAnswers = answers.filter(el => el.question_id === question.id);
  const { AnswersActionTypes, setAnswers } = useContext(AnswersContext)

  const [formInputs, setFormInputs] = useState({
    answer: '',
    likes: '',
    edited: false
  });

  const inputHandler = e => {
    console.log(e.target.value)
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    })
  }

  const formHandler = e => {
    e.preventDefault();
    const newAnswer = {
      ...formInputs,
      id: generateId(),
      user_id: currentUser.id,
      question_id: question.id
    };
    setAnswers({
      type: AnswersActionTypes.add,
      data: newAnswer
    });
  }


  return (
    <StyledMain>
      <section>
        <h4>
          {question.title}
        </h4>
        <p>
          {question.question}
        </p>
        <p>
          {question.edited}1991-03-20
        </p>
        <div className="user">
          <img src={user.picture} alt={`Avatar of ${user.username}`} />
          <span>{user.username}</span>
        </div>
      </section>
        <ul>
          {questionAnswers.map((answer, i) => (
            <div>
              <li key={i}>Answer: {answer.answer}</li>
              <p key={i}>Provided by: {users.find(el => el.id === answer.user_id).username}</p>
              <img key={i} src={users.find(el => el.id === answer.user_id).picture} alt="Authors avatar" />
              <Buttons 
                data={answer}
              />
            </div>
          ))}
        </ul>
      <section>
        <h1>Shoot Your Answer for the Question above</h1>
        <form onSubmit={(e) => formHandler(e)}>
            <div>
              <label htmlFor="answer">Your answer is:</label>
              <textarea required
                placeholder="Type here"
                name="answer" id="answer"
                cols="50" rows="10"
                defaultValue={formInputs.answer}
                onChange={(e)=>{inputHandler(e)}}
              ></textarea>
            </div>
            <button>Provide an Answer</button>
        </form>
      </section>
    </StyledMain>
  );
}

export default Answers;