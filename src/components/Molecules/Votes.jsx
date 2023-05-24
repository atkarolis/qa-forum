import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { useContext, useState } from "react";
import styled from "styled-components";

const StyledSection = styled.section`
  button {
    padding: 5px 10px 5px 10px;
    font-size: 1.1rem;
    cursor: pointer;
    margin: 5px;
  }
  .none {
    background-color: #3D72A4;
    border: 1px solid #3D72A4;
    box-shadow: 1px 1px 2px #3D72A4;
    color: #FFFFFF;
  }
  .like {
    background-color: #008000;
    border: 1px solid #000000;
    box-shadow: 1px 1px 2px #008000;
  }
  .dislike {
    background-color: #FF585D;
    border: 1px solid #7B2326;
    box-shadow: 1px 1px 2px #FF585D;
    color: #FFFFFF;
  }
`

function Votes({question}){
  const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext)
  const { currentUser } = useContext(UsersContext);
  const [likes, setLikes] = useState(question.likes);
  
  const [likeStyle, setLikeStyle] = useState(question.likers.includes(currentUser?.id));
  const [dislikeStyle, setDislikeStyle] = useState(question.dislikers.includes(currentUser?.id));
  
  
  if(!currentUser)
    return <span>{likes}</span>;

  let showVoteButtons = currentUser ? true : false;
  let userLikedIndex = question.likers.indexOf(currentUser.id);
  let userDislikedIndex = question.dislikers.indexOf(currentUser.id);

  return(
    <StyledSection>
    {
      showVoteButtons && 
      <button 
        className={likeStyle ? "like" : "none"}
        data-tooltip=""
        onClick={() => {
          if(userLikedIndex !== -1){
            question.likes -= 1;
            question.likers.splice(userLikedIndex, 1);
            setLikeStyle(false);
          } else if(userDislikedIndex !== -1){
            question.likes += 2;
            question.dislikers.splice(userDislikedIndex, 1);
            question.likers.push(currentUser.id);
            setLikeStyle(true);
            setDislikeStyle(false);
          } else if(userLikedIndex === -1 && userDislikedIndex === -1){
            question.likes += 1;
            question.likers.push(currentUser.id);
            setLikeStyle(true);
          } else if(userLikedIndex !== -1 && userDislikedIndex !== -1){
            console.error("User cannot like and dislike same post");
          }
          setQuestions({
            type: QuestionsActionTypes.update,
            data: question
          });
          setLikes(question.likes);
        }}
      >↑
      </button>
    }
      <span>{likes}</span>
      {
        showVoteButtons && 
        <button
        className={dislikeStyle ? "dislike" : "none"}
          data-tooltip=""
          onClick={() => {
            if(userDislikedIndex !== -1){
              question.likes += 1;
              question.dislikers.splice(userDislikedIndex, 1);
              setDislikeStyle(false);
            } else if(userLikedIndex !== -1){
              question.likes -= 2;
              question.likers.splice(userLikedIndex, 1);
              question.dislikers.push(currentUser.id);
              setDislikeStyle(true);
              setLikeStyle(false);
            } else if(userLikedIndex === -1 && userDislikedIndex === -1){
              question.likes -= 1;
              question.dislikers.push(currentUser.id);
              setDislikeStyle(true);
            } else if(userLikedIndex !== -1 && userDislikedIndex !== -1){
              console.error("User cannot like and dislike same post");
            }
            setQuestions({
              type: QuestionsActionTypes.update,
              data: question
            });
            setLikes(question.likes);
          }}
      >↓
      </button>
      }
    </StyledSection>
  );
}

export default Votes;