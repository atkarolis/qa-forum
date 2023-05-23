import { useContext } from "react";
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



const Answers = () => {

  const { answers } = useContext(AnswersContext);
  const { users } = useContext(UsersContext);
  // const user = users.find(el => el.id === users.user_id);

  const question = useLocation().state;
  const user = users.find(el => el.id === question.user_id);
  // const question_id = question.map(question => );
  const questionAnswers = answers.filter(el => el.question_id === question.id);
  //const questionAnswer = answers.filter(el => el.id === question.answer_ids);

  console.log(questionAnswers);


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
        <button>Answer</button>
      </section>
        <ul>
          {questionAnswers.map((answer, i) => (
            <div>
              <li key={i}>Answer: {answer.answer}</li>
              <p key={i}>Provided by: {users.find(el => el.id === answer.user_id).username}</p>
              <img key={i} src={users.find(el => el.id === answer.user_id).picture} alt="Authors avatar" />
            </div>
          ))}
        </ul>
      <section>
      </section>
    </StyledMain>
  );
}
 
export default Answers;