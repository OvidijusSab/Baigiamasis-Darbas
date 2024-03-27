import { useContext } from "react";
import CardsContext from "../contexts/CardsContext";
import UsersContext from "../contexts/UsersContext";
import Card from "../UI/Card";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const StyledSection = styled.section`
display: flex;
flex-direction: column;
gap: 20px;
  
> a{
      text-decoration: none;
      padding: 5px 12px;
      border: 1px solid black;
      border-radius: 10px 5px;
      transition: 0.3s;
      align-self: flex-start;

       &:hover{
        box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
    }
    }

  > h1{
    text-align: center;
  }
  > p {
    text-align: center;
  }
  
  
  > div{
    margin: 0 auto;
    width: 80%;
    display: flex;
    border-radius: 5px;;
    gap: 10px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

    &:hover{
      box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
    }
   
  }
`;

const Cards = () => {

  const { cards } = useContext(CardsContext);
  const { loggedInUser } = useContext(UsersContext);
  const location = useLocation();

  return (
    <StyledSection>
      <h1>All posts</h1>
      {loggedInUser && <Link to="/cards/addNew">Add new post</Link>}
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