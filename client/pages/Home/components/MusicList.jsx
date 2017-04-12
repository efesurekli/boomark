import Music from './Music.jsx';
import React from 'react';
import Media from 'react-bootstrap/lib/Media'

const MusicList = (props) => {
  const tracks = props.tracks;
  return (
    <Media.List> 
      { tracks.map(track => (
        <Media.ListItem> 
          <Music play={ props.play } track={ track }/> 
        </Media.ListItem>)) }
    </Media.List>);
}

export default MusicList;
