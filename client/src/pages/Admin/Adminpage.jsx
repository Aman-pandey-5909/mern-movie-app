import { useEffect, useState } from "react";
import api from "../../utils/api";
import MovieCard from "../../components/Movies/MovieCard";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/moviesall").then((res) => setMovies(res.data.resdata));
  }, []);

  const deleteMovie = async (id) => {
    await api.delete(`/movies/${id}`);
    setMovies(movies.filter((m) => m._id !== id));
  };

  return (
    <div>
      <div className="flex justify-between my-2 mx-2">
        <Button color="primary" variant="text" onClick={() => navigate("/")}>Home</Button>
        <h1 className="font-bold my-3">Admin Dashboard</h1>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate("/admin/create")}
        >
          Create Movie
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {movies.map((movie) => (
          <p key={movie._id}>
            <MovieCard movie={movie} deleteMovie={deleteMovie} />
            <div className="flex justify-between">
              <Button color="error" onClick={() => deleteMovie(movie._id)}>
                Delete
              </Button>
              <Button color="primary" onClick={() => navigate(`/admin/edit/${movie._id}`)}>
                Edit
              </Button>
            </div>
          </p>
        ))}
      </div>
    </div>
  );
}
