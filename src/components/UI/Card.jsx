import styled from 'styled-components'
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


  return ( 
    <StyledDiv>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <Link to={`/cards/${data.id}`}>More info</Link>
  
    </StyledDiv>
   );
}
 
export default Card;