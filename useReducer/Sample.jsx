import React from "react";
import { useReducer, useState } from "react";

export const INITIAL_STATE = {
  title: "",
  desc: "",
  price: 0,
  category: "",
  tags: [],
  images: {
    sm: "",
    md: "",
    lg: ""
  },
  quantity: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      //title will be changed=>   title: ""
      return { ...state, [action.payload.name]: action.payload.value };
    case "INCREASE":
      return { ...state, quantity: state.quantity + 1 };
    case "DECREASE":
      return { ...state, quantity: state.quantity - 1 };
    default:
      return state;
  }
};

function Sample() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleInputChange = e => {
    dispatch({
      type: "CHANGE_INPUT",
      //if changing title input then payload will look like
      //        {name: title, value: ""}
      payload: { name: e.target.name, value: e.target.value }
    });
  };
  console.log(state)
  return (
    <>
      <form action="">
        <input
          onChange={handleInputChange}
          name="title"
          style={{ margin: 5, padding: 10 }}
          type="text"
          placeholder="title"
        />{" "}
        <br />
        <input
          onChange={handleInputChange}
          name="desc"
          style={{ margin: 5, padding: 10 }}
          type="text"
          placeholder="desc"
        />{" "}
        <br />
        <input
          onChange={handleInputChange}
          name="price"
          style={{ margin: 5, padding: 10 }}
          type="text"
          placeholder="price"
        />{" "}
        <br />
        <h3>Category</h3>
        <select name="category" id="" onChange={handleInputChange}>
          <option value="Sneakers">Sneakers</option>
          <option value="Jackets">Jacket</option>
          <option value="Shirts">Shirts</option>
        </select>
      </form>
      <div>
        <button
          onClick={() => dispatch({ type: "DECREASE" })}
          disabled={state.quantity === 0}
        >
          -
        </button>
        <span>Quantity({state.quantity})</span>
        <button onClick={() => dispatch({ type: "INCREASE" })}>+</button>
      </div>
    </>
  );
}

export default Sample;
