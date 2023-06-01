import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  payload: spots
});

export const loadAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data));
    return data;
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
    default:
      return newState;
  }
};

export default spotsReducer;
