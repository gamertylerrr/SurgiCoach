import React from 'react';
import AddMessage from '../components/AddMessage';
import Header from '../components/Header';
import Message from '../components/Message';

const sampleData = [
  {
    name: 'acl',
  },
  {
    name: 'elbow',
  },
  {
    name: 'rotator cuff',
  },
  {
    name: 'mcl',
  },
  {
    name: 'meniscus',
  },
  {
    name: 'hamstring',
  },
  {
    name: 'ACHILLIES',
  },
  {
    name: 'labrum',
  },
];

export default function EditProcedure() {
  return (
    <div className="custom-login-bg relative ">
      <Header />

      <div className="container mx-auto w-4/5 md:w-11/12 lg:w-45 ">
        <div className="flex flex-row items-center md:ml-6 mb-8">
          <p className="font-black text-xl uppercase  ">My Procedure</p>
          <div className="preview-box py-2  mx-4 md:px-20 px-4">
            <p className="text-center">ACL</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <div className=" col-span-2 lg:px-6 lg:mr-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-menu md:pr-4 lg:pr-8">
              {sampleData.map((data, index) => (
                <Message />
              ))}
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
