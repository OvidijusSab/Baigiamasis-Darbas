import { Link } from 'react-router-dom';
import styled from 'styled-components'

const StyledFooter = styled.footer`
  height: 100px;
  border-top: 1px solid #90caf9;
  padding: 0 30px;

  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;

  >*{
    padding-top:20px;
  }

  >div{
    height: 80%;
    display: flex;
    align-items: center;

    >a{
      height: 100%;
    >img{
      height: 100%;
    
    }}
  }

  >ul{
    list-style-type: none;
    >li:first-child{
      font-size: 1.3rem;
      font-weight: 600;
      padding-top: 20px;;
      margin-bottom: 10px;
    }
    li{
      margin-bottom: 5px;

      >a{
        text-decoration: none;
        >i{
          font-size:20px;
          margin-right: 10px;
        }
      }

    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <Link to="/">
          <img
            src="https://www.freepnglogos.com/uploads/threads-logo-png/threads-instagram-black-logo-png-3.png"
            alt="asd" />
        </Link>
        <p>Copyrights &copy; 2024 by ME</p>
      </div>
      <ul>
        <li>Legal</li>
        <li><Link>Terms & Conditions</Link></li>
        <li><Link>Privacy Policy</Link></li>
        <li><Link>Terms of use</Link></li>
      </ul>
      <ul>
        <li>Socials</li>
        <li>
          <Link><i className="bi bi-facebook"></i></Link>
          <Link><i className="bi bi-instagram"></i></Link>
        </li>
        <li>
          <Link><i className="bi bi-twitter"></i></Link>
          <Link><i className="bi bi-linkedin"></i></Link>
        </li>
      </ul>
    </StyledFooter>
  );
}

export default Footer;