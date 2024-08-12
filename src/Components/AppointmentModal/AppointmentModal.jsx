import React, { useState, useEffect } from 'react';
import { fetchStaffByUserId } from '../../lib/axios';

const AppointmentModal = ({ show, onClose, onSubmit, patients, doctors, userRole, username }) => {
  const [isForSelf, setIsForSelf] = useState(true);
  const [appointment, setAppointment] = useState({
    patient_id: '',
    patient_name: '',
    doctor_id: '',
    name: '',
    date: '',
    time: '',
    type: '',
    blood_type: '',
    details: ''
  });
  const [errors, setErrors] = useState({});
  const [paramedicId, setParamedicId] = useState('');

  useEffect(() => {
    if (userRole === 'patient' && patients.patient) {
      if (isForSelf) {
        setAppointment(prevState => ({
          ...prevState,
          patient_name: username,
          patient_id: patients.patient.id || '' 
        }));
      } else {
        setAppointment(prevState => ({
          ...prevState,
          patient_name: '',
          patient_id: null 
        }));
      }
    }

    if (userRole === 'paramedic') {
      const fetchStaffDetails = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
          const staffDetail = await fetchStaffByUserId(user.id);
          if (staffDetail && staffDetail.details && staffDetail.details.id) {
            setParamedicId(staffDetail.details.id); // Set the paramedic_id
            setAppointment(prevState => ({
              ...prevState,
              paramedic_id: staffDetail.details.id // Include paramedic_id in appointment state
            }));
          } else {
            console.error('Staff details not found or invalid.');
          }
        } catch (error) {
          console.error('Error fetching staff details:', error);
        }
      };
      fetchStaffDetails();
    }
  }, [isForSelf, username, userRole, patients]);

  const handleChange = (field, value) => {
    setAppointment(prevState => ({
      ...prevState,
      [field]: value
    }));
    setErrors(prevState => ({
      ...prevState,
      [field]: ''
    }));
  };

  const handlePatientChange = (value) => {
    const selectedPatient = patients.find(patient => patient.username === value);
    setAppointment(prevState => ({
      ...prevState,
      patient_id: selectedPatient ? selectedPatient.id : '',
      patient_name: selectedPatient ? selectedPatient.username : ''
    }));
    setErrors(prevState => ({
      ...prevState,
      patient_name: ''
    }));
  };

  const handleDoctorChange = (doctorId) => {
    setAppointment(prevState => ({
      ...prevState,
      doctor_id: doctorId
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!appointment.patient_name) newErrors.patient_name = 'Please enter a patient name.';
    if (!appointment.name) newErrors.name = 'Please enter an appointment name.';
    if (!appointment.date) newErrors.date = 'Please select a date.';
    if (!appointment.time) newErrors.time = 'Please select a time.';
    if (!appointment.type) newErrors.type = 'Please select an appointment type.';
    if (!appointment.blood_type) newErrors.blood_type = 'Please select a blood type.';
    if (userRole === 'paramedic' && !appointment.doctor_id) newErrors.doctor_id = 'Please select a doctor.';
    return newErrors;
  };

  const handleSubmit = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // console.log(appointment);
    onSubmit(appointment);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#EEEDEB] p-6 rounded-lg shadow-lg relative w-full max-w-lg h-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-black">Create Appointment Form</h2>
        <form onSubmit={handleSubmit}>
          {userRole === 'patient' && (
            <div className="mb-4">
              <label className="block text-gray-700">Appointment For</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="forSelf"
                  name="forSelf"
                  value="self"
                  checked={isForSelf}
                  onChange={() => setIsForSelf(true)}
                />
                <label htmlFor="forSelf" className="ml-2 text-black">Myself</label>
                <input
                  type="radio"
                  id="forOther"
                  name="forSelf"
                  value="other"
                  checked={!isForSelf}
                  onChange={() => setIsForSelf(false)}
                  className="ml-4"
                />
                <label htmlFor="forOther" className="ml-2 text-black">Someone Else</label>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-xl">Patient Name</label>
              {userRole === 'paramedic' ? (
                <select
                  className="w-full p-2 border rounded-md text-black"
                  value={appointment.patient_name}
                  onChange={(e) => handlePatientChange(e.target.value)}
                >
                  <option value="" className="text-black">Select Patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.username} className="text-black">{patient.username}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-black"
                  value={appointment.patient_name}
                  onChange={(e) => handleChange('patient_name', e.target.value)}
                  disabled={isForSelf}
                />
              )}
              {errors.patient_name && <p className="text-red-500 text-sm mt-1">{errors.patient_name}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-xl">Appointment Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md text-black"
                value={appointment.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-xl">Appointment Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md text-black"
                value={appointment.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-xl">Appointment Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded-md text-black"
                value={appointment.time}
                onChange={(e) => handleChange('time', e.target.value)}
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-xl">Appointment Type</label>
              <select
                className="w-full p-2 border rounded-md text-black"
                value={appointment.type}
                onChange={(e) => handleChange('type', e.target.value)}
              >
                <option value="" className="text-black">Select Appointment Type</option>
                <option value="General Checkup" className="text-black">General Checkup</option>
                <option value="Specialist Consultation" className="text-black">Specialist Consultation</option>
                <option value="Follow-up" className="text-black">Follow-up</option>
                <option value="Emergency" className="text-black">Emergency</option>
                <option value="Vaccination" className="text-black">Vaccination</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-xl">Blood Type</label>
              <select
                className="w-full p-2 border rounded-md text-black"
                value={appointment.blood_type}
                onChange={(e) => handleChange('blood_type', e.target.value)}
              >
                <option value="" className="text-black">Select Blood Type</option>
                <option value="A+" className="text-black">A+</option>
                <option value="A-" className="text-black">A-</option>
                <option value="B+" className="text-black">B+</option>
                <option value="B-" className="text-black">B-</option>
                <option value="AB+" className="text-black">AB+</option>
                <option value="AB-" className="text-black">AB-</option>
                <option value="O+" className="text-black">O+</option>
                <option value="O-" className="text-black">O-</option>
              </select>
              {errors.blood_type && <p className="text-red-500 text-sm mt-1">{errors.blood_type}</p>}
            </div>
          </div>
          {userRole === 'paramedic' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-xl">Assign Doctor</label>
                <select
                  className="w-full p-2 border rounded-md text-black"
                  value={appointment.doctor_id}
                  onChange={(e) => handleDoctorChange(e.target.value)} // Pass the doctor ID directly
                >
                  <option value="" className="text-black">Select Doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.details.id} className="text-black">
                      {doctor.username} {/* Display the doctor's username */}
                    </option>
                  ))}
                </select>
                {errors.doctor_id && <p className="text-red-500 text-sm mt-1">{errors.doctor_id}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xl hidden">Paramedic ID</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-black hidden"
                  value={paramedicId}
                  disabled
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-xl">Appointment Details</label>
            <textarea
              className="w-full p-2 border rounded-md text-black"
              value={appointment.details}
              onChange={(e) => handleChange('details', e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="relative text-black px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#6EE7B7] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
