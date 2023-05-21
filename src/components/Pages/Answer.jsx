import { useEffect, useState, useContext} from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";


const Answer = ({ data }) => {

  const { questions } = useContext(QuestionsContext);
  const { users } = useContext(UsersContext);
  const user = users.find(el => el.id === data.user_id);

  // const navigate = useNavigate();

  return (
    <main>
      <div>
        <h4>{questions.title}</h4>
        <p>{questions.question}</p>
        <p>by {user.username}</p>
      </div>
    </main>
  );
}
 
export default Answer;