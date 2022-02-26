import React, { useEffect, useState } from 'react';
import AddProcedure from '../components/AddProcedure';
import Header from '../components/Header';
import Procedure from '../components/Procedure';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

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
  const [procedures, setProcedures] = useState();
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const getProcedures = async () => {
    const response = await db
      .collection('procedures')
      .where('provider', '==', currentUser.uid)
      .get();
    if (!response.empty) {
      let arr = [];
      response.forEach((doc) => {
        let obj = doc.data();
        obj.id = doc.id;
        arr.push(obj);
      });
      setProcedures(arr);
    }
  };
  useEffect(() => {
    getProcedures();
  }, []);

  return (
    <div className="custom-login-bg">
      <Header />
      <div className="container mx-auto w-4/5 md:w-11/12 lg:w-45 ">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <div className="text-center col-span-2 lg:px-6 lg:mr-8">
            <p className="font-black text-xl uppercase mb-8">My Procedure</p>
            {error && <p className="font-bold text-lg">{error}</p>}
            {!procedures && (
              <p className="font-bold text-lg">No Procedures available</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-menu md:pr-4 lg:pr-8">
              {procedures &&
                procedures.map((data, index) => (
                  <Procedure
                    data={data}
                    number={index + 1}
                    getProcedures={getProcedures}
                    setError={setError}
                  />
                ))}
            </div>
          </div>
          <div className="hidden md:block">
            <AddProcedure getProcedures={getProcedures} />
          </div>
        </div>
      </div>
    </div>
  );
}
