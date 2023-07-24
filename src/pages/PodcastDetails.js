import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header/Index';
import { useNavigate, useParams } from 'react-router-dom';
import { isAsyncThunkAction } from '@reduxjs/toolkit';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import EpisodeDetails from '../components/Podcasts/EpisodeDetails/index';
import AudioPlayer from '../components/Podcasts/AudioPlayer';

const PodcastDetailsPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const[podcast, setPodcast] = useState({});
    const[episodes, setEpisodes]= useState([]);
    const[PlayingFile, setPlayingFile] = useState("");
    console.log("ID: ", id);

    useEffect(()=>{
      if(id){
        getData();
      }
    },[id])

    const getData = async() => {
        try{
            const docRef = doc(db, "podcasts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPodcast({id: id, ...docSnap.data()});
        // toast.success("Podcast Found!");
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such Podcast!");
        toast.error("No such Podcast!");
        navigate("/podcasts");
        }
        }catch(e){
          toast.error(e.message);
        }
    };

    useEffect(() => {
      const unsubscribe = onSnapshot(
        query(collection(db, "podcasts", id, "episodes")),
        (querySnapshot) => {
            const episodesData = [];
            querySnapshot.forEach((doc) => {
                episodesData.push({id: doc.id, ...doc.data() });
            });
            setEpisodes(episodesData);
        },
        (error) => {
            console.error("Error fetching episodes: ", error);
        }
      );
      return () => {
        unsubscribe();
      };
}, [id]);
  
return (
    <div>
    <Header/>
    <div className='input-wrapper' style={{marginTop: "0rem"}}>
     {podcast.id &&
       ( 
       <>
       <div 
       style={{
        display:'flex', 
        justifyContent:'space-between', 
        alignItems:'center',
        width:"100%"
        }}
        >
       <h1 className='podcast-title-heading'>{podcast.title}</h1>
       {podcast.createdBy == auth.currentUser.uid &&(
        <Button
        style={{width: "200px", margin:0}}
        text={"Create Episode"}
        onClick={()=>{
            navigate(`/podcast/${id}/create-episode`);
        }}
       />
       )}
      
       </div>
      
       <div className='banner-wrapper'>
       <img src={podcast.bannerImage}/>
       </div>
      <p className='podcast-description'>{podcast.description}</p>
      <h1 className='podcast-title-heading'>Episodes</h1>
      {episodes.length > 0 ? ( 
        <>
        {episodes.map((episode, index) => {
          return( 
          <EpisodeDetails 
          key={index}
          index={index + 1}
          title={episode.title} 
          description={episode.description} 
          audioFile={episode.audioFile} 
          onClick={(file) => setPlayingFile(file)}

          />
          );
        })}</>
        ) : (
        <p>No Episodes</p> 
        )}
       </>

        )}
    </div>
   { PlayingFile && <AudioPlayer audioSrc={PlayingFile} image={podcast.displayImage}/>}
  
    </div>
  )
}

export default PodcastDetailsPage;