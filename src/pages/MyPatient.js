import React from 'react';
import Header from '../components/Header';

export default function MyPatient() {
  return (
    <div className="custom-login-bg relative ">
      <Header />

      <div className="container mx-auto w-4/5 md:w-11/12 lg:w-45 ">
        <div className="grid grid-cols-1 md:grid-cols-5 ">
          <div className="col-span-2">
            <p className="font-black text-xl uppercase">My patients</p>
          </div>
          <div className=" col-span-3">
            <div className="grid grid-cols-1 gap-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
