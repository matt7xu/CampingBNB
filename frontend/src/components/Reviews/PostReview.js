import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import StarRating from "./StarRating";
import * as reviewActions from "../../store/review";
import "./PostReview.css";

function PostReview({ spot }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();

    const reviewInput = {
      review,
      stars,
    };

    const newReview = await dispatch(reviewActions.addReviewThunk(spot, reviewInput))

    if(newReview.errors) {
      setErrors(newReview.errors);
    }

    if (newReview.id) {
      history.push(`/spots/${spot.id}`);
    };
  };

  return (
    <form onSubmit={submitHandler} className="postReviewContainer">
      <h1>How was your stay?</h1>
      <div>
        {errors.length > 0 && errors.map(el => (
          <div key={el} className="errors">{el}</div>
        ))}
      </div>
      <textarea
        placeholder="Leave your review here..."
        value={review}
        className="reviewTextarea"
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <div className="star-rating-container">
        <StarRating stars={stars} setStars={setStars} />
        <span id="star-text">Stars</span>
      </div>
      <button
        className="SubmitReviewButtonDiv"
        type="submit"
        disabled={review.length < 10 || stars === 0}
      >
        Submit Your Review
      </button>
    </form>
  );
}

export default PostReview;
