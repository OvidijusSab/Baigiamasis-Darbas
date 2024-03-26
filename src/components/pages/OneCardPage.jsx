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

  > div{
    border: 1px solid black;
    padding: 10px 20px;

    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    > h3{
      margin: 0;
    }
    > p{
      margin: 0;
      text-align: justify;
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
  }
  >div:nth-child(2){
    display: flex;
    align-items: flex-start;
    
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
                card.edited && <p>This card has been edited.</p>
              }
            {
              isEditing ? (
                <>
                  <input value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                  <input value={newDescription} onChange={e => setNewDescription(e.target.value)} />
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
                      <button
                        onClick={() => {
                          setCards({
                            type: CardsActionTypes.delete,
                            id: card.id
                          });
                          navigation(-1);
                        }}
                      >Delete</button>
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setNewTitle(card.title);
                          setNewDescription(card.description);
                        }}
                      >Edit</button>
                    </>
                  }
                </>
              )
            }
          </div>
          <div>
            {
              card.comments?.map(comment =>
                <Comment
                  key={comment.id}
                  comment={comment}
                  cardId={card.id}
                />
              )
            }
          </div>
          {
            loggedInUser &&
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="text">Comment:</label>
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