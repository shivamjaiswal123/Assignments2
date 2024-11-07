import React from "react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

function Rating({ rating, handleRating, style }) {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => handleRating(i)} style={style}>
          {rating > i ? (
            <AiFillStar size="15px" />
          ) : (
            <AiOutlineStar size="15px" />
          )}
        </span>
      ))}
    </>
  );
}

export default Rating;
