import { NavLink } from 'react-router-dom';
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

const Home = () => {
  return ( //aside ir section iškelti kaip UI komponentą?
    <>
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
      <main>
        <section>
          <div className='search-container'>
            <input type="text" placeholder='Search questions'/>
            <button type="submit"><i class="fa fa-search"></i></button>
          </div>
          <button>Filter</button>
        </section>
        <article>
          <button>Ask Your Question</button>
          <section>
            <h4>Q title</h4>
            <div className='question-container'>
              <p>QUESTION QUESTION Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus tempore nesciunt dolor quis est explicabo doloremque voluptatum. Et, nam libero molestias soluta, sunt eum totam sed maxime molestiae ea porro.</p>
              <span>User-name</span>
              <span>Date Created/Edited</span>
              <div>
                <span>Category1</span>
                <span>Category2</span>
              </div>
            </div>
            <div className='vote-container'>
              <button>^</button>
              <span>votes</span>
              <button>v</button>
              <span>ans count</span>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
 
export default Home;