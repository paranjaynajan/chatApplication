"use client";

import React, { useState, useEffect } from "react";
import { updateProfile, getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../../utils/firebaseconfig"
const UpdateProfile = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        age: '',
    });
    const [errors, setErrors] = useState({});
    const auth = getAuth(app)
    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    useEffect(() => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        console.log(user)
        if (user)
            setFormData((prev) => {
                let obj = {}
                obj.fullName = user.displayName
                obj.email = user.email
                obj.phone = user.phoneNumber
                return obj
            })
    }, [])


    useEffect(() => {
        if (formData.dob) {
            setFormData((prevData) => ({
                ...prevData,
                age: calculateAge(formData.dob).toString(),
            }));
        }
    }, [formData.dob]);

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
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email must be a valid email address ending with .com';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Submitted", formData);
            updateProfile(formData.email)



            
        }
    };
    const updateProfile = async (email) => {
        try {
          const usersRef = collection(db, "users");    
           const q = query(usersRef, where("email", "==", email));  
           const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userDocRef = doc(db, "users", userDoc.id);

            await updateDoc(userDocRef, {
              displayName:formData.fullName,
              gender:formData.gender,
              phone:formData.phone,
              age:formData.age
            });
          } else {
            console.log("No user found with the provided email.");
          }
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      };
    return (
        <div className="px-6">
            <form onSubmit={handleSubmit} className="relative py-2 md:py-0 h-auto ">
                <div className='mb-5 flex flex-col justify-center items-center gap-2'>
                    <div className='text-center text-4xl font-bold '>Update Profile</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name Field */}
                    <div className="relative h-[4rem]">
                        <input
                            id="update_fullname"
                            placeholder='Enter your full name'
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`h-[55px] bg-white p-4 rounded-lg border-black w-full block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.fullName ? 'border-red-500' : ''}`}
                        />
                        {errors.fullName && <p className="text-black text-xs pt-1">{errors.fullName}</p>}
                    </div>

                    {/* Email Field (Readonly) */}
                    <div className="relative h-[4rem]">
                        <input
                            id="update_email"
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className={`h-[55px] bg-gray-100 p-4 rounded-lg border-black w-full block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.email ? 'border-red-500' : ''}`}
                            placeholder='Email'
                        />
                        {errors.email && <p className="text-black text-xs pt-1">{errors.email}</p>}
                    </div>

                    {/* Phone Number Field */}
                    <div className="relative h-[4rem]">
                        <input
                            id="update_phone"
                            type="number"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`p-4 rounded-lg bg-white border-black w-full h-[55px] block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.phone ? 'border-red-500' : ''} hide-number-input-arrows`}
                        />
                        {errors.phone && <p className="text-black text-xs pt-1">{errors.phone}</p>}
                    </div>

                    {/* Gender Field */}
                    <div className="relative h-[4rem]">
                        <select
                            id="update_gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={`p-4 rounded-lg bg-white border-black w-full h-[55px] block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.gender ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="text-black text-xs pt-1">{errors.gender}</p>}
                    </div>

                    {/* Date of Birth Field */}
                    <div className="relative h-[4rem]">
                        <input
                            id="update_dob"
                            type="date"
                            name="dob"
                            placeholder="select dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className={`p-4 rounded-lg bg-white border-black w-full h-[55px] block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.dob ? 'border-red-500' : ''}`}
                        />
                        {errors.dob && <p className="text-black text-xs pt-1">{errors.dob}</p>}
                    </div>

                    {/* Age Field (Readonly) */}
                    <div className="relative h-[4rem]">
                        <input
                            id="update_age"
                            type="text"
                            name="age"
                            value={formData.age}
                            readOnly
                            className={`h-[55px] bg-gray-100 p-4 rounded-lg border-black w-full block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer`}
                            placeholder='Age'
                        />
                    </div>
                </div>

                <button type="submit" className="bg-[black] mt-5 text-white p-4 w-full rounded-md cursor-pointer">
                    <div className="flex justify-center ">
                        Update Profile
                    </div>
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;
