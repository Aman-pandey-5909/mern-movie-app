const asyncHandler = require("../utils/asynchandler");
// const axios = require("axios");
const Movies = require("../models/Movies");
const { addToQueue, processQueue } = require("../utils/queue");

//public
const getMovies = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const movies = await Movies.find()
    .skip((page - 1) * 10)
    .limit(10);
  return res
    .status(200)
    .json({ message: "Get Movies successful", resdata: movies });
});

const getMoviesAll = asyncHandler(async (req, res) => {
  const movies = await Movies.find();
  return res
    .status(200)
    .json({ message: "Get Movies successful", resdata: movies });
});

const getMovieSorted = asyncHandler(async (req, res) => {
  const { page, sortby } = req.query;
  const movies = await Movies.find()
    .sort({ [sortby]: 1 })
    .skip((page - 1) * 10)
    .limit(10);
  return res
    .status(200)
    .json({ message: "Get Movies successful", resdata: movies });
});

const getMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await Movies.findById(id);
  return res
    .status(200)
    .json({ message: "Get Movie successful", resdata: movie });
});

const getSearchMovies = asyncHandler(async (req, res) => {
  const { page, s } = req.query;
  const movies = await Movies.find({ title: { $regex: s, $options: "i" } })
    .skip((page - 1) * 10)
    .limit(10);
  return res
    .status(200)
    .json({ message: "Get Movies successful", resdata: movies });
});

//admin-only
// const createMovie = asyncHandler(async (req, res) => {
//   const movieExists = await Movies.exists({ _id: req.body.id });
//   if (movieExists) {
//     return res
//       .status(400)
//       .json({ message: "Movie already exists", resdata: null });
//   }
//   await Movies.create(req.body);
//   return res
//     .status(200)
//     .json({ message: "Create Movie successful", resdata: null });
// });

const createMovie = asyncHandler(async (req, res) => {
  // optional: if client sends _id explicitly (usually Mongo generates it)
  if (req.body._id) {
    const movieExists = await Movies.exists({ _id: req.body._id });
    if (movieExists) {
      return res
        .status(400)
        .json({ message: "Movie already exists", resdata: null });
    }
  }

  // lazy insertion via queue
  addToQueue(async () => {
    try {
      await Movies.create(req.body);
    } catch (err) {
      console.error("Queue job failed:", err);
    }
  });

  processQueue();

  return res.status(202).json({
    message: "Movie creation queued",
    resdata: null
  });
});

const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movieExists = await Movies.exists({ _id: id });
  if (!movieExists) {
    return res
      .status(400)
      .json({ message: "Movie does not exist", resdata: null });
  }
  await Movies.updateOne({ _id: id }, req.body);
  return res
    .status(200)
    .json({ message: "Update Movie successful", resdata: null });
});

const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const movieExists = await Movies.exists({ _id: id });
  if (!movieExists) {
    return res
      .status(400)
      .json({ message: "Movie does not exist", resdata: null });
  }
  await Movies.deleteOne({ _id: id });
  return res
    .status(200)
    .json({ message: "Delete Movie successful", resdata: null });
});

module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieSorted,
  getMovie,
  getSearchMovies,
  getMoviesAll,
};
