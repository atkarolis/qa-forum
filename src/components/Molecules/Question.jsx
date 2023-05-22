import styled from "styled-components";
import { useContext } from 'react';
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Votes from "./Votes";

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
      align-items: center;
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
      .edited {
        display: flex;
        flex-direction: column;
        p {
          display: flex;
          justify-content: flex-end;
          margin: 0;
        }
      }
    }
    .buttons {
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      button {
        border: 1px solid #000000;
        padding: 2.5px 20px;
        cursor: pointer;
        color: #000000;
        background-color: #FFFFFF;
      }
      .edit {
        background-color: #3D72A4;
        border: 1px solid #3D72A4;
        color: #FFFFFF;
      }
      .edit:hover {
        background-color: #3D72A4;
        border-color: #000000;
        color: #000000;
        box-shadow: 3px 3px 3px #3D72A4;
      }
      .edit[data-tooltip]:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        background-color: #FFFFFF;
        color: #3D72A4;
        border-radius: 30px;
        border: 1px solid #3D72A4;
        padding: 10px;
        font-size: 0.8rem;
        width: 100px;
      }
      .delete:hover {
        background-color: #FF585D;
        border-color: #7b2326;
        color: #FFFFFF;
        box-shadow: 3px 3px 3px #FF585D;
        position: relative;
      }
      .delete[data-tooltip]:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        background-color: #FFFFFF;
        color: #FF585D;
        border-radius: 30px;
        border: 1px solid #FF585D;
        padding: 10px;
        font-size: 0.8rem;
        width: 100px;
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
        <button className="edit"
          data-tooltip="Tap to edit Your question"
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
        <button className="delete"
          data-tooltip="Tap to delete permanently"
          onClick={() => setQuestions({
            type: QuestionsActionTypes.delete,
            id: data.props.id
          })}
        >Delete
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
        <Votes question = {data} />
        <span>ans count</span>
      </div>
      <div className='question-container'>
        <Link to='/answer'>
          <h4>{data.title}</h4>
          <p>{data.question}</p>
        </Link>
        <div className='details'>
          <div className="user">
            <img src={user.picture} alt={`Avatar of ${user.username}`} />
            <span>{user.username}</span>
          </div>
          <div className="edited">
            <p>Created/Edited:</p>
            <p>{data.edited}1991-03-20</p>
          </div>
        </div>
        <div className="buttons">
          <Buttons 
            props = {data}
          />
        </div>
      </div>
    </StyledArticle>
  );
}
 
export default Question;