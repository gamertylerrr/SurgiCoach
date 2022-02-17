import React from 'react';

export default function AddMessage() {
  return (
    <div className="text-center mx-auto w-11/12">
      <form action="">
        <div className="flex flex-col items-center justify-between">
          <input
            type="text"
            className="custom-input m-2 px-6 py-2"
            placeholder="procedure name"
          />
          <input
            type="text"
            className="custom-input m-2 px-6 py-2"
            placeholder="message type"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <input
            type="text"
            className="custom-input my-2 mr-4  py-2"
            placeholder="days"
            style={{ maxWidth: '100px' }}
          />
          <input
            type="text"
            className="custom-input my-2  px-6 py-2"
            placeholder="before procedure"
          />
        </div>
        <div className="custom-input my-2 px-6 py-2">
          <label for="files" class="btn">
            UPLOAD FILE (OPTIONAL)
          </label>
          <input id="files" className="hidden" type="file" />
        </div>
        <div className="flex flex-col items-center justify-between">
          <input
            type="text"
            className="custom-input m-2 px-6 py-2"
            placeholder="Add text (optional)"
          />
        </div>
        <div className="">
          <button
            type="submit"
            className="custom-btn text-white my-2 px-6 py-2 uppercase"
          >
            submit message
          </button>
          <button
            type="submit"
            className="custom-btn text-white my-2 px-6 py-2 uppercase"
          >
            add message
          </button>
        </div>
      </form>
    </div>
  );
}
