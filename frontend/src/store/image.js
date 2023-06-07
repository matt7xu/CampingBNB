import { csrfFetch } from "./csrf";

const ADD_SPOT_IMAGE = "images/addImage"

export const addSpotImageAction = (image) => {
  return {
      type: ADD_SPOT_IMAGE,
      payload: image
  }
};

export const addSpotImageThunk = (image, spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}/images`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(image)
  });

  if(res.ok) {
      const image = await res.json();
      dispatch(addSpotImageAction(image));
      return image;
  }
}

const initialState = {};

const imageReducer = (state = initialState, action) => {
    let newState = {...state};

    switch(action.type) {
        case ADD_SPOT_IMAGE:
            newState[action.payload.id] = action.payload
            return newState;
        default:
            return state;
    }
}

export default imageReducer
