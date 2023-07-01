import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateReview from "./UpdateReview";
import { useSelector } from "react-redux";
import "./Reviews.css";

function UpdateReviewModal({ review }) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);

  return (
    <>
      {user && user.id === review.userId && (
        <div>
          <button
            className="updateReviewButtonDiv"
            onClick={() => setShowModal(true)}
          >
            Update
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <UpdateReview review={review} setShowModal={setShowModal} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}
export default UpdateReviewModal;
