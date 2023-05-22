import styled from "styled-components";
import { useContext } from 'react';
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Buttons(data){
  const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext)
  const { currentUser } = useContext(UsersContext);
  const navigate = useNavigate();

  if(!currentUser)
    return;
  if(currentUser.id === data.props.user_id){
    return(
      <>
        <button
          onClick={() => setQuestions({
            type: QuestionsActionTypes.delete,
            id: data.props.id
          })}
        >Delete
        </button>
        <button
          onClick={() => 
            navigate(
              '/addQuestion', {
              state: {
                data: data.props, 
                formState: {toEdit: true}
              }
          })}
        >Edit
        </button>
      </>
      
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
        <Link to='/answer'>
          <h4>{data.title}</h4>
          <p>{data.question}</p>
        </Link>
        <div className='details'>
          <span>{user.username}</span>
          <span>{data.edited}</span>
        </div>
        <div>
          <Buttons 
            props = {data}
          />
        </div>
      </div>
    </article>
  );
}
 
export default Question;