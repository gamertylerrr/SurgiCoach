import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function AddProcedure({ getProcedures }) {
  const [messageType, setMessageType] = useState();
  const [file, setFile] = useState();
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleFile = (e) => {
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    setFile(uploadedFile);
  };

  const handleMessageType = (e) => {
    setMessageType(e.target.value);
  };

  const handleProcedure = async (e) => {
    e.preventDefault();
    const procedureForm = document.querySelector('#procedure-form');
    try {
      const procedure = await db.collection('procedures').add({
        name: procedureForm['name'].value,
        provider: currentUser.uid,
      });
      console.log(procedure.id);
      if (file) {
        const storage = getStorage();
        const fileRef = ref(storage, file.name);
        uploadBytes(fileRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(fileRef).then((url) => {
            console.log(url);
            db.collection('messages').add({
              type: messageType,
              days: procedureForm['days'].value,
              isBefore: procedureForm['isBefore'].value,
              videoUrl: url,
              procedure: procedure.id,
              text: procedureForm['text'].value,
            });
          });
        });
        getProcedures();
        return;
      }
      console.log('no file');
      db.collection('messages').add({
        type: messageType,
        days: procedureForm['days'].value,
        isBefore: procedureForm['isBefore'].value,
        text: procedureForm['text'].value,
        procedure: procedure.id,
      });
      getProcedures();
    } catch {
      setError('Failed to Add Procedure');
    }
  };

  return (
    <div className="text-center mx-auto w-11/12">
      <p className="font-black text-xl uppercase mb-6">Add new procedure</p>
      <form action="" id="procedure-form" onSubmit={handleProcedure}>
        <div className="flex flex-col items-center justify-between">
          <input
            type="text"
            className="custom-input m-2 px-6 py-2 text-center"
            placeholder="procedure name"
            name="name"
          />
          <select
            className="uppercase text-center custom-input m-2 px-6 py-2"
            onChange={handleMessageType}
            required
          >
            <option value="" disabled selected hidden className="">
              message type
            </option>
            <option value="text">Text</option>
            <option value="file">Video</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <input
            type="number"
            className="custom-input my-2 mr-4  py-2 text-center  "
            placeholder="days"
            style={{ maxWidth: '100px' }}
            name="days"
          />
          <select
            className="uppercase text-center custom-input m-2 mr-0 px-6 py-2"
            name="isBefore"
          >
            <option value={true}>Before Procedure</option>
            <option value={false}>After Procedure</option>
          </select>
        </div>

        <div className="custom-input my-2 px-6 py-2">
          <label for="video" class="btn">
            {file ? file.name : null}
            {messageType === 'video' && !file
              ? 'UPLOAD VIDEO'
              : !file
              ? 'UPLOAD VIDEO (OPTIONAL)'
              : null}
          </label>
          <input
            id="video"
            className="hidden"
            type="file"
            onChange={handleFile}
            required={messageType === 'video' ? true : false}
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="custom-input m-2 px-6 py-2"
            placeholder={
              messageType === 'text' ? 'ADD TEXT' : 'ADD TEXT (OPTIONAL)'
            }
            required={messageType !== 'video' ? true : false}
            name="text"
          ></textarea>
        </div>

        <div className="">
          <button
            type="submit"
            className="custom-btn text-white my-2 px-6 py-2 uppercase"
          >
            submit message
          </button>
          {/* <button
            type="submit"
            className="custom-btn text-white my-2 px-6 py-2 uppercase"
          >
            add procedure
          </button> */}
        </div>
      </form>
    </div>
  );
}
