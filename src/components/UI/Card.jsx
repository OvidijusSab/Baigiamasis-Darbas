import styled from 'styled-components'
import { useContext } from 'react';
import CardsContext from '../contexts/CardsContext';
import UsersContext from '../contexts/UsersContext';
import { CardsActionTypes } from '../contexts/CardsContext';
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const StyledDiv = styled.div`
  padding: 10px 20px;
  display: flex;
  gap:10px;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid black;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
  position: relative;

  >h2{
    margin:0;
    text-transform: uppercase;
    font-weight: 400;
    padding-top: 50px;
  }
  >p{
    margin: 0;
    text-align: center;
  }
  >a:first-of-type{
    text-decoration: none;
    color:white;  
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-size: 12px;

    &:hover{
      color:gray;
    }
  }
  > a:last-of-type{
      text-decoration: none;
      color:black;
      padding: 5px;;
      border: 1px solid black;
      border-radius:5px;
      font-size: 10px;;
      margin-bottom: 20px;
      margin-top: 10px;
      transition: 0.3s;
       &:hover{
        color:white;
        border: 1px solid white;
      }
    }
    >p:last-of-type{
    font-size: 12px;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  div{
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
    position: absolute;
    top: 0px;
    left: 10px;
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
}
`


const Card = ({ data, location }) => {

  
  const { setCards, cards } = useContext(CardsContext)
  const { loggedInUser, users } = useContext(UsersContext)
  const { id } = useParams();
  const author = users.find(user => user.id === data.userId);
  const commentsCount = data.comments ? data.comments.length : 0;
  const totalVotes = (data.upvotes ? data.upvotes.length : 0) + (data.downvotes ? data.downvotes.length : 0);
  return (
    <StyledDiv className='box'>
      <div>
        <h4>Posted by:</h4>
        <div>
          <img src={author.avatarURL && author.avatarURL} alt="author image" />
          <span>{author.userName}</span>
        </div>
      </div>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <Link to={`/cards/${data.id}`}>Comments: {commentsCount} | Votes : {totalVotes}</Link>
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