import UsersContext from "../contexts/UsersContext";
import CardsContext from "../contexts/CardsContext";
import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import styled from "styled-components";
import { CardsActionTypes } from "../contexts/CardsContext";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  justify-content: flex-start;
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
    padding: 20px;
    border-radius: 10px;

    > div {
      margin-bottom: 20px;

      > input, label,textarea {
        margin-top: 5px;
        
      }

      > textarea {
        width: 285px;
      }
      > input {
        padding: 10px 0px;
        border: none;
        border-radius: 5px;
        width: 290px;
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
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: #90caf9; /* Light blue for the button */
      color: #000; /* Black for the button text */
      cursor: pointer;

      &:hover {
        background-color: #fff; /* White for the button on hover */
        color: #000; /* Black for the button text on hover */
      }
    }
  }
`;
const AddNewCard = () => {
  const navigate = useNavigate()
  const {loggedInUser} = useContext(UsersContext)
  const {setCards} = useContext(CardsContext)
  const currentDate = new Date();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date:currentDate.toDateString(),
    }, 
    onSubmit: values => {
      console.log(values);

      const newCard = {
        id: uuid(),
        userId: loggedInUser.id,
        ...values 
      }
      setCards({
        type: CardsActionTypes.addNew,
        data: newCard
      });
      navigate(-1);
      console.log(newCard.date)
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Topic must be at least 5 symbols length')
        .max(50, "Topic can't be longer than 50 symbols")
        .required('This field must be filled')
        .trim(),
      description: Yup.string()
        .min(5, 'Description must be at least 5 symbols length')
        .max(500, "Description can't be longer than 500 symbols")
        .required('This field must be filled')
        .trim()
    })
  });

  return (
    <StyledSection>
      <h1>Add New Post</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Topic:</label>
          <input
            type="text"
            name="title" id="title"
            placeholder="Write topic..."
            value={formik.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.title && formik.errors.title &&
            <p>{formik.errors.title}</p>
          }
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description" id="description"
            placeholder="Write topic description..."
            value={formik.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.description && formik.errors.description &&
            <p>{formik.errors.description}</p>
          }
        </div>
        <input type="submit" value="Post!" />
      </form>
    </StyledSection>
  );
}
 
export default AddNewCard;