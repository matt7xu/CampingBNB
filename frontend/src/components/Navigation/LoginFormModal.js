import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="signinButton" onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginFormPage />
        </Modal>
      )}
    </>
  );
}
export default LoginFormModal;
