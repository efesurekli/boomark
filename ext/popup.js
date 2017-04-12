/*
  popup.js is the script run by the extension. It handles the sound bookmark
  data posting to the server, and also popup.html controls.
  Because of google extension content script policy, you must to handle all 
  scripting here. 
  (https://developer.chrome.com/extensions/contentSecurityPolicy)
*/

// Main page url, change in production:
const HOME_URL = 'http://localhost:3000/';

// Helper Functions:

// post bookmark to the server:
const addToBookmarkList = (bookmark) => {
  console.log(bookmark, 'added to the list!');
  fetch(HOME_URL + "api/1", {
    method: "POST",
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(bookmark)
  }).then((res) => {
    giveFeedback({status: true});
  }).catch((err) => {
    giveFeedback({status: false});
    console.log(err);
  });
}

// give user feedback on the status of the post:
const giveFeedback = ({ status, code }) => {
    const feedback = document.getElementById('feedback');
    feedback.style.display = "block";
    feedback.innerText = status ? 'successfully bookmarked!' : 
      (code ? 'no bookmarking, did forgot to play?' : 'failed to book :(')
    setTimeout(() => {
      feedback.style.display = "none";
    }, 3000);
};

// for debugging purposes generate an error message and give user feedback:
const handleErrorMessage = (description) => {
  if (description === 'noplay') {
    giveFeedback({status: false, code: description });
  }
  console.log(description);
};

// handle message cases:
const popupAction = {
  addBookmark: addToBookmarkList,
  throwError: handleErrorMessage,
}

const handleMessage = (message) => {
  const { method, payload } = message;
  popupAction[method](payload);
};

// Attach event handlers in the popup.html:
document.getElementById('linkToHome').addEventListener('click', () => {
  chrome.tabs.create({url: HOME_URL});
}); 

document.getElementById('addBookmark').addEventListener('click', () => {
  portToBackground.postMessage({method: 'addBookmark'});
});

// Handle content-script messaging:
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  let portToBackground = chrome.tabs.connect(tabs[0].id, {name: "background"});
  // export the port handle:
  window.portToBackground = portToBackground; 
  chrome.commands.onCommand.addListener((command) => {
    if(command === 'bookmarkSong') {
      portToBackground.postMessage({method: "addBookmark"}); 
    }
  });
});

chrome.runtime.onConnect.addListener((portToExtension) => {
  portToExtension.onMessage.addListener(handleMessage);
});


