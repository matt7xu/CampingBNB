import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/loadReviews";
const LOAD_CURRENTUSER_REVIEWS = "reviews/currentUserReviews"
const POST_REVIEW = "review/postReview"
const DELETE_REVIEW = "reviews/deleteReview";
const UPDATE_REVIEW = "reviews/updateReview";

export const loadReviewsAction = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    payload: reviews,
  };
};

export const loadCurrentUserReviewsAction = (reviews) => {
  return {
    type: LOAD_CURRENTUSER_REVIEWS,
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

export const updateOneReviewAction = (review) => {
  return {
    type: UPDATE_REVIEW,
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

export const loadCurrentUserReviewsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users/owned/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadCurrentUserReviewsAction(reviews));
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
    const newReview = await res.json();
    dispatch(postReviewsAction(newReview))
    // const newReview = await dispatch(loadReviewsThunk(spot.id));
    return newReview;
  }
  return res.json();
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

export const updateReviewThunk =
  (updatedReview, review, pageType) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    });

    if (res.ok) {
      const review = await res.json();
      dispatch(updateOneReviewAction(review));
      return review;
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
    case LOAD_CURRENTUSER_REVIEWS:
      const allCurrentUserReviews = action.payload.Reviews;
      newState = {};
      allCurrentUserReviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case POST_REVIEW:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_REVIEW:
      delete newState[action.payload];
      return newState;
    case UPDATE_REVIEW:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
