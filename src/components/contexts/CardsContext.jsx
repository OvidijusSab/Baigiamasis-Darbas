import { createContext, useEffect, useReducer } from "react";

const CardsContext = createContext();

export const CardsActionTypes = {
  getAll: "fetches all data on first load",
  addNew: 'adds new card to the data',
  delete: "delete one specific card",
  addComment: "add new comment to specific card",
  deleteComment: 'delete one specific comment',
  edit: "edit one specific card",
  editComment: 'EDIT_COMMENT'
}

const reducer = (state, action) => {
  switch (action.type) {
    case CardsActionTypes.getAll:
      return action.data;
    case CardsActionTypes.addNew:
      fetch(`http://localhost:8080/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      })
      return [...state, action.data]
    case CardsActionTypes.delete:
      fetch(`http://localhost:8080/cards/${action.id}`, { method: "DELETE" });
      return state.filter(el => el.id !== action.id);
    case CardsActionTypes.addComment:
      const cardToAddComment = state.find(el => el.id === action.cardId);
      const commentedCard = {
        ...cardToAddComment,
        comments: cardToAddComment.comments ? [...cardToAddComment.comments, action.comment] : [action.comment]
      };
      fetch(`http://localhost:8080/cards/${action.cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(commentedCard)
      });
      return state.map(el => {
        if (el.id === action.cardId) {
          return commentedCard;
        } else {
          return el;
        }
      });
    case CardsActionTypes.deleteComment:
      const cardToChange = state.find(el => el.id === action.cardId);
      const changedCard = {
        ...cardToChange,
        comments: cardToChange.comments.filter(comment => comment.id !== action.commentId)
      };
      fetch(`http://localhost:8080/cards/${action.cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(changedCard)
      });
      return state.map(el => {
        if (el.id === action.cardId) {
          return changedCard;
        } else {
          return el;
        }
      });
    case CardsActionTypes.edit:
      const cardToEdit = state.find(el => el.id === action.id);
      const editedCard = {
        ...cardToEdit,
        title: action.title,
        description: action.description,
        edited: true
      };
      fetch(`http://localhost:8080/cards/${action.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedCard)
      });
      return state.map(el => {
        if (el.id === action.id) {
          return editedCard;
        } else {
          return el;
        }
      });
    case 'upvote': {
      const cardIndex = state.findIndex(card => card.id === action.cardId);
      if (cardIndex !== -1) {
        const card = state[cardIndex];
        card.upvotes = card.upvotes || [];
        card.downvotes = card.downvotes || [];
        if (!card.upvotes.includes(action.userId)) {
          card.upvotes.push(action.userId);
          card.downvotes = card.downvotes.filter(id => id !== action.userId);
        } else {
          card.upvotes = card.upvotes.filter(id => id !== action.userId);
        }
        fetch(`http://localhost:8080/cards/${action.cardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(card)
        });
        return [...state.slice(0, cardIndex), card, ...state.slice(cardIndex + 1)];
      }
      return state;
    }
    case 'downvote': {
      const cardIndex = state.findIndex(card => card.id === action.cardId);
      if (cardIndex !== -1) {
        const card = state[cardIndex];
        card.upvotes = card.upvotes || [];
        card.downvotes = card.downvotes || [];
        if (!card.downvotes.includes(action.userId)) {
          card.downvotes.push(action.userId);
          card.upvotes = card.upvotes.filter(id => id !== action.userId);
        } else {
          card.downvotes = card.downvotes.filter(id => id !== action.userId);
        }
        fetch(`http://localhost:8080/cards/${action.cardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(card)
        });
        return [...state.slice(0, cardIndex), card, ...state.slice(cardIndex + 1)];
      }
      return state;
    }
    case CardsActionTypes.editComment:
      return state.map(card => {
        if (card.id === action.cardId) {
          return {
            ...card,
            comments: card.comments.map(comment => {
              if (comment.id === action.commentId) {
                return {
                  ...comment,
                  text: action.newText
                };
              }
              return comment;
            })
          };
        }
        return card;
      });
    default:
      console.error(`No such actions: ${action.type}`)
      return state;
  }
}

const CardsProvider = ({ children }) => {

  const [cards, setCards] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/cards`)
      .then(res => res.json())
      .then(data => setCards({
        type: CardsActionTypes.getAll,
        data: data
      }))
  }, [])

  return (
    <CardsContext.Provider
      value={{
        cards,
        setCards
      }}
    >
      {children}
    </CardsContext.Provider>
  )
}

export { CardsProvider }
export default CardsContext;