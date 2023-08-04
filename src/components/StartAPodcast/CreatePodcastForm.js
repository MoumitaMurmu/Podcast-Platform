import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../common/Input/Index';
import Button from '../common/Button';
import { toast } from 'react-toastify';
import FileInput from '../common/Input/FileInput';
import { storage, auth, db } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc } from 'firebase/firestore';
import cyp from '../../cyp.png';
import womanE from '../../womanE.png';
import { useEffect } from 'react';


const CreatePodcastForm = () => {
    const[title, setTitle] = useState("");
    const[desc, setDesc] = useState("");
    const[displayImage, setDisplayImage] = useState();
    const[bannerImage, setBannerImage] = useState();
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    setShowImages(true);
  }, []);


    const handleSubmit = async() => {
    //   toast.success("Handling Podcast Form");
      if(title && desc && displayImage && bannerImage)
       {
        setLoading(true);
         // 1.Upload Files --> get Download links
       try{
            // For Banner Image
            const bannerImageRef = ref(
                storage,
                `podcasts/${auth.currentUser.uid}/${Date.now()}`);
            await uploadBytes(bannerImageRef, bannerImage);
            const bannerImageUrl = await getDownloadURL(bannerImageRef);
            console.log("Banner Image: ", bannerImageUrl);
            // toast.success("File Uploaded");


            // For Display Image
            const displayImageRef = ref(
                storage,
                `podcasts/${auth.currentUser.uid}/${Date.now()}`);
            await uploadBytes(displayImageRef, displayImage);
            const displayImageUrl = await getDownloadURL(displayImageRef);
            console.log("Display Image: ", displayImageUrl);
            // toast.success("File Uploaded");

           const podcastData = {
                 title: title,
                description: desc,
                bannerImage: bannerImageUrl,
                displayImage: displayImageUrl,
                createdBy: auth.currentUser.uid,
                
            }
            const docRef = await addDoc(collection(db,"podcasts"), podcastData);
            setTitle("");
            setDesc("");
            setBannerImage(null);
            setDisplayImage(null);
            toast.success("Podcast Created!.");
            setLoading(false);
        }catch(e){
            toast.error(e.mesage);
            console.log(e);
            setLoading(false);
        }
       
        // 2. Create a new doc in a new collection called podcasts
        // 3. Save this new podcast episode states in our podcasts
      }else{
        toast.error("Please Enter All Values");
        setLoading(false);
      }
    }

    const displayImageHandle = (file) => {
        setDisplayImage(file);
    }

    
    const bannerImageHandle = (file) => {
        setBannerImage(file);
    }

  return (
    <div className='create-p-main'>
            <div className='left-create'>
              <img src={cyp} alt='cyp'className={showImages ? 'show' : ''} />
            </div>
            <div className='right-create'>
        <InputComponent 
    state={title} 
    setState={setTitle} 
    placeholder="Title" 
    type="text" 
    required={true}
    />
   

   <InputComponent 
    state={desc} 
    setState={setDesc} 
    placeholder="Description" 
    type="text" 
    required={true}
    />
    <FileInput 
    accept={"Image/*"} 
    id="display-image-input" 
    fileHandleFnc={displayImageHandle} 
    text={"Display Image Upload"}
    
    />

    <FileInput 
    accept={"Image/*"} 
    id="banner-image-input" 
    fileHandleFnc={bannerImageHandle} 
    text={"Banner Image Upload"}
    />

<Button text={loading ? "Loading...." :"Create Podcast"} disabled={loading} onClick={handleSubmit}/>
</div>
<img src={womanE} alt='womanE' className='womanE' className={`womanE ${showImages ? 'show' : ''}`}/>
    </div>
  )
}

export default CreatePodcastForm;