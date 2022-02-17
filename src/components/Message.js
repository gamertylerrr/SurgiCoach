import React from 'react';

export default function Message() {
  return (
    <div className="message-wrapper p-2">
      <div className="flex items-center justify-between">
        <p className="font-black text-lg uppercase ">Message 1</p>
        <div className="flex flex-row justify-center items-center my-3">
          <button className="secondary-btn py-0 px-4 mx-2 text-center w-20 text-white">
            Edit
          </button>
          <button className="secondary-btn py-0 px-4 mx-2 text-center w-20 text-white">
            Delete
          </button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-lg">1 DAY BEFORE PROCEDURE</p>
        <p className="text-base">
          Tomorrow is your ACL Reconstruction. Do your best to get a full
          night’s rest to get ready, and please remember not to eat or drink
          after midnight tonight. We’re very much looking forward to taking care
          of you tomorrow.
        </p>
      </div>
    </div>
  );
}
