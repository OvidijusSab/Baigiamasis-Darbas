import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";
import CardsContext from "../contexts/CardsContext";
import { CardsActionTypes } from "../contexts/CardsContext";
import styled from "styled-components";

const StyledDiv = styled.div`
  >div{
    display: flex;
    flex-direction: row;
    border: 1px solid black;
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
          <p>Comment by: <b>{author.userName}</b> </p>
          <p>{comment.text}</p>
          {
            loggedInUser.id === comment.authorId || loggedInUser.role === "admin" &&
            <button
              onClick={() => setCards({
                type: CardsActionTypes.deleteComment,
                commentId: comment.id,
                cardId: cardId
              })}
            >Delete</button>
          }
        </div>
      }
    </StyledDiv>
  );
}

export default Comment;