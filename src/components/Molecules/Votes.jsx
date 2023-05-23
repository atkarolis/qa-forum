import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { useContext, useState } from "react";
import styled from "styled-components";

const StyledSection = styled.section`
  .none {
    background-color: #FFFFFF;
  }
  .like {
    background-color: green;
  }
  .dislike {
    background-color: red;
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
  let userLikedIndex = question.likers.indexOf(currentUser.id); // Jeigu neranda elemento grazina -1
  let userDislikedIndex = question.dislikers.indexOf(currentUser.id); // Jeigu neranda elemento grazina -1

  return(
    <StyledSection>
    {
      showVoteButtons && 
      <button 
        className={likeStyle ? "like" : "none"}
        data-tooltip=""
        onClick={() => {
          if(userLikedIndex !== -1){ // Jeigu vartotojas jau buvo palaikines, tai pasalink like
            question.likes -= 1;
            question.likers.splice(userLikedIndex, 1);
            setLikeStyle(false);
          } else if(userDislikedIndex !== -1) { // Jeigu vartotojas buvo dislaikines, tai pasalink dislike ir pridek like
            question.likes += 2;
            question.dislikers.splice(userDislikedIndex, 1);
            question.likers.push(currentUser.id);
            setLikeStyle(true);
            setDislikeStyle(false);
          } else if(userLikedIndex === -1 && userDislikedIndex === -1){ // Jeigu nebuvo nei laikines, nei dislikenes, tai pridek like
            question.likes += 1;
            question.likers.push(currentUser.id);
            setLikeStyle(true);
          } else if(userLikedIndex !== -1 && userDislikedIndex !== -1){ // Jei netycia yra ir palaikines, ir dislikines, tai mesk error
            console.error("Vartotojas negali buti ir laikines, ir dislaikines");
          }
          setQuestions({
            type: QuestionsActionTypes.update,
            data: question
          });
          setLikes(question.likes);
        }}
      >^
      </button>
    }
      <span>{likes}</span>
      {
        showVoteButtons && 
        <button
        className={dislikeStyle ? "dislike" : "none"}
          data-tooltip=""
          onClick={() => {
            if(userDislikedIndex !== -1){ // Jeigu vartotojas jau buvo dislaikines, tai pasalink dislike
              question.likes += 1;
              question.dislikers.splice(userDislikedIndex, 1);
              setDislikeStyle(false);
            } else if(userLikedIndex !== -1) { // Jeigu vartotojas buvo laikines, tai pasalink like ir pridek dislike
              question.likes -= 2;
              question.likers.splice(userLikedIndex, 1);
              question.dislikers.push(currentUser.id);
              setDislikeStyle(true);
              setLikeStyle(false);
            } else if(userLikedIndex === -1 && userDislikedIndex === -1){ // Jeigu nebuvo nei laikines, nei dislikenes, tai pridek dislike
              question.likes -= 1;
              question.dislikers.push(currentUser.id);
              setDislikeStyle(true);
            } else if(userLikedIndex !== -1 && userDislikedIndex !== -1){ // Jei netycia yra ir palaikines, ir dislikines, tai mesk error
              console.error("Vartotojas negali buti ir laikines, ir dislaikines");
            }
            setQuestions({
              type: QuestionsActionTypes.update,
              data: question
            });
            setLikes(question.likes);
          }}
      >v
      </button>
      }
    </StyledSection>
  );
}

export default Votes;