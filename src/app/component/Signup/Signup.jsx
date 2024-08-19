"use client";


import Image from 'next/image';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import { v4 as uuidv4 } from 'uuid';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { getDatabase, ref, set } from "firebase/database"
import { getAuth, createUserWithEmailAndPassword, signInWithPopup ,updateProfile} from "firebase/auth";
import app from "../../../utils/firebaseconfig.js";
import { collection, addDoc, getFirestore } from "firebase/firestore"




const db = getFirestore(app);


const SignUp = () => {
    const auth = getAuth(app);
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dropdownRef = useRef(null);
    function writeUserData(userId, name, email, phone) {
        set(ref(db, 'users/' + userId), {
            username: name,
            phone: phone,
            email: email,
        });
    }
async function writeIntoFireStore( name, email, phone,photoUrl){
    try {
        console.log('Writing', name, email, photoUrl);
        const docRef = await addDoc(collection(db, "users"), {
            username: name,
            phone: phone,
            email: email,
            photoUrl:photoUrl
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
          }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
        }
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email must be a valid email address ending with .com';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
        else if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Password must contain at least one uppercase letter';
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) newErrors.password = 'Password must contain at least one special character';
        else if (!/[0-9]/.test(formData.password)) newErrors.password = 'Password must contain at least one number';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {

            setErrors({});
            try {

                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                const user = userCredential.user;
                await updateProfile(user, {
                    displayName: formData.name,
                });
                writeIntoFireStore( formData.name, formData.email, formData.phoneNumber,user.photoURL)
                localStorage.setItem('token', user.accessToken)
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            }



        }
    };






    return (

        <form onSubmit={handleSubmit} className=" relative py-2 md:py-0 h-auto">
            <div className='mb-5 flex flex-col justify-center items-center gap-2'>
                <div className='text-center text-4xl font-bold '>SignUp</div>
                <div className="w-full flex justify-center items-center gap-5">
                    <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                        <GoogleIcon />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <XIcon />
                    </a>

                </div>
                <div className='text-center'>or use your email for registration
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 ">
                <div className="relative h-20">
                    <input
                        id="signup_outlined1"
                        placeholder='Enter your name'
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`h-[55px] xs:h-[55px] bg-white  p-4 rounded-lg border-black bg-transparent w-full block text-sm text-black border-2 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer ${errors.name ? 'border-red-500' : ''}`}
                    />

                    {errors.name && <p className="text-black text-xs pt-1">{errors.name}</p>}
                </div>

                <div className="relative h-20">
                    <input
                        id="signup_outlined2"
                        type="number"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`p-4 rounded-lg bg-white  border-black bg-transparent w-full h-[55px] xs:h-[59px] block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.phoneNumber ? 'border-red-500' : ''} hide-number-input-arrows`}

                    />

                    {errors.phoneNumber && <p className="text-black text-xs pt-1">{errors.phoneNumber}</p>}
                </div>


                <div className="relative h-20">
                    <input
                        id="signup_outlined3"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`h-[55px] xs:h-[59px] bg-white  p-4 rounded-lg border-black bg-transparent w-full block text-sm text-black border-2 appearance-none  dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer ${errors.email ? 'border-red-500' : ''}`}
                        placeholder='Enter your email address'
                    />

                    {errors.email && <p className="text-black text-xs pt-1">{errors.email}</p>}
                </div>



                <div className="relative  h-20">
                    <input
                        id="signup_outlined4"
                        placeholder='Enter your password'
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`p-4 h-[55px] bg-white  xs:h-[59px] rounded-lg border-black bg-transparent w-full block text-sm text-black border-2 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer ${errors.password ? 'border-red-500' : ''}`}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute xs:top-[1.3rem] top-[18px] text-black right-0 pr-3 flex items-center"
                    >
                        {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                    </button>
                    {errors.password && <p className="text-black text-xs p-1">{errors.password}</p>}
                </div>
                <div className="relative h-20 ">
                    <input
                        id="signup_outlined5"
                        placeholder='Confirm your password'
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`p-4 h-[55px] bg-white  xs:h-[59px] rounded-lg border-black bg-transparent w-full block text-sm text-black border-2 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute xs:top-[1.3rem] top-[18px] right-0 pr-3 flex text-black items-center"
                    >
                        {showConfirmPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                    </button>
                    {errors.confirmPassword && <p className="text-black text-xs pt-1">{errors.confirmPassword}</p>}
                </div>
            </div>
            <button type="submit" className="bg-[black] mt-2 text-white xs:p-4 p-2   w-full rounded-md cursor-pointer">
                <div className="flex justify-center ">
                    Sign Up
                </div>
            </button>



        </form>
    );
};

export default SignUp;
