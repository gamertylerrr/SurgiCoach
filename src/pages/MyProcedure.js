import React from 'react';
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
];

export default function MyProcedure() {
  return (
    <div className="custom-login-bg">
      <Header />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="text-center">
            <p className="font-black text-xl uppercase mb-8">My Procedure</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sampleData.map((data, index) => (
                <Procedure data={data} number={index + 1} />
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
