import styled from "styled-components"

const StyledSection = styled.section`
>h1{
  font-size: 2.5rem;
  text-align: center;
}
>div{
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap:50px;
  >img{
    width: 380px;
    height: 300px;
    border-radius: 50%;
  }
  >p{
    width: 50%;
    font-size: 18px;
    line-height: 22px;
  }
}

`

const Home = () => {
  return (
    <StyledSection>
      <h1>Home</h1>
      <div>
        <img
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
          alt="photo" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum illo magnam, illum voluptas dolor doloribus sint inventore animi optio quos tempora corporis quam, a dolore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut cum iure consequatur distinctio excepturi eligendi reprehenderit, voluptatum sint quibusdam debitis.</p>
      </div>
    </StyledSection>

  );
}

export default Home;