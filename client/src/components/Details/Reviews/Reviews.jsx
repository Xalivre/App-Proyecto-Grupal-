import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import s from "./Reviews.module.css";

function Reviews() {
  const [hover, setHover] = useState(null);

  const [input, setInput] = useState({
    rating: 1,
    comment: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    setInput({
      rating: 1,
      comment: "",
    });
  }

  function onClickStar(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Reseña</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label>
                <input
                  className={s.inputradio}
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={(e) => onClickStar(e)}
                />
                <FaStar
                  className={s.star}
                  color={
                    ratingValue <= (hover || input.rating)
                      ? "#ffc107"
                      : /* "#e4e5e9" */ ""
                  }
                  size={30}
                  onMouseEnter={(e) => setHover(ratingValue)}
                  onMouseLeave={(e) => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <label>Reseña:</label>
        <input
          name="comment"
          type="text"
          placeholder="Ingrese su reseña..."
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Enviar reseña</button>
      </form>
    </div>
  );
}

export default Reviews;
