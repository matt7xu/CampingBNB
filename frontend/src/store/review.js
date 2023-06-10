import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/loadReviews";
const POST_REVIEW = "review/postReview"
const DELETE_REVIEW = "reviews/deleteReview";

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

export const deleteReviewAction = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId,
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

export const addReviewThunk = (spot, reviewInput) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewInput),
  });

  if (res.ok) {
    // const newReview = await res.json();
    //dispatch(postReviewsAction(newReview))
    const newReview = await dispatch(loadReviewsThunk(spot.id));
    return newReview;
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    let result = dispatch(deleteReviewAction(reviewId));
    return result;
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
      case DELETE_REVIEW:
        delete newState[action.payload];
        return newState;
    default:
      return state;
  }
};

export default reviewReducer;
