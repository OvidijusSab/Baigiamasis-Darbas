import styled from "styled-components";
import UsersContext from "../contexts/UsersContext";
import { useContext } from "react";
import { UsersActionTypes } from "../contexts/UsersContext";

const StyledDiv = styled.div`

`

const UsersCard = ({ user }) => {

  const { setUsers } = useContext(UsersContext)

  return (
    <StyledDiv>
      <h3>{user.userName}</h3>
      {
        user.role === 'admin' ?
          <button
            onClick={() => setUsers({
              type: UsersActionTypes.changeData,
              data: {
                role: 'user'
              },
              id:user.id
            })}
          >Remove Admin</button> :
          <button
            onClick={() => setUsers({
              type: UsersActionTypes.changeData,
              data: {
                role: 'admin'
              },
              id:user.id
            })}
          >Add Admin</button>

      }
    </StyledDiv>
  );
}

export default UsersCard;