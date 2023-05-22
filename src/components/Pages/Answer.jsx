import { useEffect, useState, useContext} from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";
import AnswersContext from "../../contexts/AnswersContext";

const { data } = useContext(QuestionsContext);
const question = questions.find(el => el.id === data.id) //currentQuestion reik pasiimt kaip ir currentUser buvo

const Answer = ({ data }) => {

  // const { users } = useContext(UsersContext);
  // const user = users.find(el => el.id === data.user_id);

  // const navigate = useNavigate();

  return (
    <main>
      <div>
        <h4>{data.title}</h4>
        <p>{data.question}</p>
        {/* <p>by {user.username}</p> */}
      </div>
    </main>
  );
}
 
export default Answer;