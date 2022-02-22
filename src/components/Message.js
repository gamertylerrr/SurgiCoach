import React, { useState } from 'react';

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #2B426A',
  },
};

export default function Message() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="message-wrapper p-2">
        <div className="flex items-center justify-between">
          <p className="font-black text-sm md:text-lg uppercase ">Message 1</p>
          <div className="flex flex-row justify-center items-center my-3">
            <button className="secondary-btn py-0 px-3 md:px-4 mx-2 text-center md:w-20 text-white">
              Edit
            </button>
            <button
              className="secondary-btn py-0 px-3 md:px-4 mx-2 text-center md:w-20 text-white"
              onClick={openModal}
            >
              Delete
            </button>
          </div>
        </div>
        <div>
          <p className="mb-2 text-lg">1 DAY BEFORE PROCEDURE</p>
          <p className="text-base">
            Tomorrow is your ACL Reconstruction. Do your best to get a full
            night’s rest to get ready, and please remember not to eat or drink
            after midnight tonight. We’re very much looking forward to taking
            care of you tomorrow.
          </p>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <p className="font-black text-sm md:text-lg uppercase">
          ARE YOU SURE YOU WANT TO DELETE?
        </p>
        <div className="flex justify-center mt-4">
          <button className="uppercase confirm-btn w-24 py-1 rounded-md">
            YES
          </button>
          <button
            className="secondary-btn mx-2 text-white uppercase w-24 py-1 rounded-md"
            onClick={closeModal}
          >
            cancel
          </button>
        </div>
      </Modal>
    </>
  );
}
