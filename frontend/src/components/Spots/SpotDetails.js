import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./Spots.css";
import * as spotsActions from "../../store/spots";
import Reviews from "../Reviews";

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots);
  const [isLoaded, setIsLoaded] = useState(false);
  const spot = spotsObj[spotId];


  useEffect(() => {
    dispatch(
      spotsActions.loadSpotByIdThunk(spotId)
    ).then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  const handleReserve = () => {
    alert("Feature coming soon");
  }

  return (
    <>
      {isLoaded && (
        <>
          <h1>{spot.name}</h1>
          <div className="location">{spot.city}, {spot.state}, {spot.country}</div>
          <div className="image-container">
            {spot.SpotImages.map((image, index) => (
              < img
                key={`image${image.id}`}
                className={`image${index}`}
                src={image.url}
                alt="building"
              />
            ))}
          </div>
          <div class="hostDescriptionCalloutBox">
            <h2 className="host">{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
            <div className="description">{spot.description}</div>
            <div className="calloutBox">
              <div>
                <span>{`$${spot.price.toFixed(2)} `}</span>
                <span>night</span>
              </div>
              <div>
                <i className="fas fa-star"></i>
                <span>
                  {spot.avgStarRating
                    ? String(spot.avgStarRating).length === 1
                      ? Number(spot.avgStarRating).toFixed(1)
                      : spot.avgStarRating
                    : "New"}
                </span>
                <span>{Number(spot.numReviews) === 0 ? "" : "·"} </span>
                <span>
                  {Number(spot.numReviews) === 0
                    ? ""
                    : Number(spot.numReviews) === 1
                      ? `${spot.numReviews} Review`
                      : `${spot.numReviews} Reviews`}
                </span>
              </div>
              <button id="reserve-button" onClick={handleReserve}>
                Reserve
              </button>
            </div>
          </div>
          <div className="reviews-container">
              <i className="fas fa-star"></i>
            <span>
              {spot.avgStarRating
                ? String(spot.avgStarRating).length === 1
                  ? Number(spot.avgStarRating).toFixed(1)
                  : spot.avgStarRating
                : "New"}
            </span>
            <span>{Number(spot.numReviews) === 0 ? "" : "·"} </span>
            <span>
              {Number(spot.numReviews) === 0
                ? ""
                : Number(spot.numReviews) === 1
                  ? `${spot.numReviews} Review`
                  : `${spot.numReviews} Reviews`}
            </span>
            <Reviews spot={spot}/>
          </div>
        </>
      )}
    </>
  )
};

export default SpotDetails;
