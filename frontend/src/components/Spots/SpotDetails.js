import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./Spots.css";
import * as spotsActions from "../../store/spots";
import Reviews from "../Reviews";
import PostReviewModal from "../Reviews/PostReviewModal";

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots);
  const [isLoaded, setIsLoaded] = useState(false);
  const spot = spotsObj[spotId];
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(
      spotsActions.loadSpotByIdThunk(spotId)
    ).then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  const handleReserve = () => {
    alert("Feature coming soon");
  }

  const allReviews = useSelector(state => Object.values(state.reviews));

  let pageshowing;
  if (spot && user) {
    if (spot.Owner) {
      if (spot.Owner.id) {
        if (allReviews) {
          const filteredReview = allReviews.filter(
            (review) => review.userId === user.id && review.spotId === spot.id
          );
          if (user && user.id !== spot.Owner.id && filteredReview.length < 1) {
            pageshowing = (
              <PostReviewModal spot={spot} />
            )
          }
        }
      }
    }
  } else {
    pageshowing = (
      <></>
    )
  }

  const getSpotAvgRating = (spot) => {
    const filteredReview = allReviews.filter(
      (review) => review.spotId === spot.id
    );
    if (filteredReview.length > 0) {
      let ret = 0;
      for (let i = 0; i < filteredReview.length; i++) {
        ret += filteredReview[i].stars;
      }
      return ret / filteredReview.length
    }
    return 'New';
  }

  const getReviewNumber = (spot) => {
    const filteredReview = allReviews.filter(
      (review) => review.spotId === spot.id
    );
    return (
      <>
        <span>{Number(filteredReview.length) === 0 ? "" : " ·"} </span>
        <span>
          {Number(filteredReview.length) === 0
            ? ""
            : Number(filteredReview.length) === 1
              ? `${filteredReview.length} Review`
              : `${filteredReview.length} Reviews`}
        </span>
      </>
    )
  }

  const showImages = (images) => {
    let slicedImages = images.slice(0, 5)
    return slicedImages.map((image, index) => (
      < img
        key={`image${image.id}`}
        className={`image${index}`}
        src={image.url}
        alt="building"
      />
    ))
  }

  return (
    <>
      {isLoaded && (
        <>
          <h1>{spot.name}</h1>
          <div className="location">{spot.city}, {spot.state}, {spot.country}</div>
          <div className="image-container">
            {showImages(spot.SpotImages)}
          </div>
          <div className="hostDescriptionCalloutBox">
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
                  {getSpotAvgRating(spot)}
                </span>
                <span>
                  {getReviewNumber(spot)}
                </span>

              </div>
              <button className="reserve-button" onClick={handleReserve}>
                Reserve
              </button>
            </div>
          </div>
          <div className="reviews-container">
            <i className="fas fa-star"></i>
            <span>
              {getSpotAvgRating(spot)}
            </span>
            <span>
              {getReviewNumber(spot)}
            </span>
            <div className="postReviewButtonDiv">
              {pageshowing}
            </div>
            <div className="reviewDiv">
              <Reviews spot={spot} />
            </div>
          </div>
        </>
      )}
    </>
  )
};

export default SpotDetails;
