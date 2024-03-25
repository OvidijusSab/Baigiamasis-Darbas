import { useContext } from "react";
import CardsContext from "../contexts/CardsContext";
import UsersContext from "../contexts/UsersContext";
import Card from "../UI/Card";
import styled from "styled-components";
import { Link,useLocation} from "react-router-dom";

const StyledSection = styled.section`
display: flex;
flex-direction: column;
gap: 20px;
  
  > h1{
    text-align: center;
  }
  > p {
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
  > div{
    margin: 0 auto;
    width: 80%;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
  }
`;

const Cards = () => {

  const { cards } = useContext(CardsContext);
  const { loggedInUser } = useContext(UsersContext);
  const location = useLocation();

  return (
    <StyledSection>
      <h1>All posts</h1>
      { loggedInUser && <Link to="/cards/addNew">Add New Card</Link> }
      {
        cards.map(card =>
          <Card
            key={card.id}
            data={card}
            location={location}
          />
        )
      }

    </StyledSection>
  );
}

export default Cards;