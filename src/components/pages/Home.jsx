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
          src="https://assets-global.website-files.com/6048aaba41858510b17e1809/607474d55c073509225d156e_6048aaba418585fbbf7e1d13_forums.jpeg"
          alt="photo" />
          <p>Welcome to our forum hub, the vibrant nexus where communication thrives, questions find their answers, and ideas flow freely. Here, you'll discover a dynamic community eager to engage in thoughtful discussions, share insights, and explore a multitude of themes. Whether you're seeking advice, pondering intriguing concepts, or simply connecting with like-minded individuals, our forum offers the perfect platform. Dive into conversations spanning diverse topics, from technology to literature, science to art, and everything in between. Ask questions, offer perspectives, and ignite conversations that inspire growth and learning. Join us in shaping a space where curiosity knows no bounds and where the exchange of ideas fuels innovation. Welcome aboard, and let the dialogue begin!</p>
      </div>
    </StyledSection>

  );
}

export default Home;