const mongoose = require("mongoose");

const headingPhoto = new mongoose.Schema({
  image: {
    type: String,
  },
  publicIdImage: {
    type: String,
  },
});

const HeadingPhoto = mongoose.model("HeadingPhoto", headingPhoto);
module.exports = HeadingPhoto;
