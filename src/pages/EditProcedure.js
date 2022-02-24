import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddMessage from '../components/AddMessage';
import Header from '../components/Header';
import Message from '../components/Message';
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
];

export default function EditProcedure() {
  const [messages, setMessages] = useState();
  const [error, setError] = useState();
  const { id } = useParams();
  const getMessages = async () => {
    const response = await db
      .collection('messages')
      .where('procedure', '==', id)
      .get();
    if (!response.empty) {
      let arr = [];
      response.forEach((doc) => {
        let obj = doc.data();
        obj.id = doc.id;
        arr.push(obj);
      });
      setMessages(arr);
      console.log(arr);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="custom-login-bg relative ">
      <Header />
      <div className="container mx-auto w-4/5 md:w-11/12 lg:w-45  ">
        <div className="flex flex-row items-center md:ml-6 mb-8">
          <p className="font-black text-xl uppercase">My Procedure</p>
          <div className="preview-box py-2  mx-4 md:px-20 px-4">
            <p className="text-center">ACL</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <div className=" col-span-2 lg:px-6 lg:mr-8">
            {error && <p className="font-bold text-lg">{error}</p>}
            {!messages && (
              <p className="font-bold text-lg">No Messages available</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-menu md:pr-4 lg:pr-8">
              {messages &&
                messages.map((data, index) => (
                  <Message
                    data={data}
                    getMessages={getMessages}
                    setError={setError}
                    index={index + 1}
                  />
                ))}
            </div>
          </div>
          <div className="hidden md:block ">
            <AddMessage getMessages={getMessages} />
          </div>
        </div>
      </div>
    </div>
  );
}
