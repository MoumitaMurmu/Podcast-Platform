// import React from 'react';
// import './styles.css';
// import { Link, useLocation } from 'react-router-dom';



// const Header = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   // console.log('CurrentPath: ', currentPath);

 
//   return (
//     <div className='navbar'>
//     <div className='gradient'></div>
//       <div className='links'>
//         <Link to="/" className={currentPath === "/" ? "active" : ""}>Join Us</Link>
//         <Link to="/podcasts" className={currentPath === "/podcasts" ? "active" : ""}>Podcasts</Link>
//         <Link to="/create-a-podcast" className={currentPath === "/start-a-podcast" ? "active" : ""}>Start A Podcast</Link>
//         <Link to="/profile" className={currentPath === "/profile" ? "active" : ""}>Profile</Link>
        
//       </div>
//     </div>
//   )
// }

// export default Header;

import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [user, setUser] = useState(null); // Use local state to store user data

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success('User Logged out!');
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  return (
    <div className='navbar'>
      <div className='gradient'></div>
      <div className='links'>
        <Link to="/podcasts" className={currentPath === "/podcasts" ? "active" : ""}>Podcasts</Link>
        <Link to="/create-a-podcast" className={currentPath === "/create-a-podcast" ? "active" : ""}>Start A Podcast</Link>
        <Link to="/profile" className={currentPath === "/profile" ? "active" : ""}>Profile</Link>
        {user ? ( // Show the "Logout" button if the user is logged in
          <Link onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/" className={currentPath === "/" ? "active" : ""}>
            Join Us
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
