import React from 'react';
import MusicList from './components/MusicList.jsx';
import { getTracks, playTrack } from '../../utils/main.js'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import SideBar from './components/SideBar.jsx';
import Player from './components/Player.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackList: [{
        title: '1',
        description: 'loading',
        artworkUrl: '',
        timeMs: '647764'
      }, {
        title: '2',
        description: 'loading',
        artworkUrl: '',
        timeMs: '647764'
      }],
      currentTrack: {}
    };
  }
  fetchMusicList() {
    getTracks().then((tracks) => {
      this.setState({ trackList: tracks })
    }).catch(console.log);
  }
  playBookmark(track) {
    this.setState = { currentTrack: track };
    playTrack(track);
  }
  componentDidMount() {
    this.fetchMusicList(); 
  }
  render() {
    return (
      <div style={{ backgroundColor: '#686a6d' }}>
        <Grid>
          <Row style={{ color: 'white'}}>
            <h1 >boomark <span style={{color: '#1cd0ef'}}>/</span> your best dj sets</h1>
            <hr/>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <MusicList tracks={ this.state.trackList } play={ this.playBookmark.bind(this) }/>
            </Col>
            <Col xs={6} md={4}>
            <SideBar />
            </Col>
          </Row>
          <Row>
            <Player/>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Home;