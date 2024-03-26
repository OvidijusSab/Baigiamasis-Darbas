import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";
import CardsContext from "../contexts/CardsContext";
import { CardsActionTypes } from "../contexts/CardsContext";
import styled from "styled-components";

const StyledDiv = styled.div`

 
  >div{
    display: flex;
    flex-direction: row;
    border-radius: 5px;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    gap:15px;
    padding: 5px 15px;
    position: relative;
  

    >i{
    color:red;
    font-size: 15px;
    position: absolute;
    top:2px;
    right: 2px;;
    cursor: pointer;


  }
  

    >div{
      position: relative;
      display: flex;
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

const Comment = ({ comment, cardId }) => {

  const { loggedInUser, users } = useContext(UsersContext);
  const { setCards } = useContext(CardsContext);
  const author = users.find(user => user.id === comment.authorId);

  return (
    <StyledDiv>
      {
        users.length &&
        <div>
          <div>
            <img src={author.avatarURL} alt="author image" />
            <span>{author.userName}</span>
            <p>:</p>
          </div>
          <p>{comment.text}</p>
          {
            loggedInUser.id === comment.authorId &&
            <i
              className="bi bi-trash"
              onClick={() => setCards({
                type: CardsActionTypes.deleteComment,
                commentId: comment.id,
                cardId: cardId
              })}
            ></i>
          }
        </div>
      }
    </StyledDiv>
  );
}

export default Comment;