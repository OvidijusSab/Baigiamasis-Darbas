import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";
import styled from "styled-components";
import UserCard from "../UI/UserCards";

const StyledSection = styled.section`
>div{
display: flex;
flex-direction: row;
justify-content: space-around;

}
  >h1{
    text-align: center;
  }
`;

const AdminPanel = () => {

    const {users,setUsers} = useContext(UsersContext)

  return ( 
    <StyledSection>
      <h1>Admin Panel</h1>
      <div>
      {
        users.map(user =>
          <UserCard 
            key={user.id}
            user={user}
          />)
      }
      </div>
    </StyledSection>
   );
}
 
export default AdminPanel;