import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";
import CardsContext from "../contexts/CardsContext";
import { CardsActionTypes } from "../contexts/CardsContext";
import Comment from "../UI/Comment";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { useState, useEffect } from 'react';

const StyledSection = styled.section`
  padding-top: 50px;
  background-color: #424242; /* Dark grey background */

  > div:first-of-type{
    border: 1px solid #ddd;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom: 20px;
    position: relative;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    color: #fff; /* White text */
    background-color: #303030; /* Slightly lighter grey background for contrast */

    >p:first-of-type{
      position: absolute;
      font-size: 12px;
      color: lightgray;
      bottom: 2px;
      right: 5px;
    }
    >div{
      position: relative;
 
    >span{
      position: absolute;
      background-color: gray;
      border-radius: 5px;
      font-size: 12px;
      bottom: 3px;
      left:1px
    }
    >img{
      width: 40px;
      height: 80%;
      border-radius: 50%;
    }
  } 

    >i:first-of-type{
      color:red;
      font-size: 20px;
      position: absolute;
      top:4px;
      left: 4px;;
      cursor: pointer;
      &:hover{
        color: darkred;
      }
    }
    >i:nth-of-type(2){
      color:blue;
      font-size: 20px;
      position: absolute;
      top:4px;
      right: 5px;;
      cursor: pointer;

      &:hover{
        color: darkblue;
      }
    }
  }
  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-self: center  ;
    align-items: center;
    width: 300px;
    background-color: #303030; /* Slightly lighter grey for the form background */
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    padding-right: 40px;

    > div {
      margin-bottom: 20px;

      > label {
        color: #fff; /* White for labels */
      }

      > textarea {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
      }

      > p {
        color: red; /* Red for error messages */
        text-align: center;
        margin: 0;
      }
    }

    > input[type="submit"] {
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

const OneCardPage = () => {

  const { id } = useParams();
  const navigation = useNavigate();
  const { loggedInUser, users } = useContext(UsersContext);
  const { setCards, cards } = useContext(CardsContext);
  const card = cards.find(card => card.id === id);
  const author = card && users.find(user => user.id === card.userId);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    if (card) {
      setNewTitle(card.title);
      setNewDescription(card.description);
    }
  }, [card]);

  // const [card, setCard] = useState([]);
  // useEffect(()=>{
  //   fetch(`http://localhost:8080/cards/${id}`)
  //     .then(res => res.json())
  //     .then(data => setCard(data));
  // },[id]);

  const formik = useFormik({
    initialValues: {
      text: ''
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .min(10, 'Comment must be at least 10 symbols length')
        .max(500, "Comment can't be longer than 500 symbols")
        .required('This field must be filled')
        .trim()
    }),
    onSubmit: (values) => {
      const newComment = {
        text: values.text,
        id: uuid(),
        authorId: loggedInUser.id
      }
      // console.log(newComment);
      setCards({
        type: CardsActionTypes.addComment,
        comment: newComment,
        cardId: card.id
      });
      formik.resetForm();
    }
  });

  return (
    <StyledSection>
      {
        cards.length &&
        <>
          <div>
            <div>
              <img src={author.avatarURL} alt="author image" />
              <span>{author.userName}</span>
            </div>
            {
              card.edited && <p>This post has been edited.</p>
            }
            {
              isEditing ? (
                <>
                  <input value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                  <textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} />
                  <button
                    onClick={() => {
                      setCards({
                        type: CardsActionTypes.edit,
                        id: card.id,
                        title: newTitle,
                        description: newDescription
                      });
                      setIsEditing(false);
                    }}
                  >Save</button>
                </>
              ) : (
                <>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  {
                    loggedInUser.id === card.userId &&
                    <>
                      <i
                        className="bi bi-trash"
                        onClick={() => {
                          setCards({
                            type: CardsActionTypes.delete,
                            id: card.id
                          });
                          navigation(-1);
                        }}
                      ></i>
                      <i
                        className="bi bi-pencil-square"
                        onClick={() => {
                          setIsEditing(true);
                          setNewTitle(card.title);
                          setNewDescription(card.description);
                        }}
                      ></i>
                    </>
                  }
                </>
              )
            }
          </div>
          <div>
            <h3>Comments:</h3>
            {
              card.comments ?
              card.comments?.map(comment =>
              <>
                <Comment
                  key={comment.id}
                  comment={comment}
                  cardId={card.id}
                />
                </>
              ) : <p>No comments yet.</p>
            }
          </div>
          {
            loggedInUser &&
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="text">Write your comment:</label>
                <textarea
                  name="text" id="text"
                  placeholder="Write your comment..."
                  value={formik.values.text}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {
                  formik.touched.text && formik.errors.text &&
                  <p>{formik.errors.text}</p>
                }
              </div>
              <input type="submit" value="Comment" />
            </form>
          }
        </>
      }
    </StyledSection>
  );
}

export default OneCardPage;