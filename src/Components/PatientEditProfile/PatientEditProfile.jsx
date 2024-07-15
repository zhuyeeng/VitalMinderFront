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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md w-4/5 max-w-4xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Profile Editing</h2>
          <div className="flex">
            <div className="w-1/4 p-4">
              <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded mb-4">Profile</button>
              <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded">Password</button>
            </div>
            <div className="w-3/4 p-4">
              <form onSubmit={handleSubmit}>
                <div className="flex justify-center mb-4">
                  <label htmlFor="profileImage" className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden">
                    {imagePreviewUrl ? (
                      <img src={imagePreviewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-500">Upload Profile Image</span>
                    )}
                    <input type="file" id="profileImage" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientEditProfile;
