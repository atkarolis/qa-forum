import { useContext, useState } from "react";
import styled from "styled-components";
import AnswersContext from "../../contexts/AnswersContext";
import { useLocation } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import { v4 as generateId} from 'uuid';

const StyledMain = styled.main`
  min-height: calc(100vh - 320px);
  padding: 120px 310px 0px 400px;
  font-size: 1.1rem;
  .question {
    h4 {
      margin-top: 0;
    }
    margin: 30px 0px 30px 0px;
    border: 1px solid #000000;
    box-shadow: 1px 1px 1px #000000;
    border-radius: 30px;
    width: 100%;
    padding: 20px 30px;
    .details {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-direction: column;
      img {
        height: 65px;
        width: 65px;
        object-fit: cover;
        border-radius: 50%;
        border: 1px solid #000000;
        box-shadow: 1px 1px 2px #000000;
      }
    }
    .edited {
      p {
        margin: 0px;
      }
    }
  }
  .answers {
    margin-left: 60px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    .answer{
      border: 1px solid #3D72A4;
      box-shadow: 1px 1px 1px #3D72A4;
      border-radius: 30px;
      padding: 20px 30px;
      width: 100%;
      color: #3D72A4;
      h4 {
        margin-top: 0px;
      }
      .answer-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .answer-author {
          img {
            height: 50px;
            width: 50px;
            object-fit: cover;
            border-radius: 50%;
            border: 1px solid #3D72A4;
            box-shadow: 1px 1px 2px #3D72A4;
          }
          p {
            margin: 0;
          }
          button {
            background-color: #FFFFFF;
            margin-top: 10px;
            border: 1px solid #3D72A4;
            color: #3D72A4;
            cursor: pointer;
            &:hover{
              background-color: #FF585D;
              border-color: 1px solid #7b2326;
              color: #FFFFFF;
              box-shadow: 3px 3px 3px #FF585D;
              position: relative;
            }
          }
          button[data-tooltip]:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            background-color: #FFFFFF;
            color: #FF585D;
            border-radius: 30px;
            border: 1px solid #FF585D;
            box-shadow: 1px 1px 2px #FF585D;
            padding: 10px;
            font-size: 1rem;
            width: 160px;
            margin-left: 15px;
          }
        }
        .answer-edited {
          p {
            margin: 0;
          }
        }
      }
    }
  }
  h2 {
    margin-left: 60px;
  }
  form {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 0px 0px 60px 65px;
    div {
      display: flex;
      justify-content: space-between;
      width: 790px;
      textarea::placeholder{
        padding-left: 5px;
        color: #3D72A4;
      }
    }
    button{
      margin-top: -64px;
      width: 120px;
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
          data-tooltip="This will delete answer permanently"
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
      <section className="question">
        <h4>
          {question.title}
        </h4>
        <p>
          {question.question}
        </p>
        <div className="details">
          <div className="user">
            <img src={user.picture} alt={`Avatar of ${user.username}`} />
            <span>{user.username}</span>
          </div>
          <div className="edited">
            <p>
              Created/Edited:
            </p>
            <p>
              {question.edited}2023-05-23
            </p>
          </div>

        </div>
      </section>
      <section className="answers">
        {questionAnswers.map((answer, i) => (
          <div className="answer">
            <h4>Answer</h4>
            <p key={i}>{answer.answer}</p>
            <div className="answer-detail">
              <div className="answer-author">
                <img key={i} src={users.find(el => el.id === answer.user_id).picture} alt="Authors avatar" />
                <p key={i}>{users.find(el => el.id === answer.user_id).username}</p>
                <Buttons 
                  data={answer}
                />
              </div>
              <div className="answer-edited">
                <p>
                  Created/Edited:
                </p>
                <p>
                  {question.edited}2023-05-24
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section>
        <h2>Shoot Your Answer for the Question above</h2>
        <form onSubmit={(e) => formHandler(e)}>
            <div>
              <label htmlFor="answer">Your answer is:</label>
              <textarea required
                placeholder="Type here"
                name="answer" id="answer"
                cols="70" rows="5"
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