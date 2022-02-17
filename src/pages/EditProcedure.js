import React from 'react';
import AddMessage from '../components/AddMessage';
import Header from '../components/Header';

export default function EditProcedure() {
  return (
    <div className="custom-login-bg relative ">
      <Header />

      <div className="container mx-auto w-4/5 md:w-11/12 lg:w-45 ">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <div className="text-center col-span-2 lg:px-6 lg:mr-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-menu md:pr-4 lg:pr-8">
              <div className="flex flex-row items-center">
                <p className="font-black text-xl uppercase ">My Procedure</p>
                <div className="preview-box py-2  mx-4 md:px-20 px-4">
                  <p className="text-center">ACL</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <AddMessage />
          </div>
        </div>
      </div>
    </div>
  );
}
