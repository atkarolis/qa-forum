import styled from "styled-components";
import { useContext } from 'react';
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const StyledArticle = styled.article`
  .question-container {
    padding: 15px 25px;
    a {
      text-decoration: none;
      h4 {
        margin: 0px;
        font-weight: 600;
      }
    }
    .details {
      .user {
          display: flex;
          flex-direction: column;
        img {
          height: 50px;
          width: 50px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }
  }
`

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
    <StyledArticle>
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
          <div className="user">
            <img src={user.picture} alt={`${user.username} avatar`} />
            <span>{user.username}</span>
          </div>
          <span>{data.edited}</span>
        </div>
        <div>
          <Buttons 
            props = {data}
          />
        </div>
      </div>
    </StyledArticle>
  );
}
 
export default Question;