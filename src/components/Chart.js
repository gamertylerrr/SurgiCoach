import React from 'react';
import charts from '../assets/Group 14.svg';

export default function Chart() {
  return (
    <div>
      <div className="flex justify-around">
        <p className="font-black text-base uppercase ">total</p>
        <select
          name=""
          id=""
          placeholder="procedure"
          className="uppercase custom-border rounded-md py-1 px-4"
        >
          <option value="">procedure</option>
        </select>
      </div>
      <img src={charts} alt="" className="mt-8" />
    </div>
  );
}
