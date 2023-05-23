import React, { useState } from 'react'
import { saveUserDetails } from './firebase/utility';

const Details = ({ email, setEmail, setIsStart }) => {
    const [ userName, setUserName ] = useState("");
    const [ phoneNo, setPhoneNo ] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleNameChange = (e) => {
      setUserName(e.target.value);
      setNameError("");
    }

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

    const handleNumberChange = (e) => {
      const input = e.target.value;
      const numbersOnly = input.replace(/[^0-9]/g, "");
      setPhoneNo(numbersOnly);
    };

const handleClick = async () => {
  let isValid = true;

  // Email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!email){
   setEmailError("Email is required");
   isValid = false;
  }else if(!email || !emailRegex.test(email)) {
    setEmailError("Invalid email");
    isValid = false;
  } else {
    setEmailError(""); // Clear the email error message if it was previously set
  }

  if (!userName) {
    setNameError("Name is required");
    isValid = false;
  } else {
    setNameError(""); // Clear the name error message if it was previously set
  }

  if (isValid) {
    saveUserDetails({ userName, email, phoneNo, score: [] });
    setTimeout(() => {
      setIsStart(true);
    }, 100);
  }
};

  return (
    <div className=" w-screen  flex flex-col items-center">
      <div className="h-full rounded-xl mt-[10vh] pt-4 pb-10 bg-orange-950/80 px-12 flex flex-col justify-center w-1/3 lgm:w-1/3 md:w-2/5 sm:w-4/5">
        <h1 className="text-center text-2xl text-white">Enter Details</h1>
        <div className="space-y-6 w-full mt-4">
          <div>
            <input
              className={` border ${
                nameError
                  ? "border-red-500"
                  : "dark:border-my-black-1 border-my-gray-2"
              }
              w-full outline-none text-black rounded-xl text-base px-4 py-3`}
              placeholder="Enter Name"
              value={userName}
              onChange={handleNameChange}
            />
            {nameError && (
              <p className="mt-1 text-red-500 text-sm">{nameError}</p>
            )}
          </div>
          <div>
            <input
              className=" border
              w-full outline-none font-poppins text-black rounded-xl text-base px-4 py-3"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="mt-1 text-red-500 text-sm">{emailError}</p>
            )}
          </div>
          <input
            className=" border
              w-full outline-none font-poppins text-black rounded-xl text-base px-4 py-3"
            placeholder="Enter Phone Number"
            value={phoneNo}
            onChange={handleNumberChange}
            maxLength={10}
          />
        </div>

        <button
          type="button"
          className="bg-cyan-500 py-2 px-6 minlg:px-8 rounded-xl font-poppins font-semibold mt-8 text-lg"
          onClick={handleClick}
        >
          Start The Game
        </button>
      </div>
    </div>
  );
}

export default Details