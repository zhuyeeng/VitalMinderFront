import React, { useState, useEffect } from 'react';
import { updateProfile, updatePassword, setAuthToken } from '../../lib/axios'; // Adjust the path based on your project structure
import NavBar from '../NavBar/NavBar';

const PatientEditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    identityCardNumber: '',
    specialization: '',
    clinicAddress: '',
    qualifications: '',
    yearsOfExperience: '',
    assignedArea: '',
    fieldExperience: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch user data from local storage and set to form state
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setFormData({
        ...formData,
        name: userData.username,
        email: userData.email,
        dateOfBirth: userData.date_of_birth,
        gender: userData.gender,
        phoneNumber: userData.phone_number,
        identityCardNumber: userData.identity_card_number,
        specialization: userData.specialization || '',
        clinicAddress: userData.clinic_address || '',
        qualifications: userData.qualifications || '',
        yearsOfExperience: userData.years_of_experience || '',
        assignedArea: userData.assigned_area || '',
        fieldExperience: userData.field_experience || ''
      });
      setUserRole(userData.user_role);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Make sure the token is correctly retrieved (syntax error on here that why cannot update)

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('date_of_birth', formData.dateOfBirth);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('phone_number', formData.phoneNumber);
    formDataToSend.append('identity_card_number', formData.identityCardNumber);
    if (profileImage) {
      formDataToSend.append('profile_image', profileImage);
    }

    if (userRole === 'doctor') {
      formDataToSend.append('specialization', formData.specialization);
      formDataToSend.append('clinic_address', formData.clinicAddress);
      formDataToSend.append('qualifications', formData.qualifications);
      formDataToSend.append('years_of_experience', formData.yearsOfExperience);
    } else if (userRole === 'paramedic') {
      formDataToSend.append('qualifications', formData.qualifications);
      formDataToSend.append('assigned_area', formData.assignedArea);
      formDataToSend.append('field_experience', formData.fieldExperience);
    }

    try {
      setAuthToken(token); // Set the authorization token
      const response = await updateProfile(formDataToSend);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      setAuthToken(token); // Set the authorization token
      const response = await updatePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword
      });
      alert(response.message);
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password. Please try again.');
    }
  };

  const toggleForm = (form) => {
    setShowProfileForm(form === 'profile');
  };

  console.log(formData);

  return (
    <div className="min-h-screen flex flex-col my-auto mx-auto">
      <NavBar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md w-11/12 lg:w-4/5 max-w-4xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Profile Editing</h2>
          <div className="flex flex-col lg:flex-row">
            <div className="flex gap-2 lg:w-1/4 lg:p-4 lg:flex-col mb-4 lg:mb-0 lg:gap-4">
              <button 
                onClick={() => toggleForm('profile')} 
                className={`w-full py-2 px-4 rounded ${showProfileForm ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              >
                Profile
              </button>
              <button 
                onClick={() => toggleForm('password')} 
                className={`w-full py-2 px-4 rounded ${!showProfileForm ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              >
                Password
              </button>
            </div>
            <div className="w-full lg:w-3/4 p-4">
              {showProfileForm ? (
                <form onSubmit={handleSubmitProfile}>
                  <div className="flex justify-center mb-4">
                    <label htmlFor="profileImage" className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden">
                      {imagePreviewUrl ? (
                        <img src={imagePreviewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-500 cursor-pointer">Click To Upload</span>
                      )}
                      <input type="file" id="profileImage" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-black">Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                    </div>
                    <div>
                      <label className="block text-black">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                    </div>
                    <div>
                      <label className="block text-black">Date of Birth</label>
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                    </div>
                    <div>
                      <label className="block text-black">Gender</label>
                      <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                    </div>
                    <div>
                      <label className="block text-black">Phone Number</label>
                      <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                    </div>
                    <div>
                      <label className="block text-black">Identity Card Number</label>
                      <input type="text" name="identityCardNumber" value={formData.identityCardNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                    </div>
                    {userRole === 'doctor' && (
                      <>
                        <div>
                          <label className="block text-black">Specialization</label>
                          <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                        </div>
                        <div>
                          <label className="block text-black">Clinic Address</label>
                          <input type="text" name="clinicAddress" value={formData.clinicAddress} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                        </div>
                        <div>
                          <label className="block text-black">Qualifications</label>
                          <input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                        </div>
                        <div>
                          <label className="block text-black">Years of Experience</label>
                          <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                        </div>
                      </>
                    )}
                    {userRole === 'paramedic' && (
                      <>
                        <div>
                          <label className="block text-black">Qualifications</label>
                          <input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                        </div>
                        <div>
                          <label className="block text-black">Assigned Area</label>
                          <input type="text" name="assignedArea" value={formData.assignedArea} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                        </div>
                        <div>
                          <label className="block text-black">Field Experience (Years)</label>
                          <input type="number" name="fieldExperience" value={formData.fieldExperience} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Update</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmitPassword}>
                  <h2 className="text-xl font-bold mb-4 text-black">Changing Password</h2>
                  <div className="mb-4">
                    <label className="block text-black">Old Password</label>
                    <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-black">New Password</label>
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-black">Confirm New Password</label>
                    <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded text-black" />
                  </div>
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Update</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientEditProfile;
