import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalCustomIcon({
  modalComponent, // component to render inside the modal
  //buttonText, // text of the button that opens the modal

  materialSymbolIconName, //name of icon
  iconTitle, //description on mouse hover

  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (

    <>
    {/* <button onClick={onClick}>{buttonText}</button> */}

    <span className="material-symbols-outlined" title={iconTitle} onClick={onClick}>{materialSymbolIconName}</span>

    </>

  );
}

export default OpenModalCustomIcon;
