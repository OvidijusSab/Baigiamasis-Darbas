import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import CardsContext from "../contexts/CardsContext";
import UsersContext from "../contexts/UsersContext";
import Card from "../UI/Card";
import styled from "styled-components"

const StyledSection = styled.section`
  >h1{
    text-align: center;
    font-size: 2.5rem;
  }
  >div{
   margin: 0 auto;
   width: 80%;
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap:10px;
  
  }

  >p:first-of-type{
    text-align: center;
    > a{
      text-decoration: none;
      padding: 5px 12px;
      border: 1px solid black;
      border-radius: 10px 5px;
      transition: 0.3s;
    }
    > a:hover{
      box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }

  }
  >p:last-of-type{
    text-align: center;
    font-size: 29px;
    font-weight: bold;
  }
`;

const UserPage = () => {

  const { loggedInUser } = useContext(UsersContext);
  const { cards } = useContext(CardsContext);
  const location = useLocation();
  const userCards = cards.filter(card => card.userId === loggedInUser.id);

  return (
    <StyledSection>
      <h1>{loggedInUser.userName}'s posts</h1>
      <p><Link to="/cards/addNew">Add new post</Link></p>
      {
        userCards.length ?
          <div>
            {
              userCards.map(card =>
                <Card
                  key={card.id}
                  data={card}
                  location={location}
                />
              )
            }
          </div> :
          <p>You dont have any posts yet...</p>
      }
    </StyledSection>
  );
}

export default UserPage;