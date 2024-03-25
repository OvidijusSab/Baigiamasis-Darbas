import { createContext, useEffect, useReducer } from "react";

const CardsContext = createContext();

export const CardsActionTypes = {
  getAll: "fetches all data on first load",
  addNew: 'adds new card to the data',
  delete: "delete one specific card",
  // addComment: "add new comment to specific card",
  // deleteComment: 'delete one specific comment'
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
        fetch(`http://localhost:8080/cards/${action.id}`,{ method: "DELETE" });
        return state.filter(el => el.id !== action.id);
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