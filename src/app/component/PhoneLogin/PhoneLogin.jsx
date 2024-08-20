import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, getAuth, signInWithPhoneNumber, signInWithPopup, GithubAuthProvider, RecaptchaVerifier } from "firebase/auth";
import {app} from "../../../utils/firebaseconfig.js";

const countryCodes = [
  { code: '+91', country: 'IN' },
  { code: '+1', country: 'US' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'AU' },
  // Add more country codes as needed
];

function LoginWithMobile({ setPhoneLogin }) {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [formData, setFormData] = useState({ countryCode: '+1', phone: '' });
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            handleSignIn();
          },
          "expired-callback": () => {
            console.log("Recaptcha expired, please try again.");
          },
        },
        auth
      );
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleCountryCodeChange = (code) => {
    setFormData({ ...formData, countryCode: code });
    setShowDropdown(false);
  };

  const validatePhoneNumber = () => {
    const newErrors = {};
    const phoneNumber = formData.phone.replace(/[^0-9]/g, ''); // Strip non-numeric characters
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneNumber.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (validatePhoneNumber()) {


      const formatPh = `${formData.countryCode}${formData.phone}`;
      const appVerifier = window.recaptchaVerifier;

      try {
        const confirmationResult = await signInWithPhoneNumber(auth, formatPh, true);
        setConfirmationResult(confirmationResult);
        setIsCodeSent(true);
        console.log("SMS sent. Waiting for verification code...");
      } catch (error) {
        console.error("Error during sign-in with phone number:", error);
       
      }
    }
  };

  const handleVerifyCode = async () => {
    if (confirmationResult) {
      try {
        const result = await confirmationResult.confirm(verificationCode);
        const user = result.user;
        console.log("User signed in successfully:", user);
        // Navigate or perform other actions after successful sign-in
      } catch (error) {
        console.error("Error during verification:", error);
        setErrors({ verificationCode: 'Invalid verification code. Please try again.' });
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem('token', token);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem('token', token);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='relative'>
      <div id="recaptcha-container"></div>
      <div className=''>
        <div className='mb-5 flex flex-col justify-center items-center gap-2'>
          <div className='text-center text-4xl font-bold '>Login via Mobile</div>
          <div className="w-full flex justify-center items-center gap-5">
            <div onClick={signInWithGoogle} className='cursor-pointer' ><GoogleIcon /></div>
            <div className='cursor-pointer' ><FacebookIcon /></div>
            <div className='cursor-pointer' onClick={signInWithGithub} ><GitHubIcon /></div>
            <div className='cursor-pointer' ><XIcon /></div>
          </div>
          <div>or use your mobile number</div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
          {!isCodeSent ? (
            <>
              <div className="mb-0 relative h-[70px] flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-20 p-4 rounded-lg bg-white border-black bg-transparent text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black"
                  >
                    {formData.countryCode}
                  </button>
                  {showDropdown && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                      {countryCodes.map((item) => (
                        <div
                          key={item.code}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleCountryCodeChange(item.code)}
                        >
                          {item.country} ({item.code})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`flex-1 p-4 rounded-lg bg-white border-black bg-transparent w-full h-[55px] xs:h-[59px] block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder='Enter Phone Number'
                />
                {errors.phone && <p className="text-white text-xs p-1">{errors.phone}</p>}
              </div>
              <button type="submit" className="bg-[black] mt-6 text-white xs:p-4 p-2 w-full rounded-md">
                <div className="flex justify-center">
                  Send Code
                </div>
              </button>
            </>
          ) : (
            <>
              <div className="mb-0 relative h-[70px]">
                <input
                  type="text"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className={`flex-1 p-4 rounded-lg bg-white border-black bg-transparent w-full h-[55px] xs:h-[59px] block text-sm text-black border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black ${errors.verificationCode ? 'border-red-500' : ''}`}
                  placeholder='Enter Verification Code'
                />
                {errors.verificationCode && <p className="text-white text-xs p-1">{errors.verificationCode}</p>}
              </div>
              <button type="button" onClick={handleVerifyCode} className="bg-[black] mt-6 text-white xs:p-4 p-2 w-full rounded-md">
                <div className="flex justify-center">
                  Verify Code
                </div>
              </button>
            </>
          )}
        </form>
        <div className='flex justify-evenly mt-5 '>
          <div className='h-[2px] bg-black w-3/6 xs:mt-3 mt-2'></div>
          <div className='pl-2 pr-2 font-bold text-black'>or</div>
          <div className='h-[2px] bg-black w-3/6 xs:mt-3 mt-2'></div>
        </div>
        <div className="mt-5 text-center">
          <button
            type="button"
            className="xs:p-4 p-2 w-full border-[2px] rounded-md border-black bg-transparent text-white"
            onClick={() => setPhoneLogin(false)}
          >
            Login via Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginWithMobile;
