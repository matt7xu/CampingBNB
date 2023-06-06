import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const LOAD_SPOT_BY_ID = "spot/loadSpotById";

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
    default:
      return newState;
  }
};

export default spotsReducer;
