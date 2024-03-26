import { useContext,useState} from "react";
import UsersContext from "../contexts/UsersContext";
import { useFormik} from 'formik'
import * as Yup from 'yup'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const StyledSection = styled.section`
  display: flex;
  flex-direction:column;
  align-items: center;
  padding-top: 70px;

  >h1{
    font-size: 2.5rem;
  }

  >form{
  >div{
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    >input,label{
      margin-top: 5px;
    }
     >p{
      grid-column: span 3;
      text-align: center;
      color:red;
      margin: 0;
    }
  }
  }

`

const Login = () => {

  const navigate = useNavigate();
  const [wrongCredentials, setWrongCredentials] = useState(false)
  const { users, setLoggedInUser } = useContext(UsersContext);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: ""
    },
    onSubmit: (values) => {
      setWrongCredentials(true);

      const loggedInUser = users.find(user => user.userName === values.userName &&
        bcrypt.compareSync(values.password, user.password));

      if (loggedInUser === undefined) {
        setWrongCredentials(true);
      } else {
        setLoggedInUser(loggedInUser);
        navigate('/');
      }
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("This field must be filled")
        .trim(),
      password: Yup.string()
        .required("This field must be filled")
        .trim(),
    })
  })
  return (
    <StyledSection>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            name="userName"
            id="username"
            placeholder="Enter your user name..."
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.userName && formik.errors.userName &&
            <p>{formik.errors.userName}</p>
          }
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.password && formik.errors.password &&
            <p>{formik.errors.password}</p>
          }
        </div>
        <input type="submit" value="login" />
      </form>
      {
        wrongCredentials && <p>No user with such username or password combination</p>
      }
    </StyledSection>
  );
}
export default Login;