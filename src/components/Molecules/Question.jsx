import styled from "styled-components";
import { useContext } from 'react';
import UsersContext from "../../contexts/UsersContext";
import Categories from "../Atoms/Categories";

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
        <div className='categories'>
          <Categories 
          categories={data.category}
          />
        </div>
      </div>
    </article>
  );
}
 
export default Question;