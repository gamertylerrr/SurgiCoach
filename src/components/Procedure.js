import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../firebase';
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

export default function Procedure({ data, number, getProcedures, setError }) {
  const history = useHistory();
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
      await db.collection('procedures').doc(data.id).delete();
      getProcedures();
      closeModal();
    } catch {
      setError('Failed to Delete procedure');
    }
  };
  return (
    <div>
      <div className="procedure-wrapper flex flex-row">
        <div class="basis-1/6 procedure-number p-2 ">
          <p className="text-black text-center">{number}</p>
        </div>
        <div class="basis-5/6 p-2">
          <p className="text-center uppercase">{data.name}</p>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center my-2">
        <button
          className="secondary-btn py-0 px-6 mx-2 text-center w-24 text-white"
          onClick={() => history.push(`/editprocedure/${data.id}`)}
        >
          Edit
        </button>
        <button
          className="secondary-btn py-0 px-6 mx-2 text-center w-24 text-white"
          onClick={handleDelete}
        >
          Delete
        </button>
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
    </div>
  );
}
