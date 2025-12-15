const router = require("express").Router();

const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieSorted,
  getMovie,
  getSearchMovies,
  getMoviesAll
} = require("../controllers/movies.controller");

const { verifyToken } = require("../middlewares/verifytoken");
const { verifyRole } = require("../middlewares/verifyrole");
const movieSchema = require("../schemas/movie");
const validatezod = require("../middlewares/validatezod");

router.get("/movies", verifyToken, getMovies);
router.get("/movie/:id", verifyToken, getMovie);
router.get("/movies/sorted", verifyToken, getMovieSorted);
router.get("/search", verifyToken, getSearchMovies);

//admin only
router.post("/movies", verifyToken, verifyRole, validatezod(movieSchema), createMovie);
router.put("/movies/:id", verifyToken, verifyRole, updateMovie);
router.delete("/movies/:id", verifyToken, verifyRole, deleteMovie);
router.get("/moviesall", verifyToken, verifyRole, getMoviesAll);

module.exports = router;
