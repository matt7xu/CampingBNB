import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useSelector } from "react-redux";

import DeleteReview from "./DeleteReview";
import "./Reviews.css"

function DeleteReviewModal({ review }) {
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  const onClickHandler = () => {
    setShowModal(true);
  };

  return (
    <>
      {user && user.id === review.userId && (
        <div>
          <button onClick={onClickHandler} className="deleteReviewButtonDiv">
            Delete
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <DeleteReview setShowModal={setShowModal} review={review} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}
export default DeleteReviewModal;
