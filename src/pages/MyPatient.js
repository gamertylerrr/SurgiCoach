import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';
import Chart from '../components/Chart';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function MyPatient() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [procedures, setProcedures] = useState();
  const [pageData, setPageData] = useState();
  const history = useHistory();
  const { currentUser } = useAuth();

  const getProcedures = async () => {
    let arr = [];
    let procedureArr = [];

    const response = await db
      .collection('procedures')
      .where('provider', '==', currentUser.uid)
      .get();

    if (!response.empty) {
      response.forEach((doc) => {
        let procedureObject = {};
        procedureObject = doc.data();
        procedureObject.procedureId = doc.id;
        procedureArr.push(procedureObject);
      });
      setProcedures(procedureArr);
    }

    for (let procedure of procedureArr) {
      console.log(procedure);
      const patients = await db
        .collection('patients')
        .where('procedure', '==', procedure.procedureId)
        .get();
      console.log(patients.empty);

      if (!patients.empty) {
        let patientsArr = [];
        patients.forEach((patient) => {
          console.log(patient.data());
          let patientObject = patient.data();
          patientObject.patientId = patient.id;
          patientsArr.push(patientObject);
        });
        procedure.patients = patientsArr;
        arr.push(procedure);
        console.log(arr);
      } else {
        procedure.patients = [];
        arr.push(procedure);
        console.log(arr);
      }
    }
    setPageData(arr);
  };

  useEffect(() => {
    getProcedures();
  }, []);

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
                  {pageData && (
                    <>
                      {pageData.map((data, index) => (
                        <tr key={index} className="uppercase">
                          <td>{data.name}</td>
                          <td>{data.patients.length}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <p className="font-black text-base uppercase ">
              # OF PATIENTS OVER TIME:
            </p>
            <div className="flex justify-center my-8 ">
              <button
                type="submit"
                className="custom-btn text-white  py-2  uppercase "
                onClick={() => history.push('/myprocedure')}
              >
                My procedures
              </button>
            </div>
          </div>
          <div className="col-span-3">
            {procedures && <Chart procedures={procedures} />}
          </div>
        </div>
      </div>
    </div>
  );
}
