import { useContext } from "react";
import styled from "styled-components";
import AnswersContext from "../../contexts/AnswersContext";
import { useLocation } from "react-router-dom";

const StyledMain = styled.main`
  min-height: calc(100vh - 320px);
  padding-top: 120px;
`

const Answers = () => {

  const { answers } = useContext(AnswersContext);
  // const { questions } = useContext(QuestionsContext);
  const question = useLocation().state;
  // const question = questions.find(el => el.id === this.data.id)

  console.log(question);
  return (
    <StyledMain>
      <div>
        <h4>
          {question.title}
        </h4>
        <p>
          {question.question}
        </p>
      </div>
    </StyledMain>
  );
}
 
export default Answers;