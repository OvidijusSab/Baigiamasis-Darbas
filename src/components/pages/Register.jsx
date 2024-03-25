import { useContext,useState,useEffect } from "react";
import UsersContext from "../contexts/UsersContext";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { UsersActionTypes } from "../contexts/UsersContext";

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
    grid-template-columns: 1fr 1fr;
    >input,label{
      margin-top: 5px;
    }
     >span{
      grid-column: span 3;
      text-align: center;
      color:red;
      margin: 0;
      font-size: 12px;
    }
  }
  }
`

const Register = () => {

  const navigate = useNavigate();
  const [sameNameError, setSameNameError] = useState(false);
  const {users,setUsers,setLoggedInUser} = useContext(UsersContext)

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      passwordRepeat: "",
    },
    onSubmit: (values) => {
      console.log(values)

      if(users.find(user => user.userName === values.userName)){
        setSameNameError(true);
      } else {
        const newUser = {
          id:uuid(),
          userName: values.userName,
          // password: bcrypt.hashSync(values.password,8),
          // passwordNoHash: values.password,
          password:values.password,
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
        .required("Field must be filled")

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