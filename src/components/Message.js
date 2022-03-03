import React, { useEffect, useState } from 'react';

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
  const [isEditModal, setIsEditModal] = useState(false);
  const [file, setFile] = useState();

  const handleFile = (e) => {
    console.log('clicked');
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    setFile(uploadedFile);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openEditModal() {
    setIsEditModal(true);
  }

  function closeEditModal() {
    setIsEditModal(false);
  }

  const handleDelete = () => {
    openModal();
  };

  const handleEdit = async (id) => {
    // const response = await db.collection('messages').doc(data.id).get();
    // console.log(response.data());
    openEditModal();
  };

  const confirmEdit = async (e) => {
    e.preventDefault();
    try {
      const editForm = document.querySelector('#edit-form');
      console.log(editForm['isBefore'].value);
      const response = await db
        .collection('messages')
        .doc(data.id)
        .update({
          days: editForm['days'].value || data.days,
          isBefore: editForm['isBefore'].value || data.isBefore,
          text: editForm['text'].value || data.text,
        });
      console.log(response);
      getMessages();
      closeEditModal();
    } catch {
      setError('Failed to Edit message');
    }
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
            <button
              className="secondary-btn py-0 px-3 md:px-4 mx-2 text-center text-white"
              onClick={handleEdit}
            >
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
            {data.days} DAYS {data.isBefore === 'true' ? 'BEFORE' : 'AFTER'}{' '}
            PROCEDURE
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
      {/* edit modal */}
      <Modal
        isOpen={isEditModal}
        onRequestClose={closeEditModal}
        style={customStyles}
        contentLabel="Edit Modal"
      >
        <div className="text-center mx-auto">
          <form action="" id="edit-form" onSubmit={confirmEdit}>
            <div className="flex flex-col items-center justify-between"></div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <input
                type="number"
                className="custom-input my-2 mr-4  py-2 text-center  "
                placeholder="days"
                style={{ maxWidth: '100px' }}
                name="days"
                id="days"
              />
              <select
                className="uppercase text-center custom-input m-2 mr-0 px-6 py-2"
                name="isBefore"
                id="isBefore"
              >
                <option value={true}>Before Procedure</option>
                <option value={false}>After Procedure</option>
              </select>
            </div>

            {/* <div className="custom-input my-2 px-6 py-2">
              <label for="video" class="btn">
                {file ? file.name : 'UPLOAD VIDEO (OPTIONAL)'}
              </label>
              <input
                id="video"
                className="hidden"
                type="file"
                onChange={handleFile}
              />
            </div> */}

            <div className="flex flex-col items-center justify-between">
              <textarea
                name=""
                id="text-area"
                cols="30"
                rows="10"
                className="custom-input m-2 px-6 py-2"
                name="text"
                placeholder="ADD TEXT"
              ></textarea>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="uppercase confirm-btn w-24 py-1 rounded-md"
                type="submit"
                // onClick={confirmEdit}
              >
                Edit
              </button>
              <button
                className="secondary-btn mx-2 text-white uppercase w-24 py-1 rounded-md"
                onClick={closeModal}
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
