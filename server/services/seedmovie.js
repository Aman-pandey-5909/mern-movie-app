const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie = require("../models/Movies");
const movies = require("../data/movies.json");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI

async function seedMovies() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Optional: clear existing movies
    await Movie.deleteMany();
    console.log("Existing movies cleared");

    // Insert new movies
    await Movie.insertMany(movies);
    console.log("Movies seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

module.exports = seedMovies