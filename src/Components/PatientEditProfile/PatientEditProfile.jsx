import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';

const PatientEditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    identityCardNumber: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
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

  const toggleForm = (form) => {
    setShowProfileForm(form === 'profile');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md w-11/12 lg:w-4/5 max-w-4xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Profile Editing</h2>
          <div className="flex flex-col lg:flex-row">
            <div className="flex gap-2 lg:w-1/4 lg:p-4 lg:flex-col mb-4 lg:mb-0 lg:gap-0">
              <button onClick={() => toggleForm('profile')} className={`w-full lg:mb-4 lg:w-auto py-2 px-4 rounded ${showProfileForm ? 'bg-gray-300' : 'bg-gray-200'}`}>Profile</button>
              <button onClick={() => toggleForm('password')} className={`w-full lg:w-auto py-2 px-4 rounded ${!showProfileForm ? 'bg-gray-300' : 'bg-gray-200'}`}>Password</button>
            </div>
            <div className="w-full lg:w-3/4 p-4">
              {showProfileForm ? (
                <form onSubmit={handleSubmit}>
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
                      <label className="block text-gray-700">Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-gray-700">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-gray-700">Date of Birth</label>
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-gray-700">Gender</label>
                      <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-gray-700">Phone Number</label>
                      <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-gray-700">Identity Card Number</label>
                      <input type="text" name="identityCardNumber" value={formData.identityCardNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Update</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold mb-4">Changing Password</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700">Old Password:</label>
                    <input type="password" name="oldPassword" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">New Password:</label>
                    <input type="password" name="newPassword" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Confirm New Password:</label>
                    <input type="password" name="confirmNewPassword" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
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
