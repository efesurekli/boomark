const serverUrl = 'http://localhost:3000/api/bookmarks';

/*
  fetch tracks from the database
*/
const getTracks = () => {
  return new Promise ((resolve, reject) => {
    fetch(serverUrl).then((response) => {
      return response.json()
    }).then(data => { 
      resolve(data)
    }).catch(reject);
  });
};

/*
  load the track to the SC widget and fast-forward it to the bookmark
  control the soundcloud widget events:
*/
const playTrack = ({ permalinkUrl, mark }) => {
  const iframeElement = document.querySelector('iframe');
  const widget = SC.Widget(iframeElement.id);
  widget.load(permalinkUrl);
  widget.bind(SC.Widget.Events.READY, () => {
    widget.play();
    widget.unbind(SC.Widget.Events.READY);
  });
  widget.bind(SC.Widget.Events.PLAY, () => {
    widget.seekTo(parseInt(mark));
    widget.unbind(SC.Widget.Events.PLAY);
  });
}
/*
  millisecond to human readable format of hh: mm: ss
*/
const msToHumanTime = (ms) => {
  let seconds = (ms / 1000).toFixed(0);
  let minutes = Math.floor(seconds / 60);
  let hours = "";
  if (minutes > 59) {
     hours = Math.floor(minutes / 60);
     hours = (hours >= 10) ? hours : "0" + hours;
     minutes = minutes - (hours * 60);
     minutes = (minutes >= 10) ? minutes : "0" + minutes;
  }
  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  if (hours != "") {
     return hours + ":" + minutes + ":" + seconds;
  }
  return minutes + ":" + seconds;
};

export {
  getTracks,
  msToHumanTime,
  playTrack
};
