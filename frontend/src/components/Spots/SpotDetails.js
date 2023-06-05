import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./Spots.css";

const SpotDetails = () => {
  const { spotId } = useParams();
  const spotsObj = useSelector(state => state.spots);
  const spot = spotsObj[spotId];

  if (spot.previewImage) {
    var images = spot.previewImage.split('https');
    images.shift();
    for (let i = 0; i < images.length; i++) {
      images[i] = 'http' + images[i]
    }
  }

  const handleReserve = {

  }

  return (
    <>
      <h1>{spot.name}</h1>
      <div className="location">{spot.city}, {spot.state}, {spot.country}</div>
      <div className="image-container">
        {images.map((image, index) => (
          < img
            key={`image${index}`}
            className={`image${index}`}
            src={image}
            alt="building"
          />
        ))}
      </div>
      <h2>{`Hosted by firstName lastName`}</h2>
      <div class="descriptionWrapper"></div>
      <div class="description">{spot.description}</div>
      <div className="reserve-wrapper">
        <div>
          <span>{`$${spot.price}.00 `}</span>
          <span>night</span>
        </div>
        <div>
          <i className="fas fa-star"></i>
          <span>
            {spot.avgRating
              ? String(spot.avgRating).length === 1
                ? Number(spot.avgRating).toFixed(1)
                : spot.avgRating
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
    </>
  )
};

export default SpotDetails;
