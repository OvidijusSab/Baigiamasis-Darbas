import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components'
import UsersContext from "../contexts/UsersContext";
import { useContext } from "react";

const StyledHeader = styled.header`
  padding: 0 20px;
  border-bottom: 1px solid #90caf9; /* Light blue border */
  height: 80px;
  background-color: #303030; /* Slightly lighter than the body background for contrast */
  color: #fff; /* White for text */

  display: flex;
  justify-content: space-between;
  align-items: center;

  >div:nth-child(1){
    height: 80%;
    >a{
      >img{
        height: 100%;
      }
    }
  }

  >nav{
    >ul{
      margin: 0;
      padding:0;
      list-style-type: none;
      display: flex;
      gap:10px;
      li{
        >a{
          text-decoration: none;
          font-size: 1.5rem;
          color: #fff; /* White for links */
          font-weight: bold;

          &:hover{
            color: #90caf9; /* Light blue on hover */
          }
        }
        >a.active{
          color: #6c9cc4; /* Light blue for active link */
        }
      }
    }
  }

  >div:last-child{
    display: flex;
    gap:10px;
    align-items: center;

    >span>a{
      color: #fff; /* White for links */
      text-decoration: none;
    }
  }
  div>button{
    padding: 5px 5px;
    border: none;
    font-size: 12px;
    border-radius: 5px;
    background-color: #fff; /* Light blue for the button */
    color: #000; /* Black for the button text */
    cursor: pointer;

    &:hover{
      background-color: #90caf9; /* Light blue on hover */
    }
  
  }
`;

const Header = () => {

  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext)
  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <img
            src="https://www.freepnglogos.com/uploads/threads-logo-png/threads-instagram-black-logo-png-3.png"
            alt="asd" /></Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/cards/allCards'>Posts</NavLink>
          </li>
        </ul>
      </nav>
      {
        loggedInUser ?
          <div>
            {
              loggedInUser.role === 'admin' &&
              <p>
                <Link to={'/user/adminPanel'}>Admin Panel</Link>
              </p>
            }
            <span>
              <Link to={`/user/${loggedInUser.userName}`}>
                {loggedInUser.userName}
              </Link>
            </span>
            <button
              onClick={() => {
                setLoggedInUser(false)
                navigate('/')
              }}
            >Log Out</button>
          </div> :
          <nav>
            <ul>
              <li>
                <NavLink to="/user/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/user/login">Login</NavLink>
              </li>
            </ul>
          </nav>
      }
    </StyledHeader>
  );
}

export default Header;