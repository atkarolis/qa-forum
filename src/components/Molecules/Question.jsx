import styled from "styled-components";
import { useContext } from 'react';
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";

const Question = ({ data }) => {

  const { users, currentUser } = useContext(UsersContext);
  const user = users.find(el => el.id === data.user_id);
  const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext)

  return (
    <article>
      <div className='vote-container'>
        <button>^</button>
        <span>votes</span>
        <button>v</button>
        <span>ans count</span>
      </div>
      <div className='question-container'>
        <h4>{data.title}</h4>
        <p>{data.question}</p>
        <div className='details'>
          <span>{user.username}</span>
          <span>{data.edited}</span>
        </div>
        <div>
          {
            currentUser &&
            <button
            onClick={() => setQuestions({
              type: QuestionsActionTypes.delete,
              id: data.id
            })}
            >
              Delete
            </button>
          }
        </div>
      </div>
    </article>
  );
}
 
export default Question;