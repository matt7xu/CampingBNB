import React, { useState } from 'react';

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const [modalContent, setModalContent] = useState(false);

  const ModalWithProp = React.cloneElement(modalComponent, { setModalContent });

  const onClick = () => {
    setModalContent(!modalContent);
  };

  return (
    <>
      <li onClick={onClick}>{itemText}</li>
      {modalContent && ModalWithProp}
    </>
  );
}

export default OpenModalMenuItem;
