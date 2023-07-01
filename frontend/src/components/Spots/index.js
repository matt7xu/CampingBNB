import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import * as spotActions from "../../store/spots";
import "./Spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector(state => Object.values(state.spots));

  useEffect(() => {
    dispatch(spotActions.loadAllSpots());
  }, [dispatch]);

  const reverseOrderSpots = [...allSpots].reverse();

  return (
    <>
      <div className="allSpots">
        {reverseOrderSpots.map(spot => (
          <div className="spotItem" key={spot.id}>
            <Link to={`/spots/${spot.id}`}>
              <img className="spotImage" key={spot.id} src={spot.previewImage} alt={spot.description} title={spot.name} />
            </Link>
            <div>
              <div>{spot.city}, {spot.state}</div>
              <div>${spot.price} night</div>
              <div>
                <i className="fas fa-star" />
                {spot.avgRating !== "0.0"
                  ? spot.avgRating
                  : "New"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
};

export default Spots;
