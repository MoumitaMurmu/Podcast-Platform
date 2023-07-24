import React from 'react'
import { useSelector } from 'react-redux';
import Header from '../components/common/Header/Index';
import Button from '../components/common/Button';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';

const ProfilePage = () => {
    const user = useSelector((state)=> state.user.user);
    console.log("My User: ", user);

    if(!user){
        return <Loader/>
    }

    const handleLogout = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("User Logged out!");
      }).catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
    }
  return (
    <div>
        <Header />
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
        <Button text={"Logout"} onClick={handleLogout}/>
    </div>
  )
}

export default ProfilePage;