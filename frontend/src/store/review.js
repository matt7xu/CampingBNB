import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/loadReviews";
const POST_REVIEW = "review/postReview"

export const loadReviewsAction = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    payload: reviews,
  };
};

export const postReviewsAction = (review) => {
  return {
    type: POST_REVIEW,
    payload: review,
  };
};

export const loadReviewsThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadReviewsAction(reviews));
    return reviews;
  }
};

export const addReviewThunk = (review, spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(postReviewsAction(newReview))
    dispatch(loadReviewsThunk(spot.id));
    return newReview;
  }
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case LOAD_REVIEWS:
      const allReviews = action.payload.Reviews;
      allReviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case POST_REVIEW:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
