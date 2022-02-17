import React from 'react';

export default function Procedure({ data, number }) {
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
        <button className="secondary-btn py-0 px-6 mx-2 text-center w-24 text-white">
          Edit
        </button>
        <button className="secondary-btn py-0 px-6 mx-2 text-center w-24 text-white">
          Delete
        </button>
      </div>
    </div>
  );
}
