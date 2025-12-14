const asyncHandler = require("../utils/asynchandler");
// const axios = require("axios");
const Movies = require("../models/Movies");

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
})

//admin-only
const createMovie = asyncHandler(async (req, res) => {
  const movieExists = await Movies.exists({ imdbID: req.body.imdbID });
  if (movieExists) {
    return res
      .status(400)
      .json({ message: "Movie already exists", resdata: null });
  }
  await Movies.create(req.body);
  return res
    .status(200)
    .json({ message: "Create Movie successful", resdata: null });
});

const updateMovie = asyncHandler(async (req, res) => {
  const {id} = req.params
  const movieExists = await Movies.exists({ imdbID: id });
  if (!movieExists) {
    return res
      .status(400)
      .json({ message: "Movie does not exist", resdata: null });
  }
  await Movies.updateOne({ imdbID: id }, req.body);
  return res
    .status(200)
    .json({ message: "Update Movie successful", resdata: null });
});

const deleteMovie = asyncHandler(async (req, res) => {
  const {id} = req.params
  const movieExists = await Movies.exists({ imdbID: id });
  if (!movieExists) {
    return res
      .status(400)
      .json({ message: "Movie does not exist", resdata: null });
  }
  await Movies.deleteOne({ imdbID: id });
  return res
    .status(200)
    .json({ message: "Delete Movie successful", resdata: null });
});


module.exports = { getMovies, createMovie, updateMovie, deleteMovie, getMovieSorted, getMovie, getSearchMovies };
