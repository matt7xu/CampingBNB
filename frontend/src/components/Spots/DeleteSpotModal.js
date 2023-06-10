import React, { useState } from 'react';
import { Modal } from "../../context/Modal";
import DeleteSpot from "./DeleteSpot";


function DeleteSpotModal({spotId}) {
    const [showModal, setShowModal] = useState(false);

    const onClickHandler = () => {
        setShowModal(true);
      };

    return (
        <div>
            <button className="manageLocationDeleteButton" onClick={onClickHandler}>Delete</button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <DeleteSpot setShowModal={setShowModal} spotId={spotId}/>
            </Modal>
          )}
        </div>
    )
};


export default DeleteSpotModal;
