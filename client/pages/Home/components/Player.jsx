import React from 'react';
const Player = (props) => {
  // you need to pass  in a default track
  const trackId = "151695107"; 
  return (
    <div> 
      <iframe 
        id="sc-widget" 
        width="100%" height="166" 
        scrolling="no" 
        frameborder="no" 
        src={ "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F" + trackId + "&show_artwork=true" }>
      </iframe>
    </div>);
}
export default Player;
