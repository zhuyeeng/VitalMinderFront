import React, { useState, useEffect } from 'react';
import axiosInstance from './../../lib/axios';

const WaitingListTable = () => {
  const [waitingList, setWaitingList] = useState([]);

  useEffect(() => {
    // fetchWaitingList();
  }, []);

  // const fetchWaitingList = async () => {
  //   try {
  //     const response = await axiosInstance.get('/waiting-list');
  //     console.log('Waiting List:', response.data);
  //     setWaitingList(response.data);
  //   } catch (error) {
  //     console.error('Error fetching waiting list:', error);
  //   }
  // };

  // console.log("Waiting List: ", waitingList);

  return (
    <table>
      <thead>
        <tr>
          <th>Patient Name</th>
          <th>Doctor Name</th>
          <th>Waiting Number</th>
        </tr>
      </thead>
      <tbody>
        {waitingList.map(item => (
          <tr key={item.id}>
            <td>{item.patient_name || 'N/A'}</td>
            <td>{item.doctor_name || 'N/A'}</td>
            <td>{item.waiting_number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WaitingListTable;
