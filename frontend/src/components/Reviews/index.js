import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/review.js";
import "./Reviews.css";

const Reviews = ({ spot }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const spotId = spot.id;
  const user = useSelector(state => state.session.user);
  const allReviews = useSelector(state => Object.values(state.reviews).filter((review) => {
    if (review.spotId === spotId) return true;
    return false;
  }));
  useEffect(() => {
    dispatch(reviewActions.loadReviewsThunk(spotId))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId]);

  const sorted = allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const reviewMonth = (string) => {
    let array = string.split('-');
    let monthNumber = parseInt(array[1])
    const date = new Date();
    date.setMonth(monthNumber - 1)
    let month = date.toLocaleString('default', { month: "long" });
    let year = array[0];
    return month + ' ' + year;
  }

  return (
    <>
      {isLoaded && (
        <>
          {(user !== null && allReviews.length === 0 && user.id !== spot.Owner.id)
            ? (
              <div>Be the first to review!</div>
            ) : (
              <div>
                {sorted.map((each, index) => (
                  <div className="reviews">
                    <div>{each.User.firstName}</div>
                    <div>{reviewMonth(each.createdAt)}</div>
                    <div>{each.review}</div>
                  </div>
                ))}
              </div>
            )}
        </>
      )}
    </>
  )
};

export default Reviews;
