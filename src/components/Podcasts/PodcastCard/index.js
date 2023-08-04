import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { BsPlay } from 'react-icons/bs';

const PodcastCard = ({id, title, displayImage,creatorName}) => {

   
  return (
    <Link to={`/podcast/${id}`}>
    <div className='podcast-card'>
       <img className='display-image-podcast' src={displayImage} /> 
       <p className='title-podcast'>{title}</p>
       <p className='author'>Created by: {creatorName}</p>
       <BsPlay style={{height: '25px', width: '25px', marginLeft: '13rem'}}/>
    </div>
    </Link>
  )
}

export default PodcastCard;