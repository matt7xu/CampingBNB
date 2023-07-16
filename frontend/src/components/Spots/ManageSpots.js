import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spots";
import { Link, useHistory } from "react-router-dom";
import DeleteSpotModal from "./DeleteSpotModal";
import "./CreateSpot.css";

function ManageSpots({ isLoaded }) {
  const dispatch = useDispatch();
  const SpotsState = useSelector((state) => state.spots);
  const allSpots = Object.values(SpotsState);
  const history = useHistory();

  const createButtonHandler = () => {
    history.push("/spots/new");
  };

  const updateButtonHandler = (spotId) => {
    history.push(`/spots/${spotId}/edit`);
  };

  useEffect(() => {
    (async () => {
      await dispatch(spotsAction.loadOwnedSpotsThunk());
    })();
  }, [dispatch]);

  return (
    <>
      <h1>Manage Spots</h1>
      {allSpots.length === 0 && (
        <button onClick={createButtonHandler}>Create a New Spot</button>
      )}
      {isLoaded && (
        <nav className="allSpots">
          {allSpots.map((spot) => (
            <div key={spot.id} className="spot-card">
              <Link to={`/spots/${spot.id}`}>
                <img className="spotImage" key={spot.id} src={spot.previewImage} alt={spot.description} title={spot.name} />
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
              </Link>

              <div>
                <button
                  className="manage-location-update-button"
                  onClick={() => updateButtonHandler(spot.id)}
                >
                  Update
                </button>
                <DeleteSpotModal spotId={spot.id} />
              </div>
            </div>
          ))}
        </nav>
      )}
    </>
  );
}

export default ManageSpots;
