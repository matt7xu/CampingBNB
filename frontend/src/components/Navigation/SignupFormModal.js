import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from "../SignupFormPage";

function SignUpFormModal({ onClick }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className='signupButton' onClick={() => {
          setShowModal(true);
        }}
      >
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
