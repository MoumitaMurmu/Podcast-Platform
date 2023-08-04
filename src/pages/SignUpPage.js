import React, { useState } from 'react'
import Header from '../components/common/Header/Index';
import SignupForm from '../components/SignupComponents/SignupForm';

import LoginForm from '../components/SignupComponents/LoginForm';
import { motion } from "framer-motion";

import headphone from '../headest-removebg-preview.png';
import mic from '../girlmusic.png';
const SignUpPage = () => {

  const[flag, setFlag] = useState(false);
 
  
  return (
    <div >

    <Header/>
    <div className='landing-page'>
              <div className='left-landpage'>
             
                   <motion.h1
          initial={{ y: -50, color: "#de63c8" }} 
          animate={{ y: 0, color: "#33FF57" }} 
          transition={{ duration: 1 }}
          className='linear-gradient'
          style={{
    backgroundImage: "linear-gradient(to right, #de63c8, #33FF57)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
        >
          Listen To This Podcast
        </motion.h1>

        <motion.h1
          initial={{ y: -50  }} 
          animate={{ y: 0 }} 
          transition={{ duration: 1 }}
          className='radial-gradient'
          style={{
    backgroundImage: "linear-gradient(to right, #00FF12, #de63c8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
        >
         
          With Value
        </motion.h1>


        {/* img */}

        <motion.img
          initial={{ y: -50 }}
          animate={{
            y: [0, -16, 0], // Vertical floating movement
          }}
          transition={{
            duration: 3,
            repeat: Infinity, // Make the animation repeat indefinitely
            ease: "easeInOut", // Adjust the easing of the animation
          }}
          src={headphone}
          alt='headphone'
          className='headphone'
        />
                  
              </div>

                <div className='input-wrapper right-landpage'>
              {!flag ? <h1 className='signup-signin-heading'>SignUp</h1> : <h1 className='signup-signin-heading'>Login</h1>}
              {!flag ? <SignupForm /> : <LoginForm />}
              {!flag ? (
                <p style={{cursor: "pointer"}} onClick={()=>setFlag(!flag)}>Already have an Account?<span style={{color:'var(--blue)'}}> Click here to Login.</span>  </p>
              ) : (
                <p style={{cursor: "pointer"}} onClick={()=>setFlag(!flag)}> Don't have an account?<span style={{color:'var(--blue)'}}> Click here to signup.</span></p>
                )}
                
              </div>
              <div className='end-right'>
              <motion.p
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 120 }}
          style={{
            width: '420px',
            backgroundImage: "conic-gradient(from 0deg, #FF5733, #57FF33, #33FFA0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Discover podcast gold! Tune in to 'Listen to Our Podcasts with Value' -where inspiration meets information.
          Elevate your journey with enriching content and insightful discussions.
          Join us today and embark on a path of knowledge and growth.
          Happy listening!
        </motion.p>
       
        <motion.img
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          src={mic}
          alt='mic'
          style={{ height: '450px', width: '430px' }}
          className='mic'
        /> 
       
       
</div>
   </div>
  
    </div>
  )
}

export default SignUpPage;



    