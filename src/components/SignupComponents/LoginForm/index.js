import React, { useState } from 'react'
import InputComponent from '../../common/Input/Index';
import Button from '../../common/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';

const LoginForm = () => {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const handleLogin =async()=>{
    console.log("Handling Login");
    setLoading(true);
   if(email && password){
    try{
        // creating user's account in firebase->Authentication->users
        const userCredential = await signInWithEmailAndPassword(
           auth,
           email,
           password
        );
        const user = userCredential.user;
        const userDoc = await getDoc(doc (db, "users", user.uid));
        const userData = userDoc.data();
        console.log("userData", userData);
        // Saving User's Details firebase->Cloud Firestore->Data
        
        // Save the data in the Redux, call the Redux action.
        dispatch(
            setUser({
             name: userData.name,
            email: user.email,
            uid: user.uid,
            
        })
        );
        toast.success("Login Successful");
        setLoading(false);
        
        navigate("/profile");

         }catch(error){
        console.log("Error signingin: ", error);
      
        toast.error(error.message);
        setLoading(false);
    }
   
  }else{
    toast.error("Make sure email and password are not empty!");
    setLoading(false);
  }
       
    
   
  };
  
  return (
    <>
    <InputComponent 
    state={email} 
    setState={setEmail} 
    placeholder="Email" 
    type="text" 
    required={true}
    />

<InputComponent 
    state={password} 
    setState={setPassword} 
    placeholder="Password" 
    type="password" 
    required={true}
    />


<Button 
text={loading ? "Loading...." : "Login"} 
onClick={handleLogin} 
disabled={loading}

/>
  
    </>
  )
}

export default LoginForm;