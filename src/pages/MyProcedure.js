import React from 'react';
import AddProcedure from '../components/AddProcedure';
import Header from '../components/Header';
import Procedure from '../components/Procedure';

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
  {
    name: 'labrum',
  },
  {
    name: 'labrum',
  },
  {
    name: 'labrum',
  },
  {
    name: 'labrum',
  },
  {
    name: 'labrum',
  },
  {
    name: 'labrum',
  },
  {
    name: 'labrum',
  },
  {
    name: 'labrum',
  },
  {
    name: 'labrum',
  },
  {
    name: 'labrum',
  },
  {
    name: 'labrum',
  },
];

export default function MyProcedure() {
  return (
    <div className="custom-login-bg">
      <Header />
      <div className="container mx-auto w-4/5 md:w-11/12 lg:w-45 ">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <div className="text-center col-span-2 lg:px-6 lg:mr-8">
            <p className="font-black text-xl uppercase mb-8">My Procedure</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-menu md:pr-4 lg:pr-8">
              {sampleData.map((data, index) => (
                <Procedure data={data} number={index + 1} />
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <AddProcedure />
          </div>
        </div>
      </div>
    </div>
  );
}
