import styled from "styled-components";

const Question = () => {
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
          <span>ČIA USER NAME</span>
          <span>{data.edited}</span>
        </div>
        <div className='categories'>
          <span>{data.category}</span>
          <span>Category2</span>
        </div>
      </div>
    </article>
  );
}
 
export default Question;