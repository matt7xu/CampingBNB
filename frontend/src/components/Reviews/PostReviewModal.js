import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostReview from './PostReview';

function PostReviewModal({spot}) {
    const [showModal, setShowModal] = useState(false);
    const onClickHandler = () => {
      setShowModal(true);
    };

    return (
      <>
        <button onClick={onClickHandler} className="postReviewClassName">Post Your Review</button>
        {showModal && (
          <>
          <Modal onClose={() => setShowModal(false)}>
            <PostReview spot={spot}/>
          </Modal>
          </>
        )}
      </>
    );
}
export default PostReviewModal;
