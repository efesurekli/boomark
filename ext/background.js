/*
  Background.js content-script is used solely for extracting the 
  time elapsed at the time of user bookmark action.
  The content-script is run only when the user is in soundcloud/* (see manifest.json)
*/


// helper functions to handle messaging with the extension html:
const handleMessage = (msg, port) => {
  const { method, payload } = msg
  actions[method](payload, port);
};

const actions = {
  addBookmark: (payload, port) => {
    const $progressTimeline = document.querySelector("div.playbackTimeline__progressWrapper");
    const $badge = document.querySelector('.playbackSoundBadge > a')
    if ($badge !== null) { 
      const bookmark = {
        time: $progressTimeline.getAttribute("aria-valuetext"),
        timeMs: $progressTimeline.getAttribute("aria-valuenow"),
        permalink: $badge.href
      };
      port.postMessage({method: 'addBookmark', payload: bookmark }); 
    } else {
      console.log('failed to access to the player');
      port.postMessage({method: 'throwError', payload: 'noplay' });
    }
  }
}

// The following waits for a connection from the 
// extension in order to make a reverse connection. 
chrome.runtime.onConnect.addListener(function(portToBackground) {
  var portToExtension = chrome.runtime.connect({name:"boomark"});
  portToBackground.onMessage.addListener((message) => {
    console.log('message received')
    handleMessage(message, portToExtension);  
  });
});
