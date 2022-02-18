import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';
import Chart from '../components/Chart';
import Header from '../components/Header';

export default function MyPatient() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const history = useHistory();

  return (
    <div className="custom-login-bg relative ">
      <Header />
      <div className="container mx-auto w-4/5 md:w-11/12 lg:w-45 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-5 md:gap-12 ">
          <div className="col-span-2">
            <p className="font-black text-xl uppercase ">My patients</p>
            <div
              className="flex items-center py-4 "
              style={{ borderBottom: '1px solid #2b426a' }}
            >
              <p className="uppercase text-sm mr-2 ">set date range :</p>
              <div className="flex flex-wrap lg:flex-nowrap items-center justify-center">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="text-center custom-border  rounded-md py-1 w-32"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="text-center custom-border lg:mx-2 rounded-md py-1 w-32 my-2 lg:my-0"
                />
              </div>
            </div>
            <div className="py-4" style={{ borderBottom: '1px solid #2b426a' }}>
              <p className="font-black text-base uppercase ">
                # OF PATIENTS BY PROCEDURE:
              </p>
              <table className="w-36">
                <tbody>
                  <tr>
                    <td>ACL</td>
                    <td>110</td>
                  </tr>
                  <tr>
                    <td>ACL</td>
                    <td>110</td>
                  </tr>
                  <tr>
                    <td>ACL</td>
                    <td>110</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="font-black text-base uppercase ">
              # OF PATIENTS OVER TIME:
            </p>
            <div className="flex justify-center my-8 ">
              <button
                type="submit"
                className="custom-btn text-white  py-2 uppercase "
                onClick={() => history.push('/myprocedure')}
              >
                My procedures
              </button>
            </div>
          </div>
          <div className="col-span-3">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}
