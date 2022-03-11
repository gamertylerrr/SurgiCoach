import React, { useEffect } from 'react';
import charts from '../assets/Group 14.svg';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { db } from '../firebase';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ procedures }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Patients',
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'November',
    'December',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        borderColor: 'rgb(255, 99, 132)',
        data: [10, 20, 30],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        borderColor: 'rgb(53, 162, 235)',
        data: [20, 10, 50],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  useEffect(async () => {
    console.log(procedures);
    for (let procedure of procedures) {
    }
    const response = await db
      .collection('patients')
      .where('date', '>=', new Date('2022-01-01'))
      .get();
    if (!response.empty) {
      response.forEach((doc) => {
        console.log(doc.id);
      });
    }
  }, []);

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
      <Line options={options} data={data} />
    </div>
  );
}
