import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/loadReviews";

export const loadReviewsAction = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    payload: reviews,
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

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState={...state};

  switch (action.type) {
    case LOAD_REVIEWS:
      const allReviews = action.payload.Reviews;
      allReviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
