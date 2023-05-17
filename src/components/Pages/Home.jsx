import { NavLink } from 'react-router-dom';
import styled from "styled-components";
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
            <button type="submit"><i class="fa fa-search">S</i></button>
            <button>Filter</button>
          </div>
          <button>Ask Your Question</button>
        </section>
        <article>
          <div className='vote-container'>
            <button>^</button>
            <span>votes</span>
            <button>v</button>
            <span>ans count</span>
          </div>
          <div className='question-container'>
            <h4>Q title</h4>
            <p>QUESTION QUESTION Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus tempore nesciunt dolor quis est explicabo doloremque voluptatum. Et, nam libero molestias soluta, sunt eum totam sed maxime molestiae ea porro.</p>
            <div className='details'>
              <span>User-name</span>
              <span>Date Created/Edited</span>
            </div>
            <div className='categories'>
              <span>Category1</span>
              <span>Category2</span>
            </div>
          </div>
        </article>
      </div>
    </StyledMain>
  );
}
 
export default Home;