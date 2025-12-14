const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    poster: String,
    director: String,
    year: String,
    imdbID: String,
    type: String,
    rating: Number,
    duration: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movies", movieSchema);
