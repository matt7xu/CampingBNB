import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as reviewActions from "../../store/review";
import DeleteReviewModal from "./DeleteReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
import "./Reviews.css";

function ManageReviews() {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
    dispatch(reviewActions.loadCurrentUserReviewsThunk());
  }, [dispatch]);

  const reviewMonth = (string) => {
    let array = string.split('-');
    let monthNumber = parseInt(array[1])
    const date = new Date();
    date.setMonth(monthNumber - 1)
    let month = date.toLocaleString('default', { month: "long" });
    let year = array[0];
    return month + ' ' + year;
  }

  return (
    <div className="manageReviewPageDiv">
      <h1>Manage Reviews</h1>
      {
        allReviews.map((review) => (
          <div key={review.id}>
            <>
              <div>
                <h3>
                  <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`/spots/${review?.spotId}`}>
                    {review.Spot?.name}
                  </NavLink>
                </h3>
              </div>
              <p>{reviewMonth(review.createdAt)}</p>
              <p>{review?.review}</p>
              <div>
                <div>
                  <UpdateReviewModal review={review} />
                </div>
                <div>
                  <DeleteReviewModal review={review} />
                </div>
              </div>
            </>
          </div>
        ))
      }
    </div>
  );
}

export default ManageReviews;
