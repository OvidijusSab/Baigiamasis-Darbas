import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components'
// import { UserContext } from "../../contexts/UserContext";
// import { useContext } from "react";

const StyledHeader = styled.header`
  padding: 0 20px;
  border-bottom:3px dashed black;
  height: 80px;

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
          color: black;
          font-weight: bold;

          &:hover{
            color:green;
          }
        }
        >a.active{
          color:red;
        }
      }
    }
  }

  >div:last-child{
    display: flex;
    gap:10px;
    align-items: center;

    >span>a{
      color: black;
      text-decoration: none;
    }

    >span{
      font-weight:bold;
      font-size: 20px;
    }
  }
`

const Header = () => {

  const navigate = useNavigate();
  // const { loggedInUser, setLoggedInUser } = useContext(UserContext)
  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <img
            src="https://img.stackshare.io/service/8846/preview.png"
            alt="asd" /></Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/cards/allCards'>Cards</NavLink>
          </li>
        </ul>
      </nav>
      {/* {
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
      } */}
    </StyledHeader>
  );
}

export default Header;