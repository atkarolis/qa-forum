import styled from "styled-components";
import { useContext } from 'react';
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";

function Buttons(data){
  const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext)
  const { currentUser } = useContext(UsersContext);

  if(!currentUser)
    return;
  
  if(currentUser.id === data.props.userId){
    return(
      <button
        onClick={() => setQuestions({
          type: QuestionsActionTypes.delete,
          id: data.props.questionId
        })}
      >Delete
      </button>
    );
  }
}

const Question = ({ data }) => {

  const { users } = useContext(UsersContext);
  const user = users.find(el => el.id === data.user_id);
  
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
          <Buttons 
            props = {{
              userId: user.id, 
              questionId: data.id
            }}
          />
        </div>
      </div>
    </article>
  );
}
 
export default Question;