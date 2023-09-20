import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '', 
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isPasswordUpdateMode, setIsPasswordUpdateMode] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const togglePasswordUpdateMode = () => {
    setIsPasswordUpdateMode((prev) => !prev);
    setFormData({
      userName: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      if (isPasswordUpdateMode) {
        const response = await axios.put('http://localhost:3001/api/update-password', {
          userName: formData.userName, 
          newPassword: formData.newPassword,
        });

        if (response.status === 200) {
          toast.success('Password updated successfully');
          togglePasswordUpdateMode();
        } else {
          console.error('Password update failed');
        }
      } else {
        const response = await axios.post('http://localhost:3001/api/login', {
          userName: formData.userName, 
          password: formData.password,
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
          console.log('Login successful');
          toast.success('Logged In');
          navigate('/dashboard');
        } else {
          console.error('Login failed');
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Login/password update error:', error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
      <label className="w-full">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          User Name<sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text" 
          value={formData.userName} 
          onChange={changeHandler}
          placeholder="Enter user name" 
          name="userName" 
          className="bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white placeholder-gray-300 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring
           focus:ring-blue-200 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
        />
      </label>

      {isPasswordUpdateMode ? (
        <>
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              New Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={changeHandler}
              placeholder="Enter New Password"
              name="newPassword"
              className="bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white
               placeholder-gray-300 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />

            {}
          </label>

          {}
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm New Password"
              name="confirmPassword"
              className="bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white placeholder-gray-300 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200
               rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
          </label>
        </>
      ) : (
        <>
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter Password"
              name="password"
              className="bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white placeholder-gray-300 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200
               rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />

            {}
          </label>

        </>
      )}

      <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
        {isPasswordUpdateMode ? 'Update Password' : 'Sign In'}
      </button>

      {}
      <button
        type="button"
        onClick={togglePasswordUpdateMode}
        className="text-xs text-richblack-900 max-w-max  ml-auto"
      >
        {isPasswordUpdateMode ? 'Back to Login' : 'Update Password'}
      </button>
    </form>
  );
};

export default LoginForm;
