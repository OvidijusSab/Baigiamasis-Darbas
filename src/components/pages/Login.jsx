import { useContext,useState} from "react";
import UsersContext from "../contexts/UsersContext";
import { useFormik} from 'formik'
import * as Yup from 'yup'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
  height: 100vh;
  background-color: #424242; /* Dark grey background */
  color: #fff; /* White text */

  > h1 {
    font-size: 2.5rem;
    color: #90caf9; /* Light blue for the title */
  }

  > form {
    display: flex;
    flex-direction: column;
    width: 300px;
    background-color: #303030; /* Slightly lighter grey for the form background */
    padding: 30px;
    padding-right: 45px;
    border-radius: 10px;

    > div {
      margin-bottom: 20px;

      > input, label {
        width: 100%;
        margin-top: 5px;
      }

      > input {
        padding: 10px;
        border: none;
        border-radius: 5px;
      }

      > label {
        color: #fff; /* White for labels */
      }

      > p {
        color: red; /* Red for error messages */
        text-align: center;
        margin: 0;
      }
    }

    > input:last-of-type {
      padding: 5px 10px;
      border: none;
      align-self: center;
      border-radius: 5px;
      background-color: #fff; /* Light blue for the button */
      color: #000; /* Black for the button text */
      cursor: pointer;

      &:hover {
        background-color: #90caf9; /* White for the button on hover */
        color: #000; /* Black for the button text on hover */
      }
    }
  }
`;
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
        <input type="submit" value="Login" />
      </form>
      {
        wrongCredentials && <p>No user with such username or password combination</p>
      }
    </StyledSection>
  );
}
export default Login;