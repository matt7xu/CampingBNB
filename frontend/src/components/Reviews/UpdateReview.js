import { useState } from "react";
import StarRating from "./StarRating";
import * as reviewActions from "../../store/review";
import { useDispatch } from "react-redux";
import "./Reviews.css";

function UpdateReview({ setShowModal, review }) {
  const [stars, setStars] = useState(review.stars);
  const [reviewText, setReviewText] = useState(review.review);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedInfo = {
      review: reviewText,
      stars,
    };

    if (updatedInfo) {
      const updatedReview = await dispatch(reviewActions.updateReviewThunk(updatedInfo, review));

      if (updatedReview.errors) {
        setErrors(updatedReview.errors);
      }
      setShowModal(false);
    };
  };

  return (
    <form onSubmit={submitHandler} className="updateReviewContainer">
      <h2 className="updateReviewContainerH2">{`How was your stay at ${review?.Spot?.name}?`}</h2>
      <div>
        {errors.length > 0 && errors.map(el => (
          <div key={el} className="errors">{el}</div>
        ))}
      </div>
      <textarea
        placeholder="Leave your review here..."
        className="post-review-textbox"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>
      <div className="star-rating-container">
        <StarRating stars={stars} setStars={setStars} />
        <span id="star-text">Stars</span>
      </div>
      <button
        type="submit"
        disabled={reviewText.length < 10}
        className="updateReviewButton"
      >
        Update Your Review
      </button>
    </form>
  );
}

export default UpdateReview;
