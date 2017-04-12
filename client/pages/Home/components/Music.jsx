import React from 'react';
import Media from 'react-bootstrap/lib/Media';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import { msToHumanTime } from '../../../utils/main.js';

const styles = {
  media: {
    backgroundColor: '#313233', 
    borderBottomColor: '#edbe61', 
    borderBottomWidth: 10, 
    borderBottomStyle: 'solid'
  },
  panel: {
    backgroundColor:"#232626",
    color: 'white',
    borderColor:'#313233' 
  }
};

export default class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  playBookmark() {
    this.props.play(this.props.track);
  }
  render() {
    return (
        <Media style= { styles.media }>
          <Media.Left>
            <img width={64} height={64} src={this.props.track.artworkUrl} alt="Image"/>
          </Media.Left>
          <Media.Body>
            <Media.Heading 
              onClick={ this.playBookmark.bind(this) } 
              style={{ marginTop: 5, color: '#1cd0ef' }}>
              { this.props.track.title + '  ' }
              <Glyphicon style={{ top: 3 }} glyph="play-circle" /> 
            </Media.Heading>
            <div style={{ color: 'white' }}> 
              <span>
                Bookmarks |  { msToHumanTime(parseInt(this.props.track.mark)) }
              </span>
            </div>
            <span style={{color: 'white'}} onClick={() => this.setState({ open: !this.state.open })}>description >> </span>
            <Panel collapsible expanded={this.state.open} style={ styles.panel }>
              { this.props.track.description ? this.props.track.description : 'description not found' }
            </Panel>
          </Media.Body>
        </Media>
    );
  }
}