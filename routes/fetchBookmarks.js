const db = require('./insertBookmark.js').db;
// serve all bookmarks:
module.exports.fetchBookmarks = (req, res) => {
  res.json(db.musicList);
}
