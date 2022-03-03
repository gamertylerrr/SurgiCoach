import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function AddMessage({ getMessages, procedure }) {
  const [messageType, setMessageType] = useState();
  const [file, setFile] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleFile = (e) => {
    console.log('clicked');
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    setFile(uploadedFile);
  };

  const handleMessageType = (e) => {
    setMessageType(e.target.value);
  };

  const handleMessages = async (e) => {
    e.preventDefault();
    const messageForm = document.querySelector('#message-form');
    try {
      if (file) {
        const storage = getStorage();
        const fileRef = ref(storage, file.name);
        uploadBytes(fileRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(fileRef).then((url) => {
            console.log(url);
            db.collection('messages').add({
              type: messageType,
              days: messageForm['days'].value,
              isBefore: messageForm['isBefore'].value,
              videoUrl: url,
              procedure: procedure.id,
              text: messageForm['text'].value,
            });
            getMessages();
          });
        });

        return;
      }
      console.log('no file');
      console.log(procedure.id);
      db.collection('messages').add({
        procedure: procedure.id,
        type: messageType,
        days: messageForm['days'].value,
        isBefore: messageForm['isBefore'].value,
        text: messageForm['text'].value,
      });
      getMessages();
    } catch {
      setError('Failed to Add message');
    }
  };

  return (
    <div className="text-center mx-auto">
      <form action="" id="message-form" onSubmit={handleMessages}>
        <div className="flex flex-col items-center justify-between">
          {/* <input
            type="text"
            className="custom-input m-2 px-6 py-2 text-center"
            placeholder="message name"
            name="name"
          /> */}
          <select
            className="uppercase text-center custom-input m-2 px-6 py-2"
            onChange={handleMessageType}
            required
          >
            <option value="" disabled selected hidden className="">
              message type
            </option>
            <option value="text">Text</option>
            <option value="video">Video</option>
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
            {messageType == 'video' && !file
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
            required={messageType == 'video' ? true : false}
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
              messageType == 'text' ? 'ADD TEXT' : 'ADD TEXT (OPTIONAL)'
            }
            required={messageType != 'video' ? true : false}
            name="text"
          ></textarea>
        </div>

        <div className="">
          <button
            type="submit"
            className="custom-btn text-white  px-6 py-2 uppercase"
          >
            submit message
          </button>
        </div>
      </form>
    </div>
  );
}
