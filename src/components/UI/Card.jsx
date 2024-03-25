import styled from 'styled-components'
import { useContext } from 'react';
import CardsContext from '../contexts/CardsContext';
import UsersContext from '../contexts/UsersContext';
import { CardsActionTypes } from '../contexts/CardsContext';
import { Link,useLocation } from "react-router-dom";

const StyledDiv = styled.div`
  border: 1px solid black;
  padding: 10px 20px;
  display: flex;
  gap:10px;
  flex-direction: column;
  align-items: center;

  >h3{
    margin:0
  }
  >p{
    margin: 0;
    text-align: center;
  }

`


const Card = ({data}) => {

  const location = useLocation();
  const { setCards } = useContext(CardsContext)
  const {loggedInUser} = useContext(UsersContext)

  return ( 
    <StyledDiv>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
    {
      loggedInUser.id === data.userId &&
      <button
      onClick={() => {
        setCards({
          type:CardsActionTypes.delete,
          id: data.id
        })
      }}
    >
      Delete 
    </button>
    }
    </StyledDiv>
   );
}
 
export default Card;