import { useContext, useState, useEffect } from "react";
import UsersContext from "../contexts/UsersContext";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { UsersActionTypes } from "../contexts/UsersContext";
import bcrypt from 'bcryptjs'

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  justify-content: flex-start;
  height: 100vh;
  background-color: #424242;
  color: #fff;

  > h1 {
    font-size: 2.5rem;
    color: #90caf9;
  }

  > form {
    display: flex;
    flex-direction: column;
    width: 300px;
    background-color: #303030;
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
        color: #fff; 
      }

      > span {
        color: red; 
        text-align: center;
        margin: 0;
      }
    }

    > input:last-of-type {
      padding: 5px 10px;
      border: none;
      align-self: center;
      border-radius: 5px;
      background-color: #fff; 
      color: #000; 
      cursor: pointer;

      &:hover {
        background-color: #90caf9; 
        color: #000; 
      }
    }
  }
`;

const Register = () => {

  const navigate = useNavigate();
  const [sameNameError, setSameNameError] = useState(false);
  const { users, setUsers, setLoggedInUser } = useContext(UsersContext)

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      avatarURL: "",
      passwordRepeat: "",
    },
    onSubmit: (values) => {
      console.log(values)

      if (users.find(user => user.userName === values.userName)) {
        setSameNameError(true);
      } else {
        const newUser = {
          id: uuid(),
          userName: values.userName,
          password: bcrypt.hashSync(values.password, 8),
          passwordNoHash: values.password,
          avatarURL: values.avatarURL,
          role: "user"
        };
        setUsers({
          type: UsersActionTypes.addNew,
          data: newUser
        })
        setLoggedInUser(newUser)
        navigate("/")
      }

    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(4, "Username must be atleast 4 symbols length")
        .max(20, "Username must be less then 20 symbols length")
        .required("This field must be filled")
        .trim(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/,
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character"
        )
        .required('Field must be filled')
        .trim(),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required("Field must be filled"),
      avatarURL: Yup.string()
        .url('Must be a valid url')
        .default('https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png')
        .trim(),

    })
  })

  return (
    <StyledSection>
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            name="userName" id="userName"
            placeholder='Create your username'
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.userName && formik.errors.userName && <span>{formik.errors.userName}</span>
          }
        </div>
        <div>
          <label htmlFor="avatarURL">Avatar:</label>
          <input
            type="url"
            name="avatarURL" id="avatarURL"
            placeholder='Enter photo url..'
            value={formik.values.avatarURL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.avatarURL && formik.errors.avatarURL && <span>{formik.errors.avatarURL}</span>
          }
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password" id="password"
            placeholder='Enter password..'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>
          }
        </div>
        <div>
          <label htmlFor="passwordRepeat">Repeat password:</label>
          <input
            type="password"
            name="passwordRepeat" id="passwordRepeat"
            placeholder='Repeat your password..'
            value={formik.values.passwordRepeat}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.passwordRepeat && formik.errors.passwordRepeat && <span>{formik.errors.passwordRepeat}</span>
          }
        </div>
        <input type="submit" value="Register" />
      </form>
      {
        sameNameError && <p>Username is already taken</p>
      }
    </StyledSection>
  );
}

export default Register;