"use client";

import React, { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData({ ...formData, [name]: value });

        // Remove the error for the field that's being edited
        if (errors[name]) {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current Password is required';
        }
        if (!formData.newPassword) {
            newErrors.newPassword = 'New Password is required';
        } else {
            if (formData.newPassword.length < 8) {
                newErrors.newPassword = 'Password must be at least 8 characters long';
            }
            if (!/[A-Z]/.test(formData.newPassword)) {
                newErrors.newPassword = 'Password must contain at least one uppercase letter';
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)) {
                newErrors.newPassword = 'Password must contain at least one special character';
            }
            if (!/[0-9]/.test(formData.newPassword)) {
                newErrors.newPassword = 'Password must contain at least one number';
            }
        }
        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Password Changed", formData);
            // You can add logic here to handle the password change request
        }
    };

    return (
        <div className="px-6">
            <form onSubmit={handleSubmit} className="relative  py-2 md:py-0 h-auto">
                <div className='mb-6 flex flex-col justify-center items-center gap-2'>
                    <div className='text-center text-4xl font-bold '>Change Password</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Current Password Field */}
                    <div className="relative h-[4rem]">
                        <input
                            id="current_password"
                            placeholder='Enter your current password'
                            type={showPassword.currentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className={`h-[55px] bg-white p-4 rounded-lg border-black w-full block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.currentPassword ? 'border-red-500' : ''}`}
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('currentPassword')}
                            className="absolute right-3 top-[15px] text-black"
                        >
                            {showPassword.currentPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                        </button>
                        {errors.currentPassword && <p className="text-black text-xs pt-1">{errors.currentPassword}</p>}
                    </div>

                    {/* New Password Field */}
                    <div className="relative h-[5rem]">
                        <input
                            id="new_password"
                            placeholder='Enter your new password'
                            type={showPassword.newPassword ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className={`h-[55px] bg-white p-4 rounded-lg border-black w-full block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.newPassword ? 'border-red-500' : ''}`}
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('newPassword')}
                            className="absolute right-3 top-[15px] text-black"
                        >
                            {showPassword.newPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon  fontSize="small"/>}
                        </button>
                        {errors.newPassword && <p className="text-black text-xs pt-1">{errors.newPassword}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative h-[5rem] sm:col-span-2">
                        <input
                            id="confirm_password"
                            placeholder='Confirm your new password'
                            type={showPassword.confirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`h-[55px] bg-white p-4 rounded-lg border-black w-full block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                            className="absolute right-3 top-[15px] text-black"
                        >
                            {showPassword.confirmPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                        </button>
                        {errors.confirmPassword && <p className="text-black text-xs pt-1">{errors.confirmPassword}</p>}
                    </div>
                </div>

                <button type="submit" className="bg-[black] my-5  text-white p-4 w-full rounded-md cursor-pointer">
                    <div className="flex justify-center ">
                        Change Password
                    </div>
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
