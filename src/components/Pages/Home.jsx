import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import Question from '../Molecules/Question';
import { Link } from 'react-router-dom';
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

const StyledMain = styled.main`
  min-height: calc(100vh - 320px);
  display: flex;
  aside{
    border-width: 7px;
    border-color: black;
    border-style: double;
    border-radius: 30px;
    margin: 20px;
    padding: 10px 35px 70px 5px;
    height: 100%;
  }
  .MAIN {
    padding: 20px 200px 20px 0px;
    width: 100%;
    > section {
      display: flex;
      padding-bottom: 20px;
      width: 100%;
      .search-container {
        width: 100%;
        display: flex;
        input {
        width: 70%;
        margin-left: 105px;
        }
        button {
          cursor: pointer;
          margin-right: 10px;
        }
      }
      button {
        cursor: pointer;
      }
    }
    article {
      display: flex;
      .vote-container {
        display: flex;
        flex-direction: column;
        margin: 20px;
        button {
          cursor: pointer;
        }
      }
      .question-container {
        border: 1px solid black;
        border-radius: 10px;
        width: 100%;
        .details {
          display: flex;
          justify-content: space-between;
        }
        .categories {
          display: flex;
          justify-content: flex-end;
          span {
            border: 1px solid black;
          }
        }
      }
    }
  }
`

const Home = () => {

  const { questions } = useContext(QuestionsContext);
 
  return ( //aside ir section iškelti kaip UI komponentą?
    <StyledMain>
      <aside>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li>Category
            <ul>
              <li>Interior maintenance</li>
              <li>Exterior maintenance</li>
              <li>Other</li>
            </ul>
          </li>
          <li>Most voted</li>
          <li>Unanswered</li>
          <li>About</li>
        </ul>
      </aside>
      <div className='MAIN'>
        <section>
          <div className='search-container'>
            <input type="text" placeholder='Search questions'/>
            <button type="submit"><i className="fa fa-search">S</i></button>
            <button>Filter</button>
          </div>
          <Link to="addQuestion">
            <button>Ask Your Question</button>
          </Link>
        </section>
        {
          questions.map(question => 
            <Question
            key={question.id}
            data={question}
            />
          )
        }
      </div>
    </StyledMain>
  );
}
 
export default Home;