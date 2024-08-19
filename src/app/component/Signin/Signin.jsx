import React, { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, signInWithEmailAndPassword,signInWithPopup,GithubAuthProvider } from "firebase/auth";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import app from "../../../utils/firebaseconfig.js";
import { GoogleAuthProvider } from "firebase/auth";
function Signin({setPhoneLogin}) {
  const auth = getAuth(app);
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const provider = new GoogleAuthProvider();



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
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email must be a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setErrors({});

      console.log('Submit', formData.email, formData.password)

      try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        const user = userCredential.user;
        console.log(user.accessToken)
        localStorage.setItem('token', user.accessToken)
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
      }
    }
  };


  const signInwithGoogle=async()=>{
    try{
      const result=await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem('token', token);
  
    }catch(error){  
      const errorCode = error.code;
      const errorMessage = error.message;
  
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode,errorMessage)
    }
    
   
  
  }
  const signInwithGithub=async()=>{
    try{
      const result=await signInWithPopup(auth, provider)
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem('token', token);
  
    }catch(error){  
      const errorCode = error.code;
      const errorMessage = error.message;
  
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
      console.log(errorCode,errorMessage)
    }
    
   
  
  }

  return (
    <div className='relative'>
      <div className=''>
        <div className='mb-5 flex flex-col justify-center items-center gap-2'>
          <div className='text-center text-4xl font-bold '>SignIn</div>
          <div className="w-full flex justify-center items-center gap-5">
          <div onClick={signInwithGoogle} className='cursor-pointer' ><GoogleIcon /></div>
            <div className='cursor-pointer' ><FacebookIcon /></div>
            <div className='cursor-pointer' onClick={signInwithGithub} ><GitHubIcon /></div>
            <div className='cursor-pointer' ><XIcon /></div>
          </div>
          <div>or use your email password

          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-0 relative h-[70px]">

            <input
              id="floating_outlined"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`p-4 rounded-lg bg-white border-black bg-transparent w-full h-[55px] xs:h-[59px] block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.email ? 'border-red-500' : ''}`}
              placeholder='Enter Email'
            />


            {errors.email && <p className="text-white text-xs  p-1">{errors.email}</p>}
          </div>
          <div className="relative mb-0 h-[70px]">
            <input
              id="floating_outlined2"
              placeholder='Enter Password'
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-3 md:mt-5 h-[55px]  bg-white xs:h-[59px] p-4 rounded-lg border-black bg-transparent w-full block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.password ? 'border-red-500' : ''}`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute xs:top-[1.3rem] top-[18px] right-0 pr-3 flex items-center"
            >
              {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}

            </button>
            {errors.password && <p className="text-white text-xs  p-1">{errors.password}</p>}
          </div>


          <button type="submit" className="bg-[black] mt-6 text-white xs:p-4 p-2   w-full rounded-md">
            <div className="flex justify-center ">
              Log In
            </div>
          </button>
          <div className='flex justify-evenly mt-5 '>
            <div className='h-[2px] bg-black w-3/6 xs:mt-3 mt-2'></div>
            <div className='pl-2 pr-2 font-bold text-black'>or</div>
            <div className='h-[2px] bg-black w-3/6 xs:mt-3 mt-2'></div>
          </div>
          <div className="mt-5  text-center">
            <button
              type="button"
              className=" xs:p-4 p-2 w-full border-[2px] rounded-md border-black bg-transparent text-white"
              onClick={()=>setPhoneLogin(true)}
            >
              Login via OTP
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signin