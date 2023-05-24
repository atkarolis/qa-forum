import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import Question from '../Molecules/Question';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const StyledMain = styled.main`
  min-height: calc(100vh - 320px);
  display: flex;
  padding-top: 120px;
  aside{
    border-width: 7px;
    border-color: #000000;
    border-style: double;
    border-radius: 30px;
    margin: 30px 20px 0 100px;
    padding: 10px 35px 50px 0;
    height: 100%;
    ul {
      list-style-type: none;
      li {
        line-height: 1.8rem;
        font-size: 1.2rem;
        a {
          text-decoration: none;
          position: relative;
          display: inline-block;
          color: #000000;
          font-weight: 600;
        }
        a::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #3D72A4;
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }
        a:hover::after{
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        a.active {
          color: #3D72A4;
          font-weight: 600;
        }
      }
    }
  }
  .MAIN {
    padding: 30px 250px 20px 50px;
    width: 100%;
    > section {
      display: flex;
      padding-bottom: 20px;
      width: 100%;
      .search-container {
        padding-left: 30px;
        width: 100%;
        display: flex;
        input {
        width: 70%;
        margin-left: 105px;
        }
        input::placeholder{
          padding-left: 20px;
          color: #3D72A4;
          font-size: 1.1rem;
        }
        button {
          margin-right: 10px;
          padding: 0 10px;
        }
      }
      button {
        cursor: pointer;
        font-size: 1.1rem;
        border: 1px solid #3D72A4;
        box-shadow: 1px 1px 2px #3D72A4;
        background-color: #3D72A4;
        color: #FFFFFF;
        &:hover {
          border: 1px solid #000000;
          color: #000000;
          box-shadow: 3px 3px 3px #3D72A4;
        }
      }
      .filter-btn, .ask-btn {
        padding: 0 10px;
        font-weight: 600;
      }
      .ask-btn{
        background-color: #008000;
        box-shadow: 1px 1px 2px #008000;
        &:hover {
          border: 1px solid #000000;
          color: #000000;
          box-shadow: 3px 3px 3px #008000;
        }
      }
    }
  }
`

const Home = () => {

  const { questions } = useContext(QuestionsContext);

  return (
    <StyledMain>
      <aside>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li>Most voted</li>
          <li>Unanswered</li>
        </ul>
      </aside>
      <div className='MAIN'>
        <section>
          <div className='search-container'>
            <input type="text" placeholder='Search questions'/>
            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <button className='filter-btn'>Filter</button>
          </div>
          <Link to="addQuestion">
            <button className='ask-btn'>Ask Your Question</button>
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