import React from 'react';
import charts from '../assets/Group 14.svg';

export default function Chart({ procedures }) {
  return (
    <div>
      <div className="flex justify-around">
        <p className="font-black text-base uppercase ">total</p>
        <select
          name=""
          id=""
          placeholder="procedures"
          className="uppercase custom-border rounded-md py-1 px-4"
        >
          {procedures && (
            <>
              <option value="" disabled selected>
                PROCEDURES
              </option>
              {procedures.map((procedure, index) => (
                <option value={procedure.name} key={index}>
                  {procedure.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <img src={charts} alt="" className="mt-8" />
    </div>
  );
}
