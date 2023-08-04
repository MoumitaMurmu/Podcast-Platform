
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';
import Header from '../components/common/Header/Index';
import { FaUserCircle } from 'react-icons/fa';
import {FiMenu} from 'react-icons/fi'; 
import {AiOutlineLogout, AiOutlineHome, AiOutlineAudio,AiOutlineGithub,AiFillLinkedin,AiOutlineUser} from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import {MdOutlineAudioFile} from 'react-icons/md';
import PodcastCard from '../components/Podcasts/PodcastCard';
import { Link, useLocation } from 'react-router-dom';
import { setPodcasts } from '../slices/podcastSlice';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import nopodcast from '../nosearch.png';

const ProfilePage = () => {
  
  const Myuser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts); // Fetch the podcasts from Redux store

  const [showMenu, setShowMenu] = useState(false);
  const [showDiscover, setShowDiscover] = useState(false);
  const [showPodcasts, setShowPodcasts] = useState(false);
  const [showStartAPodcast, setShowStartAPodcast] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');


  const location = useLocation();
  const currentPath = location.pathname;

  

 
  
// Get the current user's UID
const user = auth.currentUser;
const currentUserUid = user ? user.uid : null;

useEffect(() => {
  if (currentUserUid) {
    // Fetch only the podcasts created by the current user
    const unsubscribe = onSnapshot(
      query(collection(db, 'podcasts'), where('createdBy', '==', currentUserUid)),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.error('Error fetching podcasts: ', error);
      }
    );
    return () => {
      unsubscribe();
    };
  }
}, [dispatch, currentUserUid]);

console.log("My User: ", Myuser);
  
// Loader Function

if (!user) {
    return <Loader />;
  }

  // Logout Function
  
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

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

 

  const handleFeedbackChange = (event) => {
    setFeedbackMessage(event.target.value);
  };

  const sendFeedback = () => {
    // Replace 'YOUR_EMAIL_ADDRESS' with the actual Gmail address you want to send feedback to
    const email = 'mmoumita202016@gmail.com';
    const subject = 'Podcast App Feedback from User';
    const body = feedbackMessage;

    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

 
  return (
   
      <>
     <Header/> 
      <div className='input-wrapper profile-container'>
        <div className='profile-card'>
        <FaUserCircle className='user-icon' />
                 <div className='profile-details'>
                    
                 
                                      {Myuser ? (
                            <h3 style={{textAlign: 'left'}}>{Myuser.name}</h3>
                          ) : (
                            <h3>Loading user data...</h3>
                          )}
                     
                        <div className='profile-card-menu-item' style={{  cursor: 'pointer', marginLeft: '5px'}}>
                               
                              {showMenu ? (
                                <div className='menu-item'>

                                <FaAngleDown className='menu-icon' onClick={toggleMenu} /> 
                                <h4>Menu</h4>
                              <Link to="/" className={currentPath === "/" ? "active" : ""}>
                              <p><AiOutlineHome className='icon'/> <span>SignUp</span></p>
                              </Link>
                              <Link to="/podcasts" className={currentPath === "/podcasts" ? "active" : ""}>
                              <p><MdOutlineAudioFile className='icon'/><span style={{marginLeft: '7px'}}>Podcasts</span></p>
                              </Link>
                              <Link to="/create-a-podcast" className={currentPath === "/start-a-podcast" ? "active" : ""}>
                              <p><AiOutlineAudio className='icon'/> <span>Start A Podcast</span></p>
                              </Link>
                              <Link to="/profile" className={currentPath === "/profile" ? "active" : ""}>
                              <p><AiOutlineUser className='icon'/> <span>Profile</span></p>
                              </Link>
                              <p onClick={handleLogout}>
                              <AiOutlineLogout className='icon'/> 
                             <span style={{marginLeft: '7px'}}>Logout</span>
                              </p>
                            </div>
                              ) : (
                                <div>
                                 <FiMenu title='click here to see all the Menu' className='menu-icon' onClick={toggleMenu} />

                                </div>
                              )}
                 
                          </div>
                        
                  </div>
                 
              
              <div className='profile-contact-menu'>
                    <h1>Contact</h1>
                  
                    <a href='https://github.com/MoumitaMurmu' className='contact-link' title='Github'>
                      <AiOutlineGithub />
                      <span>Github</span>
                    </a>
                    
                    <a href='https://www.linkedin.com/in/moumita-murmu-832637218/' className='contact-link' title='Linkedin'>
                      <AiFillLinkedin />
                      <span>Linkedin</span>
                    </a>
                    
               </div>

                <div className='profile-reach'>
                             <h1>Feedback</h1>
                             <textarea
                              rows='4'
                              cols='50'
                              placeholder='Enter your feedback here...'
                              value={feedbackMessage}
                              onChange={handleFeedbackChange}
                            />
                          <button onClick={sendFeedback} className='feedback-btn'>Send Feedback</button>
                </div>
                 
          </div>
       
          <div className='dashboard'>
          
            <div className='dashboard-items'>
           
                {podcasts.length > 0 ? (
                  <>
                  <h1>Your Podcasts</h1>
                  <div className='podcasts-flex'>
                
                    {podcasts.map((item) => (
                      <PodcastCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        
                        displayImage={item.displayImage}
                        creatorName={Myuser ? Myuser.name : 'Unknown'}
                      />
                    ))}
                    </div>
                    </>
                 
                ) : (
                  <>
                   
                   <img src={nopodcast} alt='nopodcast' className='nopodcast'/>
                  </>
            
                )} 
            </div>
            
      </div>
     
      </div>
  </>
  );
};

export default ProfilePage;
 
  




   