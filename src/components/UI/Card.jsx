import styled from 'styled-components'
import { useContext } from 'react';
import CardsContext from '../contexts/CardsContext';
import UsersContext from '../contexts/UsersContext';
import { CardsActionTypes } from '../contexts/CardsContext';
import { Link, useLocation } from "react-router-dom";

const StyledDiv = styled.div`
  padding: 10px 20px;
  display: flex;
  gap:10px;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid black;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
  position: relative;

  >h3{
    margin:0
  }
  >p{
    margin: 0;
    text-align: center;
  }
  > a{
      text-decoration: none;
      color:black;
      padding: 5px;;
      border: 1px solid black;
      border-radius:5px;
      font-size: 10px;;
      transition: 0.3s;
      > &:hover{
        color:red;
      }
    }
    >p:last-of-type{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  >div{
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
      width: 40px;
      height: 80%;
      border-radius: 50%;
    }
  } 
`


const Card = ({ data, location }) => {

  const { setCards } = useContext(CardsContext)
  const { loggedInUser, users } = useContext(UsersContext)
  const author = users.find(user => user.id === data.userId);


  return (
    <StyledDiv className='box'>
      <div>
        <img src={author.avatarURL} alt="author image" />
        <span>{author.userName}</span>
      </div>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <p>Posted on : {data.date}</p>
      <Link to={`/cards/${data.id}`}>Read more</Link>
      {
        location.pathname !== '/cards/allCards' &&
        loggedInUser.id === data.userId &&
        <button
          onClick={() => {
            setCards({
              type: CardsActionTypes.delete,
              id: data.id
            })
          }}
        >Delete </button>
      }
    </StyledDiv>
  );
}

export default Card;