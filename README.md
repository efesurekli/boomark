# boomark
Bookmark your favorite DJ sets in SoundCloud

## Installation

#### Setting up the server:
1. Clone the repo to your local machine.
2. cd to the repo and run the following commands:
`npm install`
3. Get your soundcloud client-id key and rename the keys/keylist.example.js to keys/keylist.js with your client-id key pasted as in the example.
4. For tests run (make sure your are not running the server):
`npm test`
5. To run the server type:
`npm start`

#### Installing the Chrome Extension:
1. Fire up Google Chrome
2. In the url, type in <chrome://extensions>
3. Enable Developer mode checkbox, at the right-top corner.
4. Go to the file where the repo was cloned
5. Drag and drop the ext folder to the page opened in  (2)
6. Enable the extension and restart the browser.

That's it!

## Usage

Go to soundcloud.com and find some cool dj sets/tracks. Whenever you stumble upon a good piece within the track, just click the extension button and bookmark it! 

## Release Notes
v.0.1: As of now, it is database-less so you'll lose all your sound bookmarks when you shut down the server.

