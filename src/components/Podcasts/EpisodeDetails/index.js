import React from 'react';
import './styles.css';
import Button from '../../common/Button';
const EpisodeDetails = ({index, title, description, audioFile, onClick}) => {
  return (
    <div style={{width: "100%"}}>
      <h1 style={{textAlign: "left", marginBottom: 0}}>{index}.{title}</h1>
      <p style={{marginLeft:"1.2rem"}} className='podcast-description'>{description}</p>
      <Button 
      text={"Play"} 
      onClick={()=> onClick(audioFile)} 
      style={{width:"100px"}}

      />
    </div>
  )
}

export default EpisodeDetails;