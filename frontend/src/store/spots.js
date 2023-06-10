import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const LOAD_SPOT_BY_ID = "spots/loadSpotById";
const LOAD_OWNED_SPOTS = "spots/ownedSpots";
const ADD_SPOT = "spots/addSpot";
const UPDATE_SPOT = "spots/updateSpot";
const REMOVE_SPOT = "spots/removeSpot";

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  payload: spots
});

export const loadSpotByIdAction = (spot) => {
  return {
    type: LOAD_SPOT_BY_ID,
    payload: spot,
  }
}

const loadOwnedSpotsAction = (spots) => {
  return {
    type: LOAD_OWNED_SPOTS,
    payload: spots,
  };
};

const addOneSpotAction = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot,
  };
};

const updateSpotAction = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot,
  };
};

const removeSpotAction = (spotId) => {
  return {
    type: REMOVE_SPOT,
    payload: spotId,
  };
};


//thunk

export const loadAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const spots = await res.json();
    dispatch(loadSpots(spots));
    return spots;
  }
};

export const loadSpotByIdThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(loadSpotByIdAction(spot));
    return spot;
  }
}

export const loadOwnedSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users/owned/spots`);

  if (res.ok) {
    const spots = await res.json();
    dispatch(loadOwnedSpotsAction(spots));
    return spots;
  }
};

export const addSpotThunk = (newSpot) => async (dispatch) => {
  const reqBody = JSON.stringify(newSpot);

  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: reqBody,
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(addOneSpotAction(spot));
    return spot;
  }
};

export const updateSpotThunk = (updatedSpot, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedSpot),
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(updateSpotAction(spot));
    return spot;
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(removeSpotAction(spotId));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_SPOTS:
      action.payload.Spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    case LOAD_SPOT_BY_ID:
      newState[action.payload.id] = action.payload;
      return newState;
    case LOAD_OWNED_SPOTS:
      newState = {};
      const allUserSpots = action.payload.Spots;
      allUserSpots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    case ADD_SPOT:
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_SPOT:
      newState[action.payload.id] = action.payload;
      return newState;
    case REMOVE_SPOT:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
