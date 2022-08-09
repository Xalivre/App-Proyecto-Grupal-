import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import s from "./Reviews.module.css";
import axios from "axios"
import { useJwt } from "react-jwt"

function Reviews({ id }) {
  const [hover, setHover] = useState(null);

  const { decodedToken } = useJwt(localStorage.getItem("usuario"));

  let usernameTokened = decodedToken?.username;

  
  const [input, setInput] = useState({
    id: id,
    comment: "",
    commentRating: 1,
    username: "",
  });
  
  useEffect(() => {
    setInput({
      ...input,
      username: usernameTokened
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedToken])

  async function handleSubmit (e) {
    e.preventDefault();
    setInput({
      comment: "",
      commentRating: 1,
    });
    await axios.put("http://localhost:3000/comments", input)
  }

  function onClickStar(e) {
    setInput({
      ...input,
      [e.target.name]: Number(e.target.value),
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
                  name="commentRating"
                  value={ratingValue}
                  onClick={(e) => onClickStar(e)}
                />
                <FaStar
                  className={s.star}
                  color={
                    ratingValue <= (hover || input.commentRating)
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
