import React, { useState } from 'react'
import InputComponent from '../../common/Input/Index';
import Button from '../../common/Button';
import { auth, db, storage } from '../../../firebase';
import{
    createUserWithEmailAndPassword,
  
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignupForm = () => {
const[fullName, setFullName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[confirmPassword, setConfirmPassword] = useState("");
  const[loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const handleSignup = async()=>{
    console.log("Handling Signup");
    setLoading(true);
    if(password==confirmPassword && password.length>=6 && fullName && email){
        try{
            // creating user's account in firebase->Authentication->users
            const userCredential = await createUserWithEmailAndPassword(
               auth,
               email,
               password
            );
            const user = userCredential.user;
            console.log("user", user);
            // Saving User's Details firebase->Cloud Firestore->Data
            await setDoc(doc (db, "users", user.uid),{
                name: fullName,
                email: user.email,
                uid: user.uid,
                
            })
            // Save the data in the Redux, call the Redux action.
            dispatch(
                setUser({
                 name: fullName,
                email: user.email,
                uid: user.uid,
            })
            );
             toast.success("User has been successfully Created");
             setLoading(false);
            navigate("/profile");
        }catch(e){
            console.log("error: ", e);
            toast.error(e.message);
            setLoading(false);
        }
    }else{
        // throw an error
        if (!fullName || !email || !password || !confirmPassword) {
            toast.error("All fields are mandatory!");
          }
        else if(fullName.length <= 2){
            toast.error("Full Name should be more than two characters!");
        }
        else if(password.length<6){
            toast.error("Password should be more than 6 characters!");
        }
        else if(password!=confirmPassword){
            toast.error("Please makes sure your password and confirm password matches!");
        }
       
        
        setLoading(false);
    }
   
  };
  return (
    <>
        <InputComponent 
    state={fullName} 
    setState={setFullName} 
    placeholder="full Name" 
    type="text" 
    required={true}
    style={{ width: '200px !important' }}
    />
   

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

<InputComponent 
    state={confirmPassword} 
    setState={setConfirmPassword} 
    placeholder="Confirm Password" 
    type="password" 
    required={true}
   
    />
<Button text={loading ? "Loading...." :"Signup"} disabled={loading} onClick={handleSignup}/>
  
    </>
  )
}

export default SignupForm;


     
            