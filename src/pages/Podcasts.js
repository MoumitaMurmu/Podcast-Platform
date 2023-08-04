// import React, { useEffect, useState } from 'react'
// import Header from '../components/common/Header/Index'
// import { useDispatch, useSelector } from 'react-redux'
// import { collection, onSnapshot, query } from 'firebase/firestore';
// import { db } from '../firebase';
// import { setPodcasts } from '../slices/podcastSlice';
// import PodcastCard from '../components/Podcasts/PodcastCard/index';
// import InputComponent from '../components/common/Input/Index';

// const  PodcastsPage = () => {
//     const dispatch = useDispatch();
//     const podcasts = useSelector((state)=> state.podcasts.podcasts);
//     const[search, setSearch] = useState("");

   
    

//     useEffect(()=>{
//           const unsubscribe = onSnapshot(
//             query(collection(db, "podcasts")),
//             (querySnapshot)=>{
//                 const podcastsData = [];
//                 querySnapshot.forEach((doc)=>{
//                     podcastsData.push({id: doc.id, ...doc.data()});
//                 });
//                 dispatch(setPodcasts(podcastsData));
//             },
//             (error)=>{
//                 console.error("Error fetching podcasts: ", error);
//             }
//           );
//           return()=>{
//             unsubscribe();
//           }
//     },[dispatch])

    
 

//     console.log(podcasts);
//     var filteredPodcasts = podcasts.filter((item)=>item.title.trim().toLowerCase().includes(search.toLowerCase()))
  
//     return (
//     <div  style={{borderLeft: '1px solid var(--blue)'}}>
//         <Header/>
//         <div 
//         className={`podcasts-flex ${
//         filteredPodcasts.length > 0 ? ('slide-in') : (
//           ""
//         ) 
//       }`}
//          style={{marginTop: '2rem'}}>
//         <h1>Discover Podcasts</h1>
//         <InputComponent 
//     state={search} 
//     setState={setSearch} 
//     placeholder="Search By Title" 
//     type="text" 
    
//     />
//         {filteredPodcasts.length > 0 ? (
//           <div className='podcasts-flex' style={{marginTop: "1.5rem"}}>
//             {filteredPodcasts.map((item)=>{
//                 return (
//                     <PodcastCard 
//                     key={item.id}
//                     id={item.id} 
//                     title={item.title}
//                     className='podcast-card' 
//                     displayImage={item.displayImage}
//                      />
//                 )
//             })}
//           </div>
//         ): (
//             <p>{search ? "Podcast Not Found!" : "No Podcasts On The Platform!"}</p>
//         )}
//         </div>
        
//     </div>
//   )
// }

// export default PodcastsPage;


import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header/Index';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { setPodcasts } from '../slices/podcastSlice';
import PodcastCard from '../components/Podcasts/PodcastCard/index';
import InputComponent from '../components/common/Input/Index';

const PodcastsPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState('');
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const userNamesMap = {};
        usersSnapshot.forEach((userDoc) => {
          const { name, uid } = userDoc.data();
          userNamesMap[uid] = name;
        });
        setUserNames(userNamesMap);
      } catch (error) {
        console.error('Error fetching user names: ', error);
      }
    };

    fetchUserNames();

    const unsubscribe = onSnapshot(
      query(collection(db, 'podcasts')),
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
  }, [dispatch]);

  var filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ borderLeft: '1px solid var(--blue)' }}>
      <Header />
      <div
        className={`podcasts-flex ${
          filteredPodcasts.length > 0 ? 'slide-in' : ''
        }`}
        style={{ marginTop: '2rem' }}
      >
        <h1>Discover Podcasts</h1>
        <InputComponent
          state={search}
          setState={setSearch}
          placeholder="Search By Title"
          type="text"
        />
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: '1.5rem' }}>
            {filteredPodcasts.map((item) => {
              const creatorName = userNames[item.createdBy] || 'Unknown';
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                  creatorName={creatorName}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? 'Podcast Not Found!' : 'No Podcasts On The Platform!'}</p>
        )}
      </div>
    </div>
  );
};

export default PodcastsPage;



