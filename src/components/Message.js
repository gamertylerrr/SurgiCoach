import React, { useState } from 'react';

import Modal from 'react-modal';
import { db } from '../firebase';

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

export default function Message({ data, setError, getMessages, index }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDelete = () => {
    openModal();
  };

  const confirmDelete = async () => {
    console.log(data);
    try {
      await db.collection('messages').doc(data.id).delete();
      getMessages();
      closeModal();
    } catch {
      setError('Failed to Delete procedure');
    }
  };
  return (
    <>
      <div className="message-wrapper p-2">
        <div className="flex items-center justify-between">
          <p className="font-black text-sm md:text-lg uppercase ">
            Message {index}
          </p>
          <div className="flex flex-row justify-center items-center my-3">
            <button className="secondary-btn py-0 px-3 md:px-4 mx-2 text-center text-white">
              Edit
            </button>
            <button
              className="secondary-btn py-0 px-3 md:px-4 mx-2 text-center text-white"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
        <div>
          <p className="mb-2 text-lg">
            {data.days} DAY {data.isBefore ? 'BEFORE' : 'AFTER'} PROCEDURE
          </p>
          {data.type == 'video' && <video src={data.videoUrl}></video>}
          {data.type == 'text' && <p className="text-base">{data.text}</p>}
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
          <button
            className="uppercase confirm-btn w-24 py-1 rounded-md"
            onClick={confirmDelete}
          >
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
