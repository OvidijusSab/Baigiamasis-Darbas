import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components'
import UsersContext from "../contexts/UsersContext";
import { useContext } from "react";

const StyledHeader = styled.header`
  padding: 0 20px;
  border-bottom: 1px solid #90caf9; 
  height: 80px;
  background-color: #303030; 
  color: #fff; 

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
          color: #fff; 
          font-weight: bold;

          &:hover{
            color: #90caf9; 
          }
        }
        >a.active{
          color: #6c9cc4;
        }
      }
    }
  }

  >div:last-child{
    display: flex;
    gap:10px;
    align-items: center;

    >span>a{
      color: white ;
      text-decoration: none;
      position: relative;

      
    >span{
      position: absolute;
      background-color: gray;
      border-radius: 5px;
      font-size: 12px;
      bottom: 3px;
      left:1px
    }
    >img{
      width: 50px;
      height: 100%;
      border-radius: 50%;
    }
    }
    
  }
  div>button{
    padding: 5px 5px;
    border: none;
    font-size: 12px;
    border-radius: 5px;
    background-color: #fff; 
    color: #000; 
    cursor: pointer;

    &:hover{
      background-color: #90caf9;
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
             <button
              onClick={() => {
                setLoggedInUser(false)
                navigate('/')
              }}
            >Log Out</button>
            <span>
              <Link to={`/user/${loggedInUser.userName}`}>
                <img src={loggedInUser.avatarURL} alt="author image" />
                <span>{loggedInUser.userName}</span>
              </Link>
            </span>
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