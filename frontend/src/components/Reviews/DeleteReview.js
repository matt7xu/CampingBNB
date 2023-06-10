import { useDispatch } from "react-redux";
import * as reviewActions from "../../store/review";
import "./Reviews.css";

function DeleteReview({ setShowModal, review }) {
  const dispatch = useDispatch();

  const confirmButtonHandler = async (e) => {
    e.preventDefault();
    await dispatch(reviewActions.deleteReviewThunk(review.id));
  };

  const handleDeleteNoButton = () => {
    setShowModal(false)
  }


  return (
    <div className="delete-container">
      <h1>Confirm Delete</h1>
      <h5>Are you sure you want to Delete this review?</h5>
      <button className="deleteYesbutton" onClick={confirmButtonHandler}>Yes (Delete Review)</button>
      <button className="deleteNobutton" onClick={handleDeleteNoButton}>No (Keep Review)</button>
    </div>
  )
}

export default DeleteReview;
