import React from 'react';

export default function Procedure({ data, number }) {
  return (
    <div className="procedure-wrapper flex flex-row">
      <div class="basis-1/6 procedure-number p-2 ">
        <p className="text-black text-center">{number}</p>
      </div>
      <div class="basis-5/6 p-2">
        <p className="text-center uppercase">{data.name}</p>
      </div>
    </div>
  );
}
